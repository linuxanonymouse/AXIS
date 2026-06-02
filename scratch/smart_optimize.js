const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components', 'scene');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Lower canvas DPR to [1, 1] instead of [1, 2] or leaving it default
  content = content.replace(/<Canvas([^>]*)dpr=\{[^}]+\}/g, '<Canvas$1dpr={1}');
  if (!content.includes('dpr={1}') && content.includes('<Canvas')) {
    content = content.replace(/<Canvas/g, '<Canvas dpr={1}');
  }

  // 2. Safely replace MeshTransmissionMaterial with meshPhysicalMaterial, preserving the color
  // Find all instances of MeshTransmissionMaterial tag
  content = content.replace(/<MeshTransmissionMaterial([^>]+)\/>/g, (match, attrs) => {
    // Extract color if present
    let colorMatch = attrs.match(/color=(["'][^"']+["']|\{[^}]+\})/);
    let colorStr = colorMatch ? colorMatch[1] : '"#ffffff"';
    
    return `<meshPhysicalMaterial color=${colorStr} emissive=${colorStr} emissiveIntensity={0.8} transparent opacity={0.6} roughness={0.1} metalness={0.5} clearcoat={1} />`;
  });

  // Remove MeshTransmissionMaterial from imports
  content = content.replace(/MeshTransmissionMaterial\s*,?/g, '');
  content = content.replace(/,\s*\}/g, '}');

  // 3. Optimize Stars to fewer count
  content = content.replace(/count=\{2000\}/g, 'count={800}');
  content = content.replace(/count=\{3000\}/g, 'count={1000}');
  content = content.replace(/count=\{1500\}/g, 'count={600}');

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Smart Optimization Complete!');
