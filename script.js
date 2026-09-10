// Type the hero lines progressively so normal text wrapping is preserved.
(function initializeHeroTypewriter() {
    const firstLine = document.querySelector('#hero-line-1');
    const secondLine = document.querySelector('#hero-line-2');

    if (!firstLine || !secondLine) {
        return;
    }

    const firstText = 'Welcome To My Site';
    const secondText = "Hello! I'm Aftab Aziz, a passionate Software Engineering student.";
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
        firstLine.textContent = firstText;
        secondLine.textContent = secondText;
        return;
    }

    const mobileSpeed = window.matchMedia('(max-width: 768px)').matches;
    const characterDelay = mobileSpeed ? 42 : 72;

    function typeLine(element, text, onComplete) {
        let position = 0;
        element.classList.add('typing-active');

        function addCharacter() {
            element.textContent = text.slice(0, position);

            if (position < text.length) {
                position += 1;
                window.setTimeout(addCharacter, characterDelay);
                return;
            }

            onComplete();
        }

        addCharacter();
    }

    typeLine(firstLine, firstText, function () {
        firstLine.classList.remove('typing-active');
        typeLine(secondLine, secondText, function () {
            secondLine.classList.add('typing-active');
        });
    });
})();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Get Started button functionality
document.querySelector('.hero .btn')?.addEventListener('click', function() {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// Contact form functionality
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create mailto link with form data
    const subject = encodeURIComponent('Contact from Website');
     const body = encodeURIComponent(
     `This message is from Portfolio Website

     Name: ${name}

      Message:
      ${message}`
     );

    const mailtoLink = `mailto:aftabaziz42966@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert(`Thank you ${name}! Opening your email client to send the message.`);

    // Reset form
    this.reset();
});

// Copy email functionality
function copyEmail() {
    const email = 'aftabaziz42966@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Show success message
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#28a745';

        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#28a745';

        setTimeout(function() {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}
