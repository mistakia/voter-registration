var request = require('request');

module.exports = function(opts, cb) {
    //TODO - determine county

    request({
	url: 'https://myinfo.alabamavotes.gov/VoterView/RegistrantSearch.do',
	method: 'POST',
	form: {
	    action: 'Search',
	    county: null,
	    nameFirst: opts.first_name,
	    nameLast: opts.last_name,
	    suffix: null,
	    dobMonth: opts.dob.month,
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

	cb(null, result);
    });
};
