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

// Draw multi-ball icon (2 balls side by side)
const drawMultiballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const ballRadius = size * 0.25;
  const spacing = size * 0.3;
  
  // Left ball
  const leftGrad = ctx.createRadialGradient(x - spacing - ballRadius * 0.2, y - ballRadius * 0.2, 0, x - spacing, y, ballRadius);
  leftGrad.addColorStop(0, 'hsl(40, 100%, 85%)');
  leftGrad.addColorStop(0.4, 'hsl(25, 100%, 60%)');
  leftGrad.addColorStop(1, 'hsl(10, 100%, 40%)');
  ctx.fillStyle = leftGrad;
  ctx.beginPath();
  ctx.arc(x - spacing, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Right ball
  const rightGrad = ctx.createRadialGradient(x + spacing - ballRadius * 0.2, y - ballRadius * 0.2, 0, x + spacing, y, ballRadius);
  rightGrad.addColorStop(0, 'hsl(40, 100%, 85%)');
  rightGrad.addColorStop(0.4, 'hsl(25, 100%, 60%)');
  rightGrad.addColorStop(1, 'hsl(10, 100%, 40%)');
  ctx.fillStyle = rightGrad;
  ctx.beginPath();
  ctx.arc(x + spacing, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(x - spacing - ballRadius * 0.3, y - ballRadius * 0.3, ballRadius * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + spacing - ballRadius * 0.3, y - ballRadius * 0.3, ballRadius * 0.2, 0, Math.PI * 2);
  ctx.fill();
};

// Draw 7-ball icon (7 small balls arranged in pattern)
const drawSevenballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const ballRadius = size * 0.12;
  
  // Positions for 7 balls in a hexagonal pattern
  const positions = [
    { dx: 0, dy: 0 },           // Center
    { dx: -0.25, dy: -0.2 },    // Top left
    { dx: 0.25, dy: -0.2 },     // Top right
    { dx: -0.35, dy: 0.1 },     // Mid left
    { dx: 0.35, dy: 0.1 },      // Mid right
    { dx: -0.2, dy: 0.3 },      // Bottom left
    { dx: 0.2, dy: 0.3 },       // Bottom right
  ];
  
  positions.forEach((pos, i) => {
    const bx = x + pos.dx * size;
    const by = y + pos.dy * size;
    
    const ballGrad = ctx.createRadialGradient(bx - ballRadius * 0.3, by - ballRadius * 0.3, 0, bx, by, ballRadius);
    ballGrad.addColorStop(0, 'hsl(280, 100%, 85%)');
    ballGrad.addColorStop(0.5, 'hsl(280, 100%, 60%)');
    ballGrad.addColorStop(1, 'hsl(260, 100%, 40%)');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, by, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(bx - ballRadius * 0.3, by - ballRadius * 0.3, ballRadius * 0.3, 0, Math.PI * 2);
    ctx.fill();
  });
};

