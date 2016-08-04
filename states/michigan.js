var request = require('request');

module.exports = function(opts, cb) {
    //TODO - get session data
    var viewState;
    var viewStateGenerator;
    var eventTarget;
    var eventArgument;
    var eventValidation;

    request({
	url: 'https://vote.michigan.gov/MVIC/',
	method: 'POST',
	form: {
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __SCROLLPOSITIONX: 0,
	    __SCROLLPOSITIONY: 0,
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$ContentPlaceHolder1$vsFname: opts.first_name,
	    ctl00$ContentPlaceHolder1$vsLname: opts.last_name,
	    ctl00$ContentPlaceHolder1$vsMOB2: opts.dob.format('MMMM'),
	    ctl00$ContentPlaceHolder1$vsYOB2: opts.dob.format('YYYY'),
	    ctl00$ContentPlaceHolder1$vsZip: opts.zipcode,
	    ctl00$ContentPlaceHolder1$btnSearchByName: 'Search',
	    ctl00$ContentPlaceHolder1$vsDLN: null,
	    ctl00$ContentPlaceHolder1$vsMOB1: 'January', //????
	    ctl00$ContentPlaceHolder1$vsYOB1: null //???
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
