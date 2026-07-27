const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'code', 'index.html');
const workerPath = path.join(__dirname, '..', 'code', 'worker.js');

const html = fs.readFileSync(htmlPath, 'utf8');
let js = fs.readFileSync(workerPath, 'utf8');

const indexConst = 'const INDEX_HTML = ' + JSON.stringify(html) + ';\n\n';

if (js.startsWith('const INDEX_HTML =')) {
  js = js.replace(/^const INDEX_HTML = [\s\S]*?;\n\n/, indexConst);
} else {
  js = indexConst + js;
}

if (!js.includes("url.pathname === '/'")) {
  js = js.replace(
    "if (url.pathname === '/health')",
    "if (url.pathname === '/' || url.pathname === '/index.html')\n      return new Response(INDEX_HTML, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS } });\n\n    if (url.pathname === '/health')"
  );
}

fs.writeFileSync(workerPath, js, 'utf8');
console.log('Successfully embedded index.html into worker.js');
