var request = require('request');

module.exports = function(opts, cb) {
    // TODO - get session data from html
    var viewState;
    var viewStateGenerator;
    var eventValidation;

    //TODO - figure out county code
    var countyCode;
    
    request({
	url: 'https://enr.ncsbe.gov/voter_search_public/',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    txtFirstName: opts.first_name,
	    txtMiddleInitial: opts.middle_name,
	    txtLastName: opts.last_name,
	    txtBirthDate: opts.dob.format('MM/DD/YYYY'),
	    cboCounty: countyCode,
	    cblStatus$0: 'A,I,S',
	    btnSearch: 'Search'
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
