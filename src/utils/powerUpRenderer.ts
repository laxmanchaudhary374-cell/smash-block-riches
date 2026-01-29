// Premium Power-Up Icon Renderer
// Creates visual icons matching the reference image style

import { PowerUp, PowerUpType } from '@/types/game';

// Draw a flame trail effect
const drawFlame = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color1: string, color2: string) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.6, color2);
  gradient.addColorStop(1, 'transparent');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
};

// Draw a snowflake
const drawSnowflake = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.strokeStyle = 'hsl(195, 100%, 80%)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    // Add small branches
    const branchX = x + Math.cos(angle) * size * 0.6;
    const branchY = y + Math.sin(angle) * size * 0.6;
    ctx.moveTo(branchX, branchY);
    ctx.lineTo(branchX + Math.cos(angle + 0.5) * size * 0.3, branchY + Math.sin(angle + 0.5) * size * 0.3);
    ctx.moveTo(branchX, branchY);
    ctx.lineTo(branchX + Math.cos(angle - 0.5) * size * 0.3, branchY + Math.sin(angle - 0.5) * size * 0.3);
    ctx.stroke();
  }
};

// Draw a magnet
const drawMagnet = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Red part
  ctx.fillStyle = 'hsl(0, 85%, 55%)';
  ctx.beginPath();
  ctx.arc(x - size * 0.2, y + size * 0.3, size * 0.3, 0, Math.PI);
  ctx.lineTo(x - size * 0.5, y - size * 0.3);
  ctx.lineTo(x + size * 0.1, y - size * 0.3);
  ctx.closePath();
  ctx.fill();
  
  // Blue part
  ctx.fillStyle = 'hsl(195, 85%, 55%)';
  ctx.beginPath();
  ctx.arc(x + size * 0.2, y + size * 0.3, size * 0.3, Math.PI, 0);
  ctx.lineTo(x + size * 0.5, y - size * 0.3);
  ctx.lineTo(x - size * 0.1, y - size * 0.3);
  ctx.closePath();
  ctx.fill();
};

// Draw a shield bubble
const drawShield = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const gradient = ctx.createRadialGradient(x - size * 0.2, y - size * 0.2, 0, x, y, size);
  gradient.addColorStop(0, 'hsla(195, 100%, 85%, 0.9)');
  gradient.addColorStop(0.5, 'hsla(195, 100%, 65%, 0.7)');
  gradient.addColorStop(1, 'hsla(195, 100%, 55%, 0.3)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  
  // Shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.3, 0, Math.PI * 2);
  ctx.fill();
};

// Draw lightning bolt
const drawLightning = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.fillStyle = 'hsl(45, 100%, 55%)';
  ctx.beginPath();
  ctx.moveTo(x - size * 0.1, y - size * 0.5);
  ctx.lineTo(x + size * 0.4, y - size * 0.5);
  ctx.lineTo(x + size * 0.1, y);
  ctx.lineTo(x + size * 0.5, y);
  ctx.lineTo(x - size * 0.2, y + size * 0.5);
  ctx.lineTo(x, y + size * 0.1);
  ctx.lineTo(x - size * 0.3, y + size * 0.1);
  ctx.closePath();
  ctx.fill();
};

// Draw laser beams
const drawLaser = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Two red laser beams
  ctx.fillStyle = 'hsl(0, 100%, 55%)';
  ctx.fillRect(x - size * 0.4, y - size * 0.4, size * 0.15, size * 0.8);
  ctx.fillRect(x + size * 0.25, y - size * 0.4, size * 0.15, size * 0.8);
  
  // Glow
  ctx.shadowColor = 'hsl(0, 100%, 50%)';
  ctx.shadowBlur = 5;
  ctx.fillStyle = 'hsl(50, 100%, 70%)';
  ctx.fillRect(x - size * 0.38, y - size * 0.5, size * 0.1, size * 0.15);
  ctx.fillRect(x + size * 0.28, y - size * 0.5, size * 0.1, size * 0.15);
  ctx.shadowBlur = 0;
};

// Draw plus/heart for extra life
const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.fillStyle = 'hsl(0, 85%, 55%)';
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x - size * 0.5, y - size * 0.1, x - size * 0.5, y - size * 0.4, x, y - size * 0.2);
  ctx.bezierCurveTo(x + size * 0.5, y - size * 0.4, x + size * 0.5, y - size * 0.1, x, y + size * 0.3);
  ctx.fill();
  
  // Shine
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.arc(x - size * 0.15, y - size * 0.2, size * 0.12, 0, Math.PI * 2);
  ctx.fill();
};

// Draw arrow for widen
const drawWidenArrows = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.strokeStyle = 'hsl(180, 100%, 70%)';
  ctx.fillStyle = 'hsl(180, 100%, 70%)';
  ctx.lineWidth = 2;
  
  // Left arrow
  ctx.beginPath();
  ctx.moveTo(x - size * 0.1, y);
  ctx.lineTo(x - size * 0.4, y);
  ctx.moveTo(x - size * 0.3, y - size * 0.2);
  ctx.lineTo(x - size * 0.4, y);
  ctx.lineTo(x - size * 0.3, y + size * 0.2);
  ctx.stroke();
  
  // Right arrow
  ctx.beginPath();
  ctx.moveTo(x + size * 0.1, y);
  ctx.lineTo(x + size * 0.4, y);
  ctx.moveTo(x + size * 0.3, y - size * 0.2);
  ctx.lineTo(x + size * 0.4, y);
  ctx.lineTo(x + size * 0.3, y + size * 0.2);
  ctx.stroke();
};

