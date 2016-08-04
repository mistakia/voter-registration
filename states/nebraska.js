var request = require('request');

module.exports = function(opts, cb) {
    //TODO - figure out county Code
    var county;

    request({
	url: 'https://app.mt.gov/cgi-bin/voterinfo/voterinfo.cgi',
	method: 'POST',
	form: {
	    action: 'Search',
	    county: county,
	    nameFirst: opts.first_name,
	    nameLast: opts.last_name,
	    suffix: opts.suffix,
	    dobMonth: opts.dob.format('MM'),
	    dobDay: opts.dob.format('DD'),
	    dobYear: opts.dob.format('YYYY'),
	    search: 'Search'
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
