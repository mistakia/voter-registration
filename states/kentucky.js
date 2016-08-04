var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://vrsws.sos.ky.gov/vic/Default.aspx',
	method: 'POST',
	qs: {
	    FIRST_NAME: opts.first_name,
	    MIDDLE_NAME: opts.middle_name,
	    LAST_NAME: opts.last_name,
	    DATE_OF_BIRTH: opts.dob.format('DD/MM/YYYY'),
	    SSN_LAST4: null,
	    submit: 'Submit'
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
