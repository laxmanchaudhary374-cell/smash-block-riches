// Premium Power-Up Renderer
// Creates high-quality graphical icons matching Space Outlaw reference

import { PowerUp, PowerUpType } from '@/types/game';

// Power-up pill dimensions - made bigger for mobile visibility
const POWERUP_WIDTH = 50;
const POWERUP_HEIGHT = 26;

// ============ ICON DRAWING FUNCTIONS ============

// Draw fiery ball icon (ball engulfed in flames)
const drawFireballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Outer flame aura
  const flameGrad = ctx.createRadialGradient(x, y, size * 0.15, x, y, size * 0.5);
  flameGrad.addColorStop(0, 'hsla(50, 100%, 70%, 0.9)');
  flameGrad.addColorStop(0.4, 'hsla(30, 100%, 55%, 0.7)');
  flameGrad.addColorStop(0.7, 'hsla(15, 100%, 50%, 0.4)');
  flameGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Flame tongues around the ball
  ctx.fillStyle = 'hsl(30, 100%, 55%)';
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const flameLen = size * (0.3 + Math.random() * 0.15);
    const tipX = x + Math.cos(angle) * flameLen;
    const tipY = y + Math.sin(angle) * flameLen;
    const base1X = x + Math.cos(angle - 0.3) * size * 0.2;
    const base1Y = y + Math.sin(angle - 0.3) * size * 0.2;
    const base2X = x + Math.cos(angle + 0.3) * size * 0.2;
    const base2Y = y + Math.sin(angle + 0.3) * size * 0.2;
    
    ctx.beginPath();
    ctx.moveTo(base1X, base1Y);
    ctx.quadraticCurveTo(tipX, tipY, base2X, base2Y);
    ctx.fill();
  }
  
  // Main ball (hot core)
  const ballGrad = ctx.createRadialGradient(x - size * 0.1, y - size * 0.1, 0, x, y, size * 0.25);
  ballGrad.addColorStop(0, 'hsl(60, 100%, 95%)');
  ballGrad.addColorStop(0.3, 'hsl(45, 100%, 70%)');
  ballGrad.addColorStop(0.6, 'hsl(30, 100%, 55%)');
  ballGrad.addColorStop(1, 'hsl(15, 100%, 45%)');
  
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(x - size * 0.08, y - size * 0.08, size * 0.07, 0, Math.PI * 2);
  ctx.fill();
};

// Draw blue glowing circle background (shared helper)
const drawBlueCircleBackground = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const circleRadius = size * 0.42;
  
  // Outer glow
  const outerGlow = ctx.createRadialGradient(x, y, circleRadius * 0.7, x, y, circleRadius * 1.4);
  outerGlow.addColorStop(0, 'hsla(200, 100%, 60%, 0.4)');
  outerGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius * 1.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Main blue circle
  const circleGrad = ctx.createRadialGradient(x - circleRadius * 0.3, y - circleRadius * 0.3, 0, x, y, circleRadius);
  circleGrad.addColorStop(0, 'hsl(200, 90%, 65%)');
  circleGrad.addColorStop(0.5, 'hsl(205, 85%, 50%)');
  circleGrad.addColorStop(1, 'hsl(210, 80%, 40%)');
  
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner highlight ring
  ctx.strokeStyle = 'hsla(195, 100%, 75%, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius - 2, 0, Math.PI * 2);
  ctx.stroke();
  
  // Outer bright edge
  ctx.strokeStyle = 'hsla(190, 100%, 80%, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius + 1, 0, Math.PI * 2);
  ctx.stroke();
  
  // Highlight arc on top
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius - 4, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
};

// Draw multi-ball icon (2 white balls in blue circle)
const drawMultiballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background
  drawBlueCircleBackground(ctx, x, y, size);
  
  // Two white balls
  const ballRadius = size * 0.14;
  const spacing = size * 0.18;
  
  // Draw two white balls
  [x - spacing, x + spacing].forEach(bx => {
    const ballGrad = ctx.createRadialGradient(bx - ballRadius * 0.3, y - ballRadius * 0.3, 0, bx, y, ballRadius);
    ballGrad.addColorStop(0, 'white');
    ballGrad.addColorStop(0.5, 'hsl(0, 0%, 90%)');
    ballGrad.addColorStop(1, 'hsl(0, 0%, 75%)');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
  });
};

