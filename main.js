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
    "a-propos.html":                          { title: "À Propos | Le Couloir du Savoir", desc: "Plateforme créée par des inspecteurs sénégalais engagés pour la qualité des apprentissages." },
    "article-constructivisme-afrique.html":   { title: "Construire le savoir ensemble : le socioconstructivisme expliqué aux enseignants", desc: "Pourquoi apprend-on mieux à plusieurs qu'en silence ? Le socioconstructivisme de Vygotski appliqué aux classes du Sénégal." }
  };

  // Unifier / et /index.html
  if (window.location.pathname === '/') history.replaceState(null, '', '/index.html');

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (SEO[page]) {
    document.title = SEO[page].title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
    m.content = SEO[page].desc;
  }

  // SCHEMA TDI — injection automatique sur creaq.html et modele-stivation.html
  const PAGES_TDI = ["creaq.html", "modele-stivation.html"];
  if (PAGES_TDI.includes(page)) {
    const tdi = document.createElement('section');
    tdi.style.cssText = 'padding: 3rem 2rem; max-width: 900px; margin: 0 auto;';
    tdi.innerHTML =
      '<div style="text-align:center;margin-bottom:1.5rem;">' +
        '<p style="font-size:0.75rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#00c9a7;margin-bottom:0.5rem;">Outil conceptuel</p>' +
        '<h2 style="font-family:\'Playfair Display\',serif;font-size:clamp(1.4rem,3vw,2rem);font-weight:700;color:#e8eaf0;margin-bottom:0.8rem;">La Triade Dynamique <em style="color:#00c9a7;font-style:italic;">Intersubjective</em></h2>' +
        '<p style="font-size:0.95rem;color:#8a92a8;max-width:600px;margin:0 auto;">Trois pôles en interaction permanente. Chaque acteur stimule et est stimulé par les deux autres. C\'est cette dynamique circulaire qui produit la Stivation collective.</p>' +
      '</div>' +
      '<div style="background:rgba(14,20,38,0.6);border:1px solid rgba(0,201,167,0.15);border-radius:16px;padding:1.5rem 1rem;">' +
        '<svg width="100%" viewBox="0 0 680 440" xmlns="http://www.w3.org/2000/svg" style="font-family:\'DM Sans\',sans-serif;">' +
          '<defs><marker id="arr-tdi" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#00c9a7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>' +
          '<text x="340" y="20" text-anchor="middle" font-size="15" font-weight="600" fill="#e8eaf0">Triade Dynamique Intersubjective (TDI)</text>' +
          '<text x="340" y="36" text-anchor="middle" font-size="11" fill="#8a92a8" font-style="italic">Modèle MBM . Le Couloir du Savoir . Kédougou, 2024</text>' +
          '<rect x="255" y="50" width="170" height="58" rx="8" fill="#0C447C" stroke="#378ADD" stroke-width="0.5"/>' +
          '<text x="340" y="74" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="600" fill="#E6F1FB">L\'Inspecteur</text>' +
          '<text x="340" y="92" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#85B7EB">Garant du cadre</text>' +
          '<rect x="28" y="342" width="196" height="58" rx="8" fill="#085041" stroke="#1D9E75" stroke-width="0.5"/>' +
          '<text x="126" y="366" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="600" fill="#E1F5EE">Enseignant-Formateur</text>' +
          '<text x="126" y="384" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#5DCAA5">Relais de proximité</text>' +
          '<rect x="468" y="342" width="184" height="58" rx="8" fill="#3C3489" stroke="#7F77DD" stroke-width="0.5"/>' +
          '<text x="560" y="366" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="600" fill="#EEEDFE">Enseignant-Pair</text>' +
          '<text x="560" y="384" text-anchor="middle" dominant-baseline="central" font-size="11" fill="#AFA9EC">Praticien réflexif</text>' +
          '<circle cx="340" cy="214" r="60" fill="rgba(0,201,167,0.06)" stroke="rgba(0,201,167,0.25)" stroke-width="0.5" stroke-dasharray="4 3"/>' +
          '<text x="340" y="206" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="600" fill="#00c9a7">Zone de</text>' +
          '<text x="340" y="224" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="600" fill="#00c9a7">Stivation</text>' +
          '<line x1="288" y1="108" x2="206" y2="342" stroke="#00c9a7" stroke-width="1.2" marker-end="url(#arr-tdi)"/>' +
          '<line x1="224" y1="342" x2="304" y2="108" stroke="#00c9a7" stroke-width="1.2" marker-end="url(#arr-tdi)"/>' +
          '<line x1="392" y1="108" x2="474" y2="342" stroke="#00c9a7" stroke-width="1.2" marker-end="url(#arr-tdi)"/>' +
          '<line x1="490" y1="342" x2="408" y2="108" stroke="#00c9a7" stroke-width="1.2" marker-end="url(#arr-tdi)"/>' +
          '<line x1="224" y1="376" x2="468" y2="376" stroke="#f0b429" stroke-width="1.5" marker-end="url(#arr-tdi)"/>' +
          '<line x1="468" y1="390" x2="224" y2="390" stroke="#f0b429" stroke-width="1.5" marker-end="url(#arr-tdi)"/>' +
          '<text x="176" y="200" text-anchor="end" font-size="11" fill="#8a92a8">Impulsion</text>' +
          '<text x="176" y="216" text-anchor="end" font-size="11" fill="#8a92a8">Régulation</text>' +
          '<text x="506" y="200" text-anchor="start" font-size="11" fill="#8a92a8">Encadrement</text>' +
          '<text x="506" y="216" text-anchor="start" font-size="11" fill="#8a92a8">Qualité</text>' +
          '<text x="346" y="368" text-anchor="middle" font-size="11" fill="#f0b429">Stivation directe</text>' +
          '<text x="346" y="404" text-anchor="middle" font-size="11" fill="#f0b429">Double Stivation</text>' +
        '</svg>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1rem;margin-top:1.2rem;">' +
        '<div style="background:rgba(14,20,38,0.5);border:1px solid rgba(0,201,167,0.15);border-radius:10px;padding:1rem;">' +
          '<p style="font-size:0.78rem;font-weight:600;color:#00c9a7;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.4rem;">Stivation directe</p>' +
          '<p style="font-size:0.85rem;color:#8a92a8;line-height:1.6;">Le formateur stimule son pair dans un cadre sécurisant et sans enjeu évaluatif.</p>' +
        '</div>' +
        '<div style="background:rgba(14,20,38,0.5);border:1px solid rgba(0,201,167,0.15);border-radius:10px;padding:1rem;">' +
          '<p style="font-size:0.78rem;font-weight:600;color:#f0b429;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.4rem;">Double Stivation</p>' +
          '<p style="font-size:0.85rem;color:#8a92a8;line-height:1.6;">En formant ses pairs, le formateur se forme lui-même de manière réflexive et invisible.</p>' +
        '</div>' +
        '<div style="background:rgba(14,20,38,0.5);border:1px solid rgba(0,201,167,0.15);border-radius:10px;padding:1rem;">' +
          '<p style="font-size:0.78rem;font-weight:600;color:#4f8ef7;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.4rem;">Zone de Stivation</p>' +
          '<p style="font-size:0.85rem;color:#8a92a8;line-height:1.6;">L\'espace où les trois dynamiques se rencontrent et produisent une transformation durable.</p>' +
        '</div>' +
      '</div>';

    const footer = document.querySelector('footer');
    if (footer) document.body.insertBefore(tdi, footer);
    else document.body.appendChild(tdi);
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

  const EXCLURE = ["index.html", "a-propos.html", "espace-inspecteurs.html", "témoignages.html", "lexique.html", "politique-confidentialite.html", "qr-code-couloir.html"];
  if (EXCLURE.includes(page)) return;

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

  const footer2 = document.querySelector('footer');
  if (footer2) document.body.insertBefore(bloc, footer2);
  else document.body.appendChild(bloc);

});/* ============================================================
   FORMULAIRE D'ABONNEMENT - Le Couloir du Savoir
   À COLLER À LA TOUTE FIN DU FICHIER main.js
   (ne touche à rien d'existant, s'ajoute simplement en bas)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Évite d'injecter le formulaire deux fois si le script tourne plusieurs fois
  if (document.getElementById('newsletter-box-cds')) return;

  var wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="newsletter-box-cds" style="
        background-color:#ffffff;
        border:1px solid #0F4C3A;
        border-left:5px solid #0F4C3A;
        border-radius:6px;
        padding:28px 32px;
        max-width:540px;
        margin:40px auto;
        font-family:Georgia,'Times New Roman',serif;
        text-align:left;">

      <h3 style="color:#0F4C3A;font-size:1.3rem;font-weight:700;margin:0 0 10px 0;">
        Restez informé
      </h3>

      <p style="color:#333333;font-size:0.95rem;line-height:1.5;margin:0 0 20px 0;">
        Recevez les nouveaux articles du Couloir du Savoir directement par email :
        analyses pédagogiques, tribunes, actualités de l'éducation.
      </p>

      <form action="https://buttondown.email/api/emails/embed-subscribe/lecouloirdusavoir"
            method="post" target="popupwindow"
            onsubmit="window.open('https://buttondown.email/lecouloirdusavoir','popupwindow')"
            style="display:flex;gap:10px;flex-wrap:wrap;">

        <input type="email" name="email" placeholder="Votre adresse email" required
               style="flex:1;min-width:200px;padding:12px 14px;border:1px solid #cccccc;
                      border-radius:4px;font-size:0.95rem;font-family:inherit;" />

        <input type="hidden" value="1" name="embed" />

        <button type="submit" style="
            background-color:#0F4C3A;color:#ffffff;border:none;padding:12px 24px;
            border-radius:4px;font-size:0.95rem;font-weight:600;cursor:pointer;
            font-family:inherit;">
          S'abonner
        </button>
      </form>

      <p style="color:#777777;font-size:0.8rem;margin:14px 0 0 0;">
        Un email par nouvel article. Désabonnement en un clic, à tout moment.
      </p>
    </div>
  `;

  document.body.appendChild(wrapper);

});
/* ============================================================
   FORMULAIRE D'ABONNEMENT - Le Couloir du Savoir
   À COLLER À LA TOUTE FIN DU FICHIER main.js
   (ne touche à rien d'existant, s'ajoute simplement en bas)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Évite d'injecter le formulaire deux fois si le script tourne plusieurs fois
  if (document.getElementById('newsletter-box-cds')) return;

  var wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="newsletter-box-cds" style="
        background-color:#ffffff;
        border:1px solid #0F4C3A;
        border-left:5px solid #0F4C3A;
        border-radius:6px;
        padding:28px 32px;
        max-width:540px;
        margin:40px auto;
        font-family:Georgia,'Times New Roman',serif;
        text-align:left;">

      <h3 style="color:#0F4C3A;font-size:1.3rem;font-weight:700;margin:0 0 10px 0;">
        Restez informé
      </h3>

      <p style="color:#333333;font-size:0.95rem;line-height:1.5;margin:0 0 20px 0;">
        Recevez les nouveaux articles du Couloir du Savoir directement par email :
        analyses pédagogiques, tribunes, actualités de l'éducation.
      </p>

      <form action="https://buttondown.email/api/emails/embed-subscribe/lecouloirdusavoir"
            method="post" target="popupwindow"
            onsubmit="window.open('https://buttondown.email/lecouloirdusavoir','popupwindow')"
            style="display:flex;gap:10px;flex-wrap:wrap;">

        <input type="email" name="email" placeholder="Votre adresse email" required
               style="flex:1;min-width:200px;padding:12px 14px;border:1px solid #cccccc;
                      border-radius:4px;font-size:0.95rem;font-family:inherit;" />

        <input type="hidden" value="1" name="embed" />

        <button type="submit" style="
            background-color:#0F4C3A;color:#ffffff;border:none;padding:12px 24px;
            border-radius:4px;font-size:0.95rem;font-weight:600;cursor:pointer;
            font-family:inherit;">
          S'abonner
        </button>
      </form>

      <p style="color:#777777;font-size:0.8rem;margin:14px 0 0 0;">
        Un email par nouvel article. Désabonnement en un clic, à tout moment.
      </p>
    </div>
  `;

  document.body.appendChild(wrapper);

});
