const { Client } = require('ssh2');
const fs = require('fs');

module.exports = function deploy(repoUrl, type) {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    const commands = `
      cd ~ &&
      rm -rf launch-temp &&
      git clone ${repoUrl} launch-temp &&
      cd launch-temp &&
      ${type === 'docker' ? `
        docker rm -f launch-app || true &&
        docker build -t launch-app . &&
        docker run -d -p 80:80 --name launch-app launch-app
      ` : `
        sudo cp -r * /var/www/html/
      `}
    `;

    conn.on('ready', () => {
      conn.exec(commands, (err, stream) => {
        if (err) return reject(err);

        let output = '';
        stream.on('data', (data) => output += data.toString());
        stream.stderr.on('data', (data) => output += data.toString());
        stream.on('close', () => {
          conn.end();
          resolve(output);
        });
      });
    }).connect({
      host: 'YOUR_EC2_PUBLIC_IP',
      port: 22,
      username: 'ubuntu',
      privateKey: fs.readFileSync('/path/to/your.pem') // Update this path accordingly
    });
  });
};