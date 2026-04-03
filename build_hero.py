#!/usr/bin/env python3
"""
build_hero.py — Le Couloir du Savoir
Lit tous les fichiers article-*.html et interactions-*.html du dépôt,
extrait leur titre, catégorie et date, puis injecte les 3 plus récents
dans le bloc hero de index.html automatiquement.
"""

import os
import re
import glob
from datetime import datetime

# ───────────────────────────────────────────────
# 1. TROUVER TOUS LES ARTICLES
# ───────────────────────────────────────────────

# Patterns de fichiers considérés comme des articles
ARTICLE_PATTERNS = [
    "article-*.html",
    "interactions-*.html",
    "article_*.html",
    "stivation-*.html",
]

# Fichiers à ignorer (pages, pas des articles)
IGNORE_FILES = {
    "index.html", "creaq.html", "lu-pour-vous.html",
    "espace-inspecteurs.html", "a-propos.html", "lexique.html",
    "politique-confidentialite.html",
}

def find_articles():
    """Trouve tous les fichiers HTML d'articles dans le répertoire courant."""
    found = set()
    for pattern in ARTICLE_PATTERNS:
        found.update(glob.glob(pattern))
    return [f for f in found if f not in IGNORE_FILES]


# ───────────────────────────────────────────────
# 2. EXTRAIRE LES MÉTADONNÉES D'UN ARTICLE
# ───────────────────────────────────────────────

# Correspondance mots-clés → catégorie affichée + classe CSS
CATEGORY_MAP = [
    (["constructivisme", "socioconstructivisme", "piaget"],     ("Pédagogie",    "cat-ped")),
    (["stivation", "alloster", "couloir", "milieu"],            ("Concept",      "cat-psych")),
    (["interaction", "entraide", "solidarit"],                  ("Pratique",     "cat-ped")),
    (["motivation", "flow", "intrinseque", "csikszentmihalyi"], ("Motivation",   "cat-ped")),
    (["vygotski", "zpd", "zone proximale"],                     ("Psychologie",  "cat-psych")),
    (["style", "apprentissage", "cognitif"],                    ("Psychologie",  "cat-psych")),
    (["giordan", "alloster"],                                   ("Psychologie",  "cat-psych")),
    (["creaq", "formation", "the", "inspecteur"],               ("CREAQ",        "cat-new")),
    (["enseignement", "explicite", "direct"],                   ("Pédagogie",    "cat-ped")),
]

def detect_category(filename, title, content):
    """Détermine la catégorie d'un article à partir de son nom et contenu."""
    text = (filename + " " + title + " " + content[:2000]).lower()
    for keywords, (label, css) in CATEGORY_MAP:
        if any(kw in text for kw in keywords):
            return label, css
    return "Article", "cat-ped"


def get_file_date(filepath):
    """Retourne la date de dernière modification du fichier."""
    return os.path.getmtime(filepath)


