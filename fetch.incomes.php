<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agriculture";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM income";
$result = $conn->query($sql);

$incomes = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $incomes[] = $row;
    }
}

$conn->close();

echo json_encode($incomes);
?>