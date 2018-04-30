<?php

// Database Connection & Post data
include($_SERVER["DOCUMENT_ROOT"]."/project/shared/connection.php");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Input Variables
// $clientEmail = $request->email;
// $clientPassword = $request->password;
// $clientFirstName = $request->firstName;
// $clientLastName = $request->lastName;
//
// // Generate Salt & Hash
// $clientSalt = bin2hex(random_bytes(8));
// $clientPasswordHash = password_hash($clientPassword . $clientSalt, PASSWORD_BCRYPT);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // SQL Query
// $stmt = $conn->prepare("INSERT INTO administrator (Email, Org_ID, Hashed_Pass, Salt, First_Name, Last_Name, Last_Login_UNIX, Creation_UNIX)
// VALUES (?, NULL, ?, ?, ?, ?, NULL, ?)");
// $stmt->bind_param("sssssi", $clientEmail, $clientPasswordHash, $clientSalt, $clientFirstName, $clientLastName, $serverUNIX);
//
// // Execute Query
// $registerReturn = $stmt->execute();
//
// // Close Statement
// $stmt->close();
//
// // Check Query
// if ($registerReturn) {
//     $outputArray["registerSuccess"] = true; // If the insert was successful, return true.
// } else {
//     $outputArray["registerSuccess"] = false; // If the insert failed, return false.
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Output
echo json_encode($outputArray);

// Close Connection
$conn = null;
