<?php

// Database Connection & Post data
include ($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include ($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/authenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$itemIDS = array();
$orgItemData = array();
$itemAdmissionData = array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any items that belong to the organisation.
$itemAdmissionSelect = $conn->prepare("SELECT `Item_Admission_ID`,`Item_ID`,`Item_Location`,`Quantity` FROM `item_admission` WHERE `Store_ID` = ?");
$itemAdmissionSelect->bind_param("i", $_SESSION["storeID"]);

// Execute Query And Bind Results
$itemAdmissionSelect->execute();
$itemAdmissionSelect->store_result();
$itemAdmissionSelect->bind_result($serverItemAdmissionID,$serverItemID,$serverItemLocation,$serverQuantity);

while ($itemAdmissionSelect->fetch()) {
  $tempData["itemAdmissionID"] = $serverItemAdmissionID;
  $tempData["itemID"] = $serverItemID;
  $tempData["location"] = $serverItemLocation;
  $tempData["quantity"] = $serverItemQuantity;
  echo $serverItemID;
  $itemIDS[] = $serverItemID;
  $itemAdmissionData[$serverItemID] = $tempData;
}

// Close Statement
$itemAdmissionSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// $userSelect = $conn->prepare("SELECT `User_ID`,`Store_ID`,`First_Name`,`Last_Name`,`Last_Login_UNIX` FROM `user`
// WHERE `Store_ID` IN (".implode(", ", $stores).")");

// Query database for any items that belong to the organisation.
$storeSelect = $conn->prepare("SELECT `Item_ID`,`Name`,`Price`,`Description`,`Barcode` FROM `item` WHERE `Item_ID` IN (".implode(", ", $itemIDS).")");
// $storeSelect->bind_param("is", $_SESSION["orgID"], $test);

// Execute Query And Bind Results
$storeSelect->execute();
$storeSelect->store_result();
$storeSelect->bind_result($serverItemID,$serverName,$serverPrice,$serverDescription,$serverBarcode);

while ($storeSelect->fetch()) {
  $tempData["itemID"] = $serverItemID;
  $tempData["name"] = $serverName;
  $tempData["price"] = $serverPrice;
  $tempData["description"] = $serverDescription;
  $tempData["barcode"] = $serverBarcode;

  $itemAdmissionData[$serverItemID] .= $tempData;
}

// Close Statement
$storeSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// for ($i=0; $i < sizeof($itemAdmissionData); $i++)
// {
//   $itemAdmission = $itemAdmissionData[$i];
//   for ($x=0; $x < sizeof($orgItemData); $x++)
//   {
//     $orgItem = $orgItemData[$x];
//     if ($itemAdmission["itemID"] == $orgItem["itemID"])
//     {
//
//     }
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $itemAdmissionData; // Return the data.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
