var request = require('request');
var cheerio = require('cheerio');

module.exports = function(opts, cb) {
    var form = {
	txtFirstName: opts.first_name,
	txtLastName: opts.last_name,
	txtDOBMonth: opts.dob.format('M'), // no leading zero
	txtDOBDate: opts.dob.format('D'),
	txtDOBYear: opts.dob.format('YYYY'),
	txtZipCode: opts.zipcode,
	txtSearchType: 'AC',
	txtLN: opts.last_name,
	txtFN: opts.first_name,
	btnSubmit: 'Search'
    };

    request({
	url: 'https://www.dcboee.org/voter_info/reg_status/vic_step2.asp',
	method: 'POST',
	form: form
    }, function(err, res, body) {
	if (err) {
	    cb(err);
	    return;
	}

	var result = {
	    registered: false,
	    party: null
	};

	var $ = cheerio.load(body);

	try {
	    var rows = $('form[name="frmVICStep2"] table tr');
	} catch(e) {
	    cb(e, result);
	    return;
	}

	try {
	    result.registered = rows.eq(3).children().eq(2).text().trim() === 'YES';
	} catch(e) {

	}

	try {
	    result.party = rows.eq(9).children().eq(2).text().trim();
	} catch(e) {
	    
	}

	cb(null, result);
    });

};
