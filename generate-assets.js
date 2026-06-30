const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const outDir = path.join(__dirname, "assets");
fs.mkdirSync(outDir, { recursive: true });

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = Array.from({ length: 256 }, (_, n) => {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      return c >>> 0;
    });
  }
  let c = 0xffffffff;
  for (const byte of buf) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crc]);
}

function png(width, height, draw) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const [r, g, b, a = 255] = draw(x, y, width, height);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([signature, chunk("IHDR", header), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

function mix(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function rect(x, y, left, top, right, bottom) {
  return x >= left && x <= right && y >= top && y <= bottom;
}

function ellipse(x, y, cx, cy, rx, ry) {
  return ((x - cx) ** 2) / (rx ** 2) + ((y - cy) ** 2) / (ry ** 2) <= 1;
}

function roundedRect(x, y, left, top, right, bottom, radius) {
  const inBox = rect(x, y, left + radius, top, right - radius, bottom) || rect(x, y, left, top + radius, right, bottom - radius);
  const corners = [
    [left + radius, top + radius],
    [right - radius, top + radius],
    [left + radius, bottom - radius],
    [right - radius, bottom - radius],
  ].some(([cx, cy]) => (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2);
  return inBox || corners;
}

function baseStudio(x, y, w, h) {
  const t = y / h;
  const r = mix(244, 221, t);
  const g = mix(251, 239, t);
  const b = mix(250, 240, t);
  const vignette = Math.min(42, Math.hypot(x - w / 2, y - h / 2) / 16);
  return [Math.max(0, r - vignette), Math.max(0, g - vignette), Math.max(0, b - vignette)];
}

function save(name, width, height, painter) {
  fs.writeFileSync(path.join(outDir, name), png(width, height, painter));
}

save("tote-bag.png", 720, 600, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (ellipse(x, y, 360, 510, 210, 32)) color = [183, 204, 199];
  if (roundedRect(x, y, 205, 150, 515, 515, 26)) color = [237, 226, 205];
  if (roundedRect(x, y, 240, 185, 480, 505, 18)) color = [244, 235, 218];
  if (Math.abs(Math.hypot((x - 285) / 58, (y - 155) / 78) - 1) < 0.035 && y < 210) color = [104, 89, 71];
  if (Math.abs(Math.hypot((x - 435) / 58, (y - 155) / 78) - 1) < 0.035 && y < 210) color = [104, 89, 71];
  if (roundedRect(x, y, 288, 300, 432, 372, 10)) color = [0, 163, 173];
  if (rect(x, y, 310, 325, 410, 338)) color = [255, 255, 255];
  return color;
});

save("tshirt.png", 720, 600, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (ellipse(x, y, 360, 512, 230, 30)) color = [184, 204, 199];
  const shirt = roundedRect(x, y, 225, 170, 495, 510, 22) || roundedRect(x, y, 145, 220, 240, 360, 18) || roundedRect(x, y, 480, 220, 575, 360, 18);
  if (shirt) color = [250, 252, 251];
  if (ellipse(x, y, 360, 180, 62, 42)) color = baseStudio(x, y, w, h);
  if (roundedRect(x, y, 285, 310, 435, 385, 14)) color = [0, 163, 173];
  if (rect(x, y, 313, 340, 407, 352)) color = [255, 255, 255];
  if (rect(x, y, 225, 170, 495, 178)) color = [222, 232, 231];
  return color;
});

save("tumbler.png", 720, 600, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (ellipse(x, y, 360, 520, 190, 32)) color = [183, 204, 199];
  if (roundedRect(x, y, 260, 122, 460, 510, 56)) color = [238, 243, 240];
  if (roundedRect(x, y, 278, 158, 442, 500, 42)) color = [255, 255, 255];
  if (ellipse(x, y, 360, 128, 92, 28)) color = [32, 54, 58];
  if (roundedRect(x, y, 296, 288, 424, 360, 12)) color = [0, 163, 173];
  if (rect(x, y, 318, 316, 402, 328)) color = [255, 255, 255];
  if (rect(x, y, 480, 368, 586, 470)) color = [230, 169, 61];
  if (rect(x, y, 492, 350, 574, 370)) color = [216, 100, 85];
  return color;
});

save("invitation.png", 720, 600, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (ellipse(x, y, 365, 520, 245, 32)) color = [183, 204, 199];
  if (roundedRect(x, y, 205, 142, 515, 500, 12)) color = [255, 255, 255];
  if (roundedRect(x, y, 230, 168, 490, 475, 10)) color = [246, 249, 247];
  if (rect(x, y, 230, 168, 490, 196)) color = [0, 163, 173];
  if (rect(x, y, 275, 250, 445, 262) || rect(x, y, 300, 278, 420, 288) || rect(x, y, 280, 355, 440, 363)) color = [41, 70, 75];
  if (ellipse(x, y, 250, 218, 28, 28) || ellipse(x, y, 470, 430, 30, 30)) color = [230, 169, 61];
  if (ellipse(x, y, 290, 218, 18, 22) || ellipse(x, y, 430, 430, 18, 22)) color = [216, 100, 85];
  return color;
});

