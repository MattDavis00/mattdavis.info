<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$data = array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for items that are part of the administrator's organisation.
$itemSelect = $conn->prepare("SELECT `Item_ID`,`Name`,`Price`,`Description`,`Barcode` FROM `item` WHERE `Org_ID` = ?");
$itemSelect->bind_param("i", $_SESSION["orgID"]);

// Execute Query And Bind Results
$itemSelect->execute();
$itemSelect->store_result();
$itemSelect->bind_result($serverItemID,$serverName,$serverPrice,$serverDescription,$serverBarcode);

while ($itemSelect->fetch()) {
  $tempData["itemID"] = $serverItemID;
  $tempData["name"] = $serverName;
  $tempData["price"] = $serverPrice;
  $tempData["description"] = $serverDescription;
  $tempData["barcode"] = $serverBarcode;

  $data[] = $tempData;
}

// Close Statement
$itemSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $data; // Return the data.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
