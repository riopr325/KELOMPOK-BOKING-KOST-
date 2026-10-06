<?php
$host     = "localhost";
$user     = "root";
$password = "";
$database = "db_booking";

$koneksi = mysqli_connect($host, $user, $password, $database);

if (!$koneksi) {
    die(json_encode([
        "status" => "error", 
        "message" => "Koneksi Database Gagal: " . mysqli_connect_error()
    ]));
}
?>