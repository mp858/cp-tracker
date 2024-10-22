<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CP Tracker</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;    
      background-color: #2c2f33;
      color: #fff;
      width: 350px;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin:0;
    }
    .container{
      padding:15px
    }
    h3 {
      color: #f1f1f1;
      border-bottom: 2px solid #7289da;
      padding-bottom: 5px;
      cursor: pointer;
    }
    input {
      width: 100%;
      padding: 8px;
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #7289da;
      background-color: #23272a;
      color: #fff;
      box-sizing: border-box;
    }
    .section {
      margin-bottom: 20px;
    }
    .hidden {
      display: none;
    }
    .profile,button {
      background-color: #7289da;
      color: #fff;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
    }
    .profile:hover,button:hover {
      background-color: #5b6eae;
    }
    .username-item {
      margin-top: 10px;
    }
    .details {
      margin-top: 5px;
      padding: 10px;
      background-color: #444;
      border-radius: 5px;
      font-size: 0.9em;
      color: #9ca9b3;
    }
    .details p {
      margin-bottom: 5px;
    }
    /* Footer styles */
    footer {
      display: flex;
      flex-direction: column;
      position: sticky;
      bottom: 0;
      width:100%;
      text-align: center;
      padding: 5px;
      background-color: #23272a;
      color: #fff;
      font-size: 0.9em;
      border-top: 2px solid #7289da;
    }
    .footer-link {
     
      text-decoration: none;
      margin-left: 5px;
      color:white;
    }
    .footer-link:hover {
      color: #5b6eae;
    }
    /* GitHub icon positioning */
    .github-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      font-size: 1.8em;
    }
    .github-icon:hover {
      color: #5b6eae;
    }
    /* Portfolio link styling */
    .portfolio-icon {
      font-size: 1.2em;
      vertical-align: middle;
      margin-right: 5px;
    }
    .portfolio-icon:hover {
      color: #5b6eae;
    }
    .portfolio-logo img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 5px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
  <!-- GitHub Icon -->
  <a href="https://github.com/mp858" class="github-icon" target="_blank">
    <i class="fab fa-github"></i>
  </a>

  <!-- LeetCode Section -->
  <div id="leetcode" class="section">
    <h3 id="leetcodeToggle">LeetCode &#9660;</h3> <!-- Down arrow icon -->
    <div id="leetcodeContent" class="hidden">
      <h4>live ranking feature for leetcode is under progress you can fetch rank upto 1000</h4>
      <input type="text" id="leetcodeUsername" placeholder="Add LeetCode Username">
      <button id="addLeetcode">Add</button>
      <div id="leetcodeUsernames" class="username-section"></div>
    </div>
  </div>

  <!-- Codeforces Section -->
  <div id="codeforces" class="section">
    <h3 id="codeforcesToggle">Codeforces &#9660;</h3> <!-- Down arrow icon -->
    <div id="codeforcesContent" class="hidden">
      <input type="text" id="codeforcesUsername" placeholder="Add Codeforces Username">
      <button id="addCodeforces">Add</button>
      <div id="codeforcesUsernames" class="username-section"></div>
    </div>
  </div>

  <!-- CodeChef Section -->
  <div id="codechef" class="section">
    <h3 id="codechefToggle">CodeChef &#9660;</h3> <!-- Down arrow icon -->
    <div id="codechefContent" class="hidden">
      <input type="text" id="codechefUsername" placeholder="Add CodeChef Username">
      <button id="addCodechef">Add</button>
      <div id="codechefUsernames" class="username-section"></div>
    </div>
  </div>
</div>

  <!-- Footer Section -->
  <footer>
    <p>&copy; 2024 MUDASSIR PARVEZ. All Rights Reserved.</p>
    <a href="https://mp858.github.io/my-portfolio/" target="_blank" class="footer-link">
      <span class="portfolio-logo">
        <img src="./profile.png" alt="Portfolio Logo">
      </span>
      Visit my portfolio
    </a>
  </footer>

  <script src="popup.js"></script>
</body>
</html>
