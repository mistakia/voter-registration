var request = require('request');

module.exports = function(opts, cb) {
    // TODO - requires Voter ID or Drivers Licence Number    
    request({
	url: '',
	method: 'POST',
	form: {
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
