'use strict';

const status = document.querySelector('#status');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const kartuProfil = document.querySelector('#kartu-profil');
const namaProfil = document.querySelector('#nama-profil');
const peranProfil = document.querySelector('#peran-profil');
const tombolTema = document.querySelector('#toggle-tema');
const tombolDetail = document.querySelector('#toggle-detail');
const detailProfil = document.querySelector('#detail-profil');
const daftarSkill = document.querySelector('#daftar-skill');
const pesanSkillKosong = document.querySelector('#pesan-skill-kosong');
const formSkill = document.querySelector('#form-skill');
const skillBaruInput = document.querySelector('#skill-baru');
const errorSkill = document.querySelector('#error-skill');

let keterampilan = [];

async function ambilProfil() {
  const response = await fetch('data/profile.json');

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} saat mengambil profil.`);
  }

  return response.json();
}

function buatItemSkill(nama) {
  const item = document.createElement('li');
  const label = document.createElement('span');
  const tombolHapus = document.createElement('button');

  label.textContent = nama;
  tombolHapus.type = 'button';
  tombolHapus.textContent = 'Hapus';
  tombolHapus.addEventListener('click', () => {
    keterampilan = keterampilan.filter((skill) => skill !== nama);
    renderSkill();
  });

  item.append(label, tombolHapus);
  return item;
}

function renderSkill() {
  if (keterampilan.length === 0) {
    daftarSkill.replaceChildren();
    pesanSkillKosong.hidden = false;
    return;
  }

  pesanSkillKosong.hidden = true;
  const fragment = document.createDocumentFragment();
  for (const skill of keterampilan) {
    fragment.append(buatItemSkill(skill));
  }
  daftarSkill.replaceChildren(fragment);
}

function tampilkanProfil(data) {
  namaProfil.textContent = data.nama;
  peranProfil.textContent = data.peran;
  detailProfil.textContent = data.bio;
  keterampilan = [...data.keterampilan];
  renderSkill();
  kartuProfil.hidden = false;
}

async function muatProfil() {
  status.textContent = 'Memuat profil...';
  kartuProfil.hidden = true;
  tombolCobaLagi.hidden = true;

  try {
    const data = await ambilProfil();
    tampilkanProfil(data);
    status.textContent = 'Profil siap ditampilkan.';
  } catch (error) {
    console.error(error);
    status.textContent = `Gagal memuat profil: ${error.message}`;
    tombolCobaLagi.hidden = false;
  }
}

tombolTema.addEventListener('click', () => {
  document.body.classList.toggle('tema-gelap');
});

tombolDetail.addEventListener('click', () => {
  const terbuka = detailProfil.hidden;
  detailProfil.hidden = !terbuka;
  tombolDetail.setAttribute('aria-expanded', String(terbuka));
  tombolDetail.textContent = terbuka ? 'Tutup detail' : 'Lihat detail';
});

formSkill.addEventListener('submit', (event) => {
  event.preventDefault();

  const skillBaru = skillBaruInput.value.trim();

  if (!skillBaru) {
    errorSkill.textContent = 'Nama keterampilan wajib diisi.';
    return;
  }

  const sudahAda = keterampilan.some(
    (skill) => skill.toLowerCase() === skillBaru.toLowerCase()
  );

  if (sudahAda) {
    errorSkill.textContent = 'Keterampilan tersebut sudah tercatat.';
    return;
  }

  errorSkill.textContent = '';
  keterampilan.push(skillBaru);
  renderSkill();
  formSkill.reset();
});

tombolCobaLagi.addEventListener('click', muatProfil);

muatProfil();