// Draw big ball icon (large ball with glow)
const drawBigballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const ballRadius = size * 0.4;
  
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, ballRadius * 0.5, x, y, ballRadius * 1.3);
  glowGrad.addColorStop(0, 'hsla(45, 100%, 60%, 0.4)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius * 1.3, 0, Math.PI * 2);
  ctx.fill();
  
  // Main ball
  const ballGrad = ctx.createRadialGradient(x - ballRadius * 0.3, y - ballRadius * 0.3, 0, x, y, ballRadius);
  ballGrad.addColorStop(0, 'hsl(50, 100%, 90%)');
  ballGrad.addColorStop(0.3, 'hsl(45, 100%, 70%)');
  ballGrad.addColorStop(0.7, 'hsl(40, 100%, 55%)');
  ballGrad.addColorStop(1, 'hsl(35, 100%, 40%)');
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(x - ballRadius * 0.25, y - ballRadius * 0.25, ballRadius * 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Size arrows pointing outward
  ctx.strokeStyle = 'hsl(35, 100%, 30%)';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  const arrowDist = ballRadius * 0.6;
  
  // Draw outward arrows
  [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(angle => {
    const startX = x + Math.cos(angle) * arrowDist * 0.5;
    const startY = y + Math.sin(angle) * arrowDist * 0.5;
    const endX = x + Math.cos(angle) * arrowDist;
    const endY = y + Math.sin(angle) * arrowDist;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
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

// Draw big paddle icon (red/cyan paddle)
const drawWidenIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const paddleWidth = size * 0.9;
  const paddleHeight = size * 0.3;
  
  // Outer cyan frame
  const frameGrad = ctx.createLinearGradient(x - paddleWidth/2, y, x + paddleWidth/2, y);
  frameGrad.addColorStop(0, 'hsl(195, 100%, 55%)');
  frameGrad.addColorStop(0.5, 'hsl(195, 100%, 65%)');
  frameGrad.addColorStop(1, 'hsl(195, 100%, 55%)');
  
  ctx.fillStyle = frameGrad;
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2, y - paddleHeight/2, paddleWidth, paddleHeight, paddleHeight/2);
  ctx.fill();
  
  // Inner red core
  const coreGrad = ctx.createLinearGradient(x - paddleWidth/2, y - paddleHeight/4, x - paddleWidth/2, y + paddleHeight/4);
  coreGrad.addColorStop(0, 'hsl(0, 90%, 60%)');
  coreGrad.addColorStop(0.5, 'hsl(0, 85%, 50%)');
  coreGrad.addColorStop(1, 'hsl(0, 80%, 40%)');
  
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2 + 3, y - paddleHeight/2 + 2, paddleWidth - 6, paddleHeight - 4, (paddleHeight - 4)/2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/4, y - paddleHeight/2 + 3, paddleWidth/2, paddleHeight/4, 2);
  ctx.fill();
};

// Draw shrink paddle (smaller, with inward arrows)
const drawShrinkIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const paddleWidth = size * 0.5;
  const paddleHeight = size * 0.25;
  
  // Outer dark frame
  ctx.fillStyle = 'hsl(0, 40%, 35%)';
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2, y - paddleHeight/2, paddleWidth, paddleHeight, paddleHeight/2);
  ctx.fill();
  
  // Inner darker core
  ctx.fillStyle = 'hsl(0, 50%, 30%)';
  ctx.beginPath();
  ctx.roundRect(x - paddleWidth/2 + 2, y - paddleHeight/2 + 2, paddleWidth - 4, paddleHeight - 4, (paddleHeight - 4)/2);
  ctx.fill();
  
  // Inward arrows
  ctx.strokeStyle = 'hsl(0, 60%, 50%)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  
  // Left arrow pointing right
  ctx.beginPath();
  ctx.moveTo(x - size * 0.4, y);
  ctx.lineTo(x - size * 0.28, y);
  ctx.moveTo(x - size * 0.35, y - size * 0.1);
  ctx.lineTo(x - size * 0.28, y);
  ctx.lineTo(x - size * 0.35, y + size * 0.1);
  ctx.stroke();
  
  // Right arrow pointing left
  ctx.beginPath();
  ctx.moveTo(x + size * 0.4, y);
  ctx.lineTo(x + size * 0.28, y);
  ctx.moveTo(x + size * 0.35, y - size * 0.1);
  ctx.lineTo(x + size * 0.28, y);
  ctx.lineTo(x + size * 0.35, y + size * 0.1);
  ctx.stroke();
};

