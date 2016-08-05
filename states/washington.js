var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://weiapplets.sos.wa.gov/MyVote/services/Login.ashx',
	method: 'GET',
	json: true,
	qs: {
	    f: opts.first_name,
	    l: opts.last_name,
	    b: opts.dob.format('M/D/YYYY'),
	    org: null,
	    r: 'https://www.google.com/'
	}
    }, function(err, res, data) {
	if (err) {
	    cb(err);
	    return;
	}

	if (!data.length) {
	    cb(new Error('could not handle response'));
	    return;
	}

	var item = data[0];

	request({
	    url: 'https://weiapplets.sos.wa.gov/MyVote/services/Voter.ashx',
	    method: 'GET',
	    json: true,
	    qs: {
		f: item.FirstName,
		l: item.LastName,
		b: item.BirthDate,
		v: item.VoterID,
		s: item.SessionDate
	    }
	}, function(err, res, data) {
	    if (err) {
		cb(err);
		return;
	    }

	    var result = {
		registered: false,
		party: null
	    };

	    if (data && data.VoterID) {
		result.registered = true;
	    }

	    try {
		result.status = data.Details[0].RegStatus;
	    } catch(e) {

	    }

	    cb(null, result);
	});
    });
};
