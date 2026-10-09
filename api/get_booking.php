<?php
header('Content-Type: application/json');
require_once '../config/koneksi.php';

$unit = $_POST['unit'] ?? '';
$nama = $_POST['nama'] ?? '';
$durasi = $_POST['durasi'] ?? 1;
$total = $_POST['total'] ?? 0;

if (empty($unit) || empty($nama)) {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap.']);
    exit;
}

// 1. Simpan data transaksi ke tabel booking
$queryBooking = "INSERT INTO booking (nama_unit, nama_pemesan, durasi, total_harga) 
                 VALUES ('$unit', '$nama', $durasi, $total)";

if (mysqli_query($koneksi, $queryBooking)) {
    // 2. Ubah status kamar di tabel kamar menjadi 'terisi'
    $updateStatus = "UPDATE kamar SET status = 'terisi' WHERE nama_kamar = '$unit'";
    mysqli_query($koneksi, $updateStatus);

    echo json_encode(['status' => 'success', 'message' => 'Pemesanan berhasil disimpan!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan pemesanan.']);
}
?>