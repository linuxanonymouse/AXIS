const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components', 'scene');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Lower canvas DPR
  content = content.replace(/dpr=\{.*?\}|dpr=\[.*?\]/g, 'dpr={1}');

  // 2. Remove EffectComposer from imports
  content = content.replace(/import\s*\{\s*[^}]*EffectComposer[^}]*\}\s*from\s*['"]@react-three\/postprocessing['"];?/g, '');
  
  // Clean up empty lines from imports
  content = content.replace(/import\s*\{\s*\}\s*from\s*['"]@react-three\/postprocessing['"];?/g, '');

  // 3. Remove EffectComposer from JSX safely
  // Match <EffectComposer>...</EffectComposer> including newlines
  content = content.replace(/<EffectComposer>[\s\S]*?<\/EffectComposer>/g, '');

  // 4. MeshTransmissionMaterial removal
  content = content.replace(/MeshTransmissionMaterial\s*,?/g, '');
  // Fix comma issues in imports
  content = content.replace(/,\s*\}/g, '}');

  // Replace usage
  content = content.replace(/<MeshTransmissionMaterial[\s\S]*?\/>/g, '<meshPhysicalMaterial transparent opacity={0.3} roughness={0.1} metalness={0.5} clearcoat={1} color="#ffffff" />');

  // 5. Reduce stars count
  content = content.replace(/count=\{2000\}/g, 'count={1000}');
  content = content.replace(/count=\{3000\}/g, 'count={1000}');

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Optimization Complete!');
