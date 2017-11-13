<?php
// Test commit for git over https.
// Database Connection & Post data
include ($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

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

// Decode JSON cookie data into linked array
$cookieData = json_decode($_COOKIE["Absolute_Inventory"], true);

// Create session variables and variable for MySQL
$deviceID = $_SESSION["deviceID"] = $cookieData["deviceID"];
$deviceInitialUNIX = $_SESSION["deviceInitialUNIX"] = $cookieData["deviceInitialUNIX"];
$storeID = $_SESSION["storeID"] = null;
$orgID = $_SESSION["orgID"] = null;
$userID = $_SESSION["userID"] = null;
$deviceAuth = $_SESSION["deviceAuth"] = false;
$loggedIn = $_SESSION["loggedIn"] = false;


// Query database for any existing devices with this ID
$sql = "SELECT * FROM device WHERE Device_ID = '$deviceID'";

// Execute Query
$result = $conn->query($sql);

// If there are no exisiting devices, insert a new device
if ($result->num_rows == 0) {
    echo " - deviceID not found. Error: " . $sql . $conn->error;

    // New device SQL query
    $sql = "INSERT INTO device (Device_ID, Device_Login_UNIX, Initial_UNIX)
  VALUES ('$deviceID', $serverUNIX, $deviceInitialUNIX)";

    // Execute Query & Output
    databaseInsert($sql, $conn);
} elseif ($result->num_rows > 1) {
    echo " - Already more than one entry for this deviceID.";
}

// Query database for devices with this ID
$sql = "SELECT * FROM device WHERE Device_ID = '$deviceID'";

// Execute Query
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    while ($row = $result->fetch_assoc()) {
        if ($row["Initial_UNIX"] == $deviceInitialUNIX) {
            $deviceAuth = $_SESSION["deviceAuth"] = true;
            echo " - deviceAuth = " .$_SESSION["deviceAuth"];
        }
    }
} else {
    echo " - Already more than one entry or no entries for this deviceID after query.";
}

// Close Connection
$conn->close();
