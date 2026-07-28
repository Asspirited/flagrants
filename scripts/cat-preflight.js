const { execSync } = require('child_process');

console.log('================================================================');
console.log('   ASSPIRITED SUITE — LOCAL CAT PRE-FLIGHT VALIDATION ENGINE    ');
console.log('================================================================\n');

try {
  console.log('Step 1: Building Rich UI HTML & Worker bundles...');
  execSync('node scripts/build-rich-ui.js', { stdio: 'inherit' });

  console.log('\nStep 2: Running Poka-Yoke Guards & Full BDD Test Suite...');
  execSync('node --test tests/*.test.js', { stdio: 'inherit' });

  console.log('\nStep 3: Auditing DORA & Quality Metrics...');
  execSync('node scripts/audit-dora-quality-metrics.js', { stdio: 'inherit' });

  console.log('\n✅ LOCAL CAT PRE-FLIGHT PASSED! 100% READY FOR DEPLOYMENT!\n');
} catch (err) {
  console.error('\n❌ CAT PRE-FLIGHT FAILED! Fix errors before deploying.\n');
  process.exit(1);
}
