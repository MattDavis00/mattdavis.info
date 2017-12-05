<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

$verified = authenicateLogin($clientID, $clientPass, $conn); // Calls the authenticateLogin function

if ($verified == true) {
    $outputArray["userID"] = $_SESSION["userID"];
    $outputArray["storeID"] = $_SESSION["storeID"];
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
    if (gettype($clientID) == "integer") { // The user is not an administrator
        $sql = "SELECT * FROM user WHERE ID = '" .$clientID. "'";
    } elseif (gettype($clientID) == "string") { // The user is an administrator
        // SQL Query
        $sql = "SELECT * FROM administrator WHERE Email = '" .$clientID. "'";

        // Execute Query
        $result = $conn->query($sql);

        // Output
        if ($result->num_rows == 1) {
            while ($row = $result->fetch_assoc()) {
                $hashInput = $clientPass . $row["Salt"];
                if (password_verify($hashInput, $row["Hashed_Pass"]) && ($_SESSION["deviceAuth"] == true)) { // If the password matches and the device has been authenticated.
                    $_SESSION["userID"] = $row["Email"]; // Set userID session variable to the administrators email.
                    $_SESSION["storeID"] = null;
                    $_SESSION["orgID"] = $row["Org_ID"]; // Administrators do not need to be on an organisations device, therefore don't check if there is an entry in the authenication table, just set the session value.
                    $_SESSION["administrator"] = true; // Set administrator session variable to true.
                    $_SESSION["loggedIn"] = true; // Sets the loggedIn session variable to true.
                    return true;
                }
                return false;
            }
        } else {
            echo " - Error: " . $sql . $conn->error;
            return false;
        }
    } else {
        echo " - Data Type for ID is Invalid";
        return false;
    }
}

// Close Connection
$conn->close();
