'use strict';

const pertanyaanFaq = document.querySelectorAll('.faq-question');

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
