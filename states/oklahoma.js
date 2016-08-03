var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewState;
    var viewStateGenerator;
    var eventValidation;
    
    request({
	url: 'https://services.okelections.us/voterSearch.aspx',
	method: 'POST',
	form: {
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$ContentPlaceHolder1$txtFirstName: opts.first_name,
	    ctl00$ContentPlaceHolder1$txtLastName: opts.last_name,
	    ctl00$ContentPlaceHolder1$ddBirthMonth: opts.dob.month, //leading zero
	    ctl00$ContentPlaceHolder1$txtBirthDay: opts.dob.day,
	    ctl00$ContentPlaceHolder1$txtBirthYear: opts.dob.year,
	    ctl00$ContentPlaceHolder1$btnSearch: 'Search'
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
