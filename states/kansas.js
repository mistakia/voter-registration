var request = require('request');

module.exports = function(opts, cb) {
    //TODO = get county code
    var countyCode;

    request({
	url: 'https://myvoteinfo.voteks.org/VoterView/RegistrantSearch.do',
	method: 'POST',
	form: {
	    action: 'Search',
	    county: countyCode,
	    nameFirst: opts.first_name,
	    nameLast: opts.last_name,
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
