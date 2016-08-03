var request = require('request');

module.exports = function(opts, cb) {
    request({
	url: 'https://mnvotes.sos.state.mn.us/VoterStatus.aspx',
	method: 'POST',
	form: {
	    __LASTFOCUS: null,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATEFIELDCOUNT: null,
	    __VIEWSTATE: viewState,
	    ctl00$MainContent$txtFirstName: opts.first_name,
	    ctl00$MainContent$txtLastName: opts.last_name,
	    ctl00$MainContent$ddlDobMonths: opts.dob.month,
	    ctl00$MainContent$ddlDobDays: opts.dob.day,
	    ctl00$MainContent$ddlDobYears: opts.dob.year,
	    ctl00$MainContent$txtHouseNumber: '', // house number
	    ctl00$MainContent$ddlStreets: '', //??
	    ctl00$MainContent$txtUnitNumber: null
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
