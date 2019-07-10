const request = require('request');

module.exports = {
  getAll
};

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request({
      headers: {
        'Client-ID': 'a2x085vjp375phbkedgmtgjju52692'
      },
      url,
      method: 'GET'},
      function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

async function getAll(){
  let res = await doRequest('https://api.twitch.tv/helix/streams?game_id=565');
  return {
    success: true,
    data: JSON.parse(res)
  }
}