var request = require('request');

module.exports = function(opts, cb) {
    // TODO - get session data
    var viewState = null;
    request({
	url: 'https://www.sos.state.co.us/voter-classic/pages/pub/olvr/findVoterReg.xhtml',
	method: 'POST',
	form: {
	    findVoterRegForm: 'findVoterRegForm',
	    'findVoterRegForm:voterSearchLastId': opts.last_name,
	    'findVoterRegForm:voterSearchFirstId': opts.first_name,
	    'findVoterRegForm:voterSearchZipId': opts.zipcode,
	    'findVoterRegForm:voterDOB': opts.dob.format('DD/MM/YYYY'),
	    'findVoterRegForm:voterSearchButtonId': 'Search',
	    'javax.faces.ViewState': viewState
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
