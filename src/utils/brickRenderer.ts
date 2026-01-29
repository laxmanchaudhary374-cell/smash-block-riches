// Premium 3D Textured Brick Renderer
// Creates realistic material-based bricks like copper, ice, metal, wood, diamond

import { Brick, BrickColor, BrickType } from '@/types/game';

// Material types that match the reference image
type MaterialType = 'copper' | 'ice' | 'metal' | 'wood' | 'glass' | 'diamond';

// Map brick colors to material types for varied look
const getMaterialType = (color: BrickColor, type: BrickType): MaterialType => {
  if (type === 'indestructible') return 'metal';
  
  const materialMap: Record<BrickColor, MaterialType> = {
    orange: 'copper',
    cyan: 'ice',
    purple: 'metal',
    yellow: 'wood',
    green: 'glass',
    magenta: 'diamond',
    red: 'copper',
    gold: 'diamond',
  };
  return materialMap[color] || 'glass';
};

// Get material colors for rendering
const getMaterialColors = (material: MaterialType) => {
  const materials = {
    copper: {
      base: 'hsl(20, 65%, 45%)',
      light: 'hsl(25, 70%, 60%)',
      dark: 'hsl(15, 60%, 30%)',
      accent: 'hsl(160, 50%, 45%)', // Patina
      highlight: 'hsl(30, 80%, 75%)',
      shadow: 'hsl(10, 55%, 20%)',
    },
    ice: {
      base: 'hsl(195, 40%, 70%)',
      light: 'hsl(195, 50%, 85%)',
      dark: 'hsl(200, 50%, 50%)',
      accent: 'hsl(200, 30%, 60%)',
      highlight: 'hsl(195, 60%, 95%)',
      shadow: 'hsl(205, 45%, 40%)',
    },
    metal: {
      base: 'hsl(220, 5%, 35%)',
      light: 'hsl(220, 5%, 50%)',
      dark: 'hsl(220, 8%, 22%)',
      accent: 'hsl(220, 3%, 40%)',
      highlight: 'hsl(220, 5%, 65%)',
      shadow: 'hsl(220, 10%, 15%)',
    },
    wood: {
      base: 'hsl(25, 55%, 40%)',
      light: 'hsl(30, 50%, 55%)',
      dark: 'hsl(20, 60%, 28%)',
      accent: 'hsl(22, 45%, 35%)',
      highlight: 'hsl(35, 45%, 65%)',
      shadow: 'hsl(18, 55%, 18%)',
    },
    glass: {
      base: 'hsl(200, 80%, 50%)',
      light: 'hsl(195, 90%, 70%)',
      dark: 'hsl(210, 85%, 35%)',
      accent: 'hsl(205, 75%, 45%)',
      highlight: 'hsl(190, 95%, 85%)',
      shadow: 'hsl(215, 80%, 25%)',
    },
    diamond: {
      base: 'hsl(200, 20%, 80%)',
      light: 'hsl(200, 30%, 95%)',
      dark: 'hsl(210, 25%, 60%)',
      accent: 'hsl(195, 35%, 85%)',
      highlight: 'hsl(0, 0%, 100%)',
      shadow: 'hsl(215, 20%, 50%)',
    },
  };
  return materials[material];
};

// Draw copper brick with oxidation patches
const drawCopperBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 4;
  const borderWidth = 3;
  
  // Dark border/frame
  ctx.fillStyle = colors.shadow;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  // Main copper surface
  const mainGrad = ctx.createLinearGradient(x, y, x, y + h);
  mainGrad.addColorStop(0, colors.light);
  mainGrad.addColorStop(0.3, colors.base);
  mainGrad.addColorStop(0.7, colors.base);
  mainGrad.addColorStop(1, colors.dark);
  
  ctx.fillStyle = mainGrad;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth, y + borderWidth, w - borderWidth * 2, h - borderWidth * 2, borderRadius - 1);
  ctx.fill();
  
  // Oxidation/patina patches
  ctx.fillStyle = colors.accent;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.3, y + h * 0.4, w * 0.15, h * 0.2, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + w * 0.7, y + h * 0.6, w * 0.12, h * 0.15, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  // Top highlight
  ctx.fillStyle = colors.highlight;
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth + 2, y + borderWidth + 2, w - borderWidth * 2 - 4, h * 0.25, 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

