<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

// Success flag.
$insertReturn = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientStoreID = $request->storeID;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any existing store and check its organisation ID.
$storeSelect = $conn->prepare("SELECT `Org_ID` FROM `store` WHERE `Store_ID` = ? LIMIT 1");
$storeSelect->bind_param("i", $clientStoreID);

// Execute Query And Bind Results
$storeSelect->execute();
$storeSelect->store_result();
$storeSelect->bind_result($serverOrg_ID);
$storeSelect->fetch();

// Close Statement
$storeSelect->close();

if ($serverOrg_ID == $_SESSION["orgID"]) { // If the Store_ID is found and the administrator is part of this organisation.

    // Generate Random Password
    $result = '';

    for($i = 0; $i < 6; $i++) {
        $result .= mt_rand(0, 9); // Generate Random 6 Digit Number
    }

    $clientPassword = (int)$result;

    // Generate Salt & Hash
    $clientSalt = bin2hex(random_bytes(8));
    $clientPasswordHash = password_hash($result . $clientSalt, PASSWORD_BCRYPT);

    // SQL Query
    $stmt = $conn->prepare("INSERT INTO user (Store_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login_UNIX, Creation_UNIX)
    VALUES (?, ?, ?, ?, ?, NULL, ?)");
    $stmt->bind_param("issssi", $clientStoreID, $clientPasswordHash, $clientSalt, $clientFirstName, $clientLastName, $serverUNIX);

    // Execute Query
    $insertReturn = $stmt->execute();

    // Store User ID
    $serverUserID = $stmt->insert_id;

    // Close Statement
    $stmt->close();

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check Query
if ($insertReturn) {
    $outputArray["userID"] = $serverUserID; // Return the generated User ID.
    $outputArray["password"] = $clientPassword; // Return the randomly generated 6 digit passcode.
    $outputArray["insertSuccess"] = true; // If the insert was successful, return true.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
