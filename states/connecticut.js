var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewState = null;
    var viewStateGenerator = null;

    //TODO - determine town from address
    var town = null;

    request({
	url: 'http://www.dir.ct.gov/sots/LookUp.aspx',
	method: 'POST',
	form: {
	    __EVENTTARGET: null,
	    __EVENTARGUMENT: null,
	    __LASTFOCUS: null,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __SCROLLPOSITIONX: '46',
	    __SCROLLPOSITIONY: '0',
	    __VIEWSTATEENCRYPTED: null,
	    ddlTown: town,
	    lname: opts.last_name,
	    fname: opts.first_name,
	    birthday: opts.dob.full,
	    Search: 'Search'
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

	cb(null, result);
    });
};
