var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data from html
    var scriptManager;
    var viewState;
    var viewStateGenerator;

    //TODO - figure out county code
    var countyCode;
    
    request({
	url: 'http://voterlookup.sos.state.oh.us/voterlookup.aspx',
	method: 'POST',
	form: {
	    ctl00$Content$ScriptManager1: scriptManager,
	    __LASTFOCUS: null,
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    ctl00_ContentPlaceHolder1_RadMenu1_ClientState: null,
	    ctl00$Content$txtfirstName: opts.first_name, //capitalized
	    ctl00$Content$txtlastName: opts.last_name, //capitalized
	    ctl00$Content$drpPCounty: countyCode,
	    ctl00$Content$hdnField: null,
	    __ASYNCPOST: true,
	    ctl00$Content$btnSearch: 'Search'
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
