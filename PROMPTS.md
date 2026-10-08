# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Katalog produk di halaman utama (`app/page.jsx`) berhasil mengambil data langsung dari tabel `produk` di Supabase di sisi server. Komponen `KartuProduk` menampilkan seluruh produk dari database, pesan penanganan error dan kondisi tabel kosong berfungsi dengan baik, serta komponen `CatatanBelumAktif` telah dihapus.

**Perbaikan:**
Membuat helper client Supabase server di `lib/supabase/server.js` menggunakan `@supabase/supabase-js` dengan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail produk (`app/produk/[id]/page.jsx`) berhasil mengambil satu data produk berdasarkan `id` secara dinamis di sisi server. Jika produk tidak ditemukan, fungsi `notFound()` dipanggil sehingga halaman 404 muncul. Komponen `CatatanBelumAktif` telah dihapus.

**Perbaikan:**
Menggunakan `const { id } = await params` sesuai spesifikasi Next.js 16 di mana `params` berupa Promise.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Komponen `TombolWhatsApp.jsx` berhasil diubah menjadi tautan `https://wa.me/` yang mengarah ke nomor WhatsApp usaha dari `lib/toko.js`. Teks pesan terisi otomatis dengan nama produk dan harga terformat rupiah menggunakan `encodeURIComponent`, serta terbuka di tab baru (`target="_blank"`).

**Perbaikan:**
Menggunakan helper format mata uang rupiah dari `lib/format.js` untuk menyusun teks pesan pesanan secara konsisten.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Autentikasi admin berhasil dibuat menggunakan Supabase Auth dengan `@supabase/ssr` dan manajemen cookie. Server Action di `app/admin/actions.js` menangani proses login dan logout. Jika login gagal, pesan error ditampilkan; jika sukses diarahkan ke `/admin`. Tombol keluar di `components/NavAdmin.jsx` berhasil mengakhiri sesi. Komponen `CatatanBelumAktif` dihapus dari halaman login.

**Perbaikan:**
Menyiapkan helper client Supabase sesi admin berbasis cookie di `lib/supabase/admin.js` untuk penanganan login dan logout di Server Action.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Fitur ganti password admin berhasil diimplementasikan di `app/admin/password/page.jsx` melalui Server Action. Validasi di server memastikan password baru minimal 8 karakter dan cocok dengan konfirmasi. Menampilkan notifikasi sukses atau error yang jelas di antarmuka.

**Perbaikan:**
Memastikan pengecekan sesi admin dilakukan di sisi server sebelum memperbarui password dengan `supabase.auth.updateUser()`.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
File `proxy.js` di root proyek berhasil memproteksi seluruh rute `/admin/*` kecuali `/admin/login`. Pengunjung yang belum terautentikasi otomatis dialihkan ke `/admin/login`. Seluruh Server Action juga memverifikasi sesi login sebelum memproses data.

**Perbaikan:**
Mengonfigurasi matcher pada `proxy.js` agar hanya memproteksi rute `/admin` dan sub-rutenya, serta membiarkan aset statis dan rute publik tetap dapat diakses.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
