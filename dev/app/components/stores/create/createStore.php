<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientName = $request->name;
$clientAddress = $request->address;
$clientPhoneNumber = $request->phoneNumber;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SQL Query
$stmt = $conn->prepare("INSERT INTO store (Org_ID, Address, Name, Phone)
VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $_SESSION["orgID"], $clientAddress, $clientName, $clientPhoneNumber);

// Execute Query
$registerReturn = $stmt->execute();
$serverStoreID = $stmt->insert_id;

// Close Statement
$stmt->close();

// Check Query
if ($registerReturn) {
    $outputArray["insertSuccess"] = true; // If the insert was successful, return true.
    $outputArray["storeID"] = $serverStoreID;
} else {
    $outputArray["insertSuccess"] = false; // If the insert failed, return false.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
