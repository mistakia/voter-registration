var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var radScriptManager;
    var viewState;
    var viewStateGenerator;
    var eventValidation;

    request({
	url: 'https://sos.sd.gov/Elections/VIPLogin.aspx',
	method: 'POST',
	form: {
	    ctl00_RadScriptManager1_TSM: radScriptManager,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$MainContent$txtFirstName: opts.first_name,
	    ctl00$MainContent$txtLastName: opts.last_name,
	    ctl00$MainContent$txtDOB: opts.dob.format('MM/DD/YYYY'),
	    ctl00$MainContent$btnSearch: 'Search'
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
