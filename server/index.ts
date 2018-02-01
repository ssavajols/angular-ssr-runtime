/// <references href="./lib.d" />

import 'zone.js/dist/zone-node';
import * as express from 'express';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import * as fs from 'fs-extra';
import { mocks } from 'mock-browser';

global.window = mocks.MockBrowser.createWindow();

enableProdMode();

const app = express();

app.use(express.static(__dirname + '/../dist')); // serve JS/IMAGES/CSS
app.get('**', async (request, response) => { // serve Angular Router
  // renderModuleFactory parameters
  const { AppServerModuleNgFactory } = require(__dirname + '/../functions/main.bundle'); // Get Angular application to server
  const document = await fs.readFile(__dirname + '/../functions/index.html', 'utf8'); // get index.html file content
  const url = request.path; // get url to serve by angular application
  const options = { document, url }; // angular server options

  try {
    // generate the server-side rendered html
    const html = await renderModuleFactory(AppServerModuleNgFactory, options); // build DOM
    response.send(html); // send DOM to the client
  } catch (e) {
    console.log(e);
    response.status(500).send('¯_(ツ)_/¯');
  }
});

const PORT = process.env.PORT || 3022;
app.listen(PORT, () => { console.log(`Listening on ${PORT}...`); });
