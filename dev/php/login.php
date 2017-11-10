<?php

// Database Connection & Post data
include 'connection.php';

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

$verified = authenicateLogin($clientID, $clientPass, $conn);

if ($verified == TRUE){
  $_SESSION["loggedIn"] = TRUE;
  echo " - Logged in (User Verified)";
} else {
  $_SESSION["loggedIn"] = FALSE;
  echo " - Login Unsuccessful";
}

function authenicateLogin($clientID, $clientPass, $conn){
// SQL Query
$sql = "SELECT * FROM administrator WHERE Email = '$clientID'";

// Execute Query
$result = $conn->query($sql);

// Output
if ($result->num_rows >= 1) {
    while($row = $result->fetch_assoc()) {

      $hashInput = $clientPass . $row["Salt"];

      if (password_verify($hashInput, $row["Hashed_Pass"])){
        echo " - Email: " . $row["Email"] . " - Password: " . $row["Hashed_Pass"];
        return TRUE;
      }
    }
} else {
    echo " - Error: " . $sql . $conn->error;
    return FALSE;
}
}
// Close Connection
$conn->close();

?>
