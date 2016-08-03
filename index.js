var argv = require('yargs').argv;
var request = require('request');
var moment = require('moment');
var cheerio = require('cheerio');
var states = require('./states');

var check = function(state) {
    return {
	get: states[state]
    };
};

module.exports = check;

// CLI 
if (!module.parent) {

    check(argv.state).get({
	first_name: argv.first,
	last_name: argv.last,
	dob: moment(argv.dob, 'MM-DD-YYYY'),
	county: argv.county,
	zipcode: argv.zipcode
    }, function(err, result) {
	if (err) console.log(err);
	console.log(result);
    });

}
