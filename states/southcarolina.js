var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var viewState;
    var viewStateGenerator;
    var eventValidation;

    //TODO - figure out county code
    var countyCode;
    
    request({
	url: 'https://info.scvotes.sc.gov/eng/voterinquiry/VoterInformationRequest.aspx?PageMode=VoterInfo',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$cphMain$ddlCounty$input: countyCode,
	    ctl00$cphMain$ddlCounty$validatorCallout_ClientState: null,
	    ctl00$cphMain$txtFirstName$input: opts.first_name,
	    ctl00$cphMain$txtFirstName$validatorCallout_ClientState: null,
	    ctl00$cphMain$txtLastName$input: opts.last_name,
	    ctl00$cphMain$txtLastName$validatorCallout_ClientState: null,
	    ctl00$cphMain$dobDateOfBirth$maskedEdit_ClientState: null,
	    ctl00$cphMain$dobDateOfBirth$input: opts.dob.full,
	    ctl00$cphMain$dobDateOfBirth$validatorCallout_ClientState: null,
	    ctl00$cphMain$dobDateOfBirth$rangeValidatorCallout_ClientState: null,
	    ctl00$buttonContent$btnSubmit: 'Submit',
	    ctl00$buttonContent$txtHiddenClearValue: 0,
	    ctl00$buttonContent$txtHiddenCountyValue: countyCode,
	    ctl00$buttonContent$txtHiddenUseSSN: 0
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
