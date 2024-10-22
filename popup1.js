document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const leetcodeUsernameInput = document.getElementById('leetcodeUsername');
  const codeforcesUsernameInput = document.getElementById('codeforcesUsername');
  const codechefUsernameInput = document.getElementById('codechefUsername');
  
  // const leetcodeUsernamesDiv = document.getElementById('leetcodeUsernames');
  // const codeforcesUsernamesDiv = document.getElementById('codeforcesUsernames');
  // const codechefUsernamesDiv = document.getElementById('codechefUsernames');

  // Event Listeners for Add Buttons
  document.getElementById('addLeetcode').addEventListener('click', () => addUsername('leetcode', leetcodeUsernameInput.value));
  document.getElementById('addCodeforces').addEventListener('click', () => addUsername('codeforces', codeforcesUsernameInput.value));
  document.getElementById('addCodechef').addEventListener('click', () => addUsername('codechef', codechefUsernameInput.value));

  // Load saved usernames when extension popup is opened
  loadUsernames();

  // Event Listeners for toggle buttons
  leetcodeToggle.addEventListener('click', () => toggleSection(leetcodeContent, leetcodeToggle));
  codeforcesToggle.addEventListener('click', () => toggleSection(codeforcesContent, codeforcesToggle));
  codechefToggle.addEventListener('click', () => toggleSection(codechefContent, codechefToggle));


  // Toggle section visibility
  function toggleSection(contentDiv, toggleBtn) {
    const isHidden = contentDiv.classList.contains('hidden');
    contentDiv.classList.toggle('hidden', !isHidden);
    
    // Change arrow direction based on visibility
    if (isHidden) {
        toggleBtn.textContent = toggleBtn.textContent.replace('▼', '▲'); // Change to up arrow
    } else {
        toggleBtn.textContent = toggleBtn.textContent.replace('▲', '▼'); // Change to down arrow
    }
  }
  // Add Username function
  function addUsername(platform, username) {
    if (username.trim() === '') return;

    chrome.storage.sync.get([platform], (result) => {
      let usernames = result[platform] || [];
      if (!Array.isArray(usernames)) {
        usernames = []; // Ensure it's an array
      }
      usernames.push(username);
      chrome.storage.sync.set({ [platform]: usernames }, () => {
        renderUsernames(platform, usernames);
      });
    });
  }

  // Load Usernames from storage
  function loadUsernames() {
    ['leetcode', 'codeforces', 'codechef'].forEach((platform) => {
      chrome.storage.sync.get([platform], (result) => {
        let usernames = result[platform] || [];
        if (!Array.isArray(usernames)) {
          usernames = []; // Ensure it's an array
        }
        renderUsernames(platform, usernames);
      });
    });
  }

  // Render usernames for each platform
  function renderUsernames(platform, usernames) {
    if (!Array.isArray(usernames)) {
      usernames = [];
    }

    let container = document.getElementById(`${platform}Usernames`);
    container.innerHTML = ''; // Clear existing usernames

    usernames.forEach((username) => {
      let div = document.createElement('div');
      div.className = 'username-item';
      div.innerHTML = `
        ${username} 
        <button class="show-button" data-platform="${platform}" data-username="${username}">Show</button>
        <button class="hide-button" data-platform="${platform}" data-username="${username}" style="display: none;">Hide</button>
        <button class="remove-button" data-platform="${platform}" data-username="${username}">Remove</button>
        <div class="details" id="details-${platform}-${username}" style="display: none;"></div>
      `;
      container.appendChild(div);
    });

    // Add event listeners to newly created buttons
    document.querySelectorAll('.show-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const platform = e.target.dataset.platform;
        const username = e.target.dataset.username;
        showDetails(platform, username);
        e.target.style.display = 'none'; // Hide Show button
        e.target.nextElementSibling.style.display = 'inline'; // Show Hide button
      });
    });

    document.querySelectorAll('.hide-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const platform = e.target.dataset.platform;
        const username = e.target.dataset.username;
        hideDetails(platform, username);
        e.target.style.display = 'none'; // Hide Hide button
        e.target.previousElementSibling.style.display = 'inline'; // Show Show button
      });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const platform = e.target.dataset.platform;
        const username = e.target.dataset.username;
        removeUsername(platform, username);
      });
    });
  }

  // Remove Username function
  function removeUsername(platform, username) {
    chrome.storage.sync.get([platform], (result) => {
      let usernames = result[platform] || [];
      let updatedUsernames = usernames.filter(u => u !== username);
      chrome.storage.sync.set({ [platform]: updatedUsernames }, () => {
        renderUsernames(platform, updatedUsernames);
      });
    });
  }

  // Fetch and show details (rating and title)
  function showDetails(platform, username) {
    let detailsDiv = document.getElementById(`details-${platform}-${username}`);
    
    switch(platform) {
      case 'leetcode':
        console.log("showdetails leetcode")
        fetchLeetcodeDetails(username, detailsDiv);
        break;
      case 'codeforces':
        console.log("showdetails codefroces")
        fetchCodeforcesDetails(username, detailsDiv);
        break;
      case 'codechef':
        console.log("showdetails cpdechef")
        fetchCodechefDetails(username, detailsDiv);
        break;
    }
    detailsDiv.style.display = 'block'; // Show details
  }

  // Hide details
  function hideDetails(platform, username) {
    let detailsDiv = document.getElementById(`details-${platform}-${username}`);
    detailsDiv.innerHTML = ''; // Clear details
    detailsDiv.style.display = 'none'; // Hide details
  }

  // Fetch LeetCode details
  function fetchLeetcodeDetails(username, detailsDiv) {
    console.log("fetchleetcode")
      fetch('http://localhost:3000/leetcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:username
          })
        })
          .then(response =>response.json().then(data=>  {
              console.log(data);
             let rating=data.data.rating;
             let title=data.data.title;
             let rank=data.data.rank
             detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title}, Live Ranking:${rank}`;
          }))
          .catch((err) => {
            console.log(err);
            detailsDiv.innerHTML = 'Error fetching LeetCode details invalid username';
          });
  }

  // Fetch Codeforces details
  function fetchCodeforcesDetails(username, detailsDiv) {
    console.log("fetchcodeforces")
      fetch('http://localhost:3000/codeforces', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:`${username}`
          })
        })
          .then(response =>response.json().then(data=>  {
              console.log(data);
             let rating=data.data.rating;
             let title=data.data.title;
             let  rank=data.data.rank
             detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title}, Live Ranking:${rank}`;
          }))
          .catch((err) => {
            console.log(err);
            detailsDiv.innerHTML = 'Error fetching Codeforces details invalid username';
          });
  }

  // Fetch CodeChef details
  function fetchCodechefDetails(username, detailsDiv) {
    console.log("fetchcodechef")
      fetch('http://localhost:3000/codechef', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:`${username}`
          })
        })
          .then(response =>response.json().then(data=>  {
              console.log(data);
             let rating=data.data.rating;
             let title=data.data.title;
             let rank=data.data.rank
             detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title},Live Ranking: ${rank}`;
          }))
          .catch((err) => {
            console.log(err)
            detailsDiv.innerHTML = 'Error fetching Codechef details invalid username';
          });
      }
  
});
