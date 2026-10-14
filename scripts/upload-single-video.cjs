const cloudinary = require('cloudinary').v2;
const path = require('path');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Error: Missing Cloudinary credentials in environment variables.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const videoPath = path.join(__dirname, '../Building_construction_timelapse_…_202606231151.mp4');

async function upload() {
  console.log(`Uploading ${videoPath} to Cloudinary under folder 'utkarsh construction'...`);
  try {
    const result = await cloudinary.uploader.upload(videoPath, {
      folder: 'utkarsh construction',
      use_filename: true,
      unique_filename: false,
      resource_type: 'video'
    });
    console.log(`\n==================================================`);
    console.log(`UPLOAD SUCCESSFUL!`);
    console.log(`URL: ${result.secure_url}`);
    console.log(`==================================================\n`);
  } catch (err) {
    console.error(`✗ Error:`, err);
  }
}

upload();
