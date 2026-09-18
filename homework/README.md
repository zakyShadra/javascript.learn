# Interactive Profile Card

Homework Modul 2 — kartu profil interaktif yang memuat data dari `data/profile.json` secara asinkron.

## Cara menjalankan

File ini memakai `fetch`, jadi harus dibuka lewat local server (bukan dobel klik `index.html`).

Contoh dengan Python:

```
cd homework-profile-card
python3 -m http.server 5500
```

Lalu buka `http://localhost:5500` di browser.

## Fitur

- Profil dan daftar keterampilan dimuat dari JSON lokal, dengan state loading, error, dan tombol Coba lagi.
- Tombol "Lihat detail" membuka/menutup bio profil dan memperbarui `aria-expanded`.
- Tombol "Ganti tema" mengubah tampilan ke mode gelap lewat class CSS.
- Form menambah keterampilan menolak input kosong dan keterampilan yang sudah ada.
- Setiap keterampilan punya tombol hapus sendiri.
