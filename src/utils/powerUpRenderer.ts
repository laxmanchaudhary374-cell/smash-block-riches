// Premium Power-Up Renderer
// Creates high-quality graphical icons matching Space Outlaw reference

import { PowerUp, PowerUpType } from '@/types/game';

// Power-up pill dimensions - made bigger for mobile visibility
const POWERUP_WIDTH = 50;
const POWERUP_HEIGHT = 26;

// ============ ICON DRAWING FUNCTIONS ============

// Draw fiery ball icon (orange/yellow ball with flame trail)
const drawFireballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Flame trail
  const flameGrad = ctx.createRadialGradient(x + size * 0.4, y, size * 0.2, x + size * 0.8, y, size * 0.8);
  flameGrad.addColorStop(0, 'hsl(40, 100%, 60%)');
  flameGrad.addColorStop(0.5, 'hsl(25, 100%, 50%)');
  flameGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.ellipse(x + size * 0.5, y, size * 0.7, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Fire spikes
  ctx.fillStyle = 'hsl(30, 100%, 50%)';
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI - Math.PI / 2;
    const spikeX = x + size * 0.3 + Math.cos(angle) * size * 0.5;
    const spikeY = y + Math.sin(angle) * size * 0.25;
    ctx.beginPath();
    ctx.moveTo(spikeX, spikeY);
    ctx.lineTo(spikeX + size * 0.4, spikeY + size * 0.1);
    ctx.lineTo(spikeX + size * 0.3, spikeY - size * 0.1);
    ctx.closePath();
    ctx.fill();
  }
  
  // Main ball
  const ballGrad = ctx.createRadialGradient(x - size * 0.15, y - size * 0.15, 0, x, y, size * 0.4);
  ballGrad.addColorStop(0, 'hsl(50, 100%, 85%)');
  ballGrad.addColorStop(0.3, 'hsl(35, 100%, 60%)');
  ballGrad.addColorStop(0.7, 'hsl(20, 100%, 50%)');
  ballGrad.addColorStop(1, 'hsl(10, 100%, 40%)');
  
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(x - size * 0.12, y - size * 0.12, size * 0.1, 0, Math.PI * 2);
  ctx.fill();
};

// Draw multi-ball icon (main ball with smaller balls and motion trail)
const drawMultiballIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Motion trail
  const trailGrad = ctx.createRadialGradient(x + size * 0.3, y, size * 0.1, x + size * 0.6, y, size * 0.5);
  trailGrad.addColorStop(0, 'hsl(15, 100%, 50%)');
  trailGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = trailGrad;
  ctx.beginPath();
  ctx.ellipse(x + size * 0.3, y, size * 0.5, size * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Main orange ball
  const mainGrad = ctx.createRadialGradient(x - size * 0.1, y - size * 0.1, 0, x, y, size * 0.35);
  mainGrad.addColorStop(0, 'hsl(40, 100%, 70%)');
  mainGrad.addColorStop(0.5, 'hsl(25, 100%, 55%)');
  mainGrad.addColorStop(1, 'hsl(10, 100%, 40%)');
  
  ctx.fillStyle = mainGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(x - size * 0.1, y - size * 0.1, size * 0.08, 0, Math.PI * 2);
  ctx.fill();
  
  // Small trailing balls
  const smallBallGrad = ctx.createRadialGradient(x + size * 0.35, y + size * 0.15, 0, x + size * 0.35, y + size * 0.15, size * 0.12);
  smallBallGrad.addColorStop(0, 'hsl(30, 100%, 65%)');
  smallBallGrad.addColorStop(1, 'hsl(15, 100%, 45%)');
  ctx.fillStyle = smallBallGrad;
  ctx.beginPath();
  ctx.arc(x + size * 0.35, y + size * 0.15, size * 0.12, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + size * 0.45, y - size * 0.1, size * 0.08, 0, Math.PI * 2);
  ctx.fill();
};

