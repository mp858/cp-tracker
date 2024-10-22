// chrome.runtime.onInstalled.addListener(() => {
//     chrome.alarms.create('fetchLiveContestData', { periodInMinutes: 1 });
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//     if (alarm.name === 'fetchLiveContestData') {
//         chrome.storage.sync.get(['codeforces', 'leetcode', 'codechef'], (result) => {
//             if (result.codeforces) {
//                 fetchCodeforcesData(result.codeforces);
//             }
//             if (result.leetcode) {
//                 fetchLeetCodeData(result.leetcode);
//             }
//             if (result.codechef) {
//                 fetchCodeChefData(result.codechef);
//             }
//         });
//     }
// });

// function fetchCodeforcesData(username) {
//     const url = `https://codeforces.com/api/user.info?handles=${username}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Updated Codeforces data:', data);
//         })
//         .catch(err => console.error('Error fetching data from Codeforces', err));
// }

// function fetchLeetCodeData(username) {
//     // Placeholder
// }

// function fetchCodeChefData(username) {
//     // Placeholder
// }
