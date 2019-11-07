const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const cors = require('cors');
const express = require('express');
const npmCheck = require('npm-check');
const fetch = require('isomorphic-fetch');
const app = express();

const writeFile = promisify(fs.writeFile);

const isDev = process.env.NODE_ENV !== 'production';

const port = isDev ? 8080 : 80;

app.use(cors({ origin: '*' }));
app.options('/products/:id', cors()) // enable pre-flight request for DELETE request
app.delete('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/dependencies', async (req, res) => {

  try {
    // Get query data
    const { repo, user } = req.query;

    // sanitize the query params

    // Build package.json URL
    const packageJsonContentUri = `https://api.github.com/repos/${user}/${repo}/contents/package.json`;

    // make a call
    const response = await fetch(packageJsonContentUri);

    // Get download_url for content
    const { download_url } = await response.json();

    // Get package.json content
    const projectResponse = await fetch(download_url);
    const content = await projectResponse.json();

    // Download a temp pckage.json of the project
    const pathToTempFile = path.resolve(__dirname, 'temp', 'package.json');

    await writeFile(pathToTempFile, JSON.stringify(content));

    res.status(200).json({status: 'done'});

    // Return data
  } catch(e) {
    res.status(500).json(e);
  }

});

app.get('/dependencies/lifecheck', async (req, res) => {
  // Run npm check
  npmCheck({ cwd: './src/temp/' })
    .then(currentState => {
      res.status(200).json(currentState.get('packages'))
    });
});


app.listen(port, () => {
  console.log(`Server running on port${port}`);
});