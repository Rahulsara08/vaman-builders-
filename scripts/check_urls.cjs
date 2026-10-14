const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/lib/cloudinary.ts', 'utf8');
const BASE_IMG = 'https://res.cloudinary.com/darmr4g5x/image/upload/f_auto,q_auto';
const BASE_VID = 'https://res.cloudinary.com/darmr4g5x/video/upload/f_auto,q_auto';

// Find all expressions like `${CLOUDINARY_IMAGE_BASE}/...`
const imgMatches = [...content.matchAll(/\$\{CLOUDINARY_IMAGE_BASE\}([^\`]+)/g)].map(m => BASE_IMG + m[1]);
const vidMatches = [...content.matchAll(/\$\{CLOUDINARY_VIDEO_BASE\}([^\`]+)/g)].map(m => BASE_VID + m[1]);

const allUrls = [...new Set([...imgMatches, ...vidMatches])];
console.log(`Checking ${allUrls.length} Cloudinary URLs...`);

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (e) => {
      resolve({ url, status: 'ERR: ' + e.message });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT' });
    });
  });
}

(async () => {
  const broken = [];
  const ok = [];
  for (const url of allUrls) {
    const res = await checkUrl(url);
    if (res.status === 200) {
      ok.push(res);
    } else {
      broken.push(res);
      console.log(`[BROKEN ${res.status}] ${url}`);
    }
  }
  console.log(`\nResults: ${ok.length} OK, ${broken.length} BROKEN.`);
  if (broken.length > 0) {
    console.log('\nBroken list:');
    broken.forEach(b => console.log(`${b.status}: ${b.url}`));
  }
})();
