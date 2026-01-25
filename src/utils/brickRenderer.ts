// Premium 3D Gem-like Brick Renderer
// Creates beveled, glossy bricks like the Space Outlaw reference

import { Brick, BrickColor, BrickType } from '@/types/game';

// Get rich gem colors for 3D effect
export const getGemColors = (color: BrickColor): {
  main: string;
  light: string;
  dark: string;
  shadow: string;
  highlight: string;
  glow: string;
} => {
  const colors: Record<BrickColor, {
    main: string;
    light: string;
    dark: string;
    shadow: string;
    highlight: string;
    glow: string;
  }> = {
    cyan: {
      main: 'hsl(185, 85%, 45%)',
      light: 'hsl(180, 90%, 70%)',
      dark: 'hsl(190, 90%, 30%)',
      shadow: 'hsl(195, 85%, 20%)',
      highlight: 'hsl(175, 100%, 85%)',
      glow: 'hsla(180, 100%, 60%, 0.5)',
    },
    magenta: {
      main: 'hsl(330, 80%, 50%)',
      light: 'hsl(325, 85%, 70%)',
      dark: 'hsl(335, 85%, 35%)',
      shadow: 'hsl(340, 80%, 25%)',
      highlight: 'hsl(320, 100%, 85%)',
      glow: 'hsla(330, 100%, 60%, 0.5)',
    },
    yellow: {
      main: 'hsl(45, 95%, 50%)',
      light: 'hsl(50, 100%, 70%)',
      dark: 'hsl(40, 90%, 35%)',
      shadow: 'hsl(35, 85%, 25%)',
      highlight: 'hsl(55, 100%, 90%)',
      glow: 'hsla(50, 100%, 55%, 0.5)',
    },
    green: {
      main: 'hsl(130, 75%, 40%)',
      light: 'hsl(125, 80%, 60%)',
      dark: 'hsl(135, 80%, 28%)',
      shadow: 'hsl(140, 75%, 18%)',
      highlight: 'hsl(120, 90%, 80%)',
      glow: 'hsla(130, 100%, 50%, 0.5)',
    },
    orange: {
      main: 'hsl(25, 95%, 50%)',
      light: 'hsl(30, 100%, 65%)',
      dark: 'hsl(20, 90%, 38%)',
      shadow: 'hsl(15, 85%, 28%)',
      highlight: 'hsl(35, 100%, 85%)',
      glow: 'hsla(25, 100%, 55%, 0.5)',
    },
    purple: {
      main: 'hsl(270, 70%, 50%)',
      light: 'hsl(265, 75%, 70%)',
      dark: 'hsl(275, 75%, 35%)',
      shadow: 'hsl(280, 70%, 25%)',
      highlight: 'hsl(260, 90%, 85%)',
      glow: 'hsla(270, 100%, 60%, 0.5)',
    },
    red: {
      main: 'hsl(0, 85%, 50%)',
      light: 'hsl(5, 90%, 65%)',
      dark: 'hsl(355, 85%, 38%)',
      shadow: 'hsl(350, 80%, 28%)',
      highlight: 'hsl(10, 100%, 85%)',
      glow: 'hsla(0, 100%, 55%, 0.5)',
    },
    gold: {
      main: 'hsl(43, 95%, 50%)',
      light: 'hsl(48, 100%, 68%)',
      dark: 'hsl(38, 90%, 38%)',
      shadow: 'hsl(33, 85%, 28%)',
      highlight: 'hsl(53, 100%, 88%)',
      glow: 'hsla(45, 100%, 55%, 0.5)',
    },
  };
  return colors[color];
};

