var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var viewState;
    var viewStateGenerator;
    var eventValidation;
    var txtS;
    
    request({
	url: 'https://sos.iowa.gov/elections/voterreg/regtovote/search.aspx',
	method: 'POST',
	form: {
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    txtFirstName: opts.first_name,
	    txtLastName: opts.last_name,
	    txtZipCode: opts.zipcode,
	    btnSearch: 'Search',
	    txtS: txtS,
	    txtD: null
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
