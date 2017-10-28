<?php

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$clientEmail = $request->email;
$clientPassword = $request->password;
$clientFirstName = $request->firstName;
$clientLastName = $request->lastName;

$servername = "localhost";
$username = "root";
$password = "94RwMDEY*!H$!D6pRGnq";
$dbname = "absolute_inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$clientSalt = mcrypt_create_iv(16, MCRYPT_DEV_URANDOM);
$clientPasswordHash = password_hash($clientPassword . $clientSalt, PASSWORD_BCRYPT);

$sql = "INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login, Creation_UNIX)
VALUES ('$clientEmail', 127836, '$clientPasswordHash', '$clientSalt', '$clientFirstName', '$clientLastName', 1786873927, 2783636)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
