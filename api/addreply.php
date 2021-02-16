<?php

header("Content-Type: application/json");

require_once('config.php');

// database connection and query
$conn = new PDO($DB_DSN, $DB_USERNAME, $DB_PASSWORD);

$requestbody = file_get_contents("php://input");

$newreply = json_decode($requestbody, true);

$query = "INSERT into doorknobpost (name, text, reply_to) VALUES (?,?,?)";
$stmt = $conn->prepare($query);

$stmt->bindValue(1, $newreply['name']);
$stmt->bindValue(2, $newreply['text']);
$stmt->bindValue(3, $newreply['replyto']);

$stmt->execute();