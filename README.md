# Pantai Digitalku — Fazza Azka Azifah

Portofolio HTML, CSS, dan JavaScript mandiri dengan font lokal, pantai kartun 2D, animasi ombak/perahu/awan/burung/kepiting, mode pagi–malam, dan tombol jeda animasi. Mengikuti preferensi reduced motion perangkat. Tidak memerlukan framework atau paket npm.

## Isi
- index.html: identitas, perjalanan sekolah, kemampuan, tiga proyek interaktif, kontak.
- prestasi.html: galeri prestasi dengan pratinjau gambar.
- config.js: foto profil dan kontak yang bisa diubah.
- assets/: ikon, ilustrasi, font, dan tempat foto profil.
- asset/: foto prestasi.
- scripts/build-prestasi.mjs: membuat hasil deploy di dist beserta daftar foto prestasi otomatis.
- vercel.json: pengaturan build statis.

Data: Fazza Azka Azifah / X RPL 3 / absen 17. SDIT Nurul Islam → SMP Hasjim Asjari → SMK Krian 1. Keempat kemampuan 100% merupakan penilaian diri sesuai data pemilik, bukan sertifikasi. Email/Instagram belum diisi. WhatsApp: 08819524945.

## Foto profil
Edit `config.js`, isi `imageUrl` dengan URL gambar langsung HTTPS (bukan halaman pratinjau), misalnya `https://domain-anda.com/fazza.jpg`, atau `assets/fotoprofil.jpg`.
Alternatif: cukup simpan foto sebagai `assets/fotoprofil.png`, `.jpg`, atau `.jpeg`. Saat foto belum tersedia/tidak dapat dimuat, inisial FA tetap ditampilkan. `objectPosition` mengatur posisi pemotongan, misalnya `center 30%`. Tidak ada foto orang lain yang dipakai.

## Foto prestasi
Masukkan gambar milikmu ke `asset/` dengan nama `prestasi1.jpg`, `prestasi2.png`, `prestasi3.jpeg`, dan seterusnya. PNG/JPG/JPEG didukung. Galeri tidak menampilkan prestasi fiktif.
Saat build, semua nomor ditemukan otomatis, boleh ada nomor terlewat dan tidak ada batas jumlah yang ditetapkan kode. Urutan berdasarkan nomor. Hindari dua ekstensi untuk nomor yang sama.
Saat membuka langsung tanpa build, pencarian dimulai dari nomor 1 dan berhenti pada nomor pertama yang tidak ada; gunakan nomor berurutan. Untuk galeri lengkap yang memiliki nomor terlewat, jalankan build dan buka hasil dist melalui server lokal.

## Tiga demo unik
1. Kompas Jelajah: pengatur sudut dan delapan arah mata angin, bukan kompas perangkat.
2. Pantai Bersih: permainan mengumpulkan enam sampah; tersedia pengacakan ulang.
3. Pesan Mercusuar: penerjemah huruf/angka ke Morse beserta panduan karakter; tidak mengirim pesan.
Demo dibuat untuk paket ini, bukan klaim proyek historis pemilik.

## Membuka dan mengunggah
Ekstrak ZIP. Buka index.html untuk pratinjau dasar; tidak perlu instalasi. Untuk hasil build, jalankan:

    node scripts/build-prestasi.mjs
    python3 -m http.server 8000 --directory dist

Buka http://localhost:8000. Node dibutuhkan untuk build, Python hanya pilihan server lokal.
Upload seluruh isi ZIP ke root repository GitHub; index.html harus berada langsung di root. Di Vercel, import repository tersebut. File vercel.json menyediakan build command `node scripts/build-prestasi.mjs` dan output `dist`. Tidak ada install command/dependensi npm yang diperlukan. Setiap penambahan gambar melalui commit lalu deploy ulang akan memperbarui galeri.
Paket ini siap diunggah; belum diunggah ke akun GitHub atau diterbitkan ke Vercel oleh pembuat paket.

## Penyesuaian
Warna, jarak, dan animasi: style.css. Data kontak/foto: config.js. Teks utama: index.html. Simpan nomor WhatsApp dalam format internasional tanpa tanda plus. Tidak ada formulir server atau pelacak. Font lokal beserta lisensinya ada di assets/fonts/.

## Verifikasi
Build dan pemeriksaan sintaks JavaScript dijalankan, beserta tes logika demo dan kelengkapan file. Rendering di browser nyata belum diperiksa pada lingkungan pembuatan ini; cek tampilan perangkat tujuan setelah membuka paket.
