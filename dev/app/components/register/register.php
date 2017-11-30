<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Input Variables
$clientEmail = $request->email;
$clientPassword = $request->password;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;

// Generate Salt & Hash
$clientSalt = bin2hex(random_bytes(8));
$clientPasswordHash = password_hash($clientPassword . $clientSalt, PASSWORD_BCRYPT);

// SQL Query
$sql = "INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login_UNIX, Creation_UNIX)
VALUES ('$clientEmail', NULL, '$clientPasswordHash', '$clientSalt', '$clientFirstName', '$clientLastName', NULL, $serverUNIX)";

// Execute Query
$registerReturn = databaseInsert($sql, $conn);

// Check Query
if ($registerReturn["success"]) {
    $outputArray["registerSuccess"] = true; // If the insert was successful, return true.
} else {
    $outputArray["registerSuccess"] = false; // If the insert failed, return false.
}

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
