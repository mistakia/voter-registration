var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session info from html
    var session_id;

    request({
	url: 'https://app.mt.gov/cgi-bin/voterinfo/voterinfo.cgi',
	method: 'POST',
	form: {
	    session_id: session_id,
	    action: 'search_submitted',
	    first_name: opts.first_name,
	    last_name: opts.last_name,
	    dob: opts.dob.format('DD/MM/YYYY')
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
