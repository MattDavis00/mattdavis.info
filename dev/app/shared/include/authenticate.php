<?php

if (!(($_SESSION["deviceAuth"] == true) && ($_SESSION["loggedIn"] == true))) {
    die(); // If the device is not authenticated, or the user is not logged in, kill the script.
}
