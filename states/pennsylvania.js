var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    var counties = {
	adams: 2290,
	allegheny: 2291,
	armstrong: 2292,
	beaver: 2293,
	bedford: 2294,
	berks: 2295,
	blair: 2296,
	bradford: 2297,
	bucks: 2298,
	butler: 2299,
	cambria: 2300,
	cameron: 2301,
	carbon: 2302,
	centre: 2303,
	chester: 2304,
	clarion: 2305,
	clearfield: 2306,
	clinton: 2307,
	columbia: 2308,
	crawford: 2309,
	cumberland: 2310,
	dauphin: 2311,
	delaware: 2312,
	elk: 2313,
	erie: 2314,
	fayette: 2315,
	forest: 2316,
	franklin: 2317,
	fulton: 2318,
	greene: 2319,
	huntingdon: 2320,
	indiana: 2321,
	jefferson: 2322,
	juniata: 2323,
	lackawanna: 2324,
	lancaster: 2325,
	lawrence: 2326,
	lebanon: 2327,
	lehigh: 2382,
	luzerne: 2329,
	lycoming: 2330,
	mckean: 2331,
	mercer: 2332,
	mifflin: 2333,
	monroe: 2334,
	montgomery: 2335,
	montour: 2336,
	northhampton: 2337,
	northumberland: 2338,
	perry: 2339,
	philadelphia: 2340,
	pike: 2341,
	potter: 2342,
	schuylkill: 2343,
	snyder: 2344,
	somerset: 2345,
	sullivan: 2346,
	susquehanna: 2347,
	tioga: 2348,
	union: 2349,
	venango: 2350,
	warren: 2351,
	washington: 2352,
	wayne: 2353,
	westmoreland: 2354,
	wyoming: 2355,
	york: 2356
    };

    var countyCode = counties[opts.county.toLowerCase()];

    if (!countyCode) {
	cb(new Error('Missing valid county'));
	return;
    }

    request({
	url: 'https://www.pavoterservices.state.pa.us/pages/voterregistrationstatus.aspx',
	method: 'GET'
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var $ = cheerio.load(body);

	var viewState = $('#__VIEWSTATE').attr('value');
	var viewStateGenerator = $('#__VIEWSTATEGENERATOR').attr('value');
	var eventArgument = $('#__EVENTARGUMENT').attr('value');
	var eventTarget = $('#__EVENTTARGET').attr('value');
	var lastFocus = $('#__LASTFOCUS').attr('value');
	var eventValidation = $('#__EVENTVALIDATION').attr('value');

	var form = {
	    ctl00_ContentPlaceHolder1_ScriptManager1_HiddenField: null,
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    __EVENTVALIDATION: eventValidation,
	    ctl00$ContentPlaceHolder1$CountyCombo: countyCode,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item2: opts.first_name,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item5: opts.middle_name,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item3: opts.last_name,
	    ctl00$ContentPlaceHolder1$SuffixCombo: opts.suffix,
	    ctl00$ContentPlaceHolder1$txtVRSOpt2Item4: opts.dob.format('MM/DD/YYYY'),
	    ctl00$ContentPlaceHolder1$btnContinue: 'Continue'
	};

	request({
	    url: 'https://www.pavoterservices.state.pa.us/pages/voterregistrationstatus.aspx',
	    method: 'POST',
	    form: form
	}, function(err, res, body) {
	    if (err) {
		cb(err);
		return;
	    }

	    var result = {
		registered: false,
		status: null,
		party: null
	    };

	    try {
		var statusRe = /<b>Status\s*:\s*<\/b>([^<]*)<br/ig;
		result.status = statusRe.exec(body)[1].trim();
	    } catch (e) {

	    }

	    if (result.status)
		result.registered = true;

	    try {
		var partyRe = /<b>Party\s*:\s*<\/b>([^<]*)<br/ig;
		result.party = partyRe.exec(body)[1].trim();
	    } catch(e) {

	    }

	    cb(null, result);
	});
    });
};