// Draw 7-ball icon (3 white balls in triangle pattern inside blue circle)
const drawSevenballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background
  drawBlueCircleBackground(ctx, x, y, size);
  
  const ballRadius = size * 0.1;
  
  // Triangle pattern - 1 on top, 2 on bottom (like reference image)
  const positions = [
    { dx: 0, dy: -0.12 },         // Top center
    { dx: -0.15, dy: 0.12 },      // Bottom left
    { dx: 0.15, dy: 0.12 },       // Bottom right
  ];
  
  positions.forEach(pos => {
    const bx = x + pos.dx * size;
    const by = y + pos.dy * size;
    
    const ballGrad = ctx.createRadialGradient(bx - ballRadius * 0.3, by - ballRadius * 0.3, 0, bx, by, ballRadius);
    ballGrad.addColorStop(0, 'white');
    ballGrad.addColorStop(0.5, 'hsl(0, 0%, 90%)');
    ballGrad.addColorStop(1, 'hsl(0, 0%, 75%)');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, by, ballRadius, 0, Math.PI * 2);
    ctx.fill();
  });
};

// Draw big ball icon (large steel ball - pure HD steel look)
const drawBigballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const ballRadius = size * 0.4;
  
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, ballRadius * 0.5, x, y, ballRadius * 1.3);
  glowGrad.addColorStop(0, 'hsla(210, 30%, 70%, 0.5)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius * 1.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Main steel ball with chrome gradient
  const ballGrad = ctx.createRadialGradient(x - ballRadius * 0.3, y - ballRadius * 0.3, 0, x, y, ballRadius);
  ballGrad.addColorStop(0, 'hsl(210, 15%, 95%)');   // Bright highlight
  ballGrad.addColorStop(0.15, 'hsl(210, 10%, 80%)'); // Light steel
  ballGrad.addColorStop(0.4, 'hsl(215, 12%, 60%)');  // Mid steel
  ballGrad.addColorStop(0.7, 'hsl(220, 15%, 45%)');  // Dark steel
  ballGrad.addColorStop(1, 'hsl(225, 20%, 30%)');    // Edge shadow
  
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Chrome reflection band
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.clip();
  
  const reflectGrad = ctx.createLinearGradient(x - ballRadius, y - ballRadius * 0.3, x + ballRadius, y - ballRadius * 0.1);
  reflectGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  reflectGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
  reflectGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
  reflectGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
  reflectGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = reflectGrad;
  ctx.fillRect(x - ballRadius, y - ballRadius * 0.5, ballRadius * 2, ballRadius * 0.6);
  ctx.restore();
  
  // Main highlight (top-left bright spot)
  const highlightGrad = ctx.createRadialGradient(
    x - ballRadius * 0.3, y - ballRadius * 0.3, 0,
    x - ballRadius * 0.3, y - ballRadius * 0.3, ballRadius * 0.35
  );
  highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  highlightGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
  highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = highlightGrad;
  ctx.beginPath();
  ctx.arc(x - ballRadius * 0.25, y - ballRadius * 0.25, ballRadius * 0.35, 0, Math.PI * 2);
  ctx.fill();
};

// Draw slow/arrow down icon (arrow pointing down for speed decrease)
const drawSlowIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 0.5);
  glowGrad.addColorStop(0, 'hsla(195, 100%, 70%, 0.5)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Arrow down shape (cyan/blue for slow - speed decrease is positive)
  const arrowGrad = ctx.createLinearGradient(x, y - size * 0.35, x, y + size * 0.35);
  arrowGrad.addColorStop(0, 'hsl(195, 100%, 75%)');
  arrowGrad.addColorStop(0.5, 'hsl(195, 100%, 55%)');
  arrowGrad.addColorStop(1, 'hsl(210, 100%, 45%)');
  
  ctx.fillStyle = arrowGrad;
  ctx.beginPath();
  // Arrow stem
  ctx.moveTo(x - size * 0.12, y - size * 0.35);
  ctx.lineTo(x + size * 0.12, y - size * 0.35);
  ctx.lineTo(x + size * 0.12, y + size * 0.05);
  // Arrow head pointing DOWN
  ctx.lineTo(x + size * 0.35, y + size * 0.05);
  ctx.lineTo(x, y + size * 0.4);
  ctx.lineTo(x - size * 0.35, y + size * 0.05);
  ctx.lineTo(x - size * 0.12, y + size * 0.05);
  ctx.closePath();
  ctx.fill();
  
  // Highlight edge
  ctx.strokeStyle = 'hsl(195, 100%, 85%)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Inner highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.moveTo(x - size * 0.08, y - size * 0.3);
  ctx.lineTo(x + size * 0.02, y - size * 0.3);
  ctx.lineTo(x + size * 0.02, y - size * 0.1);
  ctx.lineTo(x - size * 0.08, y - size * 0.1);
  ctx.closePath();
  ctx.fill();
};

