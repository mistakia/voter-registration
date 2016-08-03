var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://weiapplets.sos.wa.gov/MyVote/services/Login.ashx',
	method: 'GET',
	qs: {
	    f: opts.first_name,
	    l: opts.last_name,
	    b: opts.dob.full,
	    org: null,
	    r: 'https://www.google.com/'
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
