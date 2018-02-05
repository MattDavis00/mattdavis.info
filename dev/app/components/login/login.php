<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

if (authenicateLogin($clientID, $clientPass, $conn, $outputArray)) { // Calls the authenticateLogin function
    $outputArray["userID"] = $_SESSION["userID"];
    $outputArray["storeID"] = $_SESSION["storeID"];
    $outputArray["orgID"] = $_SESSION["orgID"];
    $outputArray["administrator"] = $_SESSION["administrator"];
    $outputArray["loggedIn"] = $_SESSION["loggedIn"];
    $outputArray["verification"] = true;
} else {
    $_SESSION["loggedIn"] = false;
}

$outputArray["test"] = "test";
$outputArray["clientIDType"] = is_numeric($clientID);

function authenicateLogin($clientID, $clientPass, $conn)
{
    if (is_numeric($clientID)) { // The user is not an administrator

        // Query database for users.
        $userSelect = $conn->prepare("SELECT `Store_ID`, `Hashed_Pass`, `Salt` FROM `user` WHERE `User_ID` = ? LIMIT 1");
        $userSelect->bind_param("i", $clientID);

        // Execute Query And Bind Results
        $userSelect->execute();
        $userSelect->store_result();
        $userSelect->bind_result($serverStoreID, $serverHashedPass, $serverSalt);
        $userSelect->fetch();

        // Close Statement
        $userSelect->close();

        // Query database for users.
        $authSelect = $conn->prepare("SELECT `Store_ID` FROM `authentication` WHERE `Device_ID` = ? LIMIT 1");
        $authSelect->bind_param("s", $_SESSION["deviceID"]);

        // Execute Query And Bind Results
        $authSelect->execute();
        $authSelect->store_result();
        $authSelect->bind_result($serverAuthenticationStoreID);
        $authSelect->fetch();

        // Close Statement
        $authSelect->close();

        $hashInput = $clientPass . $serverSalt;

        if ((password_verify($hashInput, $serverHashedPass)) && ($_SESSION["deviceAuth"] == true) && ($serverAuthenticationStoreID == $serverStoreID)){ // User is authenticated.
          $_SESSION["userID"] = $clientID;
          $_SESSION["storeID"] = $serverAuthenticationStoreID;
          $_SESSION["orgID"] = null;
          $_SESSION["administrator"] = false;
          $_SESSION["loggedIn"] = true;
          return true;
        } else {
          return false;
        }
    } else if (gettype($clientID) == "string") { // The user is an administrator
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
            return false;
        }
    } else {
        return false;
    }
}

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
