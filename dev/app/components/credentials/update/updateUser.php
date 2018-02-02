<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$updateReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientUserID = $request->userID;
$clientStoreID = $request->storeID;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;

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
$userSelect = $conn->prepare("SELECT `Store_ID` FROM `user` WHERE `User_ID` = ?");
$userSelect->bind_param("i", $clientUserID);

// Execute Query And Bind Results
$userSelect->execute();
$userSelect->store_result();
$userSelect->bind_result($serverUsersStoreID);

$userSelect->fetch();
$userSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$flagIsUserPartOfOrg = false;
$flagIsInputtedStorePartOfOrg = false;

for ($i = 0; $i < count($stores); $i++){
  if ($stores[$i] == $serverUsersStoreID) // Check to see if user belongs to a store, which belongs to the administrator's organisation.
  {
    $flagIsUserPartOfOrg = true;
  }
  if ($stores[$i] == $clientStoreID) // Check to see if inputted store is part of the organisation.
  {
    $flagIsInputtedStorePartOfOrg = true;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ($flagIsUserPartOfOrg && $flagIsInputtedStorePartOfOrg) {
  // SQL Query
  $stmt = $conn->prepare("UPDATE `user`
  SET `Store_ID` = ?, `First_Name` = ?, `Last_Name` = ?
  WHERE `User_ID` = ?");
  $stmt->bind_param("issi", $clientStoreID, $clientFirstName, $clientLastName, $clientUserID);

  // Execute Query
  $updateReturn = $stmt->execute();

  // Close Statement
  $stmt->close();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check Query
if ($updateReturn) {
    $outputArray["userID"] = $clientUserID; // Return the generated Item ID.
    $outputArray["updateSuccess"] = true; // If the insert was successful, return true.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
