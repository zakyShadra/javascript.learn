'use strict';

const status = document.querySelector('#status');
const tombolMuat = document.querySelector('#muat-data');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const tampilanTips = document.querySelector('#tampilan-tips');

const PELUANG_GAGAL = 0.3;

function tunggu(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function delayAcak() {
  return Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
}

function simulasikanKegagalan() {
  return Math.random() < PELUANG_GAGAL;
}

function pilihAcak(items) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilTips() {
  const response = await fetch('data/tips.json');

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} saat mengambil tips.`);
  }

  return response.json();
}

async function muatData() {
  tombolMuat.disabled = true;
  tampilanTips.hidden = true;
  aturState('loading', 'Memuat tips...');

  try {
    await tunggu(delayAcak());

    if (simulasikanKegagalan()) {
      throw new Error('Simulasi gagal: server tiruan menolak permintaan.');
    }

    const data = await ambilTips();

    if (!Array.isArray(data) || data.length === 0) {
      aturState('empty', 'Belum ada tips yang tersedia.');
      return;
    }

    const tips = pilihAcak(data);
    tampilanTips.textContent = tips.tips;
    tampilanTips.hidden = false;
    aturState('success', 'Tips berhasil dimuat.');
  } catch (error) {
    console.error(error);
    aturState('error', `Gagal memuat tips: ${error.message}`);
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);
