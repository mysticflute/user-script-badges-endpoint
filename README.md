User Script Badges Endpoint
===========================

This contains code for running an endpoint on [RunKit](http://runkit.com/) for user script installation info from GreasyFork or OpenUserJS. This endpoint can be referenced by https://shields.io/ for display in places like GitHub readme files.

## How to Use

Step 1: Choose which endpoint URL to use

### Option A

Simply use my endpoint here:

**https://runkit.io/mysticflute/userscripts/branches/master**

### Option B (preferred)

Create your own RunKit account and copy paste the contents of [index.js](index.js) into a new notebook. Click on the "endpoint" link to grab your url.

Step 2: Create your badge markup

Head over to https://shields.io/ and scroll down to the "Dynamic" section.

1. Choose `json` for the "data type".
2. Enter the URL chosen above into "data url".
  1. Append to the URL the service you want (`/greasyfork` or `/openuserjs`).
  2. For Greasy Fork, append the script id which you can grab from the url on your user script page (e.g., for the URL "https://greasyfork.org/en/scripts/12345-my-script", append `/12345`).
  3. Your final URL for Greasy Fork should look something like this: `https://runkit.io/mysticflute/userscripts/branches/master/greasyfork/12345`.
  4. For OpenUserJS, append the username and name, e.g., for the url "https://openuserjs.org/scripts/mysticflute/myscript" append `/mysticflute/myscript`.
  5. Your final URL for OpenUserJS should look something like this: `https://runkit.io/mysticflute/userscripts/branches/master/openuserjs/mysticflute/myscript`.
3. For the "query" field, choose the json field that you want, e.g., `$.version`.
4. Fill out the rest of the fields as appropriate.
5. Click "Make Badge".

Step 3: Add your badge markup to GitHub or anywhere.

For a badge in markdown:

```md
[![OpenUserJS](https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=blue&label=OpenUserJS&query=%24.version&url=https%3A%2F%2Frunkit.io%2Fmysticflute%2Fuserscripts%2Fbranches%2Fmaster%2Fopenuserjs%2Fsample%2Fsample)](https://openuserjs.org/scripts/yournamespace/yourname)
```

## Response Data

### GreasyFork

Here's a sample response for GreasyFork:

```json
{
  "version": "1.0.0",
  "updatedDateTime": "2018-11-17T17:50:02+00:00",
  "updated": "11/17/2018",
  "totalInstalls": "151",
  "dailyInstalls": "0"
}
```

### OpenUserJS

Here's a sample response for OpenUserJS:

```json
{
  "version": "1.0.0",
  "updatedDateTime": "2019-07-21T05:41:58.134Z",
  "updated": "07/21/2019",
  "totalInstalls": "254168"
}
 ```
