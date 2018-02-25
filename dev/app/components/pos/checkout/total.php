<?php

// Database Connection & Post data
include ($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include ($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/authenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientItems = json_decode(json_encode($request->items), true);
$clientTotal = $request->total;
$serverTotal = 0;
$itemData = array();
$clientItemAdmissionIDs = array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any items that belong to the organisation.
$itemSelect = $conn->prepare("SELECT `item_admission`.`Item_Admission_ID`,`item`.`Item_ID`,`item_admission`.`Item_Location`,`item_admission`.`Quantity`,`item`.`Name`,`item`.`Price`,`item`.`Description`,`item`.`Barcode`
FROM `item`
INNER JOIN `item_admission` ON `item_admission`.`Item_ID` = `item`.`Item_ID` AND `item_admission`.`Store_ID` = ?
WHERE `item`.`Org_ID` = ? AND `item_admission`.`Item_Admission_ID` = ?
");

$counter = 0;
foreach ($clientItems as $item) {

  $clientItemAdmissionIDs[] = $item["itemAdmissionID"];

  $itemSelect->bind_param("iis", $_SESSION["storeID"], $_SESSION["orgID"], $item["itemAdmissionID"]);

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
    $serverTotal += $serverItemPrice;
    $itemData[$counter] = $tempData;
    $counter++;
  }
}

// Close Statement
$itemSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ($clientTotal == $serverTotal){
  // Generate random unique identifier.
  $randomTransactionID = bin2hex(random_bytes(32));

  // SQL Query
  $transactionInsert = $conn->prepare("INSERT INTO `transaction` (`Transaction_ID`, `Store_ID`, `User_ID`, `Total`, `Timestamp_UNIX`)
  VALUES (?, ?, ?, ?, ?)");

  $transactionInsert->bind_param("siidi", $randomTransactionID, $_SESSION["storeID"], $_SESSION["userID"], $serverTotal, $serverUNIX);

  // Execute Query
  $insertReturn = $transactionInsert->execute();

  // Close Statement
  $transactionInsert->close();

  // SQL Query
  $transactionItemInsert = $conn->prepare("INSERT INTO `transaction_item` (`Transaction_Item_ID`, `Transaction_ID`, `Item_ID`, `Price`, `Price_Paid`, `Return_Item`)
  VALUES (?, ?, ?, ?, ?, false)");
  for($x = 0; $x < count($itemData); $x++){
    $randomTransactionItemID = bin2hex(random_bytes(32));
    $transactionItemInsert->bind_param("ssidd", $randomTransactionItemID, $randomTransactionID, $itemData[$x]["itemID"], $itemData[$x]["price"], $itemData[$x]["price"]);
    $transactionItemInsert->execute();
  }

  // Close Statement
  $transactionItemInsert->close();


  // SQL Query
  $itemAdmissionUpdate = $conn->prepare("UPDATE `item_admission`
  SET `Quantity` = `Quantity` - 1
  WHERE `Item_Admission_ID` = ? AND `Store_ID` = ?");
  for($x = 0; $x < count($itemData); $x++){
    $itemAdmissionUpdate->bind_param("si", $itemData[$x]["itemAdmissionID"], $_SESSION["storeID"]);
    $itemAdmissionUpdate->execute();
  }

  // Close Statement
  $itemAdmissionUpdate->close();

  $outputArray["insertSuccess"] = true;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $itemData; // Return the data.
$outputArray["total"] = $serverTotal;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
