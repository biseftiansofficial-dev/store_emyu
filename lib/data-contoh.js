// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Home Jersey Manchester United 2026/27",
    harga: 1200000,
    deskripsi:
      "Tunjukkan semangat dan kebanggaan sebagai bagian dari keluarga Manchester United dengan Home Jersey 2026/27. Mengusung identitas khas The Red Devils, jersey ini cocok digunakan untuk mendukung tim saat matchday maupun untuk aktivitas sehari-hari.",
    foto_url: "/produk/jersey home.jpg",
    kategori: "Jersey",
  },
  {
    id: 2,
    nama: "Away Jersey Manchester United 2026/27",
    harga: 1200000,
    deskripsi: "Hadir dengan desain away yang stylish dan penuh karakter, jersey Manchester United 2026/27 menjadi pilihan sempurna untuk para penggemar The Red Devils. Cocok dikenakan saat menyaksikan pertandingan, bermain sepak bola, maupun untuk outfit kasual sehari-hari..",
    foto_url: "/produk/awayjersey.webp",
    kategori: "Jersey",
  },
  {
    id: 3,
    nama: "Third Jersey Manchester United 2026/27",
    harga: 1200000,
    deskripsi: "Hadir dengan desain third yang stylish dan penuh karakter, jersey Manchester United 2026/27 menjadi pilihan sempurna untuk para penggemar The Red Devils. Cocok dikenakan saat menyaksikan pertandingan, bermain sepak bola, maupun untuk outfit kasual sehari-hari.",
    foto_url: "/produk/thirdjersey.webp",
    kategori: "Jersey",
  },
  {
    id: 4,
    nama: "Kue Nastar Toples 500 g",
    harga: 85000,
    deskripsi: "Nastar lembut dengan selai nanas buatan sendiri. Dikemas toples kedap udara.",
    foto_url: "/produk/nastar.svg",
    kategori: "Kue kering",
  },
  {
    id: 5,
    nama: "Tas Anyaman Pandan",
    harga: 120000,
    deskripsi: "Dianyam tangan dari daun pandan kering, dilapisi kain di bagian dalam.",
    foto_url: "/produk/tas.svg",
    kategori: "Kerajinan",
  },
  {
    id: 6,
    nama: "Kain Batik Cap 2 m",
    harga: 175000,
    deskripsi: "Batik cap motif parang di atas kain katun primisima, panjang 2 meter.",
    foto_url: "/produk/batik.svg",
    kategori: "Kain",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
