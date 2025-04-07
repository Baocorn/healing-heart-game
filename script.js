// Các biến theo dõi số lần nhấn cho mỗi emoji
let countDrug = 0;
let countBandage = 0;
let countHeart = 0;

// Tổng tiến trình chữa lành
let healingProgress = 0;

// Mức độ cần thiết để hồi phục (100%)
const maxProgress = 100;
const drugHealAmount = 5; // Mỗi lần nhấn thuốc làm tăng 5%
const bandageHealAmount = 7; // Mỗi lần nhấn băng gạt làm tăng 7%
const heartHealAmount = 3; // Mỗi lần nhấn trái tim làm tăng 3%

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        const heart = document.getElementById('brokenHeart');
        const healedHeart = document.getElementById('healedHeart');
        const progressBar = document.getElementById('healingProgress');
        const progressText = document.getElementById('progressText');
        const healedMessage = document.getElementById('healedMessage'); // Đoạn này lấy phần tử thông điệp

        // Kiểm tra emoji được nhấn và tăng số lần nhấn
        if (this.id === 'emoji1') {
            countDrug++;
            healingProgress += drugHealAmount; // Thuốc làm tăng tiến trình
        } else if (this.id === 'emoji2') {
            countBandage++;
            healingProgress += bandageHealAmount; // Băng gạt làm tăng tiến trình
        } else if (this.id === 'emoji3') {
            countHeart++;
            healingProgress += heartHealAmount; // Trái tim làm tăng tiến trình
        }

        // Cập nhật thanh tiến trình và tỷ lệ phần trăm
        progressBar.value = healingProgress;
        progressText.textContent = `${Math.min(healingProgress, 100)}%`;

        // Tạo hiệu ứng cho emoji bay vào trái tim
        const flyingEmoji = this.cloneNode(true);
        flyingEmoji.style.position = 'absolute';
        flyingEmoji.style.left = this.getBoundingClientRect().left + 'px';
        flyingEmoji.style.top = this.getBoundingClientRect().top + 'px';
        flyingEmoji.style.fontSize = '4rem';
        document.body.appendChild(flyingEmoji);

        flyingEmoji.animate([
            { transform: `translateY(0)`, opacity: 1 },
            { transform: `translateY(-200px)`, opacity: 1 },
            { transform: `translateY(0) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            fill: 'forwards'
        });

        // Ẩn trái tim tan vỡ và hiển thị trái tim lành lại khi đủ tiến trình
        if (healingProgress >= maxProgress) {
            heart.style.opacity = '0';
            setTimeout(() => {
                heart.style.display = 'none';
                healedHeart.style.display = 'block';
                healedMessage.style.display = 'block';  // Hiển thị thông điệp khi trái tim hồi phục
            }, 1000);
        }
    });
});
