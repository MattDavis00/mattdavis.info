<?php

// Database Connection & Post data
include 'connection.php';

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

$verified = authenicateLogin($clientID, $clientPass, $conn);

if ($verified == true) {
    $_SESSION["loggedIn"] = true;
    echo " - Logged in (User Verified)";
} else {
    $_SESSION["loggedIn"] = false;
    echo " - Login Unsuccessful";
}

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
