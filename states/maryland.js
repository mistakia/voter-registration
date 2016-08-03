var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    request({
	url: 'https://voterservices.elections.maryland.gov/VoterSearch',
	jar: true,
	method: 'GET'
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var $ = cheerio.load(body);

	var viewState = $('#__VIEWSTATE').attr('value');
	var viewStateGenerator = $('#__VIEWSTATEGENERATOR').attr('value');
	var viewStateEncrypted = $('#__VIEWSTATEENCRYPTED').attr('value');		
	var eventValidation = $('#__EVENTVALIDATION').attr('value');
	var eventTarget = $('#__EVENTTARGET').attr('value');
	var eventArgument = $('#__EVENTARGUMENT').attr('value');

	var form = {
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __VIEWSTATEENCRYPTED: viewStateEncrypted,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$MainContent$listLanguages: 'en',
	    ctl00$MainContent$litAccessibleError: null,
	    ctl00$MainContent$txtSearchFirstName: opts.first_name,
	    ctl00$MainContent$txtSearchLastName: opts.last_name,
	    ctl00$MainContent$txtDOBMonth: opts.dob.format('MM'),
	    ctl00$MainContent$txtDOBDay: opts.dob.format('DD'),
	    ctl00$MainContent$txtDOBYear: opts.dob.format('YYYY'),
	    ctl00$MainContent$txtSearchZipCode: opts.zipcode,
	    ctl00$MainContent$txtSearchHouseNumber: null,
	    ctl00$MainContent$txtSearchMiddleInitial: opts.middle_initial,
	    ctl00$MainContent$btnSearch: 'Search'
  	};

	request({
	    url: 'https://voterservices.elections.maryland.gov/VoterSearch',
	    method: 'POST',
	    followAllRedirects: true,
	    jar: true,
	    form: form
	}, function(err, res, body) {
	    if (err) {
		cb(err);
		return;
	    }

	    var $ = cheerio.load(body);

	    var result = {
		registered: null,
		party: null,
		message: null
	    };

	    try {
		// inactive voter message
		result.message = $('.voterHeaderMessage').text().trim();
	    } catch(e) {

	    }

	    try {
		var rows = $('#accordion table tr');
		result.party = rows.eq(4).children().eq(1).text().trim();
	    } catch(e) {

	    }

	    if (result.party)
		result.registered = 'YES';

	    cb(null, result);
	});
    });

};
