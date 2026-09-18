'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  const response = await fetch('data/materi.json');

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} saat mengambil materi.`);
  }

  return response.json();
}

function renderMateri(data) {
  const fragment = document.createDocumentFragment();

  for (const item of data) {
    const kartu = document.createElement('article');
    const heading = document.createElement('h2');
    const durasi = document.createElement('p');

    kartu.classList.add('kartu');
    heading.textContent = item.judul;
    durasi.textContent = `Durasi: ${item.durasi} menit`;
    kartu.append(heading, durasi);
    fragment.append(kartu);
  }

  daftar.replaceChildren(fragment);
}

async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    const data = await ambilMateri();

    if (data.length === 0) {
      aturState('empty', 'Materi belum tersedia.');
      return;
    }

    renderMateri(data);
    aturState('success', `${data.length} materi tampil.`);
  } catch (error) {
    console.error(error);
    aturState('error', `Gagal memuat materi: ${error.message}`);
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);
