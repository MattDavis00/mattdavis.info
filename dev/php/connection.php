<?php

// Credentials
$servername = "localhost";
$username = "root";
$password = "94RwMDEY*!H$!D6pRGnq";
$dbname = "absolute_inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die(" - Connection failed: " . $conn->connect_error);
}

// Post Data
$postData = file_get_contents("php://input");
$request = json_decode($postData);

// UNIX Time
$serverUNIX = time();

// Check The User's Cookie
if(!isset($_COOKIE[$cookieName])) {
    echo "Cookie named '" . $cookie_name . "' is not set!";
    $cookieDeviceID = "gu67g76g7h76g76f76f7t7";
    $cookieDeviceIntialUNIX = $serverUNIX;
    $cookieExpirationUNIX = $serverUNIX + (86400 * 365);
    // Not Correct Format, To Fix
    setcookie("Absolute Inventory", $cookieDeviceID, $cookieDeviceIntialUNIX, $cookieExpirationUNIX, "/");
} else {
    echo "Cookie '" . $cookie_name . "' is set!<br>";
    echo "Value is: " . $_COOKIE[$cookie_name];

}

?>