// Draw ice brick with cracks
const drawIceBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 4;
  const borderWidth = 3;
  
  // Teal border
  ctx.fillStyle = colors.dark;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  // Ice surface with gradient
  const iceGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  iceGrad.addColorStop(0, colors.light);
  iceGrad.addColorStop(0.3, colors.base);
  iceGrad.addColorStop(0.6, colors.accent);
  iceGrad.addColorStop(1, colors.light);
  
  ctx.fillStyle = iceGrad;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth, y + borderWidth, w - borderWidth * 2, h - borderWidth * 2, borderRadius - 1);
  ctx.fill();
  
  // Crack lines
  ctx.strokeStyle = colors.highlight;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, y + h * 0.3);
  ctx.lineTo(x + w * 0.4, y + h * 0.5);
  ctx.lineTo(x + w * 0.35, y + h * 0.7);
  ctx.moveTo(x + w * 0.4, y + h * 0.5);
  ctx.lineTo(x + w * 0.6, y + h * 0.45);
  ctx.moveTo(x + w * 0.6, y + h * 0.2);
  ctx.lineTo(x + w * 0.75, y + h * 0.5);
  ctx.lineTo(x + w * 0.7, y + h * 0.8);
  ctx.stroke();
  ctx.globalAlpha = 1;
  
  // Highlight
  ctx.fillStyle = colors.highlight;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.ellipse(x + w * 0.25, y + h * 0.3, w * 0.12, h * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

// Draw metal brick with matte texture
const drawMetalBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 4;
  const borderWidth = 2;
  
  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.roundRect(x + 2, y + 2, w, h, borderRadius);
  ctx.fill();
  
  // Main metal body
  const metalGrad = ctx.createLinearGradient(x, y, x, y + h);
  metalGrad.addColorStop(0, colors.light);
  metalGrad.addColorStop(0.3, colors.base);
  metalGrad.addColorStop(0.7, colors.dark);
  metalGrad.addColorStop(1, colors.shadow);
  
  ctx.fillStyle = metalGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  // Subtle texture noise
  ctx.fillStyle = colors.accent;
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 8; i++) {
    const dotX = x + Math.random() * w;
    const dotY = y + Math.random() * h;
    ctx.beginPath();
    ctx.arc(dotX, dotY, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  
  // Highlight edge
  ctx.strokeStyle = colors.highlight;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y + 1);
  ctx.lineTo(x + w - borderRadius, y + 1);
  ctx.stroke();
  ctx.globalAlpha = 1;
};

// Draw wood brick with grain
const drawWoodBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 3;
  const borderWidth = 3;
  
  // Dark frame
  ctx.fillStyle = colors.shadow;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  // Wood surface
  const woodGrad = ctx.createLinearGradient(x, y, x, y + h);
  woodGrad.addColorStop(0, colors.light);
  woodGrad.addColorStop(0.5, colors.base);
  woodGrad.addColorStop(1, colors.dark);
  
  ctx.fillStyle = woodGrad;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth, y + borderWidth, w - borderWidth * 2, h - borderWidth * 2, 1);
  ctx.fill();
  
  // Wood grain lines
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  for (let i = 0; i < 3; i++) {
    const lineY = y + borderWidth + (h - borderWidth * 2) * (0.25 + i * 0.25);
    ctx.beginPath();
    ctx.moveTo(x + borderWidth + 2, lineY);
    ctx.lineTo(x + w - borderWidth - 2, lineY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  
  // Top highlight
  ctx.fillStyle = colors.highlight;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth + 2, y + borderWidth + 1, w - borderWidth * 2 - 4, h * 0.2, 1);
  ctx.fill();
  ctx.globalAlpha = 1;
};