// Draw a premium 3D beveled gem-like brick
export const drawPremiumBrick = (
  ctx: CanvasRenderingContext2D,
  brick: Brick,
  gameTime: number = 0
): void => {
  const { x, y, width, height, color, type, hits, maxHits } = brick;
  
  const gemColors = getGemColors(color);
  const damageRatio = hits / maxHits;
  
  // Bevel sizes
  const bevelSize = 5;
  const innerBevel = 3;
  
  ctx.save();
  
  // Apply damage effect (darken slightly)
  if (damageRatio < 1) {
    ctx.globalAlpha = 0.7 + damageRatio * 0.3;
  }
  
  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;
  
  // Main brick body with rounded corners
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 4);
  ctx.fillStyle = gemColors.main;
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Top bevel (lighter - light source from top)
  const topBevelGradient = ctx.createLinearGradient(x, y, x, y + bevelSize);
  topBevelGradient.addColorStop(0, gemColors.highlight);
  topBevelGradient.addColorStop(0.5, gemColors.light);
  topBevelGradient.addColorStop(1, gemColors.main);
  
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + width - 4, y);
  ctx.lineTo(x + width - bevelSize - 4, y + bevelSize);
  ctx.lineTo(x + bevelSize + 4, y + bevelSize);
  ctx.closePath();
  ctx.fillStyle = topBevelGradient;
  ctx.fill();
  
  // Left bevel (light)
  const leftBevelGradient = ctx.createLinearGradient(x, y, x + bevelSize, y);
  leftBevelGradient.addColorStop(0, gemColors.light);
  leftBevelGradient.addColorStop(1, gemColors.main);
  
  ctx.beginPath();
  ctx.moveTo(x, y + 4);
  ctx.lineTo(x, y + height - 4);
  ctx.lineTo(x + bevelSize, y + height - bevelSize - 2);
  ctx.lineTo(x + bevelSize, y + bevelSize + 2);
  ctx.closePath();
  ctx.fillStyle = leftBevelGradient;
  ctx.fill();
  
  // Bottom bevel (darker - shadow)
  const bottomBevelGradient = ctx.createLinearGradient(x, y + height - bevelSize, x, y + height);
  bottomBevelGradient.addColorStop(0, gemColors.main);
  bottomBevelGradient.addColorStop(0.5, gemColors.dark);
  bottomBevelGradient.addColorStop(1, gemColors.shadow);
  
  ctx.beginPath();
  ctx.moveTo(x + bevelSize + 4, y + height - bevelSize);
  ctx.lineTo(x + width - bevelSize - 4, y + height - bevelSize);
  ctx.lineTo(x + width - 4, y + height);
  ctx.lineTo(x + 4, y + height);
  ctx.closePath();
  ctx.fillStyle = bottomBevelGradient;
  ctx.fill();
  
  // Right bevel (dark)
  const rightBevelGradient = ctx.createLinearGradient(x + width - bevelSize, y, x + width, y);
  rightBevelGradient.addColorStop(0, gemColors.main);
  rightBevelGradient.addColorStop(1, gemColors.dark);
  
  ctx.beginPath();
  ctx.moveTo(x + width - bevelSize, y + bevelSize + 2);
  ctx.lineTo(x + width - bevelSize, y + height - bevelSize - 2);
  ctx.lineTo(x + width, y + height - 4);
  ctx.lineTo(x + width, y + 4);
  ctx.closePath();
  ctx.fillStyle = rightBevelGradient;
  ctx.fill();
  
  // Inner face gradient (main gem surface)
  const innerFaceGradient = ctx.createLinearGradient(
    x + bevelSize, y + bevelSize,
    x + bevelSize, y + height - bevelSize
  );
  innerFaceGradient.addColorStop(0, gemColors.light);
  innerFaceGradient.addColorStop(0.3, gemColors.main);
  innerFaceGradient.addColorStop(0.7, gemColors.main);
  innerFaceGradient.addColorStop(1, gemColors.dark);
  
  ctx.fillStyle = innerFaceGradient;
  ctx.fillRect(
    x + bevelSize,
    y + bevelSize,
    width - bevelSize * 2,
    height - bevelSize * 2
  );
  
  // Glossy highlight (top-left shine)
  const highlightGradient = ctx.createRadialGradient(
    x + width * 0.25, y + height * 0.2,
    0,
    x + width * 0.25, y + height * 0.2,
    width * 0.5
  );
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  highlightGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.2)');
  highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = highlightGradient;
  ctx.fillRect(x + bevelSize, y + bevelSize, width - bevelSize * 2, height * 0.5);
  
  // Edge highlight line (top edge shine)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + bevelSize + 4, y + innerBevel);
  ctx.lineTo(x + width - bevelSize - 4, y + innerBevel);
  ctx.stroke();
  
  // Outer glow effect
  ctx.shadowColor = gemColors.glow;
  ctx.shadowBlur = 10;
  ctx.strokeStyle = gemColors.light;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 1, y + 1, width - 2, height - 2, 3);
  ctx.stroke();
  ctx.shadowBlur = 0;
  
  // Add special type indicators
  drawBrickTypeIndicator(ctx, brick, gameTime, gemColors);
  
  // Damage cracks
  if (damageRatio < 0.7 && maxHits > 1) {
    drawDamageCracks(ctx, brick, damageRatio);
  }
  
  ctx.restore();
};

