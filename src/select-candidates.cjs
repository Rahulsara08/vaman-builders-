const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Nikhil\\Pixeel Nest\\Images-20260622T075634Z-3-001\\Images';
const destDir = path.join(__dirname, 'assets', 'temp_check');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const projects = fs.readdirSync(srcDir).filter(name => {
  return fs.statSync(path.join(srcDir, name)).isDirectory();
});

console.log('Found projects:', projects);

projects.forEach(project => {
  const projectSrc = path.join(srcDir, project);
  const projectDest = path.join(destDir, project);

  if (!fs.existsSync(projectDest)) {
    fs.mkdirSync(projectDest, { recursive: true });
  }

  // Read all files, filter for jpg/jpeg
  const files = fs.readdirSync(projectSrc)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg';
    })
    .map(file => {
      const filePath = path.join(projectSrc, file);
      const stat = fs.statSync(filePath);
      return {
        name: file,
        path: filePath,
        size: stat.size,
        mtime: stat.mtime
      };
    });

  // Sort by size descending (largest files are usually high quality finished shots)
  files.sort((a, b) => b.size - a.size);

  // Copy top 5 largest files
  const candidates = files.slice(0, 5);
  console.log(`\nProject: ${project} - Copying top candidates:`);
  candidates.forEach((c, idx) => {
    const destPath = path.join(projectDest, `${idx + 1}_size_${Math.round(c.size / 1024)}kb_${c.name}`);
    fs.copyFileSync(c.path, destPath);
    console.log(`  -> Copied ${c.name} (${Math.round(c.size / 1024)} KB)`);
  });
});
