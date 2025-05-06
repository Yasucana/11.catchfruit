const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
let score = 0;
let basketPosition = 250;

// Move the basket with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20;
    } else if (e.key === 'ArrowRight' && basketPosition < 500) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + 'px';
});

// Spawn fruits and bad items
function spawnObject() {
    const isFruit = Math.random() > 0.3; // 70% chance for fruit
    const object = document.createElement('div');
    object.className = isFruit ? 'fruit' : 'bad-item';
    object.style.left = Math.random() * 580 + 'px'; // Random x-position
    object.style.top = '0px';
    gameContainer.appendChild(object);

    // Falling animation
    let position = 0;
    const fall = setInterval(() => {
        position += 5;
        object.style.top = position + 'px';

        // Check collision with basket
        if (position > 360 && position < 400) {
            const objectLeft = parseInt(object.style.left);
            if (objectLeft > basketPosition - 20 && objectLeft < basketPosition + 100) {
                if (isFruit) {
                    score += 10;
                } else {
                    score -= 20;
                    if (score < 0) score = 0; // Prevent negative score
                }
                scoreDisplay.textContent = `Score: ${score}`;
                object.remove();
                clearInterval(fall);
            }
        }

        // Remove object when it hits the bottom
        if (position > 400) {
            object.remove();
            clearInterval(fall);
        }
    }, 20);
}

// Spawn objects every 1-2 seconds
setInterval(spawnObject, Math.random() * 1000 + 1000);
