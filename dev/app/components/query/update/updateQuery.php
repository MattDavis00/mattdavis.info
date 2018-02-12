<?php

// Database Connection & Post data
include ($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include ($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/authenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$itemData = array();

// Input Variables
$clientItemAdmissionID = $request->itemAdmissionID;
$clientItemID = $request->itemID;
$clientLocation = $request->location;
$clientQuantity = $request->quantity;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any items that belong to the store that match the inputted Item_ID.
$itemSelect = $conn->prepare("SELECT `item_admission`.`Item_Admission_ID`,`item`.`Item_ID`,`item_admission`.`Item_Location`,`item_admission`.`Quantity`,`item`.`Name`,`item`.`Price`,`item`.`Description`,`item`.`Barcode`
FROM `item`
LEFT OUTER JOIN `item_admission` ON `item_admission`.`Item_ID` = `item`.`Item_ID` AND `item_admission`.`Store_ID` = ?
WHERE `item`.`Org_ID` = ? AND `item`.`Item_ID` = ?
LIMIT 1
");
$itemSelect->bind_param("iii", $_SESSION["storeID"], $_SESSION["orgID"], $clientItemID);

// Execute Query And Bind Results
$itemSelect->execute();
$itemSelect->store_result();
$itemSelect->bind_result($serverItemAdmissionID,$serverItemID,$serverItemLocation,$serverItemQuantity,$serverItemName,$serverItemPrice,$serverItemDescription,$serverItemBarcode);

// Fetch the results.
$itemSelect->fetch();

// Close Statement
$itemSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ($serverItemAdmissionID == null) // If the item is new to the store, and does not have an item admission.
{
  // Generate random unique identifier.
  $randomID = bin2hex(random_bytes(32));

  // SQL Query
  $itemAdmissionInsert = $conn->prepare("INSERT INTO `item_admission` (`Item_Admission_ID`, `Item_ID`, `Store_ID`, `Item_Location`, `Quantity`)
  VALUES (?, ?, ?, ?, ?)");
  $itemAdmissionInsert->bind_param("siisi", $randomID, $serverItemID, $_SESSION["storeID"], $clientLocation, $clientQuantity);

  // Execute Query
  $insertReturn = $itemAdmissionInsert->execute();

  // Close Statement
  $itemAdmissionInsert->close();
}
else // If the item already exists in the store, and the location or quantity is being updated.
{
  // SQL Query
  $itemAdmissionUpdate = $conn->prepare("UPDATE `item_admission`
  SET `Item_Location` = ?, `Quantity` = ?
  WHERE `Item_Admission_ID` = ? AND `Store_ID` = ?");
  $itemAdmissionUpdate->bind_param("sisi", $clientLocation, $clientQuantity, $serverItemAdmissionID, $_SESSION["storeID"]);

  // Execute Query
  $updateReturn = $itemAdmissionUpdate->execute();

  // Close Statement
  $itemAdmissionUpdate->close();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ($insertReturn || $updateReturn)
{
  $outputArray["updateSuccess"] = true; // This process was a success, return true to the user.
}
else {
  $outputArray["updateSuccess"] = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
