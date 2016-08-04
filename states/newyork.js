var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewState;
    var viewStateGenerator;

    //TODO - get county code
    var countyCode;

    request({
	url: 'https://voterlookup.elections.state.ny.us/voterSearch.aspx',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    ctl00$ContentPlaceHolder1$txtLastName: opts.last_name,
	    ctl00$ContentPlaceHolder1$txtFirstName: opts.first_name,
	    ctl00$ContentPlaceHolder1$txtDOB: opts.dob.format('MM/DD/YYYY'),
	    ctl00$ContentPlaceHolder1$drpDownCounty: opts.county,
	    ctl00$ContentPlaceHolder1$txtZip: opts.zipcode,
	    ctl00$ContentPlaceHolder1$txtSearch: 'Search'
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
