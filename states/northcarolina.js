var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    request({
	url: 'https://enr.ncsbe.gov/voter_search_public/',
	method: 'GET'
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var $ = cheerio.load(body);

	var viewState = $('#__VIEWSTATE').attr('value');
	var viewStateGenerator = $('#__VIEWSTATEGENERATOR').attr('value');
	var eventValidation = $('#__EVENTVALIDATION').attr('value');
	var eventArgument = $('#__EVENTARGUMENT').attr('value');
	var eventTarget = $('#__EVENTTARGET').attr('value');

	var form = {
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    txtFirstName: opts.first_name,
	    txtMiddleInitial: opts.middle_name,
	    txtLastName: opts.last_name,
	    txtBirthDate: opts.dob.format('MM/DD/YYYY'),
	    cboCounty: 0, // search all counties - not sure if this works
	    cblStatus$0: 'A,I,S',
	    btnSearch: 'Search'
	};

	request({
	    url: 'https://enr.ncsbe.gov/voter_search_public/',
	    method: 'POST',
	    form: form
	}, function(err, res, body) {
	    if (err) {
		cb(err);
		return;
	    }

	    var result = {
		registered: null,
		party: null
	    };

	    //TODO

	    cb(null, result);
	});
    });
};
