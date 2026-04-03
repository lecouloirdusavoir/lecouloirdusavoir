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

  // SEO automatique — title et description par page
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

  // À LIRE AUSSI — injection automatique en bas de chaque article
  const ARTICLES = [
    { href: "article-motivation-intrinseque.html",    label: "Motivation intrinsèque à l'école" },
    { href: "article-motivation-extrinseque.html",    label: "Motivation extrinsèque : comprendre pour agir" },
    { href: "article-constructivisme-afrique.html",   label: "Constructivisme et socioconstructivisme en Afrique" },
    { href: "article-explicite-constructivisme-senegal.html", label: "Enseignement explicite ou constructivisme au Sénégal ?" },
    { href: "article-conflit-cognitif.html",          label: "Le conflit cognitif comme levier d'apprentissage" },
    { href: "article-flow-apprentissage.html",        label: "Le flow : quand l'élève est absorbé par la tâche" },
    { href: "article-memoire-apprentissage.html",     label: "Mémoire et apprentissage : ce que l'enseignant doit savoir" },
    { href: "article-confiance-soi-apprentissage.html", label: "Confiance en soi et réussite scolaire" },
    { href: "article-emulation-pairs.html",           label: "L'émulation entre pairs en classe" },
    { href: "article-styles-apprentissage.html",      label: "Les styles d'apprentissage en question" },
    { href: "article-stivation-milieu-allosterique.html", label: "Stivation et milieu allostérique" },
    { href: "article-stivacol-modele-complet.html",   label: "Le modèle STIVACOL : la Stivation collective" },
    { href: "article-vygotski-afrique.html",          label: "Vygotski et la pédagogie en Afrique" },
    { href: "article-couloir-salle-classe.html",      label: "Du couloir à la salle de classe" },
    { href: "article-formation-the.html",             label: "La formation comme thérapie de l'école" },
    { href: "article-interactions-sociales-L2.html",  label: "Interactions sociales et apprentissage de la L2" },
    { href: "interactions-enseignants.html",          label: "Relations interpersonnelles des enseignants" },
    { href: "inspecteur-creaq.html",                  label: "L'inspecteur et le CREAQ" },
    { href: "modele-stivation.html",                  label: "Le modèle Stivation" },
    { href: "creaq.html",                             label: "Le CREAQ en action" },
    { href: "lu-pour-vous.html",                      label: "Lu pour vous — Synthèses de recherches" }
  ];

  // Ne pas afficher le bloc sur ces pages
  const EXCLURE = ["index.html", "a-propos.html", "espace-inspecteurs.html", "témoignages.html", "lexique.html", "politique-confidentialite.html", "qr-code-couloir.html"];
  if (EXCLURE.includes(page)) return;

  // Choisir 3 articles différents de la page actuelle
  const suggestions = ARTICLES.filter(a => a.href !== page);
  const choix = [];
  const indices = new Set();
  while (choix.length < 3 && choix.length < suggestions.length) {
    const i = Math.floor(Math.random() * suggestions.length);
    if (!indices.has(i)) { indices.add(i); choix.push(suggestions[i]); }
  }

  if (choix.length === 0) return;

  const bloc = document.createElement('section');
  bloc.style.cssText = 'margin: 3rem auto; max-width: 800px; padding: 0 1.5rem;';
  bloc.innerHTML =
    '<div style="border-top: 3px solid #CC9900; padding-top: 1.5rem;">' +
    '<h3 style="font-size: 1rem; font-weight: 700; color: #003366; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">À lire aussi</h3>' +
    '<ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">' +
    choix.map(a =>
      '<li><a href="' + a.href + '" style="display: flex; align-items: center; gap: 0.6rem; color: #003366; text-decoration: none; font-size: 0.97rem; font-weight: 500;">' +
      '<span style="color: #CC9900; font-size: 1.1rem;">&#8594;</span>' +
      a.label + '</a></li>'
    ).join('') +
    '</ul></div>';

  // Injecter avant le footer ou à la fin du body
  const footer = document.querySelector('footer');
  if (footer) {
    document.body.insertBefore(bloc, footer);
  } else {
    document.body.appendChild(bloc);
  }

});
