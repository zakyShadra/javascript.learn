'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  let errorNamaPesan = '';
  let errorProdiPesan = '';

  if (calon.nama.length < 3) {
    errorNamaPesan = 'Nama minimal 3 karakter.';
  }

  if (!calon.prodi) {
    errorProdiPesan = 'Program studi wajib dipilih.';
  }

  return {
    valid: !errorNamaPesan && !errorProdiPesan,
    errorNama: errorNamaPesan,
    errorProdi: errorProdiPesan
  };
}

function buatKartuPeserta(item) {
  const article = document.createElement('article');
  const heading = document.createElement('h2');
  const description = document.createElement('p');

  article.classList.add('kartu');
  heading.textContent = item.nama;
  description.textContent = item.prodi;
  article.append(heading, description);
  return article;
}

function renderPeserta(data) {
  if (data.length === 0) {
    daftar.replaceChildren();
    status.textContent = 'Tidak ada peserta.';
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of data) {
    fragment.append(buatKartuPeserta(item));
  }
  daftar.replaceChildren(fragment);
  status.textContent = `${data.length} peserta tampil.`;
}

function tampilkanKondisiForm(hasil) {
  errorNama.textContent = hasil.errorNama;
  errorProdi.textContent = hasil.errorProdi;
  namaInput.setAttribute('aria-invalid', String(Boolean(hasil.errorNama)));
  prodiInput.setAttribute('aria-invalid', String(Boolean(hasil.errorProdi)));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value.trim(),
    prodi: prodiInput.value
  };

  const hasil = validasiPeserta(calon);
  tampilkanKondisiForm(hasil);

  if (!hasil.valid) {
    return;
  }

  peserta.push({ id: Date.now(), nama: calon.nama, prodi: calon.prodi });
  form.reset();
  tampilkanKondisiForm({ valid: true, errorNama: '', errorProdi: '' });
  renderPeserta(peserta);
});

filterInput.addEventListener('change', () => {
  const prodiDipilih = filterInput.value;

  if (prodiDipilih === 'semua') {
    renderPeserta(peserta);
    return;
  }

  renderPeserta(peserta.filter((item) => item.prodi === prodiDipilih));
});

renderPeserta(peserta);
