/**
 * Password Hash Generator Script
 * Run: node scripts/generate-password.js
 * Or: npm run generate-password
 */

const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n===========================================');
console.log('🔐 Admin Password Hash Generator');
console.log('===========================================\n');

rl.question('Enter your admin password: ', async (password) => {
  if (!password || password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters long');
    rl.close();
    return;
  }

  console.log('\n⏳ Generating secure hash...\n');

  try {
    const hash = await bcrypt.hash(password, 12);
    
    console.log('✅ Password hash generated successfully!\n');
    console.log('===========================================');
    console.log('Copy this to your .env.local file:');
    console.log('===========================================\n');
    console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
    console.log('===========================================');
    console.log('⚠️  Security Reminders:');
    console.log('1. Never commit .env.local to version control');
    console.log('2. Use a strong, unique password');
    console.log('3. Store backups securely');
    console.log('4. Change password regularly');
    console.log('===========================================\n');
  } catch (error) {
    console.error('❌ Error generating hash:', error.message);
  }

  rl.close();
});

rl.on('close', () => {
  process.exit(0);
});
