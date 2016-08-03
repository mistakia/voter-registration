var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://myvoterinformation.alaska.gov/MVP/GetVoterID',
	method: 'POST',
	form: {
	    ddlElectionDateName: null,
	    txtVoterID: null,
	    txtSSN: null,
	    txtLName: opts.last_name,
	    txtFName: opts.first_name,
	    txtMName: opts.middle_name,
	    txtDateOfBirth: opts.dob.full
	}
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var result = {
	    registered: null,
	    status: null
	};

	cb(null, result);
    });
};
