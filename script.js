const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pageLoader = document.querySelector('.page-loader');
const navigationToggle = document.querySelector('.navbar-toggle');
const navigation = document.querySelector('.nav-links');
const navigationLinks = [...document.querySelectorAll('.nav-links a')];

window.addEventListener('load', () => {
    window.setTimeout(() => pageLoader?.classList.add('is-hidden'), reducedMotion ? 0 : 350);
});

function closeNavigation() {
    navigation?.classList.remove('is-open');
    navigationToggle?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    navigationToggle?.setAttribute('aria-expanded', 'false');
}

navigationToggle?.addEventListener('click', () => {
    const isOpen = navigation?.classList.toggle('is-open') ?? false;
    navigationToggle.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navigationToggle.setAttribute('aria-expanded', String(isOpen));
});

navigationLinks.forEach((link) => {
    link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeNavigation();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
        closeNavigation();
    }
});

const firstLine = document.querySelector('#hero-line-1');
const secondLine = document.querySelector('#hero-line-2');

function initializeHeroTypewriter() {
    if (!firstLine || !secondLine) {
        return;
    }

    const firstText = 'Welcome To My Site';
    const secondText = "Hello! I'm Aftab Aziz, a passionate Software Engineering student.";

    if (reducedMotion) {
        firstLine.textContent = firstText;
        secondLine.textContent = secondText;
        return;
    }

    const characterDelay = window.matchMedia('(max-width: 768px)').matches ? 38 : 58;

    function typeLine(element, text, onComplete) {
        let position = 0;
        element.classList.add('typing-active');

        function addCharacter() {
            element.textContent = text.slice(0, position);
            if (position < text.length) {
                position += 1;
                window.setTimeout(addCharacter, characterDelay);
            } else {
                element.classList.remove('typing-active');
                onComplete();
            }
        }

        addCharacter();
    }

    typeLine(firstLine, firstText, () => {
        typeLine(secondLine, secondText, () => secondLine.classList.add('typing-complete'));
    });
}

initializeHeroTypewriter();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) {
            return;
        }
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
});

const sections = [...document.querySelectorAll('section[id]')];
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px' });

sections.forEach((section) => revealObserver.observe(section));

const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        navigationLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => activeSectionObserver.observe(section));

if (reducedMotion) {
    sections.forEach((section) => section.classList.add('is-visible'));
}

// Keep pointer motion to one animation frame so it never competes with scrolling.
const hero = document.querySelector('.hero');
const heroPhoto = document.querySelector('.hero-photo');
let parallaxFrame = 0;

if (hero && heroPhoto && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
        if (parallaxFrame) {
            return;
        }
        parallaxFrame = window.requestAnimationFrame(() => {
            const bounds = hero.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
            heroPhoto.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            parallaxFrame = 0;
        });
    });
    hero.addEventListener('pointerleave', () => {
        heroPhoto.style.transform = 'translate3d(0, 0, 0)';
    });
}

document.querySelectorAll('.btn, .social-link, .back-to-top').forEach((control) => {
    control.addEventListener('click', (event) => {
        if (reducedMotion) {
            return;
        }
        const ripple = document.createElement('span');
        const bounds = control.getBoundingClientRect();
        ripple.className = 'ripple';
        ripple.style.left = `${event.clientX - bounds.left - 10}px`;
        ripple.style.top = `${event.clientY - bounds.top - 10}px`;
        control.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 650);
    });
});

document.querySelector('#print-cv')?.addEventListener('click', () => window.print());

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        const duration = reducedMotion ? 0 : 900;
        const start = performance.now();

        function updateCounter(now) {
            const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
            counter.textContent = Math.round(target * progress).toString();
            if (progress < 1) {
                window.requestAnimationFrame(updateCounter);
            }
        }

        window.requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
    });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));

const terminalOutput = document.querySelector('#terminal-output');
const terminalResponses = {
    whoami: 'Aftab Aziz',
    skills: 'Ethical Hacking | Python | Network Security | Penetration Testing | Digital Forensics | Cryptography',
    certifications: 'Proficiency Certificate | Academic certificates and supporting documents available above',
    projects: 'CyberGuard - API Security and Threat Monitoring',
    education: 'Bachelor of Science in Software Engineering - Abdul Wali Khan University Mardan',
    contact: 'Email: aa.salarzai@gmail.com | LinkedIn and GitHub links in Contact'
};

