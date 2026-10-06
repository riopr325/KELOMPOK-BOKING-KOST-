let hargaPerMalam = 0;
let totalAngka = 0;

// 1. Ambil Katalog Kamar secara Dinamis dari Database via PHP
document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/get_kamar.php')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.card-grid');
            if (!container) return;
            
            container.innerHTML = ''; // bersihkan data statis
            data.forEach(item => {
                container.innerHTML += `
                    <div class="card">
                        <img src="${item.gambar}" alt="${item.nama_kamar}">
                        <div class="card-body">
                            <h3>${item.nama_kamar}</h3>
                            <p class="harga">Rp ${parseInt(item.harga).toLocaleString('id-ID')} / bulan</p>
                            <button onclick="pilihKamar('${item.nama_kamar}', ${item.harga})">Pilih Unit</button>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Gagal mengambil data katalog:', error));
});

// 2. Pilih Kamar & Hitung Total
function pilihKamar(namaUnit, harga) {
    document.getElementById('unitPilihan').value = namaUnit;
    hargaPerMalam = harga;
    hitungTotal();
}

document.getElementById('durasi').addEventListener('input', hitungTotal);

function hitungTotal() {
    const durasi = parseInt(document.getElementById('durasi').value) || 0;
    totalAngka = hargaPerMalam * durasi;
    document.getElementById('totalHarga').value = 'Rp ' + totalAngka.toLocaleString('id-ID');
}

// 3. Kirim Data Form ke Database via PHP
document.getElementById('formBooking').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const unit = document.getElementById('unitPilihan').value;
    const durasi = document.getElementById('durasi').value;

    if (!unit) {
        alert('Pilih unit terlebih dahulu!');
        return;
    }

    const payload = {
        nama: nama,
        unit: unit,
        durasi: durasi,
        total_angka: totalAngka
    };

    fetch('../api/proses_booking.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 'success') {
            alert(res.message);
            document.getElementById('formBooking').reset();
            document.getElementById('totalHarga').value = 'Rp 0';
        } else {
            alert('Error: ' + res.message);
        }
    })
    .catch(err => console.error('Gagal mengirim data:', err));
});
// Fungsi untuk mengambil dan menampilkan daftar pemesanan dari database
function muatDataBooking() {
    fetch('../api/get_booking.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tabelBookingBody');
            if (!tbody) return;
            
            tbody.innerHTML = ''; // Bersihkan isi tabel lama
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" style="padding:15px;">Belum ada pemesanan.</td></tr>';
                return;
            }

            data.forEach((item, index) => {
                tbody.innerHTML += `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${item.nama_pemesan}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${item.nama_unit}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${item.durasi} bulan</td>
                        <td style="padding: 10px; border: 1px solid #ddd; color: #28a745; font-weight: bold;">
                            Rp ${parseInt(item.total_harga).toLocaleString('id-ID')}
                        </td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${item.created_at}</td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Gagal memuat data booking:', error));
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
    muatDataBooking();
});