def extract_meta(filepath):
    """
    Extrait le titre, la catégorie et la date d'un article HTML.
    Cherche dans cet ordre :
      1. <meta property="og:title">
      2. <title>
      3. premier <h1>
    """
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return None

    # Titre : og:title
    m = re.search(r'<meta\s+property=["\']og:title["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    if m:
        title = m.group(1).strip()
    else:
        # Titre : <title>
        m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if m:
            title = re.sub(r'\s*[·|—–-].*$', '', m.group(1)).strip()
        else:
            # Titre : premier h1
            m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
            title = re.sub(r'<[^>]+>', '', m.group(1)).strip() if m else filepath

    # Nettoyer les entités HTML basiques
    title = title.replace('&amp;', '&').replace('&#8217;', ''').replace('&#8216;', ''')
    title = title.replace('&eacute;', 'é').replace('&egrave;', 'è').replace('&agrave;', 'à')

    # Catégorie
    category_label, category_css = detect_category(filepath, title, content)

    # Date de modification
    mtime = get_file_date(filepath)

    return {
        "file": filepath,
        "title": title,
        "category": category_label,
        "css": category_css,
        "mtime": mtime,
    }


# ───────────────────────────────────────────────
# 3. GÉNÉRER LE HTML DU HERO
# ───────────────────────────────────────────────

def build_hero_html(articles, count=3):
    """Génère le bloc HTML des articles dans le hero."""
    lines = []
    lines.append('    <!-- ARTICLES HERO — généré automatiquement par build_hero.py -->')
    lines.append('    <p class="hero-art-label">Derniers articles publiés</p>')
    lines.append('    <div class="hero-articles">')

    for art in articles[:count]:
        href = art["file"]
        cat  = art["category"]
        css  = art["css"]
        title = art["title"]
        lines.append(f'      <a href="{href}" class="hero-art-card">')
        lines.append(f'        <span class="hero-art-cat {css}">{cat}</span>')
        lines.append(f'        <span class="hero-art-title">{title}</span>')
        lines.append(f'        <span class="hero-art-arrow">→</span>')
        lines.append(f'      </a>')

    lines.append('    </div>')
    lines.append('    <!-- FIN ARTICLES HERO -->')
    return "\n".join(lines)


# ───────────────────────────────────────────────
# 4. INJECTER DANS INDEX.HTML
# ───────────────────────────────────────────────

START_MARKER = "<!-- ARTICLES HERO — généré automatiquement par build_hero.py -->"
END_MARKER   = "<!-- FIN ARTICLES HERO -->"

# Fallback si les marqueurs n'existent pas encore : on cherche le bloc hero-articles
FALLBACK_START = '<p class="hero-art-label">'
FALLBACK_END   = '</div><!-- /hero-articles -->'

def inject_into_index(hero_html, index_path="index.html"):
    """Remplace le bloc hero dans index.html entre les marqueurs."""
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Cas 1 : marqueurs présents
    if START_MARKER in content and END_MARKER in content:
        pattern = re.compile(
            re.escape(START_MARKER) + r'.*?' + re.escape(END_MARKER),
            re.DOTALL
        )
        new_content = pattern.sub(hero_html, content)

    # Cas 2 : chercher le bloc hero-articles existant
    elif 'class="hero-articles"' in content:
        # Remplace depuis hero-art-label jusqu'à la fermeture de hero-articles
        pattern = re.compile(
            r'<!--[^>]*ARTICLES[^>]*-->\s*\n?\s*<p class="hero-art-label">.*?</div><!--[^>]*hero[^>]*-->',
            re.DOTALL | re.IGNORECASE
        )
        if pattern.search(content):
            new_content = pattern.sub(hero_html, content)
        else:
            # Remplacement plus large : tout le bloc entre les deux marqueurs de classe
            pattern2 = re.compile(
                r'<p class="hero-art-label">.*?</div>\s*\n(\s*</div>)',
                re.DOTALL
            )
            def replacer(m):
                return hero_html + "\n" + m.group(1)
            new_content = pattern2.sub(replacer, content, count=1)
    else:
        print("⚠️  Marqueurs non trouvés dans index.html. Ajoutez les balises manuellement une première fois.")
        return False

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


# ───────────────────────────────────────────────
# 5. MAIN
# ───────────────────────────────────────────────

def main():
    print("🔍 Recherche des articles...")
    files = find_articles()

    if not files:
        print("Aucun article trouvé. Vérifiez les noms de fichiers.")
        return

    articles = []
    for f in files:
        meta = extract_meta(f)
        if meta:
            articles.append(meta)
            print(f"  ✓ {f}  →  « {meta['title'][:60]} »  [{meta['category']}]")

    # Trier par date décroissante (plus récent en premier)
    articles.sort(key=lambda x: x["mtime"], reverse=True)

    print(f"\n📰 {len(articles)} article(s) trouvé(s). Les 3 plus récents iront dans le hero.")

    hero_html = build_hero_html(articles, count=3)
    success = inject_into_index(hero_html)

    if success:
        print("\n✅ index.html mis à jour avec succès !")
    else:
        print("\n❌ Échec de l'injection. Vérifiez index.html.")


if __name__ == "__main__":
    main()
