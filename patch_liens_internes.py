#!/usr/bin/env python3
# coding: utf-8
"""
Script de correction des liens internes — Le Couloir du Savoir
Exécuter dans le dossier où se trouvent vos fichiers HTML.
Usage : python3 patch_liens_internes.py
"""

import os

BLOC_LPT = """
    <!-- LIENS INTERNES SEO -->
    <div style="background:#fdf9f2;border:2px solid #CC9900;padding:1.5rem 1.8rem;margin:2.5rem 0 1.5rem;position:relative;">
      <span style="position:absolute;top:-0.7rem;left:1.2rem;background:#fdf9f2;padding:0 0.5rem;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;color:#003366;text-transform:uppercase;">À lire aussi</span>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:0.5rem;">
        <a href="article-explicite-constructivisme-senegal.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ Constructivisme et enseignement explicite : l'enseignant sénégalais n'a pas à choisir</a>
        <a href="apc-creaq.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ L'APC au Sénégal et le CREAQ : quand l'encadrement devient levier de qualité</a>
        <a href="espace-inspecteurs.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ Espace Inspecteurs : ressources pour les cadres de l'éducation</a>
        <a href="creaq.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ Le CREAQ en action : dispositif d'encadrement pédagogique par les pairs</a>
        <a href="maturite-professionnelle-enseignant.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;">→ Enseignant, es-tu mature ? La maturité professionnelle et ses deux variables</a>
      </div>
    </div>

"""

BLOC_CONSTRUCTIVISME = """
    <!-- LIENS INTERNES SEO -->
    <div style="background:#fdf9f2;border:2px solid #CC9900;padding:1.5rem 1.8rem;margin:2.5rem 0 1.5rem;position:relative;">
      <span style="position:absolute;top:-0.7rem;left:1.2rem;background:#fdf9f2;padding:0 0.5rem;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;color:#003366;text-transform:uppercase;">À lire aussi</span>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:0.5rem;">
        <a href="article-lpt-relit-mohebs-senegal.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ De la LPT au MOHEBS : comprendre le fil conducteur des réformes de la lecture</a>
        <a href="apc-creaq.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ L'APC au Sénégal et le CREAQ : quand l'encadrement devient levier de qualité</a>
        <a href="creaq.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ Le CREAQ en action : dispositif d'encadrement pédagogique par les pairs</a>
        <a href="lexique.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;border-bottom:1px solid rgba(0,51,102,0.08);">→ Lexique : ZPD, constructivisme, Stivation et tous les concepts clés</a>
        <a href="maturite-professionnelle-enseignant.html" style="color:#003366;text-decoration:none;font-size:0.93rem;padding:0.4rem 0;">→ Enseignant, es-tu mature ? Motivation et maîtrise des habiletés professionnelles</a>
      </div>
    </div>

"""

PATCHES = [
    {
        "fichier": "article-lpt-relit-mohebs-senegal.html",
        "ancre": '  <div class="partage">',
        "insertion": BLOC_LPT + '  <div class="partage">',
    },
    {
        "fichier": "article-explicite-constructivisme-senegal.html",
        "ancre": '<div class="partage">',
        "insertion": BLOC_CONSTRUCTIVISME + '<div class="partage">',
    },
]

for patch in PATCHES:
    fichier = patch["fichier"]
    if not os.path.exists(fichier):
        print(f"[ABSENT] {fichier} — fichier non trouvé dans ce dossier")
        continue

    with open(fichier, "r", encoding="utf-8") as f:
        contenu = f.read()

    if "LIENS INTERNES SEO" in contenu:
        print(f"[DÉJÀ PATCHÉ] {fichier} — aucune modification")
        continue

    if patch["ancre"] not in contenu:
        print(f"[ERREUR] Ancre non trouvée dans {fichier}")
        print(f"  Ancre cherchée : {patch['ancre']}")
        continue

    nouveau = contenu.replace(patch["ancre"], patch["insertion"], 1)

    with open(fichier, "w", encoding="utf-8") as f:
        f.write(nouveau)

    print(f"[OK] {fichier} — liens internes ajoutés")

print("\nTerminé.")
