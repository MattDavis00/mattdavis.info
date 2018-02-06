<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Check that the cookie is set and then update expiration.
$expirationUNIX = $serverUNIX + (86400 * 60); // Cookie expires in 60 days if user does not connect.
if (isset($_COOKIE["Absolute_Inventory"])) {
    $existingData = $_COOKIE["Absolute_Inventory"];
    setcookie("Absolute_Inventory", $existingData, $expirationUNIX, "/"); // Updates the existing cookie with a new expiration time
    echo " - Cookie is set!";
    echo " Value is: '$existingData'";
} else {
    echo " - Cookie is empty!";
    // New cookie data
    $newCookieData = array(
    "deviceID" => bin2hex(random_bytes(32)), // Output is a 64 character string as the bytes are converted into hexidecimal, characters vary from 0-9 a-f.
    "deviceInitialUNIX" => $serverUNIX
  );
    $newCookieJSON = json_encode($newCookieData); // JSON encode cookie data.
    setcookie("Absolute_Inventory", $newCookieJSON, $expirationUNIX, "/"); // Creates new cookie
    $_COOKIE["Absolute_Inventory"] = $newCookieJSON; // Improved execution times by setting the value locally.
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Decode JSON cookie data into linked array
$cookieData = json_decode($_COOKIE["Absolute_Inventory"], true);

// Create session variables to store user and device data.
$_SESSION["deviceID"] = $cookieData["deviceID"];
$_SESSION["deviceInitialUNIX"] = $cookieData["deviceInitialUNIX"];
$_SESSION["userID"] = null;
$_SESSION["storeID"] = null;
$_SESSION["orgID"] = null;
$_SESSION["administrator"] = false;
$_SESSION["deviceAuth"] = false;
$_SESSION["loggedIn"] = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Query database for any existing devices with this ID
$deviceSelect = $conn->prepare("SELECT `Device_ID`, `Device_Login_UNIX`, `Initial_UNIX` FROM `device` WHERE `Device_ID` = ? LIMIT 1");
$deviceSelect->bind_param("i", $_SESSION["deviceID"]);

// Execute Query And Bind Results
$deviceSelect->execute();
$deviceSelect->store_result();
$deviceSelect->bind_result($serverDevice_ID, $serverDevice_Login_Unix, $serverInitial_UNIX);

// If there are no exisiting devices, insert a new device
if ($deviceSelect->num_rows == 0) {

    // SQL Query
    $deviceInsert = $conn->prepare("INSERT INTO `device` (`Device_ID`, `Device_Login_UNIX`, `Initial_UNIX`)
    VALUES (?, ?, ?)");
    $deviceInsert->bind_param("sii", $_SESSION["deviceID"], $serverUNIX, $_SESSION["deviceInitialUNIX"]);

    // Execute Query
    $deviceInsert->execute();

    // Close Statement
    $deviceInsert->close();
}

$deviceSelect->execute();
$deviceSelect->store_result();
$deviceSelect->fetch();

// Check User Isn't Brute Forcing DeviceID's
if ($serverInitial_UNIX == $_SESSION["deviceInitialUNIX"]) {
    $_SESSION["deviceAuth"] = true;
    echo " - deviceAuth = " .$_SESSION["deviceAuth"];
}

// Close Statement
$deviceSelect->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Close Connection
$conn->close();
