function changeDisplay() {
    let button = document.getElementById("newButton")
    let form = document.getElementById("newForm")
    let threads = document.getElementById("threadsDisplay")

    button.style.display = 'none';
    form.style.display = 'block';
    threads.style.display = 'none';
}

function changeDisplayCancel() {
    let button = document.getElementById("newButton")
    let form = document.getElementById("newForm")
    let threads = document.getElementById("threadsDisplay")

    button.style.display = 'block';
    form.style.display = 'none';
    threads.style.display = 'block';
}

function filterThreads() {
    const selectedCategory = document.getElementById('dropdown2').value;
    console.log(selectedCategory)
    // Hide all thread elements
    const threadElements = document.querySelectorAll('section');
    threadElements.forEach((threadElement) => {
        threadElement.style.display = 'none';
    });

    // Show threads with the selected category
    const filteredThreads = document.querySelectorAll('.' + selectedCategory);
    filteredThreads.forEach((thread) => {
        thread.style.display = 'block';
    });
}

// Add an event listener to the category dropdown
document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the category dropdown
    const dropdown2 = document.getElementById('dropdown2');
    if (dropdown2) { // Check if the element exists before adding the listener
        dropdown2.addEventListener('change', filterThreads);
    }
});

function getLeaders(gameType, idNum) {
    // Define the API URL
    const apiUrl = 'https://api.chess.com/pub/leaderboards';

    // Get a reference to the HTML element where you want to display the data
    const leaderboardElement = document.getElementById(`leaderboard${idNum}`);

    // Use the fetch function to make a GET request to the API
    fetch(apiUrl)
    .then((response) => {
        // Check if the response status is OK (200)
        if (response.ok) {
        // Parse the JSON data from the response
        return response.json();
        } else {
        throw new Error('Failed to fetch data');
        }
    })
    .then((data) => {
        // Define the desired category dynamically (e.g., 'live_rapid', 'live_bullet', 'live_blitz')
        const category = gameType; // You can change this to the desired category

        // Access the data for the specified category
        const categoryData = data[category];

        // Slice the data to get the top 5 players
        const topPlayers = categoryData.slice(0, 5);
        
        console.log(topPlayers)

        let gameTypeFormat = '';
        
        if (gameType == 'live_blitz') {
            gameTypeFormat = 'Blitz';
          } else if (gameType == 'live_rapid') {
            gameTypeFormat = 'Rapid';
          } else if (gameType == 'live_bullet') {
            gameTypeFormat = 'Bullet';
          }

        // Create an HTML string to display the data
        let html = `<h4 style="text-align: left;">${gameTypeFormat}</h4>`;

        for (let i = 0; i < topPlayers.length; i++) {
        const player = topPlayers[i];
        const name = player.name;
        const elo = player.score;
        const url = player.url;

        // Add player information to the HTML string
        html += `<div class="playerLink">
                    <a class="newsTag leaderCard" href="${url}" target="_blank">
                        <h5 style="text-align: left;">#${i + 1}</h5>
                        <h6 style="text-align: center;">${name}</h6>
                        <h6 style="text-align: right;">Elo: ${elo}</h6>
                    </a>
                </div>`;
        }

        // Set the HTML content of the leaderboardElement
        leaderboardElement.innerHTML = html;
    })
    .catch((error) => {
        console.error(error);
    });
}

function getStreamers() {
    // Define the API URL
    const apiUrl = 'https://api.chess.com/pub/streamers';

    // Get a reference to the HTML element where you want to display the data
    const leaderboardElement = document.getElementById('streaming');

    // Use the fetch function to make a GET request to the API
    fetch(apiUrl)
    .then((response) => {
        // Check if the response status is OK (200)
        if (response.ok) {
        // Parse the JSON data from the response
        return response.json();
        } else {
        throw new Error('Failed to fetch data');
        }
    })
    .then((data) => {
        // Access the data for the specified category
        const dataStreamers = data["streamers"];

        const topStreamers = dataStreamers.slice(0, 3);
        
        console.log(topStreamers)

        // Create an HTML string to display the data
        let html = ``;

        for (let i = 0; i < topStreamers.length; i++) {
        const player = topStreamers[i];
        const username = player.username;
        const live = player.is_live
        const image_url = player.avatar
        const stream_url = player.twitch_url

        // Add player information to the HTML string
        html += `<div class="playerLink">
                    <a class="newsTag leaderCard" href="${stream_url}" target="_blank">
                        <h5 style="text-align: left;">#${i + 1}</h5>
                        <h6 style="text-align: center;">${username}</h6>
                        <img height="40px" style="text-align: right;";" src="${image_url}">
                    </a>
                </div>`;
        }

        // Set the HTML content of the leaderboardElement
        leaderboardElement.innerHTML = html;
    })
    .catch((error) => {
        console.error(error);
    });
}