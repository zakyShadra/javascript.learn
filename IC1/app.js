'use strict';

function hitungSubtotal(harga, jumlah) {
  return harga * jumlah;
}

function tentukanDiskon(subtotal, anggota) {
  let diskon = 0;

  if (subtotal >= 200000) {
    diskon = 0.2;
  } else if (subtotal >= 100000) {
    diskon = 0.1;
  }

  if (anggota) {
    diskon += 0.05;
  }

  return Math.min(diskon, 0.25);
}

function buatRingkasan(harga, jumlah, anggota) {
  if (harga <= 0 || jumlah <= 0) {
    return { valid: false, pesan: 'Harga dan jumlah harus lebih besar dari nol.' };
  }

  const subtotal = hitungSubtotal(harga, jumlah);
  const diskon = tentukanDiskon(subtotal, anggota);
  const totalBayar = subtotal - subtotal * diskon;

  return {
    valid: true,
    subtotal,
    diskonPersen: `${diskon * 100}%`,
    totalBayar
  };
}

const kasusUji = [
  { harga: 50000, jumlah: 1, anggota: false },
  { harga: 50000, jumlah: 2, anggota: false },
  { harga: 100000, jumlah: 2, anggota: false },
  { harga: 100000, jumlah: 2, anggota: true },
  { harga: 150000, jumlah: 2, anggota: true },
  { harga: -10000, jumlah: 1, anggota: false }
];

const hasilUji = kasusUji.map((kasus) => ({
  ...kasus,
  ...buatRingkasan(kasus.harga, kasus.jumlah, kasus.anggota)
}));

console.table(hasilUji);
