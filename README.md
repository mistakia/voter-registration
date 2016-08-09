# Voter Registration Confirmation
United States voter registration confirmation & status. Work in progress.

**Tested**: Washington DC, Maryland, New Mexico, Pennsylvania, Washington

**Unavailable**: Hawaii, Maine, Mississippi, Wyoming

**Captcha**: Delaware, Florida, Nevada, New Hampshire

**WIP**: everything else

#### command line example
```
node bin/cmd.js --address 20854 --first firstName --last lastName --dob="12/24/90"
```

#### options
notes: vermont requires last 4 of ssn or drivers license, virginia requires last 4 of ssn, arizona requires voter id or drivers license
```
{
	first_name: '',
	last_name: '',
	dob: '', //format: MM-DD-YYYY
	address: '' //full address preferred but may work with just zip code
}
```

#### example
```
check({
	first_name: 'firstName',
	last_name: 'lastName',
	dob: moment('12-24-90', 'MM-DD-YYYY'),
	address: '20854'
}, function(err, result) {
	if (err) console.log(err);
	console.log(result);
});
```					  
