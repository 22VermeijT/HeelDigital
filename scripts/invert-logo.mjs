import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const input = path.join(root, 'public', 'HeelDigital.png');
const output = path.join(root, 'public', 'logo.png');

await sharp(input)
  .negate({ alpha: false }) // invert RGB only, keep alpha for transparency
  .toFile(output);

console.log('Inverted logo saved to public/logo.png');
