const express = require('@runkit/runkit/express-endpoint/1.0.0');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const app = express(exports);

/**
 * Loads data from GreasyFork.
 *
 * In the url "https://greasyfork.org/en/scripts/93312-my-script",
 * the `scriptId` is "93312".
 *
 * Sample response:
 * {
 *   "version":"0.6",
 *   "updatedDateTime":"2018-11-17T17:50:02+00:00",
 *   "updated":"11/17/2018",
 *   "totalInstalls":"151",
 *   "dailyInstalls":"0"
 * }
 */
app.get('/greasyfork/:scriptId', async (req, res) => {
  try {
    const scriptId = req.params.scriptId;
    const url = `https://greasyfork.org/en/scripts/${scriptId}`;

    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    let version = 'N/A';
    const versionEl = $('dd.script-show-version');
    if (versionEl.length) {
      version = versionEl.text();
    }

    let updated = 'N/A';
    let updatedDateTime = 'N/A';
    const updatedEl = $('dd.script-show-updated-date time');
    if (updatedEl.length) {
      updatedDateTime = updatedEl.attr('datetime');
      if (updatedDateTime) {
        updated = moment(updatedDateTime).calendar();
      }
    }

    let totalInstalls = 'N/A';
    const totalInstallsEl = $('dd.script-show-total-installs');
    if (totalInstallsEl.length) {
      totalInstalls = totalInstallsEl.text();
    }

    let dailyInstalls = 'N/A';
    const dailyInstallsEl = $('dd.script-show-daily-installs');
    if (dailyInstallsEl.length) {
      dailyInstalls = dailyInstallsEl.text();
    }

    res.json({
      version,
      updatedDateTime,
      updated,
      totalInstalls,
      dailyInstalls,
    });
  } catch (e) {
    res.json({
      errors: [
        {
          status: 400,
          detail: `Unable to load data from GreasyFork: ${e}`,
        },
      ],
    });
  }
});

/**
 * Loads data from OpenUserJS.
 *
 * In the url "https://openuserjs.org/scripts/username/My_Script",
 * the `namespace` is "username" and the `name` is "My_Script".
 *
 * Sample response:
 *
 * {
 *   "version":"0.0.6",
 *   "updatedDateTime":"2019-07-21T05:41:58.134Z",
 *   "updated":"07/21/2019",
 *   "totalInstalls":"254168"
 * }
 */
app.get('/openuserjs/:namespace/:name', async (req, res) => {
  try {
    const namespace = req.params.namespace;
    const name = req.params.name;
    const url = `https://openuserjs.org/scripts/${namespace}/${name}`;

    const result = await axios.get(url);
    const $ = cheerio.load(result.data);

    let version = 'N/A';
    const versionEl = $('.panel-body .script-meta code');
    if (versionEl.length) {
      version = versionEl.text().split('+')[0];
    }

    let updated = 'N/A';
    let updatedDateTime = 'N/A';
    const updatedEl = $('.panel-body .script-meta time');
    if (updatedEl.length == 2) {
      updatedDateTime = updatedEl.eq(1).attr('datetime');
      if (updatedDateTime) {
        updated = moment(updatedDateTime).calendar();
      }
    }

    let totalInstalls = 'N/A';
    const totalInstallsEl = $('.navbar .navbar-text');
    if (totalInstallsEl.length) {
      const match = totalInstallsEl.text().match(/[0-9]+/);
      if (match !== undefined && match.length) {
        totalInstalls = match[0];
      }
    }

    res.json({
      version,
      updatedDateTime,
      updated,
      totalInstalls,
    });
  } catch (e) {
    res.json({
      errors: [
        {
          status: 400,
          detail: `Unable to load data from OpenUserJS: ${e}`,
        },
      ],
    });
  }
});
