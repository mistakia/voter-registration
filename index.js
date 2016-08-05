var argv = require('yargs').argv;
var request = require('request');
var moment = require('moment');
var cheerio = require('cheerio');
var states = require('./states');

var check = function(opts, cb) {
    request({
	url: 'https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=11510+seven+locks+rd+potomac',
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

	opts.address = item.address;
	opts.address.county = opts.address.county && opts.address.county.replace('County', '').trim();

	var state = states[opts.address.state.toLowerCase()];

	state(opts, cb);
    });
};

module.exports = check;

// CLI 
if (!module.parent) {

    check({
	address: argv.address,
	first_name: argv.first,
	last_name: argv.last,
	dob: moment(argv.dob, 'MM-DD-YYYY')
    }, function(err, result) {
	if (err) console.log(err);
	console.log(result);
    });

}
