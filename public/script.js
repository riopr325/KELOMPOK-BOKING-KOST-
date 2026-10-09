let hargaPerBulanDipilih = 0;

document.addEventListener('DOMContentLoaded', function () {
    muatDataKamar();

    // Event saat input durasi bulan diubah
    const inputDurasi = document.getElementById('durasiBulan');
    if (inputDurasi) {
        inputDurasi.addEventListener('input', hitungTotalHarga);
    }

    // Event submit form booking
    const formBooking = document.getElementById('formBooking');
    if (formBooking) {
        formBooking.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch('../api/proses_booking.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    alert(res.message);
                    formBooking.reset();
                    
                    document.getElementById('totalHargaDisplay').value = 'Rp 0';
                    document.getElementById('totalHargaVal').value = '0';
                    hargaPerBulanDipilih = 0;
                    
                    muatDataKamar();
                } else {
                    alert('Error: ' + res.message);
                }
            })
            .catch(err => console.error('Gagal mengirim data:', err));
        });
    }
});

// Fungsi untuk mengambil data kamar
function muatDataKamar() {
    fetch('../api/get_kamar.php')
        .then(res => res.json())
        .then(data => {
            const gridIndikator = document.getElementById('gridIndikatorKamar');
            const containerKatalog = document.getElementById('katalogKamar');

            if (gridIndikator) gridIndikator.innerHTML = '';
            if (containerKatalog) containerKatalog.innerHTML = '';

            data.forEach(item => {
                const isTerisi = item.status === 'terisi';

                // 1. Tampilan Denah Indikator (Kotak-kotak)
                if (gridIndikator) {
                    const warnaBg = isTerisi ? '#ffebee' : '#e8f5e9';
                    const warnaBorder = isTerisi ? '#f44336' : '#4caf50';
                    const ikon = isTerisi ? '🔴 Terisi' : '🟢 Kosong';

                    gridIndikator.innerHTML += `
                        <div style="background: ${warnaBg}; border: 2px solid ${warnaBorder}; padding: 10px; border-radius: 8px; text-align: center;">
                            <strong style="display: block; font-size: 15px;">${item.nama_kamar}</strong>
                            <span style="font-size: 12px; font-weight: bold; margin-top: 4px; display: block;">${ikon}</span>
                        </div>
                    `;
                }

                // 2. Tampilan Katalog Unit (Tanpa Gambar)
                if (containerKatalog) {
                    const statusBadge = isTerisi 
                        ? `<span style="color: red; font-weight: bold;">🔴 Terisi</span>` 
                        : `<span style="color: green; font-weight: bold;">🟢 Tersedia</span>`;

                    const tombolPilih = isTerisi
                        ? `<button disabled style="background-color: #ccc; cursor: not-allowed; padding: 8px 15px; border: none; border-radius: 5px;">Penuh</button>`
                        : `<button type="button" onclick="pilihKamar('${item.nama_kamar}', ${item.harga})" style="background-color: #007bff; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer;">Pilih Unit</button>`;

                    containerKatalog.innerHTML += `
                        <div class="kamar-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-bottom: 15px; background: white;">
                            <h3>${item.nama_kamar}</h3>
                            <p>Harga: <b>Rp ${parseInt(item.harga).toLocaleString('id-ID')} / bulan</b></p>
                            <p>Status: ${statusBadge}</p>
                            ${tombolPilih}
                        </div>
                    `;
                }
            });
        })
        .catch(err => console.error('Gagal memuat kamar:', err));
}

// Fungsi saat tombol "Pilih Unit" diklik
function pilihKamar(namaUnit, harga) {
    document.getElementById('unitPilihan').value = namaUnit;
    hargaPerBulanDipilih = parseInt(harga);
    document.getElementById('durasiBulan').value = 1;
    hitungTotalHarga();
}

// Fungsi hitung total harga
function hitungTotalHarga() {
    const durasiInput = document.getElementById('durasiBulan');
    let durasi = parseInt(durasiInput.value) || 1;

    if (durasi < 1) {
        durasi = 1;
        durasiInput.value = 1;
    }

    const total = hargaPerBulanDipilih * durasi;

    document.getElementById('totalHargaDisplay').value = 'Rp ' + total.toLocaleString('id-ID');
    document.getElementById('totalHargaVal').value = total;
}