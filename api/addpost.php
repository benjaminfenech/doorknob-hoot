<?php

header("Content-Type: application/json");

require_once('config.php');

// database connection and query
$conn = new PDO($DB_DSN, $DB_USERNAME, $DB_PASSWORD);

$requestbody = file_get_contents("php://input");

$newpost = json_decode($requestbody, true);

$query = "INSERT into doorknobpost (name, text) VALUES (?,?)";
$stmt = $conn->prepare($query);

$stmt->bindValue(1, $newpost['name']);
$stmt->bindValue(2, $newpost['text']);

$stmt->execute();