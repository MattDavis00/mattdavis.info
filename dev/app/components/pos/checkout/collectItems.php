<?php

// Database Connection & Post data
include ($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include ($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/authenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$itemData = array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any items that belong to the organisation.
$itemSelect = $conn->prepare("SELECT `item_admission`.`Item_Admission_ID`,`item`.`Item_ID`,`item_admission`.`Item_Location`,`item_admission`.`Quantity`,`item`.`Name`,`item`.`Price`,`item`.`Description`,`item`.`Barcode`
FROM `item`
INNER JOIN `item_admission` ON `item_admission`.`Item_ID` = `item`.`Item_ID` AND `item_admission`.`Store_ID` = ?
WHERE `item`.`Org_ID` = ?
");
$itemSelect->bind_param("ii", $_SESSION["storeID"], $_SESSION["orgID"]);

// Execute Query And Bind Results
$itemSelect->execute();
$itemSelect->store_result();
$itemSelect->bind_result($serverItemAdmissionID,$serverItemID,$serverItemLocation,$serverItemQuantity,$serverItemName,$serverItemPrice,$serverItemDescription,$serverItemBarcode);

while ($itemSelect->fetch()) {
  $tempData["itemAdmissionID"] = $serverItemAdmissionID;
  $tempData["itemID"] = $serverItemID;
  $tempData["location"] = $serverItemLocation;
  $tempData["quantity"] = $serverItemQuantity;
  $tempData["name"] = $serverItemName;
  $tempData["price"] = $serverItemPrice;
  $tempData["description"] = $serverItemDescription;
  $tempData["barcode"] = $serverItemBarcode;
  $itemData[] = $tempData;
}

// Close Statement
$itemSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $itemData; // Return the data.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
