<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientKey = $request->key;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query the database for tokens with this key and selects the Store_ID and Expiry_UNIX
$tokenSelect = $conn->prepare("SELECT `Store_ID`, `Expiry_UNIX` FROM `token` WHERE `Key_ID` = ? LIMIT 1");
$tokenSelect->bind_param("i", $clientKey);

// Execute Query, Bind and Fetch Results
$tokenSelect->execute();
$tokenSelect->store_result();
$tokenSelect->bind_result($serverStoreID, $serverExpiryUNIX);
$tokenSelect->fetch();

// Close Statement
$tokenSelect->close();

if ($serverExpiryUNIX > $serverUNIX) { // If the Expiry_UNIX is in the future. The key has not expired.

  // SQL Query
  $stmt = $conn->prepare("INSERT INTO `authentication` (`Device_ID`, `Store_ID`, `Valid`, `Auth_UNIX`)
  VALUES (?, ?, TRUE, ?)");
  $stmt->bind_param("sii", $_SESSION["deviceID"], $serverStoreID, $serverUNIX);

  // Execute Query
  $insertReturn = $stmt->execute();

  // Close Statement
  $stmt->close();

  // Check Query
  if ($insertReturn) {
      $outputArray["insertSuccess"] = true; // If the insert was successful, return true.
      $outputArray["storeID"] = $serverStoreID;
  } else {
      $outputArray["insertSuccess"] = false; // If the insert failed, return false.
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
