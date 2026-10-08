# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Daftar produk di katalog halaman utama berhasil diambil langsung dari database Supabase (tabel "produk") di sisi server. Komponen KartuProduk menampilkan produk dari database, penanganan error dan kondisi jika tabel kosong berfungsi dengan baik, dan komponen CatatanBelumAktif dihapus.

**Perbaikan:**
Membuat helper Supabase server client di lib/supabase/server.js menggunakan createClient dari @supabase/supabase-js dengan kredensial server SUPABASE_URL dan SUPABASE_SECRET_KEY.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman detail produk di `app/produk/[id]/page.jsx` berhasil mengambil detail produk berdasarkan `id` langsung dari database Supabase. Jika produk tidak ditemukan atau ID salah, fungsi `notFound()` dipanggil sehingga halaman 404 ditampilkan. Tampilan tetap rapi dan tombol WhatsApp tetap dipertahankan.

**Perbaikan:**
Menggunakan `const { id } = await params` dan `maybeSingle()` pada query Supabase agar tidak menimbulkan unhandled exception ketika ID tidak ada di tabel.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Tombol "Pesan via WhatsApp" berhasil diubah menjadi tautan yang membuka `https://wa.me/` langsung ke nomor WhatsApp toko. Pesan otomatis telah terisi dengan nama dan harga produk yang diformat rupiah dan di-encode. Tombol terbuka di tab baru dengan tampilan yang konsisten, dan CatatanBelumAktif di halaman detail produk telah dihapus.

**Perbaikan:**
Menggunakan fungsi `formatRupiah` dari `lib/format.js` dan nomor toko dari `lib/toko.js` serta atribut `target="_blank"` dan `rel="noopener noreferrer"`.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Form login admin berhasil terhubung ke Server Action menggunakan Supabase Auth (@supabase/ssr). Jika login gagal (misal password salah), muncul notifikasi error yang jelas. Jika berhasil, diarahkan ke `/admin`. Tombol "Keluar" pada NavAdmin berhasil mengakhiri sesi dan kembali ke `/admin/login`. Komponen CatatanBelumAktif telah dihapus.

**Perbaikan:**
Membuat helper Supabase admin client berbasis cookie di `lib/supabase/auth.js` menggunakan `@supabase/ssr` dan Next.js headers (`cookies`), serta mendefinisikan Server Action `login` dan `logout` di `app/admin/actions.js`.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Form ganti password di `app/admin/password/page.jsx` berhasil tersambung ke Server Action `gantiPassword`. Validasi server berjalan sesuai ketentuan (minimal 8 karakter dan konfirmasi cocok). Pesan sukses atau error tampil dengan jelas di halaman, dan CatatanBelumAktif telah dihapus.

**Perbaikan:**
Memeriksa status autentikasi admin di server melalui `supabase.auth.getUser()` sebelum memproses pembaruan password dengan `supabase.auth.updateUser()`.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
File `proxy.js` di root proyek berhasil memproteksi semua rute `/admin` kecuali `/admin/login`. Pengunjung yang belum terautentikasi otomatis dialihkan ke `/admin/login`. Server Action `gantiPassword` memverifikasi sesi admin di sisi server sebelum mengeksekusi perubahan. Komponen `CatatanBelumAktif` pada halaman `/admin` telah dihapus.

**Perbaikan:**
Menggunakan NextResponse dan createServerClient dari `@supabase/ssr` dengan penanganan cookie pada `proxy.js`, serta matcher `["/admin", "/admin/:path*"]` dengan pengecualian rute `/admin/login`.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
