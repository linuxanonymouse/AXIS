const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'components', 'scene');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let originalContent = content;

  // Replace back the fake emissive materials with the optimized MeshTransmissionMaterial
  content = content.replace(/<meshPhysicalMaterial color=(["'][^"']+["']|\{[^}]+\}) emissive=\1 emissiveIntensity=\{0\.8\} transparent opacity=\{0\.6\} roughness=\{0\.1\} metalness=\{0\.5\} clearcoat=\{1\} \/>/g, (match, color) => {
    return `<MeshTransmissionMaterial backside resolution={64} samples={3} thickness={0.5} roughness={0.15} transmission={1} ior={1.3} clearcoat={1} color=${color} />`;
  });
  
  // There were also cases where color="#ffffff" but emissive="#ffffff" which I matched.
  // Wait, some materials were typed exactly: <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} transparent opacity={0.6} roughness={0.1} metalness={0.5} clearcoat={1} />
  
  if (content !== originalContent) {
    // If we added MeshTransmissionMaterial, ensure it's imported from @react-three/drei
    if (!content.includes('MeshTransmissionMaterial')) {
       // Find the @react-three/drei import and append it
       content = content.replace(/import\s*\{([^}]+)\}\s*from\s*['"]@react-three\/drei['"];?/, (match, imports) => {
         return `import { ${imports}, MeshTransmissionMaterial } from "@react-three/drei";`;
       });
       
       // If there is NO import from @react-three/drei, add it below React imports
       if (!content.includes('@react-three/drei')) {
         content = `import { MeshTransmissionMaterial } from "@react-three/drei";\n` + content;
       }
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Restoration Complete!');
