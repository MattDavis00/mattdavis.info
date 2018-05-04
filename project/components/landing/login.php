<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/connection.php");

// Include Validation Functions
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/validations.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientEmail = $request->email;
$clientPassword = $request->password;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputData->loginSuccess = false;
$outputData->loginAlertMessage = "";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

try
{

  // SQL Query
  $selectUser = $conn->prepare("SELECT `Email`, `Password_Hash` FROM `user` WHERE `Email` = :email");
  $selectUser->bindParam(':email', $clientEmail->data);

  // Execute Query
  $selectUserReturn = $selectUser->execute();

  $result = $selectUser->fetchAll(\PDO::FETCH_ASSOC);

  // Close Statement
  $selectUser = null;

  if (count($result) === 1)
  {

    if (password_verify($clientPassword->data, $result[0]["Password_Hash"])) // Login Successful
    {
      $outputData->loginSuccess = true;

      $_SESSION["loggedIn"] = true;
      $_SESSION["email"] = $result[0]["Email"];
    }
    else {
      $outputData->errorFlag = true; // Password was incorrect
    }

  }
  else {
    $outputData->errorFlag = true; // Email was incorrect
  }

}
catch(PDOException $e)
{
  $outputData->executionErrorFlag = true;
  $outputData->executionError = "Login failed. Please try again.";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputData);

// Close Connection
$conn = null;
