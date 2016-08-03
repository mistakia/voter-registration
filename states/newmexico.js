var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get county code
    var countyCode;

    request({
	url: 'https://voterview.state.nm.us/VoterView/RegistrantSearch.do',
	method: 'POST',
	form: {
	    action: 'Search',
	    county: countyCode,
	    nameFirst: opts.first_name,
	    nameLast: opts.last_name,
	    suffix: opts.suffix,
	    dobMonth: opts.dob.month, //leading zero
	    dobDay: opts.dob.day,
	    dobYear: opts.dob.year,
	    search: 'Search'
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
