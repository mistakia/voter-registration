var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewState;
    var viewStateGenerator;
    var eventValidation;

    //TODO - figure out county code
    var countyCode;

    request({
	url: 'https://tnmap.tn.gov/voterlookup/',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ddlCounty: countyCode,
	    txtLastName: opts.last_name,
	    txtFirstName: opts.first_name,
	    ddlBirthYear: opts.dob.format('YYYY'),
	    btnSubmit: 'Continue',
	    countyvalue: null,
	    lastnamevalue: null,
	    firstnamevalue: null,
	    birthyearvalue: null
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
