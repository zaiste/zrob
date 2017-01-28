// Copyright 2016 Zaiste & contributors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const http = require('follow-redirects').http;
const https = require('follow-redirects').https;

function zrob(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const request = lib.get(url, response => {

      const { statusCode, headers, responseUrl: url } = response;

      if (statusCode < 200 || statusCode > 399) {
        reject(new Error('Fail, status code: ' + statusCode));
      }

      let buffer = '';

      response.setEncoding('utf8');
      response.on('data', chunk => buffer += chunk);
      response.on('end', () => resolve({
        body: buffer,
        headers,
        enconding: 'utf8',
        statusCode,
        url,
        json: () => {
          try {
            return JSON.parse(buffer);
          } catch (e) {
            console.log(e.message);
          }
        }
      }));
    });

    request.on('error', err => reject(err.message))
  })
}

zrob.get = zrob;
zrob.geta = zrob; // a joke for Polish people

zrob.geta('https://bit.ly/2kgbOwF')
  .then(response => {
    // console.log(response);
    console.log(response.url);
  })
  .catch(console.error);
