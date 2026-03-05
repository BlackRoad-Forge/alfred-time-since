var assert = require('assert');
var path = require('path');
var mod = require(path.join(__dirname, '..', 'time_since.js'));
var timeSince = mod.timeSince;
var formatResult = mod.formatResult;

var passed = 0;
var failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  PASS: ' + name);
  } catch (e) {
    failed++;
    console.log('  FAIL: ' + name);
    console.log('    ' + e.message);
  }
}

console.log('time_since.js tests\n');

// timeSince tests
test('returns years for dates more than a year ago', function () {
  var now = new Date('2024-01-01T00:00:00Z');
  var date = new Date('2021-06-01T00:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '2 years');
});

test('returns months for dates more than a month ago', function () {
  var now = new Date('2024-06-01T00:00:00Z');
  var date = new Date('2024-02-01T00:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '4 months');
});

test('returns days for dates more than a day ago', function () {
  var now = new Date('2024-01-10T00:00:00Z');
  var date = new Date('2024-01-05T00:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '5 days');
});

test('returns hours for dates more than an hour ago', function () {
  var now = new Date('2024-01-01T05:00:00Z');
  var date = new Date('2024-01-01T01:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '4 hours');
});

test('returns minutes for dates more than a minute ago', function () {
  var now = new Date('2024-01-01T00:30:00Z');
  var date = new Date('2024-01-01T00:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '30 minutes');
});

test('returns seconds for very recent dates', function () {
  var now = new Date('2024-01-01T00:00:45Z');
  var date = new Date('2024-01-01T00:00:00Z');
  var result = timeSince(date, now);
  assert.strictEqual(result, '45 seconds');
});

test('returns 0 seconds for same date', function () {
  var now = new Date('2024-01-01T00:00:00Z');
  var result = timeSince(now, now);
  assert.strictEqual(result, '0 seconds');
});

// formatResult tests
test('formatResult returns valid Alfred JSON structure', function () {
  var result = formatResult('2024-01-01T00:00:00Z');
  assert.ok(result.items, 'should have items array');
  assert.strictEqual(result.items.length, 2, 'should have 2 items');
  assert.strictEqual(result.items[0].type, 'default');
  assert.strictEqual(result.items[1].type, 'default');
  assert.ok(result.items[0].title.startsWith('time since:'), 'first item should show time since');
});

test('formatResult second item shows exact date', function () {
  var result = formatResult('2024-01-01T00:00:00Z');
  assert.ok(result.items[1].title.length > 0, 'second item should have a title');
});

// Edge case tests
test('handles ISO 8601 format with Z suffix', function () {
  var result = formatResult('2021-10-29T04:14:50Z');
  assert.ok(result.items[0].title.startsWith('time since:'));
});

test('handles ISO 8601 format with space separator', function () {
  var result = formatResult('2021-10-29 04:14:50Z');
  assert.ok(result.items[0].title.startsWith('time since:'));
});

console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed');

if (failed > 0) {
  process.exit(1);
}
