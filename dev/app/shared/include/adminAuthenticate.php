<?php

if (!(($_SESSION["deviceAuth"] == true) && ($_SESSION["loggedIn"] == true) && ($_SESSION["administrator"] == true))) {
    die(); // If the device is not authenticated, or the user is not logged in, or the user is not an administrator, kill the script.
}
