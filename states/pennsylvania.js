var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewStateGenerator;
    var viewState;

    //TODO - get county code 
    var countyCode;

    request({
	url: 'https://www.pavoterservices.state.pa.us/pages/voterregistrationstatus.aspx',
	method: 'POST',
	form: {
	    ctl00_ContentPlaceHolder1_ScriptManager1_HiddenField: null,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$ContentPlaceHolder1$CountyCombo: countyCode,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item2: opts.first_name,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item5: opts.middle_name,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item3: opts.last_name,
	    ctl00$ContentPlaceHolder1$SuffixCombo: opts.suffix,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item4: opts.dob.full,
	    ctl00$ContentPlaceHolder1$btnContinue: 'Continue'
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
