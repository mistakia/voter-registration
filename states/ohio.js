var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    request({
	url: 'http://voterlookup.sos.state.oh.us/voterlookup.aspx',
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

	var counties = {
	    adams: '01',
	    allen: '02',
	    ashland: '03',
	    ashtabula: '04',
	    athens: '05',
	    auglaize: '06',
	    belmont: '07',
	    brown: '08',
	    butler: '09',
	    carroll: '10',
	    champaign: '11',
	    clark: '12',
	    clermont: '13',
	    clinton: '14',
	    columbiana: '15',
	    coshocton: '16',
	    crawford: '17',
	    cuyahoga: '18',
	    darke: '19',
	    defiance: '20',
	    delaware: '21',
	    erie: '22',
	    fairfield: '23',
	    fayette: '24',
	    franklin: '25',
	    fulton: '26',
	    gallia: '27',
	    geauga: '28',
	    greene: '29',
	    guernsey: '30',
	    hamilton: '31',
	    hancock: '32',
	    hardin: '33',
	    harrison: '34',
	    henry: '35',
	    highland: '36',
	    hocking: '37',
	    holmes: '38',
	    huron: '39',
	    jackson: '40',
	    jefferson: '41',
	    knox: '42',
	    lake: '43',
	    lawrence: '44',
	    licking: '45',
	    logan: '46',
	    lorain: '47',
	    lucas: '48',
	    madison: '49',
	    mahoning: '50',
	    marion: '51',
	    medina: '52',
	    meigs: '53',
	    mercer: '54',
	    miami: '55',
	    monroe: '56',
	    montgomery: '57',
	    morgan: '58',
	    morrow: '59',
	    muskingum: '60',
	    noble: '61',
	    ottawa: '62',
	    paulding: '63',
	    perry: '64',
	    pickaway: '65',
	    pike: '66',
	    portage: '67',
	    preble: '68',
	    putnam: '69',
	    richland: '70',
	    ross: '71',
	    sandusky: '72',
	    scioto: '73',
	    seneca: '74',
	    shelby: '75',
	    stark: '76',
	    summit: '77',
	    trumbull: '78',
	    tuscarawas: '79',
	    union: '80',
	    'van wert': '81',
	    vinton: '82',
	    warren: '83',
	    washington: '84',
	    wayne: '85',
	    williams: '86',
	    wood: '87',
	    wyandot: '88'
	};

	var countyCode = counties[opts.county.toLowerCase()];

	if (!countyCode) {
	    cb(new Error('Missing valid county'));
	    return;
	}

	var form = {
	    ctl00$Content$ScriptManager1: 'ctl00$Content$PleaseWaitPanel|ctl00$Content$btnSearch',
	    __LASTFOCUS: lastFocus,
	    __EVENTTARGET: eventTarget,
	    __EVENTARGUMENT: eventArgument,
	    __VIEWSTATE: viewState,
	    __VIEWSTATEGENERATOR: viewStateGenerator,
	    ctl00_ContentPlaceHolder1_RadMenu1_ClientState: null,
	    ctl00$Content$txtfirstName: opts.first_name, //capitalized
	    ctl00$Content$txtlastName: opts.last_name, //capitalized
	    ctl00$Content$drpPCounty: countyCode,
	    ctl00$Content$hdnField: null,
	    __ASYNCPOST: true,
	    ctl00$Content$btnSearch: 'Search'
	};

	request({
	    url: 'http://voterlookup.sos.state.oh.us/voterlookup.aspx',
	    method: 'POST',
	    form: form
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
    });
};
