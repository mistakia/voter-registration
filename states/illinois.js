var request = require('request');

module.exports = function(opts, cb) {
    // TODO - get session info
    var viewState;
    var viewStateGenerator;
    var previousPage;
    var eventValidation;

    request({
	url: 'https://ova.elections.il.gov/RegistrationLookup.aspx',
	method: 'POST',
	form: {
	    __LASTFOCUS: null,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __PREVIOUSPAGE: previousPage,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$MainContent$txtFirstName: opts.first_name,
	    ctl00$MainContent$txtLastName: opts.last_name,
	    ctl00$MainContent$txtBirthDate: opts.dob.full,
	    ctl00$MainContent$txtZipcode: opts.zipcode,
	    ctl00$MainContent$txtStreetNumber: null,
	    ctl00$MainContent$btnSubmit: 'Submit'
	}
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
};
