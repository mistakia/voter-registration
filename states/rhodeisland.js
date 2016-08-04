var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://vote.sos.ri.gov/ovr/personal',
	method: 'POST',
	qs: {
	    step: 1,
	    'name[voter][first]':  opts.first_name,
	    'name[voter][last]': opts.last_name,
	    'date[voter][month]': opts.dob.format('MM'),
	    'date[voter][day]': opts.dob.format('DD'),
	    'date[voter][year]': opts.dob.format('YYYY'),
	    'address[voter][address_line_1]': null,
	    'address[voter][city]': null,
	    'address[voter][zip]': opts.zipcode,
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
