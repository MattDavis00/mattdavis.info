<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientStoreID = $request->id;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any existing devices with this ID
$administratorSelect = $conn->prepare("SELECT `Org_ID` FROM `store` WHERE `Store_ID` = ? LIMIT 1");
$administratorSelect->bind_param("i", $clientStoreID);

// Execute Query And Bind Results
$administratorSelect->execute();
$administratorSelect->store_result();
$administratorSelect->bind_result($serverOrg_ID);
$administratorSelect->fetch();

// Close Statement
$administratorSelect->close();

if ($serverOrg_ID == $_SESSION["orgID"]) { // If the Store_ID is found and the administrator is part of this organisation.

  $result = '';

  for($i = 0; $i < 12; $i++) {
      $result .= mt_rand(0, 9); // Generate Random 12 Digit Number
  }

  $serverKey = (int)$result;
  $serverExpiryUNIX = $serverUNIX + (86400 * 7); // Key expires after a week.

  // SQL Query
  $stmt = $conn->prepare("INSERT INTO token (Key_ID, Store_ID, Key_Initial_UNIX, Expiry_UNIX)
  VALUES (?, ?, ?, ?)");
  $stmt->bind_param("iiii", $serverKey, $clientStoreID, $serverUNIX, $serverExpiryUNIX);

  // Execute Query
  $registerReturn = $stmt->execute();

  // Close Statement
  $stmt->close();

  // Check Query
  if ($registerReturn) {
      $outputArray["key"] = $serverKey; // Return the generated and inserted key.
      $outputArray["insertSuccess"] = true; // If the insert was successful, return true.
  } else {
      $outputArray["insertSuccess"] = false; // If the insert failed, return false.
  }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
