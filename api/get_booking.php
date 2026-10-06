<?php
header('Content-Type: application/json');
require_once '../config/koneksi.php';

// Ambil semua data booking dari yang terbaru
$query = "SELECT * FROM booking ORDER BY id DESC";
$result = mysqli_query($koneksi, $query);

$booking_list = [];
while ($row = mysqli_fetch_assoc($result)) {
    $booking_list[] = $row;
}

echo json_encode($booking_list);
?>