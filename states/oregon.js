var request = require('request');

module.exports = function(opts, cb) {
    // TODO - get session token
    // https://secure.sos.state.or.us/orestar/JavaScriptServlet
    var token;

    request({
	url: 'https://secure.sos.state.or.us/orestar/vr/voterSearch.do',
	method: 'POST',
	form: {
	    buttonName: 'Submit',
	    dmvNumber: 0,
	    citizen: false,
	    oldEnough: false,
	    firstName: opts.first_name,
	    lastName: opts.last_name,
	    birthDate: opts.dob.format('MM/DD/YYYY'),
	    zipCode: opts.zipcode,
	    submitSearch: 'Submit',
	    page: 20,
	    OWASP_CSRFTOKEN: token
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
