# ExSE Regen

**Live:** https://explorationse.github.io/exse-regen/

Regenradar als Web-App (PWA) für das Android-Handy (Chrome): aktuelle Regenkarte, zentriert auf den eigenen Standort, mit Animation der letzten 2 Stunden und Vorhersage für die nächsten 2 Stunden.

## Funktionen
- Regenkarte des **Deutschen Wetterdienstes** (WMS-Layer `dwd:Niederschlagsradar`, RV-Produkt, 1 km, alle 5 Minuten), Bildabstand 5 Minuten von −2 h bis +2 h (49 Bilder, nächstliegende zuerst geladen, bereits geladene Bilder werden bei der Aktualisierung wiederverwendet)
- Standort per GPS mit Markierung, Knopf zum Zentrieren; letzter Standort wird gespeichert
- Zeile „Am Standort“: trocken / leichter, mäßiger, starker Regen, „Regen ab ca. …“ bzw. „trocken ab ca. …“ (DWD GetFeatureInfo, Zeitreihe am Standort)
- Abspielen/Anhalten, Zeitleiste zum Wischen, Knopf „Jetzt“, Anzeige „Stand“ (Zeit des letzten Radarbilds)
- Automatische Aktualisierung alle 5 Minuten und beim Zurückkehren in die App
- Legende in mm/h (Farbstufen des DWD)
- Außerhalb des DWD-Gebiets oder bei DWD-Ausfall: RainViewer (nur Vergangenheit, ohne Vorhersage)
- Seite scrollt nicht (getestet 360×800 und 412×915)

## Datenquellen und Lizenzen
| Quelle | Verwendung | Bedingungen |
|---|---|---|
| Deutscher Wetterdienst, `https://maps.dwd.de/geoserver/dwd/wms` | Radarbilder, Vorhersage, Wert am Standort | frei, ohne Schlüssel; GeoNutzV bzw. CC BY 4.0, Quellenvermerk „Quelle: Deutscher Wetterdienst“ (in der Fußzeile) |
| OpenFreeMap „Dark“ (`tiles.openfreemap.org`) | Grundkarte (Vektorkacheln) | frei, ohne Schlüssel; Nennung „OpenFreeMap © OpenMapTiles Data from OpenStreetMap“ (unten rechts auf der Karte) |
| RainViewer (`api.rainviewer.com/public/weather-maps.json`) | Ausweichquelle außerhalb Deutschlands | nur private/Bildungsnutzung, max. Zoom 7, 100 Anfragen/min je IP, keine Vorhersage (seit 01.01.2026); Nennung mit Link |
| MapLibre GL JS 6.13.0 | Kartendarstellung | BSD-3-Clause, `site/vendor/MAPLIBRE-LICENSE.txt` |
| Marcellus (Teilmenge „ExSE Regen“) | Name in der Fußzeile | SIL OFL 1.1, `site/fonts/` |

Hinweis: Die früher übliche CARTO-Grundkarte (`basemaps.cartocdn.com`) liefert seit 25.09.2026 ohne API-Schlüssel nur noch den Hinweis „API KEY REQUIRED“ und wird deshalb nicht verwendet.

## Aufbau
```
site/            # statische Web-App (wird auf GitHub Pages veröffentlicht)
  index.html, app.js, sw.js, manifest.webmanifest
  icons/         # PNG-Symbole 48–512 px, separate maskable-Symbole, Apple-Touch-Icon
  fonts/         # Marcellus-Teilmenge (OFL)
  vendor/        # MapLibre GL JS (selbst gehostet)
tools/
  make-icon.py   # erzeugt site/icon.svg (Schrift als Pfade)
  render-icons.js# rendert die PNG-Symbole und icon-preview.png
  shot.js        # Test in Headless-Chromium mit simuliertem Standort
```

## Lokal testen
```
cd site && python3 -m http.server 8091
node tools/shot.js 412 915 screenshot.png 52.52 13.405 more
```

## Installation auf dem Handy
In Chrome https://explorationse.github.io/exse-regen/ öffnen, Standort erlauben, dann Menü ⋮ → „Zum Startbildschirm hinzufügen“ bzw. „App installieren“.

## Veröffentlichung
GitHub Pages über den Workflow `.github/workflows/pages.yml` (veröffentlicht den Ordner `site/` bei jedem Push auf `main`).
