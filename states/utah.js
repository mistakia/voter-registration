var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://vote.utah.gov/vote/app/voterInfo/index.ajax',
	method: 'POST',
	form: {
	    firstName: opts.first_name,
	    lastName: opts.last_name,
	    birthDate: opts.dob.full,
	    streetAddress: '', //TODO
	    city: '', //TODO,
	    zipCode: opts.zipcode,
	    ajax: true
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
