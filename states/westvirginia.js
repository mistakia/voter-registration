var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var token;

    request({
	url: 'https://services.sos.wv.gov/Elections/Voter/AmIRegisteredToVote',
	method: 'POST',
	form: {
	    __RequestVerificationToken: token,
	    FirstName: opts.first_name,
	    LastName: opts.last_name,
	    DateOfBirth: opts.dob.full
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
