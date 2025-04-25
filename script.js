const jumpList = document.getElementById('jumpList');
const jumpDetails = document.getElementById('jumpDetails');
const detailName = document.getElementById('detailName');
const detailCreator = document.getElementById('detailCreator');
const victorsList = document.getElementById('victorsList');
const closeBtn = document.querySelector('.close-btn');
const playerJumpsModal = document.getElementById('playerJumpsModal');
const playerJumpsList = document.getElementById('playerJumpsList');
const closePlayerJumpsBtn = document.getElementById('closePlayerJumpsBtn');

let jumps = [];

async function loadJumps() {
    try {
        const response = await fetch('levels.json');
        if (!response.ok) {
            throw new Error('Failed to load jumps');
        }
        jumps = await response.json();
        displayJumps();
    } catch (error) {
        console.error('Error loading jumps:', error);
        jumps = [
            {
                id: 1,
                name: "Something failed to load!",
                creator: "contact zas08 on discord if you see this repeatedly",
                victors: ["lol", "Skibiditoiletmaster1023048234908"]
            }
        ];
        displayJumps();
    }
}

function displayJumps() {
    jumpList.innerHTML = '';
    
    jumps.sort((a, b) => a.id - b.id).forEach(jump => {
        const jumpElement = document.createElement('div');
        jumpElement.className = 'jump-item';
        jumpElement.innerHTML = `
            <div class="jump-number">#${jump.id}</div>
            <div class="jump-info">
                <h2>${jump.name}</h2>
                <p class="creator">${jump.creator}</p>
            </div>
        `;
        
        jumpElement.addEventListener('click', () => showJumpDetails(jump));
        jumpList.appendChild(jumpElement);
    });
}

function showJumpDetails(jump) {
    detailName.textContent = jump.name;
    detailCreator.textContent = jump.creator;
    
    victorsList.innerHTML = '';
    jump.victors.forEach((victor) => {
        const li = document.createElement('li');
        li.textContent = victor;
        victorsList.appendChild(li);
    });
    
    jumpDetails.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
    jumpDetails.style.display = 'none';
});

jumpDetails.addEventListener('click', (e) => {
    if (e.target === jumpDetails) {
        jumpDetails.style.display = 'none';
    }
});

closePlayerJumpsBtn.addEventListener('click', () => {
    playerJumpsModal.style.display = 'none';
});

loadJumps();
