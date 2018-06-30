<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/commercial/water/project/shared/connection.php");

// Include Validation Functions
include($_SERVER["DOCUMENT_ROOT"]."/commercial/water/project/shared/validations.php");

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

  // SQL Query
  $selectUser = $conn->prepare("SELECT `Email` FROM `user` WHERE `Email` = :email");
  $selectUser->bindParam(':email', $clientEmail->data);

  // Execute Query
  $selectUserReturn = $selectUser->execute();

  $result = $selectUser->fetchAll(\PDO::FETCH_ASSOC);

  // Close Statement
  $selectUser = null;

  if (count($result) === 0)
  {
    try
    {
      // Generate Hash
      $clientPasswordHash = password_hash($clientPassword->data, PASSWORD_BCRYPT);

      // Generate Email Verification Code
      $serverActivationCode = bin2hex(random_bytes(16));

      // SQL Query
      $registerUser = $conn->prepare("INSERT INTO `user` (`Email`, `First_Name`, `Last_Name`, `Password_Hash`, `Last_Login_Time`, `Creation_Time`, `Activation_Code`, `Verified`)
      VALUES (:email, :firstName, :lastName, :passwordHash, NULL, :creationTime, :activationCode, false)");
      $registerUser->bindParam(':email', $clientEmail->data);
      $registerUser->bindParam(':firstName', $clientFirstName->data);
      $registerUser->bindParam(':lastName', $clientLastName->data);
      $registerUser->bindParam(':passwordHash', $clientPasswordHash);
      $registerUser->bindParam(':creationTime', $serverDateTime);
      $registerUser->bindParam(':activationCode', $serverActivationCode);

      // Execute Query
      $registerReturn = $registerUser->execute();

      if ($registerReturn)
      {

        $to      = $clientEmail->data; // Send email to our user
        $subject = 'Email Verification'; // Give the email a subject
        $message = '

        Thanks for signing up!
        Your account has been created, you can login with your chosen credentials after you have activated your account by clicking the url below.

        Please click this link to activate your account:

        -------------------
        https://www.mattdavis.info/commercial/water/#!/verify/'.$clientEmail->data.'&'.$serverActivationCode.'
        -------------------

        '; // Our message above including the link

        $headers = 'From:noreply@mattdavis.info' . "\r\n"; // Set from headers
        mail($to, $subject, $message, $headers); // Send our email

      }

    }
    catch(PDOException $e)
    {
      $outputData->executionErrorFlag = true;
      $outputData->executionError = "Registration failed. Please try again. ";
    }
  }
  else
  {
    $outputData->executionErrorFlag = true;
    $outputData->executionError = "Email is already in use. ";
  }

  // Close Statement
  $registerUser = null;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputData);

// Close Connection
$conn = null;
