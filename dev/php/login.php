<?php

// Database Connection & Post data
include 'connection.php';

// Input Variables
$clientID = $request->id;
$clientPass = $request->password;

// SQL Query
$sql = "SELECT * FROM administrator WHERE Email = '$clientID'";

// Execute Query
$result = $conn->query($sql);

// Output
if ($result->num_rows >= 1) {
    while($row = $result->fetch_assoc()) {

      $hashInput = $clientPass . $row["Salt"];

      if (password_verify($hashInput, $row["Hashed_Pass"])){
        echo " - User Verified!";
      }
        echo " - Email: " . $row["Email"] . " - Password: " . $row["Hashed_Pass"];
    }
} else {
    echo " - Error: " . $sql . $conn->error;
}

// Close Connection
$conn->close();

?>
