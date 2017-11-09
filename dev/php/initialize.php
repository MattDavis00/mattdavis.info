<?php

// Database Connection & Post data
include 'connection.php';

// Variables to be passed into the checkCookie function
$expirationUNIX = $serverUNIX + (86400 * 60); // Cookie expires in 60 days if user does not connect.
$randomID = mcrypt_create_iv(64, MCRYPT_DEV_URANDOM);

checkCookie("deviceID",$randomID,$expirationUNIX);
checkCookie("deviceInitialUNIX",$serverUNIX,$expirationUNIX);

// Check cookie function
function checkCookie($cookieName,$defaultValue,$expiration){
  $value = $_COOKIE[$cookieName]; // $_COOKIE is only referenced once
  if(isset($value)) {
    setcookie($cookieName, $value, $expiration, "/");
    echo " - Cookie '$cookieName' is set!";
    echo " Value is: '$value'";
  } else {
    echo " - '$cookieName' cookie is not set!";
    // Set the same data in the cookie
    setcookie($cookieName, $defaultValue, $expiration, "/");
  }
}

// Create session variables and variable for MySQL
$deviceID = $_SESSION["deviceID"] = $_COOKIE["deviceID"];
$deviceInitialUNIX = $_SESSION["deviceInitialUNIX"] = $_COOKIE["deviceInitialUNIX"];
$storeID = $_SESSION["storeID"] = NULL;
$orgID = $_SESSION["orgID"] = NULL;
$userID = $_SESSION["userID"] = NULL;
$deviceAuth = $_SESSION["deviceAuth"] = FALSE;
$loggedIn = $_SESSION["loggedIn"] = FALSE;


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
  databaseInsert($sql,$conn);
} else if ($result->num_rows > 1) {
  echo " - Already more than one entry for this deviceID.";
}

// Query database for devices with this ID
$sql = "SELECT * FROM device WHERE Device_ID = '$deviceID'";

// Execute Query
$result = $conn->query($sql);

if ($result->num_rows == 1) {
  while($row = $result->fetch_assoc()) {
    if ($row["Initial_UNIX"] == $deviceInitialUNIX){
      $deviceAuth = $_SESSION["deviceAuth"] = TRUE;
      echo " - deviceAuth = " .$_SESSION["deviceAuth"];
    }
  }
} else {
  echo " - Already more than one entry or no entries for this deviceID after query.";
}

// Close Connection
$conn->close();

?>