// Draw big paddle icon (white paddle with outward arrows)
const drawWidenIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const paddleWidth = size * 0.6;
  const paddleHeight = size * 0.25;
  
  // White paddle body
  const bodyGrad = ctx.createLinearGradient(x - paddleWidth/2, y - paddleHeight/2, x - paddleWidth/2, y + paddleHeight/2);
  bodyGrad.addColorStop(0, 'hsl(0, 0%, 95%)');
  bodyGrad.addColorStop(0.5, 'hsl(0, 0%, 85%)');
  bodyGrad.addColorStop(1, 'hsl(0, 0%, 70%)');
  
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2, y - paddleHeight/2, paddleWidth, paddleHeight, paddleHeight/2);
  ctx.fill();
  
  // Subtle border
  ctx.strokeStyle = 'hsl(0, 0%, 60%)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Outward arrows (white arrows pointing out)
  ctx.strokeStyle = 'hsl(195, 100%, 50%)';
  ctx.fillStyle = 'hsl(195, 100%, 60%)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Left arrow pointing left (outward)
  ctx.beginPath();
  ctx.moveTo(x - paddleWidth/2 - size * 0.08, y);
  ctx.lineTo(x - paddleWidth/2 - size * 0.22, y);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(x - paddleWidth/2 - size * 0.22, y);
  ctx.lineTo(x - paddleWidth/2 - size * 0.14, y - size * 0.1);
  ctx.lineTo(x - paddleWidth/2 - size * 0.14, y + size * 0.1);
  ctx.closePath();
  ctx.fill();
  
  // Right arrow pointing right (outward)
  ctx.beginPath();
  ctx.moveTo(x + paddleWidth/2 + size * 0.08, y);
  ctx.lineTo(x + paddleWidth/2 + size * 0.22, y);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(x + paddleWidth/2 + size * 0.22, y);
  ctx.lineTo(x + paddleWidth/2 + size * 0.14, y - size * 0.1);
  ctx.lineTo(x + paddleWidth/2 + size * 0.14, y + size * 0.1);
  ctx.closePath();
  ctx.fill();
};

// Draw shrink paddle (white smaller paddle with inward arrows)
const drawShrinkIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const paddleWidth = size * 0.35;
  const paddleHeight = size * 0.2;
  
  // White paddle body (smaller)
  const bodyGrad = ctx.createLinearGradient(x - paddleWidth/2, y - paddleHeight/2, x - paddleWidth/2, y + paddleHeight/2);
  bodyGrad.addColorStop(0, 'hsl(0, 0%, 85%)');
  bodyGrad.addColorStop(0.5, 'hsl(0, 0%, 70%)');
  bodyGrad.addColorStop(1, 'hsl(0, 0%, 55%)');
  
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2, y - paddleHeight/2, paddleWidth, paddleHeight, paddleHeight/2);
  ctx.fill();
  
  // Subtle border
  ctx.strokeStyle = 'hsl(0, 0%, 45%)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Inward arrows (red arrows pointing inward)
  ctx.strokeStyle = 'hsl(0, 80%, 50%)';
  ctx.fillStyle = 'hsl(0, 80%, 55%)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Left arrow pointing right (inward)
  ctx.beginPath();
  ctx.moveTo(x - size * 0.42, y);
  ctx.lineTo(x - paddleWidth/2 - size * 0.08, y);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(x - paddleWidth/2 - size * 0.08, y);
  ctx.lineTo(x - paddleWidth/2 - size * 0.16, y - size * 0.08);
  ctx.lineTo(x - paddleWidth/2 - size * 0.16, y + size * 0.08);
  ctx.closePath();
  ctx.fill();
  
  // Right arrow pointing left (inward)
  ctx.beginPath();
  ctx.moveTo(x + size * 0.42, y);
  ctx.lineTo(x + paddleWidth/2 + size * 0.08, y);
  ctx.stroke();
  // Arrow head
  ctx.beginPath();
  ctx.moveTo(x + paddleWidth/2 + size * 0.08, y);
  ctx.lineTo(x + paddleWidth/2 + size * 0.16, y - size * 0.08);
  ctx.lineTo(x + paddleWidth/2 + size * 0.16, y + size * 0.08);
  ctx.closePath();
  ctx.fill();
};

