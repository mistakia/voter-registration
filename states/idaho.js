var request = require('request');

module.exports = function(opts, cb) {
    // TODO - get session info
    var viewState;

    // TODO - get county
    var county;
    
    request({
	url: 'http://www.idahovotes.gov/ypp_new/amiregistered.aspx',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    'btnNext.x': 47,
	    'btnNext.y': 18,
	    txtLname: opts.last_name,
	    txtFName: opts.first_name,
	    txtMName: opts.middle_name,
	    txtmm: opts.dob.format('MM'),
	    txtDD: opts.dob.format('DD'),
	    txtYYYY: opts.dob.format('YYYY'),
	    NmeCounty: county
	}
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	//TODO

	var result = {
	    registered: null,
	    party: null
	};

	cb(null, result);
    });
};
