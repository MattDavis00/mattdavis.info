<?php

$postdata = file_get_contents("php://input");

$params = json_decode($postdata);

$userid = $params->id;
$userpass = $params->password;

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

$sql = "SELECT * FROM administrator WHERE Email = '" . $userid . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Email: " . $row["Email"]. " - Password: " . $row["Hashed_Pass"];
    }
} else {
    echo "Error: " . $sql . $conn->error;
}

$conn->close();

// $result = mysqli_query($conn, $sql);
//
// while($row = mysql_fetch_array($result)) {
// echo $row['fieldname'];
// }

// $outp = json_encode($result);
//
// $conn->close();
// echo($outp);

// if ($conn->query($sql) === TRUE) {
//   $result = $conn->query($sql);
//   $outp ='{"record":['.$result.']}';
//
//   $conn->close();
//   echo($outp);
// } else {
//   echo "Error: " . $sql . "<br>" . $conn->error;
// }
//
// $conn->close();
?>