function addTerminalLine(command, result) {
    if (!terminalOutput) {
        return;
    }
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="prompt">&gt; ${command}</span><br><span class="result">${result}</span>`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function initializeTerminal() {
    Object.entries({ whoami: terminalResponses.whoami, role: 'Software Engineering graduate / cybersecurity enthusiast' }).forEach(([command, result], index) => {
        window.setTimeout(() => addTerminalLine(command, result), reducedMotion ? 0 : index * 180);
    });
}

document.querySelector('#terminal-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('#terminal-input');
    const command = input.value.trim().toLowerCase();
    if (!command) {
        return;
    }
    addTerminalLine(command, terminalResponses[command] || 'Command not found. Try: whoami, skills, certifications, projects, education, contact');
    input.value = '';
});

initializeTerminal();

const progressBar = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.floating-top');
let scrollFrame = 0;
window.addEventListener('scroll', () => {
    if (scrollFrame) {
        return;
    }
    scrollFrame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        backToTop?.classList.toggle('is-visible', window.scrollY > window.innerHeight * .7);
        scrollFrame = 0;
    });
}, { passive: true });

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

const themeSelect = document.querySelector('#theme-select');
const savedTheme = localStorage.getItem('portfolio-theme') || 'auto';
function applyTheme(theme) {
    document.body.dataset.theme = theme === 'auto' ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') : theme;
    if (themeSelect) {
        themeSelect.value = theme;
    }
}
applyTheme(savedTheme);
themeSelect?.addEventListener('change', () => {
    localStorage.setItem('portfolio-theme', themeSelect.value);
    applyTheme(themeSelect.value);
});
window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
    if ((localStorage.getItem('portfolio-theme') || 'auto') === 'auto') {
        applyTheme('auto');
    }
});

const soundToggle = document.querySelector('#sound-toggle');
let soundEnabled = localStorage.getItem('portfolio-sound') === 'on';
function playInteractionTone() {
    if (!soundEnabled || reducedMotion) {
        return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
        return;
    }
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 620;
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(0.025, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.07);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.07);
    oscillator.addEventListener('ended', () => context.close(), { once: true });
}
function updateSoundControl() {
    soundToggle?.setAttribute('aria-pressed', String(soundEnabled));
    if (soundToggle) {
        soundToggle.innerHTML = `<i class="fas ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}" aria-hidden="true"></i><span class="sr-only">Sound effects ${soundEnabled ? 'on' : 'off'}</span>`;
    }
}
soundToggle?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('portfolio-sound', soundEnabled ? 'on' : 'off');
    updateSoundControl();
});
updateSoundControl();

document.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
    playInteractionTone();
        document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
        const filter = button.dataset.filter;
        document.querySelectorAll('.project-card').forEach((card) => {
            const matches = filter === 'all' || card.dataset.tags?.split(' ').includes(filter);
            card.classList.toggle('filtered-out', !matches);
        });
    });
});

document.querySelector('#skill-search')?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll('.skill-group').forEach((group) => {
        const matches = group.textContent.toLowerCase().includes(query);
        group.classList.toggle('filtered-out', !matches);
    });
});

const commandPalette = document.querySelector('#command-palette');
function openCommandPalette() {
    if (commandPalette?.showModal) {
        commandPalette.showModal();
        document.querySelector('#command-search')?.focus();
    }
}
document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openCommandPalette();
    }
});
document.querySelectorAll('[data-command-target]').forEach((button) => {
    button.addEventListener('click', () => {
        commandPalette?.close();
        document.querySelector(`#${button.dataset.commandTarget}`)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
});
document.querySelector('#command-search')?.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('[data-command-target]').forEach((button) => button.hidden = !button.textContent.toLowerCase().includes(query));
});

const previewModal = document.querySelector('#preview-modal');
const previewFrame = document.querySelector('#preview-frame');
document.querySelectorAll('.document-card .download-btn').forEach((link) => {
    link.addEventListener('click', (event) => {
        if (link.getAttribute('href')?.endsWith('.pdf') || link.getAttribute('href')?.includes('.pdf.')) {
            event.preventDefault();
            if (previewFrame && previewModal?.showModal) {
                previewFrame.src = link.href;
                previewModal.showModal();
            }
        }
    });
});
document.querySelector('.modal-close')?.addEventListener('click', () => previewModal?.close());
previewModal?.addEventListener('close', () => { if (previewFrame) previewFrame.src = ''; });

const cursorDot = document.querySelector('.cursor-dot');
if (cursorDot && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('has-custom-cursor');
    document.addEventListener('pointermove', (event) => {
        cursorDot.style.left = `${event.clientX}px`;
        cursorDot.style.top = `${event.clientY}px`;
    }, { passive: true });
    document.querySelectorAll('a, button').forEach((control) => {
        control.addEventListener('pointerenter', () => {
            cursorDot.style.width = '22px';
            cursorDot.style.height = '22px';
            cursorDot.style.background = 'rgba(89,225,255,.16)';
        });
        control.addEventListener('pointerleave', () => {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorDot.style.background = 'transparent';
        });
    });
}
