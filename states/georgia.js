var request = require('request');

module.exports = function(opts, cb) {
    // TODO - county
    var countyCode;
    var countyName;
    
    request({
	url: 'https://www.mvp.sos.ga.gov/MVP/voterDetails.do',
	method: 'POST',
	form: {
	    firstName: opts.first_name,
	    lastName: opts.last_name,
	    county: countyCode,
	    dob: opts.dob.format('DD/MM/YYYY'),
	    countyName: countyName,
	    currentSearch: 1
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

	cb(null, result);
    });
};
