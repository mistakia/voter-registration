var request = require('request');

module.exports = function(opts, cb) {
    var counties = {
	AUTAUGA: 301900,
	BALDWIN: 300200,
	BARBOUR: 303600,
	BIBB: 305700,
	BLOUNT: 305100,
	BULLOCK: 305100,
	BUTLER: 306200,
	CALHOUN: 306200,
	CHAMBERS: 303300,
	CHEROKEE: 302400,
	CHILTON: 300500,
	CHOCTAW: 302600,
	CLARKE: 302500,
	CLAY: 303000,
	CLEBURNE: 304800,
	COFFEE: 300400,
	COLBERT: 300800,
	CONECUH: 306300,
	COOSA: 306100,
	COVINGTON: 303100,
	CRENSHAW: 306400,
	CULLMAN: 305300,
	DALE: 303200,
	DALLAS: 305800,
	DEKALB: 304700,
	ELMORE: 302700,
	ESCAMBIA: 306500,
	ETOWAH: 301400,
	FAYETTE: 302100,
	FRANKLIN: 304100,
	GENEVA: 305900,
	GREENE: 301100,
	HALE: 301700,
	HENRY: 303700,
	HOUSTON: 300600,
	JACKSON: 304600,
	JEFFERSON: 305400,
	LAMAR: 301800,
	LAUDERDALE: 304300,
	LAWRENCE: 302200,
	LEE: 300300,
	LIMESTONE: 300100,
	LOWNDES: 301300,
	MACON: 301200,
	MADISON: 301000,
	MERENGO: 301600,
	MARION: 304900,
	MARSHALL: 304400,
	MOBILE: 300700,
	MONROE: 303900,
	MONTGOMERY: 300900,
	MORGAN: 305600,
	PERRY: 306000,
	PICKENS: 305500,
	PIKE: 304000,
	RANDOLPH: 303400,
	RUSSELL: 303800,
	SHELBY: 301500,
	ST_CLAIR: 305200,
	SUMTER: 306600,
	TALLADEGA: 304500,
	TALLAPOOSA: 302800,
	TUSCALOOSA: 302000,
	WALKER: 304200,
	WASHINGTON: 302300,
	WILCOX: 306700,
	WINSTON: 305000
    };

    var countyCode = counties[opts.county.toUpperCase()];

    if (!countyCode) {
	cb(new Error('Missing valid county'));
	return;
    }

    request({
	url: 'https://myinfo.alabamavotes.gov/VoterView/RegistrantSearch.do',
	method: 'POST',
	form: {
	    action: 'Search',
	    county: null,
	    nameFirst: opts.first_name,
	    nameLast: opts.last_name,
	    suffix: null,
	    dobMonth: opts.dob.format('MM'),
	    dobDay: opts.dob.format('DD'),
	    dobYear: opts.dob.format('YYYY'),
	    search: 'Search'
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