// Draw shrink arrows (inward)
const drawShrinkArrows = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.strokeStyle = 'hsl(0, 70%, 55%)';
  ctx.lineWidth = 2;
  
  // Left arrow pointing right
  ctx.beginPath();
  ctx.moveTo(x - size * 0.4, y);
  ctx.lineTo(x - size * 0.1, y);
  ctx.moveTo(x - size * 0.2, y - size * 0.2);
  ctx.lineTo(x - size * 0.1, y);
  ctx.lineTo(x - size * 0.2, y + size * 0.2);
  ctx.stroke();
  
  // Right arrow pointing left
  ctx.beginPath();
  ctx.moveTo(x + size * 0.4, y);
  ctx.lineTo(x + size * 0.1, y);
  ctx.moveTo(x + size * 0.2, y - size * 0.2);
  ctx.lineTo(x + size * 0.1, y);
  ctx.lineTo(x + size * 0.2, y + size * 0.2);
  ctx.stroke();
};

// Draw multiball icon
const drawMultiball = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const ballSize = size * 0.25;
  
  // Main ball with flame
  const gradient1 = ctx.createRadialGradient(x, y - size * 0.1, 0, x, y - size * 0.1, ballSize);
  gradient1.addColorStop(0, 'hsl(25, 100%, 70%)');
  gradient1.addColorStop(1, 'hsl(0, 100%, 50%)');
  
  ctx.fillStyle = gradient1;
  ctx.beginPath();
  ctx.arc(x, y - size * 0.1, ballSize, 0, Math.PI * 2);
  ctx.fill();
  
  // Flame trail
  ctx.fillStyle = 'hsla(40, 100%, 60%, 0.8)';
  ctx.beginPath();
  ctx.ellipse(x + size * 0.25, y - size * 0.1, size * 0.2, size * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Small balls
  ctx.fillStyle = 'hsl(25, 100%, 60%)';
  ctx.beginPath();
  ctx.arc(x - size * 0.25, y + size * 0.2, ballSize * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + size * 0.15, y + size * 0.25, ballSize * 0.5, 0, Math.PI * 2);
  ctx.fill();
};

// Main power-up renderer
export const drawPowerUp = (
  ctx: CanvasRenderingContext2D,
  powerUp: PowerUp,
  gameTime: number
): void => {
  const { x, y, width, height, type } = powerUp;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const iconSize = Math.min(width, height) * 0.7;
  
  ctx.save();
  
  // Background glow based on power-up type
  const isNegative = type === 'shrink' || type === 'speedup';
  const bgColor = getPowerUpBgColor(type);
  
  // Animated pulse
  const pulse = 1 + Math.sin(gameTime * 5) * 0.1;
  
  // Drop shadow
  ctx.shadowColor = bgColor;
  ctx.shadowBlur = 15 * pulse;
  
  // Background capsule
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, adjustBrightness(bgColor, -20));
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, height / 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.ellipse(centerX, y + height * 0.25, width * 0.35, height * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  
  // Warning border for negative power-ups
  if (isNegative) {
    ctx.strokeStyle = 'hsl(0, 100%, 40%)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x + 1, y + 1, width - 2, height - 2, height / 2 - 1);
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
      // Fireball icon
      drawFlame(ctx, x, y, size * 0.4, 'hsl(50, 100%, 70%)', 'hsl(25, 100%, 50%)');
      drawFlame(ctx, x - size * 0.15, y + size * 0.1, size * 0.25, 'hsl(40, 100%, 60%)', 'hsl(15, 100%, 45%)');
      // Ball core
      const fbGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 0.25);
      fbGrad.addColorStop(0, 'hsl(50, 100%, 90%)');
      fbGrad.addColorStop(0.5, 'hsl(30, 100%, 60%)');
      fbGrad.addColorStop(1, 'hsl(15, 100%, 50%)');
      ctx.fillStyle = fbGrad;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'multiball':
      drawMultiball(ctx, x, y, size);
      break;
      
    case 'slow':
      drawSnowflake(ctx, x, y, size * 0.4);
      break;
      
    case 'widen':
      drawWidenArrows(ctx, x, y, size);
      break;
      
    case 'shrink':
      drawShrinkArrows(ctx, x, y, size);
      break;
      
    case 'extralife':
      drawHeart(ctx, x, y, size * 0.4);
      break;
      
    case 'laser':
      drawLaser(ctx, x, y, size);
      break;
      
    case 'magnet':
      drawMagnet(ctx, x, y, size * 0.4);
      break;
      
    case 'shield':
      drawShield(ctx, x, y, size * 0.35);
      break;
      
    case 'speedup':
      drawLightning(ctx, x, y, size * 0.5);
      break;
  }
};

const getPowerUpBgColor = (type: PowerUpType): string => {
  const colors: Record<PowerUpType, string> = {
    widen: 'hsl(180, 80%, 45%)',
    multiball: 'hsl(25, 90%, 50%)',
    slow: 'hsl(195, 85%, 50%)',
    extralife: 'hsl(130, 70%, 45%)',
    fireball: 'hsl(30, 95%, 50%)',
    laser: 'hsl(0, 80%, 50%)',
    magnet: 'hsl(280, 75%, 50%)',
    shield: 'hsl(200, 85%, 55%)',
    shrink: 'hsl(0, 50%, 35%)',
    speedup: 'hsl(35, 50%, 35%)',
  };
  return colors[type];
};

const adjustBrightness = (hsl: string, amount: number): string => {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hsl;
  const h = parseInt(match[1]);
  const s = parseInt(match[2]);
  const l = Math.max(0, Math.min(100, parseInt(match[3]) + amount));
  return `hsl(${h}, ${s}%, ${l}%)`;
};
