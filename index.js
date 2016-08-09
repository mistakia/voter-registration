var request = require('request');
var moment = require('moment');
var cheerio = require('cheerio');
var states = require('./states');

module.exports = function(opts, cb) {
    request({
	url: 'https://nominatim.openstreetmap.org/',
	json: true,
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
