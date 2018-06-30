<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/commercial/water/project/shared/connection.php");

// Include Validation Functions
include($_SERVER["DOCUMENT_ROOT"]."/commercial/water/project/shared/validations.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientEmail = $request->email;
$clientVerificationCode = $request->verificationCode;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Success Flags
$outputData->verificationSuccess = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

try
{

  if(isset($clientEmail) && !empty($clientEmail) && isset($clientVerificationCode) && !empty($clientVerificationCode)) {

    // SQL Query
    $selectUser = $conn->prepare("SELECT `User_ID`, `Email`, `Activation_Code` FROM `user` WHERE `Email` = :email");
    $selectUser->bindParam(':email', $clientEmail);

    // Execute Query
    $selectUserReturn = $selectUser->execute();

    $result = $selectUser->fetchAll(\PDO::FETCH_ASSOC);

    // Close Statement
    $selectUser = null;

    if (count($result) === 1 && ($clientVerificationCode === $result[0]["Activation_Code"])) { // If the email matches and the verification codes match.

      // SQL Query
      $updateUser = $conn->prepare("UPDATE `user` SET `Verified` = true WHERE `User_ID` = :userID");
      $updateUser->bindParam(':userID', $result[0]["User_ID"]);

      // Execute Query
      $updateUserReturn = $updateUser->execute();

      // Close Statement
      $updateUser = null;

      $outputData->verificationSuccess = true;

    }
    else {
      $outputData->executionErrorFlag = true;
      $outputData->executionError = "Invalid verification URL. ";
    }

  } else {
    $outputData->executionErrorFlag = true;
    $outputData->executionError = "Invalid verification URL. ";
  }

}
catch(PDOException $e)
{
  $outputData->executionErrorFlag = true;
  $outputData->executionError = "Verification error occurred. Please report this to your system administrator. ";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputData);

// Close Connection
$conn = null;
