// LE COULOIR DU SAVOIR — Scripts
document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
  // Lien actif dans la nav
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.style.color = '#FFFFFF';
      link.style.fontWeight = '700';
    }
  });
  // Formulaire contact
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Message envoyé ✓';
      btn.style.background = '#1E6E3E';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 3500);
    });
  }
  // Animation au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.theme-card, .article-card, .concept-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // SEO automatique — balises title et description par page
  const SEO = {
    "index.html":                          { title: "Le Couloir du Savoir | Plateforme pédagogique pour l'éducation en Afrique", desc: "Ressources pédagogiques innovantes pour enseignants et inspecteurs du Sénégal : Stivation, CREAQ, TDI." },
    "creaq.html":                          { title: "CREAQ | Cadre de Réflexion pour des Enseignements-Apprentissages de Qualité", desc: "Le CREAQ, cadre pédagogique développé au Sénégal depuis 2015 pour améliorer la qualité des apprentissages." },
    "modele-stivation.html":               { title: "Le Modèle Stivation | STImulation + moTIVATION + interACTION", desc: "Le modèle Stivation transforme les apprentissages. Validé sur 874 enseignants au Sénégal." },
    "espace-inspecteurs.html":             { title: "Espace Inspecteurs | Ressources pour l'IEF au Sénégal", desc: "Outils de supervision, modèles pédagogiques et partage d'expériences pour les inspecteurs de l'éducation." },
    "article-motivation-intrinseque.html": { title: "Motivation Intrinsèque à l'École | Stimuler l'Envie d'Apprendre", desc: "Comment développer la motivation intrinsèque en classe ? Analyse pour l'élève africain." },
    "inspecteur-creaq.html":               { title: "L'Inspecteur et le CREAQ | Supervision pédagogique en action", desc: "La supervision pédagogique CREAQ à Kédougou, Tivaouane et Saraya." },
    "interactions-enseignants.html":       { title: "Relations Interpersonnelles des Enseignants | Climat Scolaire", desc: "Les relations entre enseignants influencent le bien-être et la motivation au travail." },
    "lu-pour-vous.html":                   { title: "Lu pour Vous | Synthèses de recherches en éducation", desc: "Synthèses accessibles de références en sciences de l'éducation pour praticiens d'Afrique francophone." },
    "témoignages.html":                    { title: "Témoignages | Effets du CREAQ et de la Stivation sur le terrain", desc: "Directeurs et enseignants témoignent des effets concrets du CREAQ et de la Stivation au Sénégal." },
    "lexique.html":                        { title: "Lexique Pédagogique | Définitions clés pour l'éducation en Afrique", desc: "Définitions pratiques en didactique, psychologie de l'apprentissage et management scolaire." },
    "a-propos.html":                       { title: "À Propos | Le Couloir du Savoir", desc: "Plateforme créée par des inspecteurs sénégalais engagés pour la qualité des apprentissages." }
  };

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (SEO[page]) {
    document.title = SEO[page].title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.content = SEO[page].desc;
  }
});