// Draw sticky/magnet paddle (paddle with green vortex)
const drawMagnetIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Red/cyan magnet horseshoe
  const magnetSize = size * 0.4;
  
  // Left side (red)
  ctx.fillStyle = 'hsl(0, 85%, 55%)';
  ctx.beginPath();
  ctx.arc(x - magnetSize * 0.3, y + magnetSize * 0.2, magnetSize * 0.35, Math.PI * 0.8, Math.PI * 1.5);
  ctx.lineTo(x - magnetSize * 0.3, y - magnetSize * 0.5);
  ctx.lineTo(x - magnetSize * 0.05, y - magnetSize * 0.5);
  ctx.lineTo(x - magnetSize * 0.05, y + magnetSize * 0.05);
  ctx.arc(x - magnetSize * 0.3, y + magnetSize * 0.2, magnetSize * 0.15, Math.PI * 1.5, Math.PI * 0.8, true);
  ctx.closePath();
  ctx.fill();
  
  // Right side (cyan)
  ctx.fillStyle = 'hsl(195, 100%, 55%)';
  ctx.beginPath();
  ctx.arc(x + magnetSize * 0.3, y + magnetSize * 0.2, magnetSize * 0.35, Math.PI * 1.5, Math.PI * 0.2);
  ctx.lineTo(x + magnetSize * 0.3, y - magnetSize * 0.5);
  ctx.lineTo(x + magnetSize * 0.05, y - magnetSize * 0.5);
  ctx.lineTo(x + magnetSize * 0.05, y + magnetSize * 0.05);
  ctx.arc(x + magnetSize * 0.3, y + magnetSize * 0.2, magnetSize * 0.15, Math.PI * 0.2, Math.PI * 1.5, true);
  ctx.closePath();
  ctx.fill();
  
  // Spark at top
  ctx.fillStyle = 'hsl(30, 100%, 55%)';
  ctx.beginPath();
  ctx.moveTo(x, y - magnetSize * 0.6);
  ctx.lineTo(x - magnetSize * 0.15, y - magnetSize * 0.3);
  ctx.lineTo(x, y - magnetSize * 0.4);
  ctx.lineTo(x + magnetSize * 0.15, y - magnetSize * 0.3);
  ctx.closePath();
  ctx.fill();
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

// Draw speedup icon (arrow pointing up for speed increase)
const drawSpeedupIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 0.5);
  glowGrad.addColorStop(0, 'hsla(35, 100%, 60%, 0.5)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Arrow up shape (orange/red for danger - speed increase is negative)
  const arrowGrad = ctx.createLinearGradient(x, y + size * 0.35, x, y - size * 0.35);
  arrowGrad.addColorStop(0, 'hsl(25, 100%, 65%)');
  arrowGrad.addColorStop(0.5, 'hsl(15, 100%, 50%)');
  arrowGrad.addColorStop(1, 'hsl(5, 100%, 45%)');
  
  ctx.fillStyle = arrowGrad;
  ctx.beginPath();
  // Arrow head
  ctx.moveTo(x, y - size * 0.4);
  ctx.lineTo(x + size * 0.35, y - size * 0.05);
  ctx.lineTo(x + size * 0.12, y - size * 0.05);
  // Arrow stem
  ctx.lineTo(x + size * 0.12, y + size * 0.35);
  ctx.lineTo(x - size * 0.12, y + size * 0.35);
  ctx.lineTo(x - size * 0.12, y - size * 0.05);
  ctx.lineTo(x - size * 0.35, y - size * 0.05);
  ctx.closePath();
  ctx.fill();
  
  // Highlight edge
  ctx.strokeStyle = 'hsl(35, 100%, 75%)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Inner highlight
  ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
  ctx.beginPath();
  ctx.moveTo(x - size * 0.02, y - size * 0.3);
  ctx.lineTo(x + size * 0.15, y - size * 0.1);
  ctx.lineTo(x + size * 0.08, y - size * 0.1);
  ctx.lineTo(x - size * 0.02, y - size * 0.2);
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
  const iconSize = Math.min(width, height) * 1.2;
  
  ctx.save();
  
  // Animated pulse
  const pulse = 1 + Math.sin(gameTime * 5) * 0.08;
  
  // Get colors based on type
  const { bgColor, glowColor, isNegative } = getPowerUpColors(type);
  
  // Draw background pill with glow
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 15 * pulse;
  
  // Background pill gradient
  const pillGrad = ctx.createLinearGradient(x, y, x, y + height);
  pillGrad.addColorStop(0, adjustBrightness(bgColor, 20));
  pillGrad.addColorStop(0.4, bgColor);
  pillGrad.addColorStop(1, adjustBrightness(bgColor, -20));
  
  ctx.fillStyle = pillGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, height / 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  
  // Glossy highlight on pill
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.ellipse(centerX, y + height * 0.25, width * 0.4, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Warning border for negative power-ups
  if (isNegative) {
    ctx.strokeStyle = 'hsla(0, 100%, 40%, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, width - 2, height - 2, (height - 2) / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  } else {
    // Nice border for positive
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, width - 2, height - 2, (height - 2) / 2);
    ctx.stroke();
  }
  
  // Draw the icon
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
