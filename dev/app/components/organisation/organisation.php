<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/dev/app/shared/include/connection.php");

// Make sure that the user is logged in and authenticated before running any code.
include($_SERVER["DOCUMENT_ROOT"].'/dev/app/shared/include/adminAuthenticate.php');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Input Variables
$clientOrgName = $request->name;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SQL Query
$organisationInsert = $conn->prepare("INSERT INTO `organisation` (`Name`, `POS_Module`, `Active`)
VALUES (?, TRUE, TRUE)");
$organisationInsert->bind_param("s", $clientOrgName);

// Execute Query
$insertSuccess = $organisationInsert->execute();

// Close Statement
$organisationInsert->close();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ($insertSuccess) {
    // SQL Query
    $administratorUpdate = $conn->prepare("UPDATE `administrator` SET `Org_ID` = LAST_INSERT_ID()
    WHERE `Email` = ?");
    $administratorUpdate->bind_param("s", $_SESSION["userID"]);

    // Execute Query
    $administratorUpdate->execute();

    // Close Statement
    $administratorUpdate->close();

    // Query database for any existing devices with this ID
    $administratorSelect = $conn->prepare("SELECT `Org_ID` FROM `administrator` WHERE `email` = ? LIMIT 1");
    $administratorSelect->bind_param("s", $_SESSION["userID"]);

    // Execute Query And Bind Results
    $administratorSelect->execute();
    $administratorSelect->store_result();
    $administratorSelect->bind_result($serverOrg_ID);
    $administratorSelect->fetch();

    $_SESSION["orgID"] = $serverOrg_ID;

    // Close Statement
    $administratorSelect->close();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Close Connection
$conn->close();
