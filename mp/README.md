# Portal Kegiatan D3 TI — Landing Page Interaktif

Lanjutan landing page statis Modul 1, ditambah interaksi JavaScript sesuai Mini Project Modul 2.

## Fitur

- Navigasi mobile: tombol "Menu" membuka/menutup nav di layar kecil, memperbarui `aria-expanded`.
- Daftar kegiatan dirender dari array of objects dan bisa difilter berdasarkan kategori.
- FAQ accordion tiga pertanyaan, hanya satu jawaban terbuka pada satu waktu.
- Form kontak dengan validasi nama, email, dan pesan, menampilkan pesan keberhasilan.
- Tombol "Kembali ke atas" muncul setelah scroll melewati 400px.
- Tombol "Tema gelap" mengubah tampilan lewat class CSS.

## Cara menjalankan

Tidak memakai fetch/Promise, jadi cukup dibuka langsung lewat `index.html` di browser, atau
lewat local server bila ingin konsisten dengan proyek lain:

```
python3 -m http.server 5500
```

## Batasan

Belum menggunakan fetch, Promise, atau async/await — sesuai batas teknis Mini Project Modul 2.
Materi asynchronous dinilai lewat Task 3 dan Homework.