save("hero-printing.png", 1100, 820, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (y > 560) color = [219, 232, 228];
  if (roundedRect(x, y, 90, 170, 420, 650, 26)) color = [238, 227, 207];
  if (roundedRect(x, y, 125, 215, 385, 635, 18)) color = [245, 237, 220];
  if (roundedRect(x, y, 190, 395, 320, 468, 10)) color = [0, 163, 173];
  if (roundedRect(x, y, 515, 110, 790, 650, 54)) color = [252, 254, 253];
  if (ellipse(x, y, 652, 120, 126, 34)) color = [31, 52, 56];
  if (roundedRect(x, y, 568, 345, 736, 430, 12)) color = [0, 163, 173];
  if (roundedRect(x, y, 775, 320, 1010, 655, 12)) color = [255, 255, 255];
  if (rect(x, y, 775, 320, 1010, 356)) color = [0, 163, 173];
  if (rect(x, y, 820, 438, 965, 452) || rect(x, y, 842, 475, 943, 487)) color = [41, 70, 75];
  if (roundedRect(x, y, 395, 505, 675, 704, 20)) color = [250, 252, 251];
  if (roundedRect(x, y, 460, 585, 610, 650, 12)) color = [0, 163, 173];
  if (ellipse(x, y, 410, 695, 295, 28)) color = [166, 190, 186];
  if (ellipse(x, y, 775, 695, 260, 28)) color = [166, 190, 186];
  return color;
});

save("digital-print.png", 900, 520, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (y > 370) color = [218, 230, 229];
  if (roundedRect(x, y, 90, 92, 450, 390, 8)) color = [245, 248, 247];
  if (roundedRect(x, y, 122, 124, 418, 360, 4)) color = [255, 255, 255];
  if (rect(x, y, 122, 124, 418, 168)) color = [0, 163, 173];
  if (rect(x, y, 152, 215, 352, 228) || rect(x, y, 152, 250, 378, 260)) color = [61, 73, 74];
  if (roundedRect(x, y, 470, 150, 810, 382, 10)) color = [238, 243, 242];
  if (rect(x, y, 500, 180, 780, 210)) color = [0, 105, 112];
  if (rect(x, y, 522, 245, 758, 258) || rect(x, y, 522, 282, 705, 294)) color = [230, 169, 61];
  if (ellipse(x, y, 520, 412, 360, 24)) color = [164, 188, 186];
  return color;
});

save("large-format.png", 900, 520, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (rect(x, y, 60, 120, 840, 268)) color = [43, 58, 63];
  if (rect(x, y, 92, 150, 808, 232)) color = [27, 39, 43];
  if (rect(x, y, 125, 248, 775, 290)) color = [68, 84, 89];
  if (rect(x, y, 175, 290, 725, 415)) {
    const t = (x - 175) / 550;
    color = [mix(0, 246, t), mix(163, 72, t), mix(173, 157, t)];
  }
  if (rect(x, y, 175, 322, 725, 335)) color = [255, 255, 255];
  if (ellipse(x, y, 266, 378, 46, 32) || ellipse(x, y, 450, 350, 54, 38) || ellipse(x, y, 622, 386, 58, 34)) color = [255, 255, 255];
  if (ellipse(x, y, 450, 440, 380, 25)) color = [162, 187, 185];
  return color;
});

save("offset-print.png", 900, 520, (x, y, w, h) => {
  let color = baseStudio(x, y, w, h);
  if (rect(x, y, 110, 98, 790, 250)) color = [45, 62, 68];
  if (rect(x, y, 160, 128, 740, 175)) color = [21, 31, 35];
  if (rect(x, y, 190, 188, 710, 222)) color = [230, 169, 61];
  if (rect(x, y, 150, 255, 745, 395)) color = [235, 242, 241];
  if (rect(x, y, 150, 270, 745, 276) || rect(x, y, 150, 300, 745, 306) || rect(x, y, 150, 330, 745, 336) || rect(x, y, 150, 360, 745, 366)) color = [188, 201, 202];
  if (rect(x, y, 780, 108, 820, 390)) color = [33, 47, 52];
  if (ellipse(x, y, 800, 155, 10, 10)) color = [0, 163, 173];
  if (ellipse(x, y, 800, 190, 10, 10)) color = [216, 100, 85];
  if (ellipse(x, y, 450, 424, 360, 24)) color = [162, 187, 185];
  return color;
});

save("map-preview.png", 900, 620, (x, y, w, h) => {
  let color = [242, 247, 247];
  if ((x + y * 0.5) % 120 < 8) color = [220, 230, 230];
  if ((x * 0.3 + y) % 150 < 7) color = [213, 225, 225];
  if (Math.abs(y - (210 + Math.sin(x / 75) * 32)) < 14) color = [0, 105, 112];
  if (Math.abs(x - (500 + Math.sin(y / 82) * 42)) < 12) color = [0, 163, 173];
  if (roundedRect(x, y, 330, 190, 570, 365, 12)) color = [255, 255, 255];
  if (roundedRect(x, y, 358, 220, 542, 255, 6)) color = [0, 105, 112];
  if (rect(x, y, 370, 292, 530, 306) || rect(x, y, 395, 322, 505, 334)) color = [61, 73, 74];
  if (ellipse(x, y, 450, 405, 34, 34)) color = [216, 100, 85];
  if (ellipse(x, y, 450, 405, 14, 14)) color = [255, 255, 255];
  return color;
});
