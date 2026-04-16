import type { QuizResult } from "@/types/poetry";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const tokens = Array.from(text);
  const lines: string[] = [];
  let cur = "";

  for (const t of tokens) {
    const next = cur + t;
    if (ctx.measureText(next).width > maxWidth && cur.length > 0) {
      lines.push(cur);
      cur = t;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function seedFromText(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1000) / 1000;
  };
}

export async function renderPoster(params: { result: QuizResult; width?: number; height?: number }) {
  const w = params.width ?? 1080;
  const h = params.height ?? 1440;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 不可用");
  ctx.scale(dpr, dpr);

  const seed = seedFromText(params.result.quote.id + params.result.primaryTag);
  const rnd = seededRand(seed);

  const bg0 = "#f7f2e9";
  const bg1 = "#eef3f1";
  const ink = "#101827";
  const muted = "rgba(16,24,39,0.70)";
  const accent = "#2a6f6a";
  const paper = "rgba(255,255,255,0.55)";

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, bg0);
  g.addColorStop(0.55, bg1);
  g.addColorStop(1, bg0);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#0b1220";
  for (let i = 0; i < 260; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = 0.5 + rnd() * 1.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const cardX = 88;
  const cardY = 96;
  const cardW = w - cardX * 2;
  const cardH = h - cardY * 2;

  ctx.save();
  ctx.globalAlpha = 0.98;
  ctx.fillStyle = paper;
  roundRect(ctx, cardX, cardY, cardW, cardH, 28);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(16,24,39,0.12)";
  ctx.lineWidth = 1;
  roundRect(ctx, cardX + 1, cardY + 1, cardW - 2, cardH - 2, 28);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(16,24,39,0.06)";
  ctx.fillRect(cardX + 40, cardY + 46, 2, cardH - 92);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = ink;
  ctx.font = '700 44px "Noto Serif SC", serif';
  ctx.fillText("千古名句人格测试", cardX + 62, cardY + 108);
  ctx.fillStyle = muted;
  ctx.font = '500 22px "Noto Sans SC", sans-serif';
  ctx.fillText(params.result.primaryTag + " · " + params.result.quote.personaTitle, cardX + 62, cardY + 150);
  ctx.restore();

  const quoteTop = cardY + 220;
  ctx.save();
  ctx.fillStyle = ink;
  ctx.font = '700 54px "Noto Serif SC", serif';
  const quoteLines = wrapLines(ctx, params.result.quote.line, cardW - 124);
  const quoteMax = Math.min(3, quoteLines.length);
  for (let i = 0; i < quoteMax; i++) {
    ctx.fillText(quoteLines[i], cardX + 62, quoteTop + i * 72);
  }
  ctx.fillStyle = muted;
  ctx.font = '500 22px "Noto Sans SC", sans-serif';
  ctx.fillText(`—— ${params.result.quote.dynasty} · ${params.result.quote.author}`, cardX + 62, quoteTop + quoteMax * 72 + 20);
  ctx.restore();

  const interpTop = quoteTop + quoteMax * 72 + 86;
  ctx.save();
  ctx.fillStyle = "rgba(16,24,39,0.06)";
  roundRect(ctx, cardX + 52, interpTop, cardW - 104, 360, 20);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = ink;
  ctx.font = '600 26px "Noto Sans SC", sans-serif';
  ctx.fillText("你的诗词人设解读", cardX + 82, interpTop + 58);
  ctx.fillStyle = "rgba(16,24,39,0.80)";
  ctx.font = '400 26px "Noto Sans SC", sans-serif';
  const paraLines = wrapLines(ctx, params.result.quote.modernInterpretation, cardW - 164);
  const maxLines = 7;
  const shown = paraLines.slice(0, maxLines);
  for (let i = 0; i < shown.length; i++) {
    ctx.fillText(shown[i], cardX + 82, interpTop + 112 + i * 42);
  }
  ctx.restore();

  const stampSize = 140;
  const stampX = cardX + cardW - stampSize - 64;
  const stampY = cardY + cardH - stampSize - 96;

  ctx.save();
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.88;
  roundRect(ctx, stampX, stampY, stampSize, stampSize, 22);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = '700 28px "Noto Serif SC", serif';
  const stampText = params.result.primaryTag.replace(/(豁达洒脱|温柔治愈|清冷孤傲|浪漫深情|励志昂扬|佛系淡然)/, "$1");
  const t = stampText.slice(0, 4);
  ctx.fillText(t.slice(0, 2), stampX + 36, stampY + 66);
  ctx.fillText(t.slice(2, 4) || "诗格", stampX + 36, stampY + 108);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "rgba(16,24,39,0.55)";
  ctx.font = '500 18px "Noto Sans SC", sans-serif';
  ctx.fillText("poetry-persona · share your vibe", cardX + 62, cardY + cardH - 56);
  ctx.restore();

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("导出失败"))), "image/png");
  });

  const url = URL.createObjectURL(blob);
  return { canvas, blob, url, width: w, height: h };
}

