const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Check credentials are set
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Error: Missing Cloudinary credentials in environment variables.");
  console.error("Make sure to run with environment variables loaded (e.g. node --env-file=.env scripts/upload-assets.cjs)");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

const assetsDir = path.join(__dirname, '../src/assets');
const rootUploadFolder = 'utkarsh construction';

function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      // Ignore hidden/system files (like .DS_Store, .gitkeep)
      if (!file.startsWith('.')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function uploadAll() {
  const files = getFilesRecursively(assetsDir);
  console.log(`Starting Cloudinary upload...`);
  console.log(`Found ${files.length} files in ${assetsDir}`);
  console.log('--------------------------------------------------');

  const mappings = [];

  for (const file of files) {
    const relativePath = path.relative(assetsDir, file);
    // Convert Windows backward slashes to forward slashes for Cloudinary folder pathing
    const relativeDir = path.dirname(relativePath).replace(/\\/g, '/');
    
    // Construct target folder on Cloudinary
    const targetFolder = relativeDir === '.'
      ? rootUploadFolder
      : `${rootUploadFolder}/${relativeDir}`;

    console.log(`Uploading: ${relativePath} -> [Cloudinary] folder: "${targetFolder}"...`);

    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: targetFolder,
        use_filename: true,
        unique_filename: false,
        resource_type: 'auto'
      });
      console.log(`✓ Success: ${relativePath} -> ${result.secure_url}`);
      mappings.push({
        local: relativePath,
        cloudinary: result.secure_url
      });
    } catch (err) {
      console.error(`✗ Error uploading ${relativePath}:`, err.message || err);
    }
  }

  console.log('\n--------------------------------------------------');
  console.log('Upload Process Completed!');
  console.log('Here are your Cloudinary mappings:\n');
  mappings.forEach(m => {
    console.log(`${m.local} => ${m.cloudinary}`);
  });
  console.log('--------------------------------------------------');
}

uploadAll();
