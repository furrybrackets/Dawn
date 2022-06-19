import fs from "fs-extra";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const dist = join(__dirname, "../dist");
console.log(dist);
const bin = join(__dirname, "../bin");

fs.copySync(dist, bin, { overwrite: true });
console.log("Copied dist to bin");

// put #!/usr/bin/env node at the top of the file
const binFile = join(bin, "cli.mjs");
console.log(binFile);
const binFileContents = fs.readFileSync(binFile, "utf8");
const binFileContentsWithNode = `#!/usr/bin/env node\n${binFileContents}`;
fs.writeFileSync(binFile, binFileContentsWithNode);