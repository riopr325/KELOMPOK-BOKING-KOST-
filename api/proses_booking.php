<?php
header('Content-Type: application/json');
require_once '../config/koneksi.php';

// Menerima request JSON dari fetch()
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['unit'], $data['nama'], $data['durasi'], $data['total_angka'])) {
    $unit = mysqli_real_escape_string($koneksi, $data['unit']);
    $nama = mysqli_real_escape_string($koneksi, $data['nama']);
    $durasi = (int)$data['durasi'];
    $total = (int)$data['total_angka'];

    $query = "INSERT INTO booking (nama_unit, nama_pemesan, durasi, total_harga) 
              VALUES ('$unit', '$nama', $durasi, $total)";

    if (mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success", "message" => "Pemesanan berhasil disimpan!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Gagal menyimpan data"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
}
?>