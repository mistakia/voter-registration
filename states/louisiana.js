var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://voterportal.sos.la.gov/Home/VoterLogin',
	method: 'POST',
	form: {
	    FirstName: opts.first_name,
	    LastName: opts.last_name,
	    ZipCode: opts.zipcode,
	    MonthYear: opts.dob.format('MM/YYYY')
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
