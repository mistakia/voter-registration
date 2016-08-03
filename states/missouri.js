var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var viewState;
    var viewStateGenerator;
    var eventValidation;

    //TODO - figure jurisdicationCode
    var jurisdictionCode;
    
    request({
	url: 'http://s1.sos.mo.gov/elections/voterlookup/',
	method: 'POST',
	form: {
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    txtVFirstName: opts.first_name,
	    txtVLastName: opts.last_name,
	    txtVHouseNumber: '', //TODO
	    txtVStreetName: '', // street name without type
	    txtVDOB: opts.dob.full,
	    VJurisdictionsDropdown: jurisdictionCode,
	    btnVoterLookup: 'Lookup'
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