// Draw magnet icon (horseshoe magnet inside blue circle)
const drawMagnetIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background
  drawBlueCircleBackground(ctx, x, y, size);
  
  // Horseshoe magnet inside
  const magnetSize = size * 0.28;
  
  ctx.save();
  ctx.translate(x, y + magnetSize * 0.15);
  
  const armWidth = magnetSize * 0.45;
  const innerRadius = magnetSize * 0.25;
  const outerRadius = innerRadius + armWidth;
  const armHeight = magnetSize * 0.5;
  
  // Draw the horseshoe (U shape)
  ctx.beginPath();
  ctx.moveTo(-outerRadius, -armHeight);
  ctx.lineTo(-outerRadius, magnetSize * 0.1);
  ctx.arc(0, magnetSize * 0.1, outerRadius, Math.PI, 0, false);
  ctx.lineTo(outerRadius, -armHeight);
  ctx.lineTo(innerRadius, -armHeight);
  ctx.lineTo(innerRadius, magnetSize * 0.1);
  ctx.arc(0, magnetSize * 0.1, innerRadius, 0, Math.PI, true);
  ctx.lineTo(-innerRadius, -armHeight);
  ctx.closePath();
  
  // Classic red/blue magnet gradient
  const magnetGrad = ctx.createLinearGradient(-outerRadius, 0, outerRadius, 0);
  magnetGrad.addColorStop(0, 'hsl(0, 85%, 55%)');
  magnetGrad.addColorStop(0.45, 'hsl(0, 85%, 50%)');
  magnetGrad.addColorStop(0.55, 'hsl(210, 85%, 50%)');
  magnetGrad.addColorStop(1, 'hsl(210, 100%, 55%)');
  ctx.fillStyle = magnetGrad;
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Pole tips
  ctx.fillStyle = 'hsl(0, 0%, 90%)';
  ctx.fillRect(-outerRadius + 1, -armHeight - 1, armWidth - 2, 3);
  ctx.fillRect(innerRadius + 1, -armHeight - 1, armWidth - 2, 3);
  
  ctx.restore();
};

// Draw auto paddle icon ("AUTO" text in blue circle - like reference)
const drawAutoPaddleIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background
  drawBlueCircleBackground(ctx, x, y, size);
  
  // Yellow "AUTO" text (like reference image)
  ctx.fillStyle = 'hsl(50, 100%, 55%)';
  ctx.font = `bold ${size * 0.22}px Orbitron`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'hsl(50, 100%, 40%)';
  ctx.shadowBlur = 4;
  ctx.fillText('AUTO', x, y);
  ctx.shadowBlur = 0;
};

// Draw shock/lightning icon (white bolt in blue circle - like reference)
const drawShockIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background
  drawBlueCircleBackground(ctx, x, y, size);
  
  // White lightning bolt
  ctx.fillStyle = 'white';
  ctx.beginPath();
  // Clean lightning bolt shape
  const s = size * 0.25;
  ctx.moveTo(x + s * 0.15, y - s * 1.1);  // Top right
  ctx.lineTo(x - s * 0.4, y - s * 0.1);    // Middle left
  ctx.lineTo(x + s * 0.1, y - s * 0.1);    // Middle right inner
  ctx.lineTo(x - s * 0.15, y + s * 1.1);   // Bottom point
  ctx.lineTo(x + s * 0.4, y + s * 0.1);    // Middle right
  ctx.lineTo(x - s * 0.1, y + s * 0.1);    // Middle left inner
  ctx.closePath();
  ctx.fill();
  
  // Subtle highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 0.5;
  ctx.stroke();
};

