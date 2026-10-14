const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Correct input file: media__1782366159312.jpg is the characters image
const inputPath = 'C:\\Users\\kesha\\.gemini\\antigravity-ide\\brain\\545756f7-a495-4406-b4c4-ba56708b60ac\\media__1782366159312.jpg';
const outputPath = path.resolve(__dirname, '../public/characters.png');

async function run() {
  try {
    // We add ensureAlpha() to make sure the output buffer has 4 channels (RGBA)
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = info.channels; // 4

    console.log(`Processing characters image: ${width}x${height}, channels: ${channels}`);

    // Create a visited array for the flood fill
    const visited = new Uint8Array(width * height);
    const queue = [];

    // Helper to check if a pixel is background (part of white/gray checkerboard grid)
    function isBackground(x, y) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Checkerboard pixels are grayscale and light (since gray is ~187 and white is 255)
      const isGrayscale = Math.abs(r - g) <= 15 && Math.abs(g - b) <= 15 && Math.abs(r - b) <= 15;
      const isBgRange = r >= 160; // 160 to 255
      
      return isGrayscale && isBgRange;
    }

    // Add all border pixels that are background to the queue
    for (let x = 0; x < width; x++) {
      if (isBackground(x, 0)) {
        const idx = 0 * width + x;
        visited[idx] = 1;
        queue.push([x, 0]);
      }
      if (isBackground(x, height - 1)) {
        const idx = (height - 1) * width + x;
        visited[idx] = 1;
        queue.push([x, height - 1]);
      }
    }
    for (let y = 0; y < height; y++) {
      if (isBackground(0, y)) {
        const idx = y * width + 0;
        visited[idx] = 1;
        queue.push([0, y]);
      }
      if (isBackground(width - 1, y)) {
        const idx = y * width + (width - 1);
        visited[idx] = 1;
        queue.push([width - 1, y]);
      }
    }

    console.log(`Initial queue size (border bg pixels): ${queue.length}`);

    // Flood fill (BFS)
    let head = 0;
    const directions = [
      [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    while (head < queue.length) {
      const [cx, cy] = queue[head++];
      
      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;
        
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (visited[nidx] === 0 && isBackground(nx, ny)) {
            visited[nidx] = 1;
            queue.push([nx, ny]);
          }
        }
      }
    }

    console.log(`Total background pixels identified: ${queue.length}`);

    // Modify the alpha channel of visited pixels to 0
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (visited[idx] === 1) {
          const pixelOffset = idx * channels;
          data[pixelOffset + 3] = 0; // Set Alpha to 0 (completely transparent)
        }
      }
    }

    // Save the modified image
    await sharp(data, {
      raw: {
        width,
        height,
        channels
      }
    })
    .png()
    .toFile(outputPath);

    console.log(`Saved transparent image to: ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
}

run();
