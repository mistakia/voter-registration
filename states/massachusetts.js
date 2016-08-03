var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session info from page
    var viewStateGenerator;
    var viewState;
    var eventValidation;
    var factSheetPage;
    var mappingPageURL;
    var eventTarget;
    var eventArgument;
    
    //TODO - show disclaimer
    request({
	url: 'https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx',
	method: 'POST',
	form: {
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$MainContent$HiddenWDIVMappingPageURL: mappingPageURL,
	    ctl00$MainContent$HiddenInactiveVoterFactSheetPageURL: factSheetPage,
	    ctl00$MainContent$txtFirstName: opts.first_name,
	    ctl00$MainContent$txtLastName: opts.last_name,
	    ctl00$MainContent$ddlMonth: opts.dob.month,
	    ctl00$MainContent$ddlDay: opts.dob.day,
	    ctl00$MainContent$ddlYear: opts.dob.year,
	    ctl00$MainContent$txtZip: opts.zipcode,
	    ctl00$MainContent$chkUnderstand: 'on',
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
