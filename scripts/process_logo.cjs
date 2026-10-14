const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\rahul\\.gemini\\antigravity-ide\\brain\\416c3a57-6134-4cb2-80a3-1983e631c2ca\\.user_uploaded\\media_1791960288263.png';
const outputPath = path.resolve(__dirname, '../public/logo.png');

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image info: ${width}x${height}, channels=${channels}`);

  // Inspect the corners and edges to see background color
  const samplePoints = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [10, 10],
    [width - 10, 10],
    [Math.floor(width / 2), 5],
    [Math.floor(width / 2), height - 5]
  ];

  samplePoints.forEach(([x, y]) => {
    const idx = (y * width + x) * channels;
    console.log(`(${x}, ${y}): R=${data[idx]}, G=${data[idx+1]}, B=${data[idx+2]}, A=${data[idx+3]}`);
  });

  // Background is a uniform light grey background.
  // Notice in the image, the background has subtle gradient from ~205 to ~225 grey (R ≈ G ≈ B).
  // The golden logo has high saturation (R > B + 30, or distinct gold tones, or dark shadows/outlines).
  // Let's use flood-fill from all 4 borders to remove the outer background without affecting interior parts,
  // AND also remove enclosed background inside the letters like 'O', 'A', 'R', roof, etc., if they match the background color!
  
  // Let's test a flood fill:
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBgPixel(r, g, b) {
    // Background is near neutral grey: |r - g| <= 10, |g - b| <= 10, |r - b| <= 10
    // and brightness is between 180 and 245
    const isNeutral = Math.abs(r - g) <= 12 && Math.abs(g - b) <= 12 && Math.abs(r - b) <= 12;
    const isLightGrey = r >= 170 && r <= 245;
    return isNeutral && isLightGrey;
  }

  // Also inside loops of letters (like A, R, B, D, windows in the house)
  // Let's create an output buffer
  const outData = Buffer.from(data);

  // First flood fill from borders to catch outer background
  for (let x = 0; x < width; x++) {
    const topIdx = (0 * width + x) * channels;
    if (isBgPixel(data[topIdx], data[topIdx+1], data[topIdx+2])) {
      visited[x] = 1;
      queue.push([x, 0]);
    }
    const btmIdx = ((height - 1) * width + x) * channels;
    if (isBgPixel(data[btmIdx], data[btmIdx+1], data[btmIdx+2])) {
      visited[(height - 1) * width + x] = 1;
      queue.push([x, height - 1]);
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width + 0) * channels;
    if (isBgPixel(data[leftIdx], data[leftIdx+1], data[leftIdx+2])) {
      visited[y * width] = 1;
      queue.push([0, y]);
    }
    const rightIdx = (y * width + (width - 1)) * channels;
    if (isBgPixel(data[rightIdx], data[rightIdx+1], data[rightIdx+2])) {
      visited[y * width + (width - 1)] = 1;
      queue.push([width - 1, y]);
    }
  }

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const pIdx = (cy * width + cx) * channels;
    // Set alpha to 0
    outData[pIdx + 3] = 0;

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIndex = ny * width + nx;
        if (!visited[nIndex]) {
          const nIdx = nIndex * channels;
          if (isBgPixel(data[nIdx], data[nIdx + 1], data[nIdx + 2])) {
            visited[nIndex] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }
  }

  // Also check if any remaining pixels match pure background grey (e.g. inside letters A, R, B, D, roof):
  // Let's check:
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // If it's strict grey background inside letter counters
      if (isBgPixel(r, g, b)) {
        outData[idx + 3] = 0;
      }
    }
  }

  // Save the result
  await sharp(outData, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .trim() // Trim any excess transparent padding
  .png()
  .toFile(outputPath);

  console.log(`Saved transparent logo to ${outputPath}`);
}

processLogo().catch(console.error);
