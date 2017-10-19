<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userid = $request->id;
$userpass = $request->password;
echo $id;

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

$sql = "INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Name, Last_Login, Creation_UNIX)
VALUES ('$userid', 127836, '$userpass', 'Matt Davis', 1786873927, 2783636)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
