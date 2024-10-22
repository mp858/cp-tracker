document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const leetcodeUsernameInput = document.getElementById('leetcodeUsername');
  const codeforcesUsernameInput = document.getElementById('codeforcesUsername');
  const codechefUsernameInput = document.getElementById('codechefUsername');

  // Event Listeners for Add Buttons
  document.getElementById('addLeetcode').addEventListener('click', () => addUsername('leetcode', leetcodeUsernameInput.value));
  document.getElementById('addCodeforces').addEventListener('click', () => addUsername('codeforces', codeforcesUsernameInput.value));
  document.getElementById('addCodechef').addEventListener('click', () => addUsername('codechef', codechefUsernameInput.value));

  // Load saved usernames when extension popup is opened
  loadUsernames();

  // Event Listener for section toggles
  document.getElementById('leetcodeToggle').addEventListener('click', () => toggleSection(leetcodeContent, leetcodeToggle));
  document.getElementById('codeforcesToggle').addEventListener('click', () => toggleSection(codeforcesContent, codeforcesToggle));
  document.getElementById('codechefToggle').addEventListener('click', () => toggleSection(codechefContent, codechefToggle));

  // Use event delegation for the show/hide/remove buttons
  document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('show-button')) {
          const platform = e.target.dataset.platform;
          const username = e.target.dataset.username;
          showDetails(platform, username);
          e.target.style.display = 'none'; // Hide Show button
          e.target.nextElementSibling.style.display = 'inline'; // Show Hide button
      }

      if (e.target.classList.contains('hide-button')) {
          const platform = e.target.dataset.platform;
          const username = e.target.dataset.username;
          hideDetails(platform, username);
          e.target.style.display = 'none'; // Hide Hide button
          e.target.previousElementSibling.style.display = 'inline'; // Show Show button
      }

      if (e.target.classList.contains('remove-button')) {
          const platform = e.target.dataset.platform;
          const username = e.target.dataset.username;
          removeUsername(platform, username);
      }
  });

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
          let u;
          if(platform=='leetcode'){
            u=`<a class="profile" href="https://leetcode.com/u/${username}/" target="_blank">${username}</a>`
          }
        else if(platform=='codeforces'){
            u=`<a class="profile" href="https://codeforces.com/profile/${username}/" target="_blank">${username}</a>`
        }
        else{
            u=`<a class="profile" href="https://www.codechef.com/users/${username}/" target="_blank">${username}</a>`
          }
          div.innerHTML = `
            ${u}
            <button class="show-button" data-platform="${platform}" data-username="${username}">Show</button>
            <button class="hide-button" data-platform="${platform}" data-username="${username}" style="display: none;">Hide</button>
            <button class="remove-button" data-platform="${platform}" data-username="${username}">Remove</button>
            <div class="details" id="details-${platform}-${username}" style="display: none;"></div>
          `;
          container.appendChild(div);
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
              fetchLeetcodeDetails(username, detailsDiv);
              break;
          case 'codeforces':
              fetchCodeforcesDetails(username, detailsDiv);
              break;
          case 'codechef':
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
      fetch('https://cp-tracker-proxy-server.onrender.com/leetcode', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username })
      })
      .then(response => response.json())
      .then(data => {
          let rating = data.data.rating;
          let title = data.data.title;
          let rank = data.data.rank;
          detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title}, Live Ranking: ${rank}`;
      })
      .catch((err) => {
          detailsDiv.innerHTML = 'Error fetching LeetCode details. Invalid username';
      });
  }

  // Fetch Codeforces details
  function fetchCodeforcesDetails(username, detailsDiv) {
      fetch('https://cp-tracker-proxy-server.onrender.com/codeforces', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username })
      })
      .then(response => response.json())
      .then(data => {
          let rating = data.data.rating;
          let title = data.data.title;
          let rank = data.data.rank;
          detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title}, Live Ranking: ${rank}`;
      })
      .catch((err) => {
          detailsDiv.innerHTML = 'Error fetching Codeforces details. Invalid username';
      });
  }

  // Fetch CodeChef details
  function fetchCodechefDetails(username, detailsDiv) {
      fetch('https://cp-tracker-proxy-server.onrender.com/codechef', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: username })
      })
      .then(response => response.json())
      .then(data => {
          let rating = data.data.rating;
          let title = data.data.title;
          let rank = data.data.rank;
          detailsDiv.innerHTML = `Rating: ${rating}, Title: ${title}, Live Ranking: ${rank}`;
      })
      .catch((err) => {
          detailsDiv.innerHTML = 'Error fetching CodeChef details. Invalid username';
      });
  }
});
