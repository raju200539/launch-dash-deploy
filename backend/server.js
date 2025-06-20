const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const deploy = require('./deploy');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/deploy', async (req, res) => {
  const { repoUrl, type } = req.body;

  if (!repoUrl || !type) {
    return res.status(400).json({ message: 'Missing repo URL or deployment type' });
  }

  try {
    const log = await deploy(repoUrl, type);
    res.json({ status: 'success', log });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`LaunchDash backend running on port ${PORT}`);
});
