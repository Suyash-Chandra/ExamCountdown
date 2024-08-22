function countdown(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

function updateCountdown(targetDate) {
    const { days, hours, minutes, seconds } = countdown(targetDate);
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

let countdownInterval;

document.querySelectorAll('.exam-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.exam-item').forEach(el => el.classList.remove('active'));
        this.classList.add('active');

        const examDate = this.getAttribute('data-date');
        const examName = this.textContent;
        document.getElementById('examTitle').textContent = examName;
        document.getElementById('expectedDate').textContent = `Expected Date: ${formatDate(examDate)}`;

        clearInterval(countdownInterval);
        updateCountdown(examDate);
        countdownInterval = setInterval(() => updateCountdown(examDate), 1000);
    });
});