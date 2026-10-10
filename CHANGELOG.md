# Änderungen

## Version 0.2.1 (10.10.2026)
- Fehlerbehebung Installation auf Android: Manifest-`id` war „./“ und wurde von Chrome zu `https://explorationse.github.io/` (Ursprung) aufgelöst – keine eindeutige App-Kennung neben „ExSE Kurs“ auf demselben Ursprung. Jetzt `id`, `start_url` und `scope` = `/exse-regen/` (wie bei ExSE Kurs `/aktien-app/`).
- `orientation` „any“ (wie ExSE Kurs), Symbol-Dateinamen neu (`-v2-`), damit Chrome die Symbole frisch lädt.
- README-Formulierung korrigiert. SW-Cache regen-v4.

## Version 0.2 (10.10.2026)
- Zeitleiste in eigener Zeile über die volle Breite (Rand wie die Karte), dicke Spur (12 px), großer Regler (30 px), Berührfläche 44 px hoch, Ziehen ohne Mitscrollen (touch-action: none).
- Vergangenheit grau, Vorhersage preußischblau; Beschriftung −2 h / Jetzt / +2 h darunter.
- Abspielen und „Jetzt“ in einer kompakten Zeile links und rechts der Legende.
- SW-Cache regen-v3.

## Version 0.1 (10.10.2026)
- Erste öffentliche Testversion: DWD-Regenradar mit Animation −2 h bis +2 h im 5-Minuten-Abstand (49 Bilder, nächstliegende zuerst geladen, Wiederverwendung bei Aktualisierung), startet angehalten auf „Jetzt“, Standort, Wert am Standort, Legende, automatische Aktualisierung, RainViewer als Ausweichquelle, App-Symbol im ExSE-Stil, SW-Cache regen-v2.