// Draw laser paddle (paddle with laser beams)
const drawLaserIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const paddleWidth = size * 0.8;
  const paddleHeight = size * 0.3;
  
  // Paddle base
  ctx.fillStyle = 'hsl(200, 60%, 45%)';
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2, y, paddleWidth, paddleHeight, paddleHeight/2);
  ctx.fill();
  
  ctx.fillStyle = 'hsl(0, 85%, 50%)';
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2 + 3, y + 2, paddleWidth - 6, paddleHeight - 4, (paddleHeight - 4)/2);
  ctx.fill();
  
  // Laser beams
  const laserGrad = ctx.createLinearGradient(x, y - size * 0.4, x, y);
  laserGrad.addColorStop(0, 'hsl(0, 100%, 70%)');
  laserGrad.addColorStop(0.5, 'hsl(0, 100%, 55%)');
  laserGrad.addColorStop(1, 'hsl(30, 100%, 50%)');
  
  ctx.fillStyle = laserGrad;
  ctx.fillRect(x - size * 0.3, y - size * 0.35, size * 0.08, size * 0.35);
  ctx.fillRect(x + size * 0.22, y - size * 0.35, size * 0.08, size * 0.35);
  
  // Laser tips
  ctx.fillStyle = 'hsl(40, 100%, 70%)';
  ctx.beginPath();
  ctx.moveTo(x - size * 0.3, y - size * 0.35);
  ctx.lineTo(x - size * 0.26, y - size * 0.5);
  ctx.lineTo(x - size * 0.22, y - size * 0.35);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(x + size * 0.22, y - size * 0.35);
  ctx.lineTo(x + size * 0.26, y - size * 0.5);
  ctx.lineTo(x + size * 0.3, y - size * 0.35);
  ctx.fill();
};

// Draw time freeze / snowflake
const drawFreezeIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // 3D ice crystal snowflake
  const crystalSize = size * 0.4;
  
  // Glow
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, crystalSize * 1.5);
  glowGrad.addColorStop(0, 'hsla(195, 100%, 80%, 0.4)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, crystalSize * 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Main crystal arms
  ctx.strokeStyle = 'hsl(195, 100%, 85%)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const endX = x + Math.cos(angle) * crystalSize;
    const endY = y + Math.sin(angle) * crystalSize;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Side branches
    const branchLen = crystalSize * 0.4;
    const midX = x + Math.cos(angle) * crystalSize * 0.6;
    const midY = y + Math.sin(angle) * crystalSize * 0.6;
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + Math.cos(angle + 0.6) * branchLen, midY + Math.sin(angle + 0.6) * branchLen);
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + Math.cos(angle - 0.6) * branchLen, midY + Math.sin(angle - 0.6) * branchLen);
    ctx.stroke();
  }
  
  // Center jewel
  const centerGrad = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, crystalSize * 0.25);
  centerGrad.addColorStop(0, 'hsl(195, 100%, 95%)');
  centerGrad.addColorStop(1, 'hsl(195, 100%, 70%)');
  ctx.fillStyle = centerGrad;
  ctx.beginPath();
  ctx.arc(x, y, crystalSize * 0.2, 0, Math.PI * 2);
  ctx.fill();
};

