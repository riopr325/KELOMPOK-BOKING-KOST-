<?php
header('Content-Type: application/json');
require_once '../config/koneksi.php';

$query = "SELECT * FROM kamar";
$result = mysqli_query($koneksi, $query);

$kamar_list = [];
while ($row = mysqli_fetch_assoc($result)) {
    $kamar_list[] = $row;
}

echo json_encode($kamar_list);
?>