// Rendert site/icon.svg als PNG-Symbole (Android/Chrome: nur PNG, separate maskable-Dateien)
const { chromium } = require('/workspace/shot/node_modules/playwright'); const fs = require('fs');
const S = __dirname + '/../site/', D = S + 'icons/';
const u = 'data:image/svg+xml;base64,' + fs.readFileSync(S + 'icon.svg').toString('base64');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const render = async (size, scale, path) => {
    await p.setViewportSize({ width: size, height: size });
    const inner = Math.round(size * scale), off = Math.round((size - inner) / 2);
    await p.setContent(`<body style="margin:0;background:#000;width:${size}px;height:${size}px;overflow:hidden"><img src="${u}" style="position:absolute;left:${off}px;top:${off}px;width:${inner}px;height:${inner}px"></body>`);
    await p.waitForTimeout(80); await p.screenshot({ path });
  };
  for (const s of [48, 96, 144, 192, 512]) await render(s, 1, `${D}icon-v2-${s}.png`);
  for (const s of [192, 512]) await render(s, 0.82, `${D}maskable-v2-${s}.png`); // Rand für runde Masken
  await render(180, 1, `${D}apple-touch-icon-v2.png`);
  await render(32, 1, `${S}favicon-32.png`); await render(16, 1, `${S}favicon-16.png`);
  // Vorschau: normal, maskable mit Kreis- und Squircle-Maske, klein
  const img = f => 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
  await p.setViewportSize({ width: 1180, height: 420 });
  await p.setContent(`<body style="margin:0;background:#202124;font:14px system-ui;color:#bbb;display:flex;gap:28px;padding:30px;align-items:flex-start">
   <figure style="margin:0;text-align:center"><img src="${img(D+'icon-v2-512.png')}" width="300"><figcaption>icon 512</figcaption></figure>
   <figure style="margin:0;text-align:center"><img src="${img(D+'maskable-v2-512.png')}" width="300" style="border-radius:50%"><figcaption>maskable, Kreis</figcaption></figure>
   <figure style="margin:0;text-align:center"><img src="${img(D+'maskable-v2-512.png')}" width="300" style="border-radius:28%"><figcaption>maskable, Squircle</figcaption></figure>
   <figure style="margin:0;text-align:center"><img src="${img(D+'maskable-v2-192.png')}" width="64" style="border-radius:50%"><figcaption>64 px</figcaption><div style="font-size:12px;color:#ddd;margin-top:6px">ExSE Regen</div></figure>
  </body>`);
  await p.waitForTimeout(150); await p.screenshot({ path: __dirname + '/../icon-preview.png' });
  await b.close();
})();
