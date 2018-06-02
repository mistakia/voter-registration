var request = require('request');
var moment = require('moment');
var cheerio = require('cheerio');
var states = require('./states');

module.exports = function(opts, cb) {
  request({
    url: 'https://nominatim.openstreetmap.org/',
    json: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'
    },
    qs: {
      format: 'json',
      addressdetails: 1,
      q: opts.address
    }
  }, function(err, res, data) {
    if (err) {
      cb(err);
      return;
    }

    if (!data.length) {
      cb(new Error('unable to find address'));
      return;
    }

    var item = data[0];

    if (!item.address.state) {
      cb(new Error('could not determine state'));
      return;
    }

    opts.dob = moment(opts.dob, 'MM-DD-YYYY');
    opts.address = item.address;
    opts.address.county = opts.address.county && opts.address.county.replace('County', '').trim();

    var state = states[opts.address.state.toLowerCase()];

    state(opts, cb);
  });
};
