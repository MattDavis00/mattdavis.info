<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

if (authenicateLogin($clientID, $clientPass, $conn)) { // Calls the authenticateLogin function
    $outputArray["userID"] = $_SESSION["userID"];
    $outputArray["storeID"] = $_SESSION["storeID"];
    $outputArray["orgID"] = $_SESSION["orgID"];
    $outputArray["administrator"] = $_SESSION["administrator"];
    $outputArray["loggedIn"] = $_SESSION["loggedIn"];
    $outputArray["verification"] = true;
} else {
    $_SESSION["loggedIn"] = false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function authenicateLogin($clientID, $clientPass, $conn)
{
  echo " Got here 3 ";
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

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Query database for authentication records.
        $authSelect = $conn->prepare("SELECT `Store_ID` FROM `authentication` WHERE `Device_ID` = ? LIMIT 1");
        $authSelect->bind_param("s", $_SESSION["deviceID"]);

        // Execute Query And Bind Results
        $authSelect->execute();
        $authSelect->store_result();
        $authSelect->bind_result($serverAuthenticationStoreID);
        $authSelect->fetch();

        // Close Statement
        $authSelect->close();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Query database for the organisation that the store is a part of.
        $storeSelect = $conn->prepare("SELECT `Org_ID` FROM `store` WHERE `Store_ID` = ?");
        $storeSelect->bind_param("i", $serverStoreID);

        // Execute Query And Bind Results
        $storeSelect->execute();
        $storeSelect->store_result();
        $storeSelect->bind_result($serverOrgID);
        $storeSelect->fetch();

        // Close Statement
        $storeSelect->close();

        echo " Got here 1 ";

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $hashInput = $clientPass . $serverSalt;

        if ((password_verify($hashInput, $serverHashedPass)) && ($_SESSION["deviceAuth"] == true) && ($serverAuthenticationStoreID == $serverStoreID)){ // User is authenticated.
          $_SESSION["userID"] = $clientID;
          $_SESSION["storeID"] = $serverAuthenticationStoreID;
          $_SESSION["orgID"] = $serverOrgID;
          $_SESSION["administrator"] = false;
          $_SESSION["loggedIn"] = true;
          echo " Got here 2 ";
          return true;
        } else {
          return false;
        }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } else { // The user is an administrator


      // Query database for the organisation that the administrator is a part of.
      $administratorSelect = $conn->prepare("SELECT `Email`, `Org_ID`, `Hashed_Pass`, `Salt` FROM `administrator` WHERE `Email` = ? LIMIT 1");
      $administratorSelect->bind_param("i", $clientID);

      // Execute Query And Bind Results
      $administratorSelectSuccess = $administratorSelect->execute();
      $administratorSelect->store_result();
      $administratorSelect->bind_result($serverEmail, $serverOrgID, $serverHashedPass, $serverSalt);
      $administratorSelect->fetch();

      // Close Statement
      $administratorSelect->close();

      // Output
      if ($administratorSelectSuccess) {
          $hashInput = $clientPass . $serverSalt;
          if (password_verify($hashInput, $serverHashedPass) && ($_SESSION["deviceAuth"] == true)) { // If the password matches and the device has been authenticated.
              $_SESSION["userID"] = $serverEmail; // Set userID session variable to the administrators email.
              $_SESSION["storeID"] = null;
              $_SESSION["orgID"] = $serverOrgID; // Administrators do not need to be on an organisations device, therefore don't check if there is an entry in the authenication table, just set the session value.
              $_SESSION["administrator"] = true; // Set administrator session variable to true.
              $_SESSION["loggedIn"] = true; // Sets the loggedIn session variable to true.
              return true;
          }
              return false;
          } else {
          return false;
        }
    }
}

// Output
echo json_encode($outputArray);

// Close Connection
$conn->close();