// Draw glass/gem brick
const drawGlassBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 4;
  const bevelSize = 4;
  
  // Drop shadow
  ctx.shadowColor = colors.shadow;
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  
  // Main body
  ctx.fillStyle = colors.base;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Top bevel (light)
  const topGrad = ctx.createLinearGradient(x, y, x, y + bevelSize);
  topGrad.addColorStop(0, colors.highlight);
  topGrad.addColorStop(1, colors.light);
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + w - borderRadius, y);
  ctx.lineTo(x + w - borderRadius - bevelSize, y + bevelSize);
  ctx.lineTo(x + borderRadius + bevelSize, y + bevelSize);
  ctx.closePath();
  ctx.fill();
  
  // Bottom bevel (dark)
  const bottomGrad = ctx.createLinearGradient(x, y + h - bevelSize, x, y + h);
  bottomGrad.addColorStop(0, colors.base);
  bottomGrad.addColorStop(1, colors.dark);
  ctx.fillStyle = bottomGrad;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius + bevelSize, y + h - bevelSize);
  ctx.lineTo(x + w - borderRadius - bevelSize, y + h - bevelSize);
  ctx.lineTo(x + w - borderRadius, y + h);
  ctx.lineTo(x + borderRadius, y + h);
  ctx.closePath();
  ctx.fill();
  
  // Inner surface gradient
  const innerGrad = ctx.createLinearGradient(x, y + bevelSize, x, y + h - bevelSize);
  innerGrad.addColorStop(0, colors.light);
  innerGrad.addColorStop(0.4, colors.base);
  innerGrad.addColorStop(1, colors.dark);
  ctx.fillStyle = innerGrad;
  ctx.fillRect(x + bevelSize, y + bevelSize, w - bevelSize * 2, h - bevelSize * 2);
  
  // Glossy highlight
  const glossGrad = ctx.createRadialGradient(x + w * 0.25, y + h * 0.25, 0, x + w * 0.25, y + h * 0.25, w * 0.5);
  glossGrad.addColorStop(0, 'rgba(255,255,255,0.5)');
  glossGrad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
  glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glossGrad;
  ctx.fillRect(x + bevelSize, y + bevelSize, w - bevelSize * 2, (h - bevelSize * 2) * 0.6);
  
  // Outer glow
  ctx.shadowColor = colors.light;
  ctx.shadowBlur = 8;
  ctx.strokeStyle = colors.highlight;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.roundRect(x + 1, y + 1, w - 2, h - 2, borderRadius - 1);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
};

