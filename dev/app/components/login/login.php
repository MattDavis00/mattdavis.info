<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

// Output Array
$outputArray = array();

$verified = authenicateLogin($clientID, $clientPass, $conn); // Calls the authenticateLogin function

if ($verified == true) {
  $outputArray["userID"] = $_SESSION["userID"];
  $outputArray["orgID"] = $_SESSION["orgID"];
  $outputArray["administrator"] = $_SESSION["administrator"];
  $outputArray["loggedIn"] = $_SESSION["loggedIn"];
  $outputArray["verification"] = true;
} else {
    $_SESSION["loggedIn"] = false;
}

echo json_encode($outputArray);

function authenicateLogin($clientID, $clientPass, $conn)
{
    // SQL Query
    $sql = "SELECT * FROM administrator WHERE Email = '$clientID'";

    // Execute Query
    $result = $conn->query($sql);

    // Output
    if ($result->num_rows >= 1) {
        while ($row = $result->fetch_assoc()) {
            $hashInput = $clientPass . $row["Salt"];
            echo " - deviceAuth value: ".$_SESSION["deviceAuth"];
            if (password_verify($hashInput, $row["Hashed_Pass"]) && ($_SESSION["deviceAuth"] == true)) {
                echo " - Email: " . $row["Email"] . " - Password: " . $row["Hashed_Pass"];
                return true;
            }
            return false;
        }
    } else {
        echo " - Error: " . $sql . $conn->error;
        return false;
    }
}
// Close Connection
$conn->close();
