// Helper to render high-resolution 1760x1240 sketchbook spreads for ThreeUI curl physics

export function createSpreadImage(spread, index, totalSpreads) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1760;
    canvas.height = 1240;
    const ctx = canvas.getContext('2d');

    // 1. Base cream paper
    ctx.fillStyle = '#FAF7F0';
    ctx.fillRect(0, 0, 1760, 1240);

    // 2. Subtle dot grid on paper
    ctx.fillStyle = '#C8C2B3';
    const dotSpacing = 32;
    // Left page dots (avoiding spine)
    for (let x = 70; x < 830; x += dotSpacing) {
      for (let y = 70; y < 1170; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Right page dots (avoiding spine)
    for (let x = 930; x < 1690; x += dotSpacing) {
      for (let y = 70; y < 1170; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Center spine depth & crease shadow
    const spineGrad = ctx.createLinearGradient(820, 0, 940, 0);
    spineGrad.addColorStop(0, 'rgba(40, 30, 18, 0)');
    spineGrad.addColorStop(0.35, 'rgba(40, 30, 18, 0.08)');
    spineGrad.addColorStop(0.48, 'rgba(25, 18, 10, 0.22)');
    spineGrad.addColorStop(0.50, 'rgba(15, 10, 5, 0.35)');
    spineGrad.addColorStop(0.52, 'rgba(25, 18, 10, 0.22)');
    spineGrad.addColorStop(0.65, 'rgba(40, 30, 18, 0.08)');
    spineGrad.addColorStop(1, 'rgba(40, 30, 18, 0)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(820, 0, 120, 1240);

    // Center spine stitch line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(880, 20);
    ctx.lineTo(880, 1220);
    ctx.stroke();
    ctx.setLineDash([]);

    // Outer edge shadows (left and right page book curl)
    const leftEdgeGrad = ctx.createLinearGradient(0, 0, 45, 0);
    leftEdgeGrad.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
    leftEdgeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = leftEdgeGrad;
    ctx.fillRect(0, 0, 45, 1240);

    const rightEdgeGrad = ctx.createLinearGradient(1760, 0, 1715, 0);
    rightEdgeGrad.addColorStop(0, 'rgba(0, 0, 0, 0.08)');
    rightEdgeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rightEdgeGrad;
    ctx.fillRect(1715, 0, 45, 1240);

    // 4. LEFT PAGE TYPOGRAPHY & NOTES
    // Header rule
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(90, 130);
    ctx.lineTo(800, 130);
    ctx.stroke();

    // Date
    ctx.font = '600 16px "Space Mono", monospace, monospace';
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'left';
    ctx.fillText(spread.leftDate, 90, 112);

    // Page number
    ctx.font = '700 18px "Space Mono", monospace';
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'right';
    ctx.fillText(`p. 0${index * 2 + 1}`, 800, 112);

    // Title
    ctx.font = '900 32px "Akira Expanded", sans-serif';
    ctx.fillStyle = '#111111';
    ctx.textAlign = 'left';
    wrapText(ctx, spread.leftTitle, 90, 210, 700, 44);

    // Editorial Bullet Notes
    let noteY = 380;
    spread.leftNotes.forEach((note) => {
      // Bullet dot
      ctx.fillStyle = '#E84A4A';
      ctx.beginPath();
      ctx.arc(96, noteY - 6, 4, 0, Math.PI * 2);
      ctx.fill();

      // Note text
      ctx.font = '400 21px Poppins, -apple-system, sans-serif';
      ctx.fillStyle = '#333338';
      const lines = getLines(ctx, note, 680);
      lines.forEach((line) => {
        ctx.fillText(line, 116, noteY);
        noteY += 34;
      });
      noteY += 22;
    });

    // Left Page Footer
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.beginPath();
    ctx.moveTo(90, 1110);
    ctx.lineTo(800, 1110);
    ctx.stroke();

    // Tags
    let tagX = 90;
    ctx.font = '600 15px "Space Mono", monospace';
    spread.tags.forEach((tag) => {
      const tagText = `#${tag}`;
      const textWidth = ctx.measureText(tagText).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      roundRect(ctx, tagX, 1130, textWidth + 18, 30, 6);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      roundRect(ctx, tagX, 1130, textWidth + 18, 30, 6);
      ctx.stroke();

      ctx.fillStyle = '#555555';
      ctx.fillText(tagText, tagX + 9, 1151);
      tagX += textWidth + 28;
    });

    // Archive stamp
    ctx.font = '600 14px "Space Mono", monospace';
    ctx.fillStyle = '#999999';
    ctx.textAlign = 'right';
    ctx.fillText('OM BISWAS ARCHIVE // NOTEBOOK', 800, 1151);

    // 5. RIGHT PAGE HEADER & ARTWORK
    // Header rule
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.beginPath();
    ctx.moveTo(960, 130);
    ctx.lineTo(1670, 130);
    ctx.stroke();

    ctx.font = '600 16px "Space Mono", monospace';
    ctx.fillStyle = '#666666';
    ctx.textAlign = 'left';
    ctx.fillText('VISUAL SPECIFICATION & TELEMETRY', 960, 112);

    ctx.font = '700 18px "Space Mono", monospace';
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'right';
    ctx.fillText(`p. 0${index * 2 + 2}`, 1670, 112);

    // Artwork Container Box (Mat)
    const matX = 960;
    const matY = 160;
    const matW = 710;
    const matH = 910;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    roundRect(ctx, matX, matY, matW, matH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, matX, matY, matW, matH, 20);
    ctx.stroke();

    // Right Page Footer
    ctx.font = '600 16px "Space Mono", monospace';
    ctx.fillStyle = '#444444';
    ctx.textAlign = 'left';
    ctx.fillText(spread.rightCaption, 960, 1145);

    ctx.fillStyle = '#888888';
    ctx.textAlign = 'right';
    ctx.fillText('300 DPI // 1:1 RESOLUTION', 1670, 1145);

    // Load & draw images
    const img1 = new Image();
    img1.onload = () => {
      if (spread.rightImageSecondary) {
        // Draw primary in top 60% of mat
        drawImageContained(ctx, img1, matX + 24, matY + 24, matW - 48, matH * 0.58 - 36);

        const img2 = new Image();
        img2.onload = () => {
          // Draw secondary in bottom 36% of mat
          drawImageContained(ctx, img2, matX + 24, matY + matH * 0.58 + 12, matW - 48, matH * 0.38 - 36);
          resolve(canvas.toDataURL('image/jpeg', 0.92));
        };
        img2.onerror = () => resolve(canvas.toDataURL('image/jpeg', 0.92));
        img2.src = spread.rightImageSecondary;
      } else {
        // Draw single primary in full mat
        drawImageContained(ctx, img1, matX + 28, matY + 28, matW - 56, matH - 56);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      }
    };
    img1.onerror = () => resolve(canvas.toDataURL('image/jpeg', 0.92));
    img1.src = spread.rightImage;
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function getLines(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawImageContained(ctx, img, x, y, w, h) {
  const imgRatio = img.width / img.height;
  const targetRatio = w / h;
  let dw = w;
  let dh = h;
  let dx = x;
  let dy = y;

  if (imgRatio > targetRatio) {
    dh = w / imgRatio;
    dy = y + (h - dh) / 2;
  } else {
    dw = h * imgRatio;
    dx = x + (w - dw) / 2;
  }

  // Draw rounded clipped image
  ctx.save();
  roundRect(ctx, dx, dy, dw, dh, 14);
  ctx.clip();
  ctx.drawImage(img, dx, dy, dw, dh);
  ctx.restore();
}
