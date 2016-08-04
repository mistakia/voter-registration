var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get county code
    var countyCode;

    request({
	url: 'https://teamrv-mvp.sos.texas.gov/MVP/voterDetails.do',
	method: 'POST',
	form: {
	    selType: 'lfcd',
	    firstName: opts.first_name,
	    lastName: opts.last_name,
	    nmSuffix: opts.suffix,
	    county: countyCode,
	    dob: opts.dob.format('MM/DD/YYYY'),
	    adZip5: opts.zipcode,
	    adZip4: null		    
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
