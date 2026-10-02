# KOBSHI — Paket Migrasi Hostinger

Aplikasi mandiri untuk `kobshi.banuamentor.id`, ditujukan bagi Business Web Hosting dengan Node.js.

Buka **PANDUAN-HOSTINGER.html** setelah mengekstrak ZIP untuk petunjuk pemasangan tanpa terminal. ZIP ini diunggah melalui **Deploy Web App**, bukan diekstrak langsung ke `public_html`.

## Isi paket

- Website dan admin berbasis Next.js 16, React, dan MySQL (`mysql2`).
- Desain, logo asli katalog, foto kebun, dan foto produk.
- Snapshot konten aktif: 9 produk, 2 jurnal, dan pengaturan beranda.
- Login admin mandiri, cookie HttpOnly, sesi 7 hari, logout, ubah password, dan pembatasan percobaan login.
- Gambar unggahan disimpan di MySQL (maksimal 4 MB per gambar). Tidak ada folder unggahan yang hilang saat redeploy.
- `migration/content-export.json`: snapshot konten; `migration/schema.sql`: skema; `migration/export-manifest.json`: keterangan salinan.

## Konfigurasi

Node.js **22.x** (minimal 22.13) atau 24.x. Instal `npm ci`; build `npm run build`; jalankan `npm start`. Entry alternatif: `server.mjs`. Output Next.js: `.next`.

Isi environment variables dari `.env.example` pada hPanel. Database dibuat terlebih dahulu; aplikasi membuat tabel dan mengimpor snapshot otomatis pada penggunaan pertama. Database harus khusus KOBSHI. Pembaruan aplikasi tidak mengimpor ulang konten jika penanda `seeded` sudah ada.

`SITE_URL` harus persis origin HTTPS yang sedang dipakai (tanpa path), karena dipakai untuk pemeriksaan asal permintaan admin. Jika menguji pada domain sementara, isi URL sementara dahulu, lalu ubah dan restart setelah subdomain terhubung.

`ADMIN_PASSWORD` dipakai untuk membuat akun awal. Setelah password diubah melalui admin, restart biasa tidak menimpanya. Untuk pemulihan password: atur `ADMIN_PASSWORD` baru dan naikkan `ADMIN_PASSWORD_VERSION` (misalnya 1 menjadi 2), lalu restart. Proses ini mengeluarkan seluruh sesi login, tetapi mempertahankan produk/jurnal/gambar. Jangan menaikkan versi pada pembaruan biasa.

## Batas dan operasional

- Belum dipasang pada akun Hostinger pengguna; credential database/domain perlu diisi oleh pengguna.
- Password tidak dikirim melalui email. Pemulihan menggunakan hPanel seperti di atas. Starter Business Email tidak wajib untuk menjalankan website.
- Snapshot bukan sinkronisasi otomatis dengan versi Sites. Jika ada perubahan konten setelah waktu ekspor, lakukan ekspor/import tambahan sebelum cutover.
- MySQL menyimpan konten dan unggahan gambar; backup database harus mencakup tabel `images`.
- Gambar di-host luar menggunakan URL HTTPS tetap bergantung pada sumber luar. Gunakan unggahan agar gambar tersimpan pada database sendiri.
- Jangan menyertakan password atau `.env` asli dalam GitHub/ZIP.

## Dokumentasi resmi yang dirujuk

- https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/
- https://www.hostinger.com/support/how-to-connect-a-custom-domain-to-a-node-js-application/
