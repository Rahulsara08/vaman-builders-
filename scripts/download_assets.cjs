const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const ASSETS_TO_DOWNLOAD = [
  // MS Jewellers
  {
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/ms-jewellers-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/ms-jewellers-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/ms-jewellers-col1-2.webp',
    width: 800,
    height: 600
  },

  // Barfiwala Sweets
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/barfiwala-sweets-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/barfiwala-sweets-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/barfiwala-sweets-col1-2.webp',
    width: 800,
    height: 600
  },

  // Reeve Inn Hotel
  {
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/hotel-reeve-inn-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/hotel-reeve-inn-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/hotel-reeve-inn-col1-2.webp',
    width: 800,
    height: 600
  },

  // Paliwal Textile
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/paliwal-textile-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/paliwal-textile-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/paliwal-textile-col1-2.webp',
    width: 800,
    height: 600
  },

  // Bhangadiya House
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/bhangadiya-house-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/bhangadiya-house-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/bhangadiya-house-col1-2.webp',
    width: 800,
    height: 600
  },

  // Indie Stitch
  {
    url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/indie-stitch-col2.webp',
    width: 1000,
    height: 750
  },
  {
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/indie-stitch-col1-1.webp',
    width: 800,
    height: 600
  },
  {
    url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
    dest: 'public/assets/images/projects/indie-stitch-col1-2.webp',
    width: 800,
    height: 600
  },

  // Showcase Categories
  {
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/bedroom.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/office.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/wardrobe.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/balcony.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/reception.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/bathroom.webp',
    width: 900,
    height: 675
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
    dest: 'public/assets/images/showcase/corridor.webp',
    width: 900,
    height: 675
  },

  // Services Division Backgrounds
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/services-residential.webp',
    width: 1000,
    height: 650
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/services-commercial.webp',
    width: 1000,
    height: 650
  },
  {
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/home-approach.webp',
    width: 1200,
    height: 700
  }
];

function downloadAndOptimize(item) {
  return new Promise((resolve, reject) => {
    https.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          processResponse(redirectRes);
        }).on('error', reject);
      } else {
        processResponse(res);
      }

      function processResponse(response) {
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', async () => {
          try {
            const buffer = Buffer.concat(chunks);
            const fullDest = path.resolve(__dirname, '..', item.dest);
            fs.mkdirSync(path.dirname(fullDest), { recursive: true });
            await sharp(buffer)
              .resize(item.width, item.height, { fit: 'cover', position: 'center' })
              .webp({ quality: 85 })
              .toFile(fullDest);
            console.log(`[OK] Saved ${item.dest}`);
            resolve(item.dest);
          } catch (err) {
            console.error(`[FAIL] ${item.dest}: ${err.message}`);
            reject(err);
          }
        });
      }
    }).on('error', (err) => {
      console.error(`[NET ERROR] ${item.dest}: ${err.message}`);
      reject(err);
    });
  });
}

(async () => {
  console.log(`Downloading and optimizing ${ASSETS_TO_DOWNLOAD.length} high-res assets...`);
  for (const item of ASSETS_TO_DOWNLOAD) {
    try {
      await downloadAndOptimize(item);
    } catch (e) {
      console.error(`Error on ${item.dest}:`, e.message);
    }
  }
  console.log('Finished downloading all assets!');
})();