// Draw shield icon (horizontal line barrier at bottom)
const drawShieldIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 0.5);
  glowGrad.addColorStop(0, 'hsla(200, 100%, 70%, 0.4)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Shield barrier line
  const lineWidth = size * 0.8;
  const lineHeight = size * 0.15;
  
  // Main barrier line
  const barrierGrad = ctx.createLinearGradient(x - lineWidth/2, y, x + lineWidth/2, y);
  barrierGrad.addColorStop(0, 'hsl(200, 100%, 70%)');
  barrierGrad.addColorStop(0.5, 'hsl(195, 100%, 80%)');
  barrierGrad.addColorStop(1, 'hsl(200, 100%, 70%)');
  
  ctx.fillStyle = barrierGrad;
  ctx.shadowColor = 'hsl(200, 100%, 60%)';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.roundRect(x - lineWidth/2, y + size * 0.15, lineWidth, lineHeight, lineHeight/2);
  ctx.fill();
  ctx.shadowBlur = 0;
  
  // Energy pulses on the line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  for (let i = 0; i < 3; i++) {
    const pulseX = x - lineWidth * 0.3 + i * lineWidth * 0.3;
    ctx.beginPath();
    ctx.arc(pulseX, y + size * 0.15 + lineHeight/2, lineHeight * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Small shield icon above
  ctx.strokeStyle = 'hsl(200, 100%, 75%)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.35);
  ctx.lineTo(x - size * 0.2, y - size * 0.2);
  ctx.lineTo(x - size * 0.2, y);
  ctx.quadraticCurveTo(x, y + size * 0.1, x, y + size * 0.1);
  ctx.quadraticCurveTo(x, y + size * 0.1, x + size * 0.2, y);
  ctx.lineTo(x + size * 0.2, y - size * 0.2);
  ctx.closePath();
  ctx.stroke();
  
  ctx.fillStyle = 'hsla(200, 100%, 60%, 0.5)';
  ctx.fill();
};

// Draw speedup icon (white arrow pointing UP in blue circle - negative power-up)
const drawSpeedupIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Blue circle background (slightly red-tinted for negative)
  const circleRadius = size * 0.42;
  
  // Outer glow
  const outerGlow = ctx.createRadialGradient(x, y, circleRadius * 0.7, x, y, circleRadius * 1.4);
  outerGlow.addColorStop(0, 'hsla(20, 100%, 50%, 0.4)');
  outerGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius * 1.4, 0, Math.PI * 2);
  ctx.fill();
  
  // Red-tinted circle for negative effect
  const circleGrad = ctx.createRadialGradient(x - circleRadius * 0.3, y - circleRadius * 0.3, 0, x, y, circleRadius);
  circleGrad.addColorStop(0, 'hsl(15, 85%, 55%)');
  circleGrad.addColorStop(0.5, 'hsl(10, 80%, 45%)');
  circleGrad.addColorStop(1, 'hsl(5, 75%, 35%)');
  
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = 'hsla(15, 100%, 65%, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, circleRadius - 2, 0, Math.PI * 2);
  ctx.stroke();
  
  // White arrow pointing UP
  ctx.fillStyle = 'white';
  ctx.beginPath();
  const s = size * 0.18;
  // Arrow head pointing UP
  ctx.moveTo(x, y - s * 1.2);              // Top point
  ctx.lineTo(x + s * 0.9, y + s * 0.1);    // Bottom right of head
  ctx.lineTo(x + s * 0.35, y + s * 0.1);   // Inner right
  ctx.lineTo(x + s * 0.35, y + s * 1.0);   // Bottom right of stem
  ctx.lineTo(x - s * 0.35, y + s * 1.0);   // Bottom left of stem
  ctx.lineTo(x - s * 0.35, y + s * 0.1);   // Inner left
  ctx.lineTo(x - s * 0.9, y + s * 0.1);    // Bottom left of head
  ctx.closePath();
  ctx.fill();
};

// Draw extra life icon (heart)
const drawExtraLifeIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const heartSize = size * 0.4;
  
  // Glow
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, heartSize * 1.5);
  glowGrad.addColorStop(0, 'hsla(350, 100%, 60%, 0.4)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, heartSize * 1.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Heart shape gradient
  const heartGrad = ctx.createRadialGradient(x - heartSize * 0.2, y - heartSize * 0.3, 0, x, y, heartSize);
  heartGrad.addColorStop(0, 'hsl(350, 100%, 75%)');
  heartGrad.addColorStop(0.4, 'hsl(350, 90%, 55%)');
  heartGrad.addColorStop(1, 'hsl(340, 80%, 40%)');
  
  ctx.fillStyle = heartGrad;
  ctx.beginPath();
  ctx.moveTo(x, y + heartSize * 0.5);
  ctx.bezierCurveTo(x - heartSize * 1.2, y - heartSize * 0.2, x - heartSize * 0.6, y - heartSize * 0.9, x, y - heartSize * 0.3);
  ctx.bezierCurveTo(x + heartSize * 0.6, y - heartSize * 0.9, x + heartSize * 1.2, y - heartSize * 0.2, x, y + heartSize * 0.5);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(x - heartSize * 0.25, y - heartSize * 0.25, heartSize * 0.18, 0, Math.PI * 2);
  ctx.fill();
};

// ============ MAIN RENDERER ============

export const drawPowerUp = (
  ctx: CanvasRenderingContext2D,
  powerUp: PowerUp,
  gameTime: number
): void => {
  const { x, y, width, height, type } = powerUp;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const iconSize = Math.min(width, height) * 1.3; // Bigger icons since no box
  
  ctx.save();
  
  // Animated pulse
  const pulse = 1 + Math.sin(gameTime * 5) * 0.08;
  
  // Get colors based on type
  const { glowColor, isNegative } = getPowerUpColors(type);
  
  // Just draw a subtle glow behind the icon (no box)
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 18 * pulse;
  
  // Very subtle background glow circle
  const bgGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, iconSize * 0.5);
  bgGlow.addColorStop(0, isNegative ? 'rgba(150, 50, 50, 0.3)' : 'rgba(50, 150, 150, 0.3)');
  bgGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bgGlow;
  ctx.beginPath();
  ctx.arc(centerX, centerY, iconSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  
  // Draw the icon (now without any box)
  drawPowerUpIcon(ctx, type, centerX, centerY, iconSize);
  
  ctx.restore();
};

