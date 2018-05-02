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

///// Validations /////

// Email
$emailValidation = $validate->Email($clientEmail->data); // Run validation
if ($emailValidation->errorFlag) // If there was en error with the email.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientEmail->field;
  $errorEntry->errorMessage = $emailValidation->errorMessage;

  $outputData->errorReport[] = $errorEntry;
}
// First Name
$firstNameValidation = $validate->Name($clientFirstName->data); // Run validation
if ($firstNameValidation->errorFlag) // If there was en error with the first name.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientFirstName->field;
  $errorEntry->errorMessage = $firstNameValidation->errorMessage;

  $outputData->errorReport[] = $errorEntry;
}
// Last Name
$lastNameValidation = $validate->Name($clientLastName->data); // Run validation
if ($lastNameValidation->errorFlag) // If there was en error with the last name.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientLastName->field;
  $errorEntry->errorMessage = $lastNameValidation->errorMessage;

  $outputData->errorReport[] = $errorEntry;
}
// Password
$passwordValidation = $validate->Password($clientPassword->data, $clientPasswordRepeat->data); // Run validation
if ($passwordValidation->errorFlag) // If there was en error with the password.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientPassword->field;
  $errorEntry->errorMessage = $passwordValidation->errorMessage;
  
  $outputData->errorReport[] = $errorEntry;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (!$outputData->errorFlag)
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
echo json_encode($outputData);

// Close Connection
$conn = null;
