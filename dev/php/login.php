<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$clientID = $request->id;
$clientPass = $request->password;

$servername = "localhost";
$username = "root";
$password = "94RwMDEY*!H$!D6pRGnq";
$dbname = "absolute_inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die(" - Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM administrator WHERE Email = '$clientID'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
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