// Draw special brick type indicators
const drawBrickTypeIndicator = (
  ctx: CanvasRenderingContext2D,
  brick: Brick,
  gameTime: number,
  gemColors: ReturnType<typeof getGemColors>
): void => {
  const { x, y, width, height, type, hits, maxHits } = brick;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  switch (type) {
    case 'explosive':
      // Explosion warning symbol
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('💥', centerX, centerY);
      break;
      
    case 'indestructible':
      // Metal X pattern
      ctx.strokeStyle = 'rgba(150, 160, 180, 0.7)';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 8);
      ctx.lineTo(x + width - 10, y + height - 8);
      ctx.moveTo(x + width - 10, y + 8);
      ctx.lineTo(x + 10, y + height - 8);
      ctx.stroke();
      // Bolt accents
      ctx.fillStyle = 'rgba(180, 190, 200, 0.8)';
      ctx.beginPath();
      ctx.arc(x + 8, y + 8, 3, 0, Math.PI * 2);
      ctx.arc(x + width - 8, y + 8, 3, 0, Math.PI * 2);
      ctx.arc(x + 8, y + height - 8, 3, 0, Math.PI * 2);
      ctx.arc(x + width - 8, y + height - 8, 3, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'moving':
      // Animated arrows
      const arrowOffset = Math.sin(gameTime * 4) * 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      // Left arrow
      ctx.beginPath();
      ctx.moveTo(centerX - 8 + arrowOffset, centerY);
      ctx.lineTo(centerX - 14 + arrowOffset, centerY);
      ctx.moveTo(centerX - 12 + arrowOffset, centerY - 4);
      ctx.lineTo(centerX - 14 + arrowOffset, centerY);
      ctx.lineTo(centerX - 12 + arrowOffset, centerY + 4);
      ctx.stroke();
      // Right arrow
      ctx.beginPath();
      ctx.moveTo(centerX + 8 - arrowOffset, centerY);
      ctx.lineTo(centerX + 14 - arrowOffset, centerY);
      ctx.moveTo(centerX + 12 - arrowOffset, centerY - 4);
      ctx.lineTo(centerX + 14 - arrowOffset, centerY);
      ctx.lineTo(centerX + 12 - arrowOffset, centerY + 4);
      ctx.stroke();
      break;
      
    case 'chain':
      // Chain link circles
      ctx.strokeStyle = 'rgba(255, 220, 100, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX - 8, centerY, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX + 8, centerY, 6, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 'coin':
      // Gold star
      drawStar(ctx, centerX, centerY, 5, 8, 4);
      ctx.fillStyle = 'rgba(255, 220, 80, 0.95)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(180, 140, 40, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
      
    case 'rainbow':
      // Shimmer effect
      const hue = (gameTime * 120) % 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.6)`;
      ctx.beginPath();
      ctx.roundRect(x + 5, y + 5, width - 10, height - 10, 2);
      ctx.fill();
      break;
      
    case 'ghost':
      // Ghost face effect handled by caller with alpha
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('👻', centerX, centerY);
      break;
  }
  
  // Show hit count for multi-hit bricks
  if (maxHits > 1 && type === 'normal' && hits > 1) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.font = 'bold 14px sans-serif';
    ctx.strokeText(hits.toString(), centerX, centerY);
    ctx.fillText(hits.toString(), centerX, centerY);
  }
};

// Draw a star shape
const drawStar = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
): void => {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
    rot += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
};

// Draw damage cracks on brick
const drawDamageCracks = (
  ctx: CanvasRenderingContext2D,
  brick: Brick,
  damageRatio: number
): void => {
  const { x, y, width, height } = brick;
  const crackIntensity = 1 - damageRatio;
  
  ctx.strokeStyle = `rgba(0, 0, 0, ${0.3 + crackIntensity * 0.4})`;
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  
  // Draw procedural cracks based on damage
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  const crackCount = Math.floor(crackIntensity * 4) + 1;
  
  for (let i = 0; i < crackCount; i++) {
    const angle = (Math.PI * 2 / crackCount) * i + 0.5;
    const length = width * 0.3 * (0.5 + crackIntensity * 0.5);
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * length,
      centerY + Math.sin(angle) * length * 0.6
    );
    ctx.stroke();
  }
};

// Draw premium paddle with metallic effect
export const drawPremiumPaddle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  hasLaser: boolean = false,
  hasMagnet: boolean = false,
  hasShield: boolean = false
): void => {
  ctx.save();
  
  // Paddle drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;
  
  // Outer metallic frame
  const frameGradient = ctx.createLinearGradient(x, y, x, y + height);
  frameGradient.addColorStop(0, 'hsl(200, 60%, 50%)');
  frameGradient.addColorStop(0.3, 'hsl(200, 50%, 35%)');
  frameGradient.addColorStop(0.7, 'hsl(200, 50%, 30%)');
  frameGradient.addColorStop(1, 'hsl(200, 60%, 45%)');
  
  ctx.fillStyle = frameGradient;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, height / 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Inner core (glowing red/cyan based on power-ups)
  const innerPadding = 4;
  const coreColor = hasLaser ? 'hsl(0, 90%, 55%)' : hasMagnet ? 'hsl(280, 90%, 55%)' : 'hsl(0, 85%, 55%)';
  
  const coreGradient = ctx.createLinearGradient(x, y + innerPadding, x, y + height - innerPadding);
  coreGradient.addColorStop(0, coreColor);
  coreGradient.addColorStop(0.4, coreColor.replace('55%)', '45%)'));
  coreGradient.addColorStop(1, coreColor.replace('55%)', '35%)'));
  
  ctx.fillStyle = coreGradient;
  ctx.beginPath();
  ctx.roundRect(
    x + innerPadding * 2,
    y + innerPadding,
    width - innerPadding * 4,
    height - innerPadding * 2,
    (height - innerPadding * 2) / 2
  );
  ctx.fill();
  
  // Core highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.roundRect(
    x + innerPadding * 3,
    y + innerPadding + 1,
    width - innerPadding * 6,
    (height - innerPadding * 2) / 3,
    2
  );
  ctx.fill();
  
  // Edge caps with metallic shine
  const capWidth = 12;
  
  // Left cap
  const leftCapGradient = ctx.createRadialGradient(
    x + capWidth, y + height / 2, 0,
    x + capWidth, y + height / 2, capWidth
  );
  leftCapGradient.addColorStop(0, 'hsl(200, 60%, 70%)');
  leftCapGradient.addColorStop(0.5, 'hsl(200, 50%, 45%)');
  leftCapGradient.addColorStop(1, 'hsl(200, 50%, 35%)');
  
  ctx.fillStyle = leftCapGradient;
  ctx.beginPath();
  ctx.arc(x + height / 2, y + height / 2, height / 2 - 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Right cap
  const rightCapGradient = ctx.createRadialGradient(
    x + width - capWidth, y + height / 2, 0,
    x + width - capWidth, y + height / 2, capWidth
  );
  rightCapGradient.addColorStop(0, 'hsl(200, 60%, 70%)');
  rightCapGradient.addColorStop(0.5, 'hsl(200, 50%, 45%)');
  rightCapGradient.addColorStop(1, 'hsl(200, 50%, 35%)');
  
  ctx.fillStyle = rightCapGradient;
  ctx.beginPath();
  ctx.arc(x + width - height / 2, y + height / 2, height / 2 - 1, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer glow
  if (hasShield) {
    ctx.shadowColor = 'hsla(200, 100%, 60%, 0.8)';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = 'hsla(200, 100%, 70%, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 2, y - 2, width + 4, height + 4, height / 2 + 2);
    ctx.stroke();
  }
  
  ctx.restore();
};

// Draw premium ball with 3D shading
export const drawPremiumBall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  isFireball: boolean = false
): void => {
  ctx.save();
  
  // Ball drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  
  // Main ball gradient
  const ballColor = isFireball ? 'hsl(25, 100%, 55%)' : 'hsl(0, 85%, 55%)';
  const ballGradient = ctx.createRadialGradient(
    x - radius * 0.3, y - radius * 0.3, 0,
    x, y, radius
  );
  ballGradient.addColorStop(0, isFireball ? 'hsl(50, 100%, 70%)' : 'hsl(5, 90%, 70%)');
  ballGradient.addColorStop(0.4, ballColor);
  ballGradient.addColorStop(1, isFireball ? 'hsl(15, 100%, 40%)' : 'hsl(355, 80%, 40%)');
  
  ctx.fillStyle = ballGradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Glossy highlight
  const highlightGradient = ctx.createRadialGradient(
    x - radius * 0.4, y - radius * 0.4, 0,
    x - radius * 0.4, y - radius * 0.4, radius * 0.6
  );
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
  highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = highlightGradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer glow
  ctx.shadowColor = isFireball ? 'hsla(25, 100%, 55%, 0.6)' : 'hsla(0, 85%, 55%, 0.4)';
  ctx.shadowBlur = 15;
  ctx.strokeStyle = isFireball ? 'hsl(40, 100%, 60%)' : 'hsl(0, 70%, 65%)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
};
