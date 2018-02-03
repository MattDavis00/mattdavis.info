<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$updateReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientStoreID = $request->storeID;
$clientName = $request->name;
$clientAddress = $request->address;
$clientPhoneNumber = $request->phoneNumber;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SQL Query
$stmt = $conn->prepare("UPDATE `store`
SET `Address` = ?, `Name` = ?, `Phone` = ?
WHERE `Store_ID` = ? AND `Org_ID` = ?");
$stmt->bind_param("sssii", $clientAddress, $clientName, $clientPhoneNumber, $clientStoreID, $_SESSION["orgID"]);

// Execute Query
$updateReturn = $stmt->execute();

// Close Statement
$stmt->close();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check Query
if ($updateReturn) {
    $outputArray["storeID"] = $clientStoreID; // Return the generated Store ID.
    $outputArray["updateSuccess"] = true; // If the insert was successful, return true.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
