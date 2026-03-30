const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npx next build', { encoding: 'utf8', stdio: 'pipe' });
} catch (error) {
  fs.writeFileSync('error-raw.json', JSON.stringify({
    stdout: error.stdout,
    stderr: error.stderr
  }, null, 2));
}
