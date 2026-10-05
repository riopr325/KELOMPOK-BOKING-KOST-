let hargaPerMalam = 0;

// Fungsi memilih unit dari katalog
function pilihKamar(namaUnit, harga) {
    document.getElementById('unitPilihan').value = namaUnit;
    hargaPerMalam = harga;
    hitungTotal();
}

// Event listener saat jumlah malam diubah
document.getElementById('durasi').addEventListener('input', hitungTotal);

// Fungsi kalkulasi total harga
function hitungTotal() {
    const durasi = parseInt(document.getElementById('durasi').value) || 0;
    const total = hargaPerMalam * durasi;
    document.getElementById('totalHarga').value = 'Rp ' + total.toLocaleString('id-ID');
}

// Simulasi submit form
document.getElementById('formBooking').addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const unit = document.getElementById('unitPilihan').value;

    if (!unit) {
        alert('Pilih unit terlebih dahulu!');
        return;
    }

    alert(`Terima kasih ${nama}, pemesanan ${unit} berhasil dicatat!`);
});