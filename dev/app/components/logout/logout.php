<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Output Array
$outputArray = array();

$outputArray["userID"] = $_SESSION["userID"] = null;
$outputArray["orgID"] = $_SESSION["orgID"] = null;
$outputArray["administrator"] = $_SESSION["administrator"] = false;
$outputArray["loggedIn"] = $_SESSION["loggedIn"] = false;
$outputArray["verification"] = $_SESSION["verification"] = false;

echo json_encode($outputArray);

// Close Connection
$conn->close();
