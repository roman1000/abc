// Run with: node gen_icons.js
const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
  const c = createCanvas(size, size);
  const ctx = c.getContext('2d');
  const s = size / 512;

  // Background
  ctx.fillStyle = '#4f7ef8';
  roundRect(ctx, 0, 0, size, size, 100 * s);
  ctx.fill();

  ctx.fillStyle = 'white';

  // Fork left tine
  roundRect(ctx, 148*s, 120*s, 24*s, 160*s, 12*s); ctx.fill();
  // Fork right tine
  roundRect(ctx, 196*s, 120*s, 24*s, 100*s, 12*s); ctx.fill();
  // Fork crossbar
  roundRect(ctx, 148*s, 200*s, 72*s, 24*s, 12*s); ctx.fill();
  // Fork handle
  roundRect(ctx, 184*s, 240*s, 24*s, 160*s, 12*s); ctx.fill();

  // Flame
  ctx.beginPath();
  ctx.moveTo(296*s, 380*s);
  ctx.bezierCurveTo(296*s,380*s, 260*s,340*s, 280*s,290*s);
  ctx.bezierCurveTo(290*s,265*s, 310*s,255*s, 310*s,255*s);
  ctx.bezierCurveTo(305*s,280*s, 320*s,295*s, 330*s,280*s);
  ctx.bezierCurveTo(345*s,255*s, 330*s,210*s, 300*s,185*s);
  ctx.bezierCurveTo(325*s,200*s, 370*s,235*s, 365*s,295*s);
  ctx.bezierCurveTo(360*s,340*s, 340*s,365*s, 340*s,380*s);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  // Inner flame
  ctx.beginPath();
  ctx.moveTo(315*s, 380*s);
  ctx.bezierCurveTo(315*s,380*s, 295*s,355*s, 305*s,325*s);
  ctx.bezierCurveTo(310*s,310*s, 325*s,305*s, 325*s,305*s);
  ctx.bezierCurveTo(320*s,320*s, 330*s,330*s, 338*s,320*s);
  ctx.bezierCurveTo(345*s,340*s, 335*s,365*s, 315*s,380*s);
  ctx.closePath();
  ctx.fillStyle = '#fbbf24';
  ctx.fill();

  return c.toBuffer('image/png');
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

fs.writeFileSync('icon-192.png', drawIcon(192));
fs.writeFileSync('icon-512.png', drawIcon(512));
console.log('Icons generated!');
