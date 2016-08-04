var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    var counties = {
	BERNALILLO: 303200,
	CATRON: 301300,
	CHAVES: 301400,
	CIBOLA: 301700,
	COLFAX: 300400,
	CURRY: 302000,
	'DE BACA': 301900,
	'DONA ANA': 300700,
	EDDY: 302400,
	GRANT: 302600,
	GUADALUPE: 300500,
	HARDING: 300600,
	HIDALGO: 302900,
	LEA: 302500,
	LINCOLN: 302800,
	'LOS ALAMOS': 300800,
	LUNA: 302200,
	MCKINLEY: 300900,
	MORA: 301200,
	OTERO: 300200,
	QUAY: 300100,
	'RIO ARRIBA': 301800,
	ROOSEVELT: 301100,
	'SAN JUAN': 303300,
	'SAN MIGUEL': 303000,
	SANDOVAL: 303100,
	'SANTA FE': 302100,
	SIERRA: 301000,
	SOCORRO: 301500,
	TAOS: 301600,
	TORRANCE: 302300,
	UNION: 302700,
	VALENCIA: 300300
    };

    var countyCode = counties[opts.county.toUpperCase()];

    if (!countyCode) {
	cb(new Error('Missing valid county'));
	return;
    }

    var form = {
	action: 'Search',
	county: countyCode,
	nameFirst: opts.first_name,
	nameLast: opts.last_name,
	suffix: opts.suffix,
	dobMonth: opts.dob.format('MM'),
	dobDay: opts.dob.format('DD'),
	dobYear: opts.dob.format('YYYY'),
	search: 'Search'
    };

    request({
	url: 'https://voterview.state.nm.us/VoterView/RegistrantSearch.do',
	method: 'GET',
	headers: {
	    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'
	},
	jar: true
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var $ = cheerio.load(body);

	var session;
	try {
	    session = $('form[name="registrantSearchForm"]').attr('action');
	} catch(e) {

	}

	if (!session) {
	    cb(new Error('could not get session'));
	    return;
	}

	request({
	    url: 'https://voterview.state.nm.us' + session,
	    method: 'POST',
	    headers: {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'
	    },
	    form: form
	}, function(err, res, body) {
	    if (err) {
		cb(err);
		return;
	    }

	    var result = {
		registered: null,
		reason: null,
		status: null,
		party: null
	    };

	    var $ = cheerio.load(body);

	    var registrant = $('#registrant .data');

	    if (registrant.length)
		result.registered = 'YES';

	    try {
		result.status = registrant.eq(1).text().trim();
		result.reason = registrant.eq(2).text().trim();
		result.party = registrant.eq(4).text().trim();
	    } catch(e) {

	    }

	    cb(null, result);
	});
    });
};
