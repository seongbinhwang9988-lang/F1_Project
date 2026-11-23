// npm 의존성 없이 배포용 정적 파일만 dist로 모읍니다.
import { cp, mkdir, readFile, rm, stat, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outArg = process.argv.indexOf('--out');
const output = path.resolve(outArg >= 0 ? process.argv[outArg + 1] : path.join(source, 'dist'));
if (path.basename(output) !== 'dist' || source.startsWith(output + path.sep) || source === output) throw new Error('출력 폴더는 별도 dist 디렉터리여야 합니다.');
const filter = p => !path.basename(p).startsWith('._') && path.basename(p) !== '.DS_Store';
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'content.js', 'revision.html']) await cp(path.join(source, name), path.join(output, name));
await cp(path.join(source, 'assets'), path.join(output, 'assets'), { recursive: true, filter });
await writeFile(path.join(output, '.nojekyll'), '');
await writeFile(path.join(output, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/index.html\n  Cache-Control: no-cache\n/content.js\n  Cache-Control: no-cache\n');
let files = 0, bytes = 0;
async function validate(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) { await validate(p); continue; }
    files++; bytes += (await stat(p)).size;
    if (item.name.endsWith('.html')) {
      const html = await readFile(p, 'utf8');
      for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
        const url = match[1];
        if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;
        const relative = decodeURIComponent(url.split(/[?#]/)[0]);
        if (relative) await stat(path.resolve(path.dirname(p), relative));
      }
    }
  }
}
await validate(output);
console.log(JSON.stringify({ directory: output, files, megabytes: Number((bytes / 1024 ** 2).toFixed(1)), validation: 'passed' }));