const drawPowerUpIcon = (
  ctx: CanvasRenderingContext2D,
  type: PowerUpType,
  x: number,
  y: number,
  size: number
): void => {
  switch (type) {
    case 'fireball':
      drawFireballIcon(ctx, x, y, size);
      break;
    case 'multiball':
      drawMultiballIcon(ctx, x, y, size);
      break;
    case 'sevenball':
      drawSevenballIcon(ctx, x, y, size);
      break;
    case 'bigball':
      drawBigballIcon(ctx, x, y, size);
      break;
    case 'slow':
      drawSlowIcon(ctx, x, y, size);
      break;
    case 'widen':
      drawWidenIcon(ctx, x, y, size);
      break;
    case 'shrink':
      drawShrinkIcon(ctx, x, y, size);
      break;
    case 'extralife':
      drawExtraLifeIcon(ctx, x, y, size);
      break;
    case 'laser':
      drawLaserIcon(ctx, x, y, size);
      break;
    case 'magnet':
      drawMagnetIcon(ctx, x, y, size);
      break;
    case 'shield':
      drawShieldIcon(ctx, x, y, size);
      break;
    case 'speedup':
      drawSpeedupIcon(ctx, x, y, size);
      break;
    case 'autopaddle':
      drawAutoPaddleIcon(ctx, x, y, size);
      break;
    case 'shock':
      drawShockIcon(ctx, x, y, size);
      break;
  }
};

const getPowerUpColors = (type: PowerUpType): { bgColor: string; glowColor: string; isNegative: boolean } => {
  const configs: Record<PowerUpType, { bgColor: string; glowColor: string; isNegative: boolean }> = {
    fireball: { bgColor: 'hsl(25, 90%, 45%)', glowColor: 'hsla(30, 100%, 55%, 0.7)', isNegative: false },
    multiball: { bgColor: 'hsl(20, 85%, 45%)', glowColor: 'hsla(25, 100%, 50%, 0.7)', isNegative: false },
    sevenball: { bgColor: 'hsl(280, 70%, 50%)', glowColor: 'hsla(280, 100%, 60%, 0.7)', isNegative: false },
    bigball: { bgColor: 'hsl(40, 85%, 50%)', glowColor: 'hsla(45, 100%, 60%, 0.7)', isNegative: false },
    slow: { bgColor: 'hsl(195, 85%, 45%)', glowColor: 'hsla(195, 100%, 60%, 0.7)', isNegative: false },
    widen: { bgColor: 'hsl(180, 70%, 40%)', glowColor: 'hsla(180, 100%, 55%, 0.7)', isNegative: false },
    shrink: { bgColor: 'hsl(0, 40%, 30%)', glowColor: 'hsla(0, 60%, 40%, 0.5)', isNegative: true },
    extralife: { bgColor: 'hsl(130, 65%, 40%)', glowColor: 'hsla(130, 80%, 50%, 0.7)', isNegative: false },
    laser: { bgColor: 'hsl(0, 75%, 45%)', glowColor: 'hsla(0, 100%, 55%, 0.7)', isNegative: false },
    magnet: { bgColor: 'hsl(280, 60%, 45%)', glowColor: 'hsla(280, 80%, 55%, 0.7)', isNegative: false },
    shield: { bgColor: 'hsl(200, 80%, 45%)', glowColor: 'hsla(200, 100%, 60%, 0.7)', isNegative: false },
    speedup: { bgColor: 'hsl(35, 45%, 30%)', glowColor: 'hsla(35, 70%, 45%, 0.5)', isNegative: true },
    autopaddle: { bgColor: 'hsl(120, 65%, 40%)', glowColor: 'hsla(120, 80%, 55%, 0.7)', isNegative: false },
    shock: { bgColor: 'hsl(55, 90%, 45%)', glowColor: 'hsla(60, 100%, 60%, 0.7)', isNegative: false },
  };
  return configs[type];
};

const adjustBrightness = (hsl: string, amount: number): string => {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hsl;
  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = Math.max(0, Math.min(100, parseInt(match[3]) + amount));
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Export power-up dimensions for game utils
export const POWERUP_DIMENSIONS = { width: POWERUP_WIDTH, height: POWERUP_HEIGHT };
