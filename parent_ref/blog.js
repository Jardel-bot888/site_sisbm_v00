/* =============================================
   SISBM ACADEMY – blog.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '2250720161466';

  /* ââ LOADER ââ */
  function hideLoader() {
    const l = document.getElementById('loader');
    if (l && !l.classList.contains('hidden')) {
      l.classList.add('hidden');
      setTimeout(() => { l.style.display = 'none'; }, 100);
    }
  }
  /* Cacher quand tout est chargé */
  window.addEventListener('load', () => setTimeout(hideLoader, 100));
  /* Sécurité : cacher de force après 3s max
     (évite le blocage si une image est absente) */
  setTimeout(hideLoader, 500);

  /* ââ AOS ââ */
  const obs = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('aos-animate'); obs.unobserve(x.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('[data-aos]').forEach(el => obs.observe(el));

  /* ââ FILTRE CATÉGORIES ââ */
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-cat');
      document.querySelectorAll('.article-card').forEach(card => {
        if (f === 'all' || card.getAttribute('data-cat') === f) {
          card.style.display = '';
          card.removeAttribute('data-hidden');
        } else {
          card.style.display = 'none';
          card.setAttribute('data-hidden', '');
        }
      });
    });
  });

  /* ââ RECHERCHE LIVE ââ */
  const search = document.getElementById('blog-search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll('.article-card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ââ NEWSLETTER ââ */
  const nlBtn = document.querySelector('.nl-form .btn-primary');
  if (nlBtn) {
    nlBtn.addEventListener('click', () => {
      const inp = document.querySelector('.nl-form input');
      if (inp && inp.value.includes('@')) {
        nlBtn.innerHTML = '<i class="fa-solid fa-check"></i> Inscrit !';
        nlBtn.style.background = '#00A896';
        inp.value = '';
        setTimeout(() => {
          nlBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> S\'abonner';
          nlBtn.style.background = '';
        }, 3000);
      }
    });
  }

  /* ââ WHATSAPP FLOTTANT ââ */
  const wa = document.getElementById('wa-float');
  if (wa) {
    wa.addEventListener('click', () => {
      window.open('https://wa.me/' + +2250720161466+ '?text=' + encodeURIComponent('Bonjour SISBM Academy.'), '_blank');
    });
  }

});