<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agriculture";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$plantId = $_POST['plantId'];
$amount = $_POST['amount'];
$year = $_POST['year'];
$comments = $_POST['comments'];

$sql = "INSERT INTO income (plant_id, amount, year, comments) VALUES ('$plantId', '$amount', '$year', '$comments')";

$response = array();
if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

$conn->close();

echo json_encode($response);
?>