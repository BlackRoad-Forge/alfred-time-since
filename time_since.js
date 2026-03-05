/*
 * time_since.js - Alfred workflow for calculating time since a given UTC timestamp
 */
function timeSince(date, now) {
  now = now || new Date();
  var seconds = Math.floor((now - date) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

function formatResult(ts) {
  var d = new Date(Date.parse(ts));
  var since = timeSince(d);
  var exact = d.toDateString() + ',  ' + d.toTimeString();
  return {
    items: [
      { type: "default", title: "time since: " + since },
      { type: "default", title: exact }
    ]
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { timeSince: timeSince, formatResult: formatResult };
}

if (typeof require !== 'undefined' && require.main === module) {
  var ts = process.argv[2];
  console.log(JSON.stringify(formatResult(ts)));
}
