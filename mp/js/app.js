'use strict';

const tombolToggleNav = document.querySelector('#toggle-nav');
const navUtama = document.querySelector('#nav-utama');
const tombolTema = document.querySelector('#toggle-tema');

const filterKategori = document.querySelector('#filter-kategori');
const statusKegiatan = document.querySelector('#status-kegiatan');
const daftarKegiatan = document.querySelector('#daftar-kegiatan');

const accordionFaq = document.querySelector('#accordion-faq');

const formKontak = document.querySelector('#form-kontak');
const namaKontak = document.querySelector('#nama-kontak');
const emailKontak = document.querySelector('#email-kontak');
const pesanKontak = document.querySelector('#pesan-kontak');
const errorNamaKontak = document.querySelector('#error-nama-kontak');
const errorEmailKontak = document.querySelector('#error-email-kontak');
const errorPesanKontak = document.querySelector('#error-pesan-kontak');
const statusKontak = document.querySelector('#status-kontak');

const tombolKembaliAtas = document.querySelector('#kembali-atas');

/* Navigasi mobile */
tombolToggleNav.addEventListener('click', () => {
  const terbuka = navUtama.classList.toggle('nav-open');
  tombolToggleNav.setAttribute('aria-expanded', String(terbuka));
  tombolToggleNav.textContent = terbuka ? 'Tutup' : 'Menu';
});

for (const link of navUtama.querySelectorAll('.nav-link')) {
  link.addEventListener('click', () => {
    navUtama.classList.remove('nav-open');
    tombolToggleNav.setAttribute('aria-expanded', 'false');
    tombolToggleNav.textContent = 'Menu';
  });
}

/* Tema gelap */
tombolTema.addEventListener('click', () => {
  const gelap = document.body.classList.toggle('tema-gelap');
  tombolTema.textContent = gelap ? 'Tema terang' : 'Tema gelap';
});

/* Daftar kegiatan dari array of objects */
const kegiatan = [
  {
    id: 1,
    judul: 'Lokakarya Web Dasar',
    tanggal: '2026-09-12T09:00',
    tanggalTampil: '12 September 2026, 09.00 WIB',
    lokasi: 'Laboratorium Komputer 2',
    kategori: 'Lokakarya'
  },
  {
    id: 2,
    judul: 'Workshop CSS Layout',
    tanggal: '2026-09-20T09:00',
    tanggalTampil: '20 September 2026, 09.00 WIB',
    lokasi: 'Laboratorium Komputer 2',
    kategori: 'Workshop'
  },
  {
    id: 3,
    judul: 'Seminar Karier Developer',
    tanggal: '2026-10-03T13:00',
    tanggalTampil: '3 Oktober 2026, 13.00 WIB',
    lokasi: 'Aula Kampus',
    kategori: 'Seminar'
  }
];

function buatItemKegiatan(item) {
  const li = document.createElement('li');
  const waktu = document.createElement('time');
  const detail = document.createElement('span');

  waktu.dateTime = item.tanggal;
  waktu.textContent = item.tanggalTampil;
  detail.textContent = ` - ${item.judul}, ${item.lokasi}`;

  li.append(waktu, detail);
  return li;
}

function renderKegiatan(data) {
  if (data.length === 0) {
    daftarKegiatan.replaceChildren();
    statusKegiatan.textContent = 'Tidak ada kegiatan pada kategori ini.';
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of data) {
    fragment.append(buatItemKegiatan(item));
  }
  daftarKegiatan.replaceChildren(fragment);
  statusKegiatan.textContent = `${data.length} kegiatan ditemukan.`;
}

filterKategori.addEventListener('change', () => {
  const kategoriDipilih = filterKategori.value;

  if (kategoriDipilih === 'semua') {
    renderKegiatan(kegiatan);
    return;
  }

  renderKegiatan(kegiatan.filter((item) => item.kategori === kategoriDipilih));
});

renderKegiatan(kegiatan);

/* FAQ accordion, hanya satu jawaban terbuka */
const pertanyaanFaq = accordionFaq.querySelectorAll('.faq-question');

for (const tombol of pertanyaanFaq) {
  tombol.addEventListener('click', () => {
    const jawaban = document.getElementById(tombol.getAttribute('aria-controls'));
    const sedangTerbuka = tombol.getAttribute('aria-expanded') === 'true';

    for (const tombolLain of pertanyaanFaq) {
      const jawabanLain = document.getElementById(tombolLain.getAttribute('aria-controls'));
      tombolLain.setAttribute('aria-expanded', 'false');
      jawabanLain.hidden = true;
    }

    if (!sedangTerbuka) {
      tombol.setAttribute('aria-expanded', 'true');
      jawaban.hidden = false;
    }
  });
}

/* Validasi form kontak */
function validasiKontak(calon) {
  let errorNamaPesan = '';
  let errorEmailPesan = '';
  let errorPesanPesan = '';

  if (calon.nama.length < 3) {
    errorNamaPesan = 'Nama minimal 3 karakter.';
  }

  if (!calon.email.includes('@')) {
    errorEmailPesan = 'Email harus memuat tanda @.';
  }

  if (calon.pesan.length === 0) {
    errorPesanPesan = 'Pesan wajib diisi.';
  }

  return {
    valid: !errorNamaPesan && !errorEmailPesan && !errorPesanPesan,
    errorNama: errorNamaPesan,
    errorEmail: errorEmailPesan,
    errorPesan: errorPesanPesan
  };
}

formKontak.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaKontak.value.trim(),
    email: emailKontak.value.trim(),
    pesan: pesanKontak.value.trim()
  };

  const hasil = validasiKontak(calon);

  errorNamaKontak.textContent = hasil.errorNama;
  errorEmailKontak.textContent = hasil.errorEmail;
  errorPesanKontak.textContent = hasil.errorPesan;
  namaKontak.setAttribute('aria-invalid', String(Boolean(hasil.errorNama)));
  emailKontak.setAttribute('aria-invalid', String(Boolean(hasil.errorEmail)));
  pesanKontak.setAttribute('aria-invalid', String(Boolean(hasil.errorPesan)));

  if (!hasil.valid) {
    statusKontak.textContent = '';
    return;
  }

  statusKontak.textContent = 'Pendaftaran berhasil dikirim. Terima kasih!';
  formKontak.reset();
});

/* Tombol kembali ke atas */
window.addEventListener('scroll', () => {
  tombolKembaliAtas.hidden = window.scrollY < 400;
});

tombolKembaliAtas.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
