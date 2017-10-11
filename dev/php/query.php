<?php
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
VALUES ('11MDavis@sandbachschool.org', 127836, 'HDwu7w7d8#dawoi8yddhjwad', 'Matt Davis', 1786873927, 2783636)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
