<?php

// Database Connection & Post data
include 'connection.php';

// Input Variables
$clientEmail = $request->email;
$clientPassword = $request->password;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;

// Generate Salt & Hash
$clientSalt = mcrypt_create_iv(16, MCRYPT_DEV_URANDOM);
$clientPasswordHash = password_hash($clientPassword . $clientSalt, PASSWORD_BCRYPT);

// SQL Query
$sql = "INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login_UNIX, Creation_UNIX)
VALUES ('$clientEmail', NULL, '$clientPasswordHash', '$clientSalt', '$clientFirstName', '$clientLastName', NULL, $serverUNIX)";

// Execute Query & Output
databaseInsert($sql,$conn);

// Close Connection
$conn->close();

?>
