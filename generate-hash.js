const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin@123';
const rounds = 12;

bcrypt.hash(password, rounds, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUpdate .env.local with:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
});