// Draw diamond brick with facets
const drawDiamondBrick = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, colors: ReturnType<typeof getMaterialColors>) => {
  const borderRadius = 3;
  const borderWidth = 3;
  
  // Dark border
  ctx.fillStyle = colors.shadow;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, borderRadius);
  ctx.fill();
  
  // Main diamond surface
  const diamondGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  diamondGrad.addColorStop(0, colors.light);
  diamondGrad.addColorStop(0.25, colors.base);
  diamondGrad.addColorStop(0.5, colors.highlight);
  diamondGrad.addColorStop(0.75, colors.base);
  diamondGrad.addColorStop(1, colors.light);
  
  ctx.fillStyle = diamondGrad;
  ctx.beginPath();
  ctx.roundRect(x + borderWidth, y + borderWidth, w - borderWidth * 2, h - borderWidth * 2, 1);
  ctx.fill();
  
  // Facet lines (diamond cuts)
  ctx.strokeStyle = colors.dark;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.4;
  
  // Diagonal facets
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, y + borderWidth);
  ctx.lineTo(x + w * 0.4, y + h - borderWidth);
  ctx.moveTo(x + w * 0.5, y + borderWidth);
  ctx.lineTo(x + w * 0.3, y + h - borderWidth);
  ctx.moveTo(x + w * 0.6, y + borderWidth);
  ctx.lineTo(x + w * 0.8, y + h - borderWidth);
  ctx.moveTo(x + w * 0.8, y + borderWidth);
  ctx.lineTo(x + w * 0.6, y + h - borderWidth);
  ctx.stroke();
  ctx.globalAlpha = 1;
  
  // Highlight sparkles
  ctx.fillStyle = colors.highlight;
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(x + w * 0.25, y + h * 0.35, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + w * 0.6, y + h * 0.25, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + w * 0.75, y + h * 0.6, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

// ============ MAIN BRICK RENDERER ============

export const drawPremiumBrick = (
  ctx: CanvasRenderingContext2D,
  brick: Brick,
  gameTime: number = 0
): void => {
  const { x, y, width, height, color, type, hits, maxHits } = brick;
  
  const material = getMaterialType(color, type);
  const colors = getMaterialColors(material);
  const damageRatio = hits / maxHits;
  
  ctx.save();
  
  // Apply damage effect
  if (damageRatio < 1 && maxHits > 1) {
    ctx.globalAlpha = 0.6 + damageRatio * 0.4;
  }
  
  // Draw based on material type
  switch (material) {
    case 'copper':
      drawCopperBrick(ctx, x, y, width, height, colors);
      break;
    case 'ice':
      drawIceBrick(ctx, x, y, width, height, colors);
      break;
    case 'metal':
      drawMetalBrick(ctx, x, y, width, height, colors);
      break;
    case 'wood':
      drawWoodBrick(ctx, x, y, width, height, colors);
      break;
    case 'diamond':
      drawDiamondBrick(ctx, x, y, width, height, colors);
      break;
    default:
      drawGlassBrick(ctx, x, y, width, height, colors);
  }
  
  // Draw special type indicators
  drawBrickTypeIndicator(ctx, brick, gameTime);
  
  // Damage cracks overlay
  if (damageRatio < 0.7 && maxHits > 1) {
    drawDamageCracks(ctx, brick, damageRatio);
  }
  
  ctx.restore();
};

// Draw special brick type indicators
const drawBrickTypeIndicator = (
  ctx: CanvasRenderingContext2D,
  brick: Brick,
  gameTime: number
): void => {
  const { x, y, width, height, type, hits, maxHits } = brick;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  switch (type) {
    case 'explosive':
      // Bomb icon
      ctx.fillStyle = 'rgba(255, 100, 50, 0.9)';
      ctx.beginPath();
      ctx.arc(centerX, centerY + 2, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 200, 50, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 4);
      ctx.lineTo(centerX + 3, centerY - 8);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255, 220, 100, 0.9)';
      ctx.beginPath();
      ctx.arc(centerX + 3, centerY - 9, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'indestructible':
      // X pattern
      ctx.strokeStyle = 'rgba(150, 160, 180, 0.8)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 6);
      ctx.lineTo(x + width - 8, y + height - 6);
      ctx.moveTo(x + width - 8, y + 6);
      ctx.lineTo(x + 8, y + height - 6);
      ctx.stroke();
      break;
      
    case 'moving':
      // Arrows
      const arrowOffset = Math.sin(gameTime * 4) * 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(centerX - 6 + arrowOffset, centerY);
      ctx.lineTo(centerX - 10 + arrowOffset, centerY);
      ctx.moveTo(centerX + 6 - arrowOffset, centerY);
      ctx.lineTo(centerX + 10 - arrowOffset, centerY);
      ctx.stroke();
      break;
      
    case 'chain':
      // Chain links
      ctx.strokeStyle = 'rgba(255, 220, 100, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX - 5, centerY, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX + 5, centerY, 4, 0, Math.PI * 2);
      ctx.stroke();
      break;
      
    case 'coin':
      // Gold star
      ctx.fillStyle = 'rgba(255, 220, 80, 0.95)';
      drawStar(ctx, centerX, centerY, 5, 6, 3);
      ctx.fill();
      break;
      
    case 'rainbow':
      // Shimmer
      const hue = (gameTime * 120) % 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.5)`;
      ctx.beginPath();
      ctx.roundRect(x + 4, y + 4, width - 8, height - 8, 2);
      ctx.fill();
      break;
      
    case 'ghost':
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('👻', centerX, centerY);
      break;
  }
  
  // Hit count for multi-hit bricks
  if (maxHits > 1 && type === 'normal' && hits > 1) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.font = 'bold 11px sans-serif';
    ctx.strokeText(hits.toString(), centerX, centerY);
    ctx.fillText(hits.toString(), centerX, centerY);
  }
};

// Draw star shape
const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): void => {
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

// Draw damage cracks
const drawDamageCracks = (ctx: CanvasRenderingContext2D, brick: Brick, damageRatio: number): void => {
  const { x, y, width, height } = brick;
  const crackIntensity = 1 - damageRatio;
  
  ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 + crackIntensity * 0.3})`;
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const crackCount = Math.floor(crackIntensity * 3) + 1;
  
  for (let i = 0; i < crackCount; i++) {
    const angle = (Math.PI * 2 / crackCount) * i + 0.3;
    const length = width * 0.25 * (0.5 + crackIntensity * 0.5);
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * length, centerY + Math.sin(angle) * length * 0.6);
    ctx.stroke();
  }
};

