// Smooth Scroll Effect for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some interactive functionality to the project cards (hover effect)
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = 'scale(1)';
    });
});

// Optional: Add some animations when the page is loaded
window.addEventListener('load', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeIn 1s ease-out ${index * 0.2}s forwards`;
    });
});

// Adding keyframe animation for fading in project cards
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`, styleSheet.cssRules.length);
