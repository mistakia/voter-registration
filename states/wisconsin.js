var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://myvote.wi.gov/DesktopModules/GabMyVoteModules/api/voter/search',
	method: 'POST',
	json: true,
	body: {
	    firstName: opts.first_name,
	    lastName: opts.last_name,
	    birthDate: opts.dob.format('MM/DD/YYYY')
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
