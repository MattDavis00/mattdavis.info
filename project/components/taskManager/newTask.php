<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/connection.php");

// Include Validation Functions
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/validations.php");

// Ensure That The User Is Logged In
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/authenticate.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientTitle = $request->title;
$clientDescription = $request->description;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///// Validations /////

// Title
$titleValidation = $validate->LengthAndEmpty($clientTitle->data, 50); // Run validation
if ($titleValidation->errorFlag) // If there was en error with the email.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientTitle->field;
  $errorEntry->errorMessage = $emailValidation->errorMessage;

  $outputData->errorReport[] = $errorEntry;
}
// Description
$descriptionValidation = $validate->Length($clientDescription->data, 1000); // Run validation
if ($descriptionValidation->errorFlag) // If there was en error with the email.
{
  $outputData->errorFlag = true;

  $errorEntry = new StdClass();
  $errorEntry->field = $clientDescription->field;
  $errorEntry->errorMessage = $descriptionValidation->errorMessage;

  $outputData->errorReport[] = $errorEntry;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (!$outputData->errorFlag)
{

  try
  {

    // SQL Query
    $createTask = $conn->prepare("INSERT INTO `task` (`User_ID`, `Title`, `Description`, `Creation_Time`)
    VALUES (:userID, :title, :description, :creationTime)");
    $createTask->bindParam(':userID', $_SESSION["userID"]);
    $createTask->bindParam(':title', $clientTitle->data);
    $createTask->bindParam(':description', $clientDescription->data);
    $createTask->bindParam(':creationTime', $serverDateTime);

    // Execute Query
    $createTaskReturn = $createTask->execute();
  }
  catch(PDOException $e)
  {
    $outputData->executionErrorFlag = true;
    $outputData->executionError = "Could not create new task. Please try again. ";
  }

  // Close Statement
  $createTask = null;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputData);

// Close Connection
$conn = null;
