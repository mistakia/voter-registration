var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var viewState;

    //TODO - get county
    var county;

    request({
	url: 'https://indianavoters.in.gov/PublicSite/Public/FT1/PublicLookupMain.aspx?Link=Registration&AspxAutoDetectCookieSupport=1',
	method: 'POST',
	form: {
	    __LASTFOCUS: null,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    ctl00_ContentPlaceHolder1_pnlSearch_CurrentState: false,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$ContentPlaceHolder1$usrCounty$cboCounty: county,
	    ctl00$ContentPlaceHolder1$txtLast: opts.last_name,
	    ctl00$ContentPlaceHolder1$txtFirst: opts.first_name,
	    ctl00$ContentPlaceHolder1$usrDOB$txtDate: opts.dob.full,
	    ctl00$ContentPlaceHolder1$btnSearch: 'Find'
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
