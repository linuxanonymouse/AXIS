const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components', 'scene');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let originalContent = content;

  // Replace MeshTransmissionMaterial with higher quality, but without backside to save performance
  content = content.replace(/<MeshTransmissionMaterial([^>]+)\/>/g, (match, attrs) => {
    // Keep color if exists
    let colorMatch = attrs.match(/color=(["'][^"']+["']|\{[^}]+\})/);
    let colorStr = colorMatch ? colorMatch[1] : '"#ffffff"';
    
    return `<MeshTransmissionMaterial resolution={256} samples={4} thickness={1.5} roughness={0.05} transmission={1} ior={1.5} clearcoat={1} clearcoatRoughness={0} chromaticAberration={0.05} color=${colorStr} />`;
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Glass Enhancement Complete!');
