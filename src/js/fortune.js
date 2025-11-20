// Fortune Logic
let fortuneData = null;

// Date-based seed for consistent daily fortune
function getDateSeed() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return year * 10000 + month * 100 + day;
}

// Seeded random number generator
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Get random index based on date seed
function getSeededIndex(seed, length) {
    return Math.floor(seededRandom(seed) * length);
}

// Generate stars HTML
function generateStars(rating) {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            starsHTML += '⭐';
        } else {
            starsHTML += '☆';
        }
    }
    return starsHTML;
}

// Get fortune rating (1-5 stars)
function getFortuneRating(seed, index) {
    const combinedSeed = seed + index * 100;
    const random = seededRandom(combinedSeed);

    // Distribution: mostly 3-4 stars, occasional 5 or 2
    if (random < 0.1) return 5; // 10%
    if (random < 0.3) return 4; // 20%
    if (random < 0.7) return 3; // 40%
    if (random < 0.9) return 4; // 20%
    return 2; // 10%
}

// Display today's date
function displayDate() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const dateString = today.toLocaleDateString('ko-KR', options);
    document.getElementById('todayDate').textContent = dateString;
}

// Load and display fortune
async function loadFortune() {
    try {
        const response = await fetch('../fortune-data.json');
        fortuneData = await response.json();

        const seed = getDateSeed();

        // Overall fortune
        const overallIndex = getSeededIndex(seed, fortuneData.overall.length);
        const overallRating = getFortuneRating(seed, 0);
        document.getElementById('fortuneMessage').textContent = fortuneData.overall[overallIndex];
        document.getElementById('overallStars').innerHTML = generateStars(overallRating);

        // Love fortune
        const loveIndex = getSeededIndex(seed + 1, fortuneData.love.length);
        const loveRating = getFortuneRating(seed, 1);
        document.getElementById('loveMessage').textContent = fortuneData.love[loveIndex];
        document.getElementById('loveStars').innerHTML = generateStars(loveRating);

        // Money fortune
        const moneyIndex = getSeededIndex(seed + 2, fortuneData.money.length);
        const moneyRating = getFortuneRating(seed, 2);
        document.getElementById('moneyMessage').textContent = fortuneData.money[moneyIndex];
        document.getElementById('moneyStars').innerHTML = generateStars(moneyRating);

        // Health fortune
        const healthIndex = getSeededIndex(seed + 3, fortuneData.health.length);
        const healthRating = getFortuneRating(seed, 3);
        document.getElementById('healthMessage').textContent = fortuneData.health[healthIndex];
        document.getElementById('healthStars').innerHTML = generateStars(healthRating);

        // Work fortune
        const workIndex = getSeededIndex(seed + 4, fortuneData.work.length);
        const workRating = getFortuneRating(seed, 4);
        document.getElementById('workMessage').textContent = fortuneData.work[workIndex];
        document.getElementById('workStars').innerHTML = generateStars(workRating);

        // Lucky color
        const colorIndex = getSeededIndex(seed + 5, fortuneData.colors.length);
        const luckyColor = fortuneData.colors[colorIndex];
        const colorElement = document.getElementById('luckyColor');
        colorElement.style.backgroundColor = luckyColor.hex;
        if (luckyColor.hex === '#FFFFFF') {
            colorElement.style.border = '2px solid #e5e5e5';
        }
        document.getElementById('luckyColorName').textContent = luckyColor.name;

        // Lucky number
        const luckyNumber = getSeededIndex(seed + 6, 100) + 1;
        document.getElementById('luckyNumber').textContent = luckyNumber;

    } catch (error) {
        console.error('Failed to load fortune:', error);
        document.getElementById('fortuneMessage').textContent = '운세를 불러오는데 실패했습니다. 페이지를 새로고침해주세요.';
    }
}

// Share fortune
window.shareFortune = async function() {
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    const text = `${dateString} 오늘의 운세를 확인했어요! 🔮`;

    // Import ShareUtils dynamically
    const { default: ShareUtils } = await import('./share-utils.js');

    await ShareUtils.nativeShare({
        title: '오늘의 운세 - Lux Vera',
        text: text,
        url: window.location.href
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayDate();
    loadFortune();
});
