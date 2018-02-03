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

// Query database for any existing devices with this ID
$storeSelect = $conn->prepare("SELECT `Store_ID`,`Name`,`Address`,`Phone` FROM `store` WHERE `Org_ID` = ?");
$storeSelect->bind_param("i", $_SESSION["orgID"]);

// Execute Query And Bind Results
$storeSelect->execute();
$storeSelect->store_result();
$storeSelect->bind_result($serverStoreID,$serverName,$serverAddress,$serverPhoneNumber);

while ($storeSelect->fetch()) {
  $tempData["storeID"] = $serverStoreID;
  $tempData["name"] = $serverName;
  $tempData["address"] = $serverAddress;
  $tempData["phoneNumber"] = $serverPhoneNumber;

  $data[] = $tempData;
}

// Close Statement
$storeSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$outputArray["selectData"] = $data; // Return the data.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
