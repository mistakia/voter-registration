var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://voter.njsvrs.com/PublicAccess/servlet/com.saber.publicaccess.control.PublicAccessNavigationServlet',
	method: 'POST',
	form: {
	    firstName: opts.first_name,
	    middleName: opts.middle_name,
	    lastName: opts.last_name,
	    monthDOB: opts.dob.month, //no leading zero
	    yearDOB: opts.dob.year,
	    incDefDOB: 'Y',
	    userProcess: 'PublicSearch',
	    EVENT: 'PublicSearchResult'
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
