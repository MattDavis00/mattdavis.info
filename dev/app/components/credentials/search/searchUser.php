<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$stores = array();
$data = array();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for stores that are part of the administrators organisation.
$storeSelect = $conn->prepare("SELECT `Store_ID` FROM `store` WHERE `Org_ID` = ?");
$storeSelect->bind_param("i", $_SESSION["orgID"]);

// Execute Query And Bind Results
$storeSelect->execute();
$storeSelect->store_result();
$storeSelect->bind_result($serverStoreID);

while ($storeSelect->fetch()) {
  $stores[] = $serverStoreID;
}

$stores = array_unique($stores);

$storeSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for users that belong to the stores of the administrator's organisation.
$userSelect = $conn->prepare("SELECT `User_ID`,`Store_ID`,`First_Name`,`Last_Name`,`Last_Login_UNIX` FROM `user`
WHERE `Store_ID` IN (".implode(", ", $stores).")");

// Execute Query And Bind Results
$userSelect->execute();
$userSelect->store_result();
$userSelect->bind_result($serverUserID,$serverStoreID,$serverFirstName,$serverLastName,$serverLastLoginUNIX);

while ($userSelect->fetch()) {
  $tempData["userID"] = $serverUserID;
  $tempData["storeID"] = $serverStoreID;
  $tempData["firstName"] = $serverFirstName;
  $tempData["lastName"] = $serverLastName;
  $tempData["lastLoginUNIX"] = $serverLastLoginUNIX;

  $data[] = $tempData;
}

// Close Statement
$userSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $data; // Return the data.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
