<?php
header("Access-Control-Allow-Origin: https://www.roblox.com");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$responseData = [
    "status" => "success",
    "message" => "Hello from k1no.fun!",
    "timestamp" => time(),
    "data" => [
        "players_online" => 42,
        "server_status" => "online",
        "version" => "1.0.0"
    ]
];

echo json_encode($responseData);
?>
