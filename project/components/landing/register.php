<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/connection.php");

// Include Validation Functions
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/validations.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientEmail = $request->email;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;
$clientPassword = $request->password;
$clientPasswordRepeat = $request->passwordRepeat;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Validations

$errorFlag = false;

// First Name

$emailValidation = $validate->Name($clientFirstName->data);
if ($emailValidation->errorFlag)
{
  $errorFlag = true;
  echo $emailValidation->errorMessage . " - " . $clientFirstName->data . " - " . $clientFirstName->field;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (!$errorFlag)
{

  // // Generate Hash
  // $clientPasswordHash = password_hash($clientPassword, PASSWORD_BCRYPT);
  //
  // // SQL Query
  // $stmt = $conn->prepare("INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login_UNIX, Creation_UNIX)
  // VALUES (?, NULL, ?, ?, ?, ?, NULL, ?)");
  // $stmt->bind_param("sssssi", $clientEmail, $clientPasswordHash, $clientSalt, $clientFirstName, $clientLastName, $serverUNIX);
  //
  // // Execute Query
  // $registerReturn = $stmt->execute();
  //
  // // Close Statement
  // $stmt->close();
  //
  // // Check Query
  // if ($registerReturn)
  // {
  //   $outputArray["registerSuccess"] = true; // If the insert was successful, return true.
  // }
  // else
  // {
  //   $outputArray["registerSuccess"] = false; // If the insert failed, return false.
  // }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn = null;
