<?php

// Create session
session_start();

// Credentials
$servername = "localhost";
$username = "main_db_access";
$password = "mEk47MvJmQXjX2PVe@t3";
$dbname = "main_db";

// Database Connection
try
{
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
  die();
}

// Post data
$postData = file_get_contents("php://input");
$request = json_decode($postData);

// Output Array
$outputData = new StdClass();
$outputData->errorFlag = false;
$outputData->errorReport = array();
$outputData->executionErrorFlag = false;
$outputData->executionError = "";


// UNIX time
$serverDateTime = date("Y-m-d H:i:s");