// ============ PADDLE AND BALL RENDERERS ============

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
  
  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  
  // Outer cyan frame
  const frameGrad = ctx.createLinearGradient(x, y, x, y + height);
  frameGrad.addColorStop(0, 'hsl(195, 100%, 55%)');
  frameGrad.addColorStop(0.3, 'hsl(195, 80%, 45%)');
  frameGrad.addColorStop(0.7, 'hsl(200, 85%, 40%)');
  frameGrad.addColorStop(1, 'hsl(195, 100%, 50%)');
  
  ctx.fillStyle = frameGrad;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, height / 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Inner core
  const coreColor = hasLaser ? 'hsl(0, 90%, 50%)' : hasMagnet ? 'hsl(280, 90%, 50%)' : 'hsl(0, 85%, 50%)';
  const innerPadding = 3;
  
  const coreGrad = ctx.createLinearGradient(x, y + innerPadding, x, y + height - innerPadding);
  coreGrad.addColorStop(0, coreColor);
  coreGrad.addColorStop(0.5, coreColor.replace('50%)', '40%)'));
  coreGrad.addColorStop(1, coreColor.replace('50%)', '35%)'));
  
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.roundRect(x + innerPadding * 2, y + innerPadding, width - innerPadding * 4, height - innerPadding * 2, (height - innerPadding * 2) / 2);
  ctx.fill();
  
  // Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.roundRect(x + innerPadding * 3, y + innerPadding + 1, width - innerPadding * 6, (height - innerPadding * 2) / 3, 2);
  ctx.fill();
  
  // Shield glow
  if (hasShield) {
    ctx.shadowColor = 'hsla(200, 100%, 60%, 0.8)';
    ctx.shadowBlur = 15;
    ctx.strokeStyle = 'hsla(200, 100%, 70%, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 2, y - 2, width + 4, height + 4, height / 2 + 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  
  ctx.restore();
};

export const drawPremiumBall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  isFireball: boolean = false
): void => {
  ctx.save();
  
  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;
  
  // Main gradient
  const ballColor = isFireball ? 'hsl(25, 100%, 55%)' : 'hsl(0, 85%, 55%)';
  const ballGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
  ballGrad.addColorStop(0, isFireball ? 'hsl(50, 100%, 75%)' : 'hsl(5, 90%, 70%)');
  ballGrad.addColorStop(0.4, ballColor);
  ballGrad.addColorStop(1, isFireball ? 'hsl(15, 100%, 40%)' : 'hsl(355, 80%, 40%)');
  
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Highlight
  const highlightGrad = ctx.createRadialGradient(x - radius * 0.4, y - radius * 0.4, 0, x - radius * 0.4, y - radius * 0.4, radius * 0.5);
  highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
  highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  ctx.fillStyle = highlightGrad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Outer glow
  ctx.shadowColor = isFireball ? 'hsla(25, 100%, 55%, 0.6)' : 'hsla(0, 85%, 55%, 0.4)';
  ctx.shadowBlur = 12;
  ctx.strokeStyle = isFireball ? 'hsl(40, 100%, 60%)' : 'hsl(0, 70%, 65%)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
};