// Draw electric/slow ball (cyan glowing sphere)
const drawSlowIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, size * 0.2, x, y, size * 0.5);
  glowGrad.addColorStop(0, 'hsla(195, 100%, 70%, 0.8)');
  glowGrad.addColorStop(0.5, 'hsla(195, 100%, 60%, 0.4)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
  ctx.fill();
  
  // Main cyan ball
  const ballGrad = ctx.createRadialGradient(x - size * 0.1, y - size * 0.1, 0, x, y, size * 0.35);
  ballGrad.addColorStop(0, 'hsl(195, 100%, 90%)');
  ballGrad.addColorStop(0.3, 'hsl(195, 100%, 65%)');
  ballGrad.addColorStop(0.7, 'hsl(200, 100%, 50%)');
  ballGrad.addColorStop(1, 'hsl(210, 100%, 40%)');
  
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(x - size * 0.12, y - size * 0.12, size * 0.1, 0, Math.PI * 2);
  ctx.fill();
  
  // Snowflake overlay
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * size * 0.2, y + Math.sin(angle) * size * 0.2);
    ctx.stroke();
  }
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

// Draw shield icon (bubble)
const drawShieldIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const shieldRadius = size * 0.38;
  
  // Outer glow
  const glowGrad = ctx.createRadialGradient(x, y, shieldRadius * 0.5, x, y, shieldRadius * 1.2);
  glowGrad.addColorStop(0, 'hsla(195, 100%, 70%, 0.3)');
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(x, y, shieldRadius * 1.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Main bubble
  const bubbleGrad = ctx.createRadialGradient(x - shieldRadius * 0.3, y - shieldRadius * 0.3, 0, x, y, shieldRadius);
  bubbleGrad.addColorStop(0, 'hsla(195, 100%, 90%, 0.9)');
  bubbleGrad.addColorStop(0.3, 'hsla(195, 100%, 70%, 0.7)');
  bubbleGrad.addColorStop(0.7, 'hsla(200, 100%, 55%, 0.5)');
  bubbleGrad.addColorStop(1, 'hsla(210, 100%, 45%, 0.3)');
  
  ctx.fillStyle = bubbleGrad;
  ctx.beginPath();
  ctx.arc(x, y, shieldRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Rim
  ctx.strokeStyle = 'hsla(195, 100%, 80%, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, shieldRadius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(x - shieldRadius * 0.35, y - shieldRadius * 0.35, shieldRadius * 0.25, 0, Math.PI * 2);
  ctx.fill();
};

// Draw speedup icon (lightning bolt)
const drawSpeedupIcon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Orange/yellow lightning bolt
  const boltGrad = ctx.createLinearGradient(x, y - size * 0.4, x, y + size * 0.4);
  boltGrad.addColorStop(0, 'hsl(50, 100%, 65%)');
  boltGrad.addColorStop(0.5, 'hsl(35, 100%, 55%)');
  boltGrad.addColorStop(1, 'hsl(25, 100%, 45%)');
  
  ctx.fillStyle = boltGrad;
  ctx.beginPath();
  ctx.moveTo(x + size * 0.1, y - size * 0.4);
  ctx.lineTo(x + size * 0.25, y - size * 0.4);
  ctx.lineTo(x + size * 0.05, y - size * 0.05);
  ctx.lineTo(x + size * 0.2, y - size * 0.05);
  ctx.lineTo(x - size * 0.15, y + size * 0.4);
  ctx.lineTo(x - size * 0.05, y + size * 0.05);
  ctx.lineTo(x - size * 0.2, y + size * 0.05);
  ctx.closePath();
  ctx.fill();
  
  // Highlight edge
  ctx.strokeStyle = 'hsl(55, 100%, 80%)';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Inner highlight
  ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
  ctx.beginPath();
  ctx.moveTo(x + size * 0.05, y - size * 0.3);
  ctx.lineTo(x + size * 0.12, y - size * 0.3);
  ctx.lineTo(x + size * 0.02, y - size * 0.1);
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
    case 'slow':
      drawFreezeIcon(ctx, x, y, size);
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
