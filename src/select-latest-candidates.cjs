const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Nikhil\\Pixeel Nest\\Images-20260622T075634Z-3-001\\Images';
const destDir = path.join(__dirname, 'assets', 'temp_check');

const projects = fs.readdirSync(srcDir).filter(name => {
  return fs.statSync(path.join(srcDir, name)).isDirectory();
});

projects.forEach(project => {
  const projectSrc = path.join(srcDir, project);
  const projectDest = path.join(destDir, project);

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

  // Sort by modification time descending (latest files first)
  files.sort((a, b) => b.mtime - a.mtime);

  const latestCandidates = files.slice(0, 8);
  console.log(`\nProject: ${project} - Copying latest candidates:`);
  latestCandidates.forEach((c, idx) => {
    const destPath = path.join(projectDest, `latest_${idx + 1}_${c.name}`);
    fs.copyFileSync(c.path, destPath);
    console.log(`  -> Copied ${c.name} (${c.mtime.toISOString().split('T')[0]})`);
  });
});
