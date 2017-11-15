<?php

if (($_SESSION["deviceAuth"] == true) && ($_SESSION["loggedIn"] == true)) {
    echo " - Authenticated.";
} else {
    echo " - No authentication.";
    die();
}
