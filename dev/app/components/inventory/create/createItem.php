<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientName = $request->name;
$clientPrice = $request->price;
$clientBarcode = $request->barcode;
$clientDescription = $request->description;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SQL Query
$stmt = $conn->prepare("INSERT INTO item (Org_ID, Name, Price, Description, Barcode)
VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isdss", $_SESSION["orgID"], $clientName, $clientPrice, $clientDescription, $clientBarcode);

// Execute Query
$insertReturn = $stmt->execute();

// Store User ID
$serverItemID = $stmt->insert_id;

// Close Statement
$stmt->close();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check Query
if ($insertReturn) {
    $outputArray["itemID"] = $serverItemID; // Return the generated Item ID.
    $outputArray["insertSuccess"] = true; // If the insert was successful, return true.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
