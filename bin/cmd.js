var vrc = require('../');
var argv = require('yargs')
      .usage('Usage: $0 --first [first name] --last [last name] --dob [MM-DD-YYYY] --address [full address]')
      .demand(['first', 'last', 'dob', 'address'])
      .argv

vrc({
  address: argv.address,
  first_name: argv.first,
  last_name: argv.last,
  dob: argv.dob
}, function(err, result) {
  if (err) console.log(err);
  console.log(result);
});
