<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$updateReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientItemID = $request->itemID;
$clientName = $request->name;
$clientPrice = $request->price;
$clientBarcode = $request->barcode;
$clientDescription = $request->description;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SQL Query
$stmt = $conn->prepare("UPDATE item
SET `Name` = ?, `Price` = ?, `Description` = ?, `Barcode` = ?
WHERE `Item_ID` = ? AND `Org_ID` = ?");
$stmt->bind_param("sdssii", $clientName, $clientPrice, $clientDescription, $clientBarcode, $clientItemID, $_SESSION["orgID"]);

// Execute Query
$updateReturn = $stmt->execute();

// Close Statement
$stmt->close();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check Query
if ($updateReturn) {
    $outputArray["itemID"] = $clientItemID; // Return the generated Item ID.
    $outputArray["updateSuccess"] = true; // If the insert was successful, return true.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
