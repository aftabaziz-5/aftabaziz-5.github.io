const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navigationToggle = document.querySelector('.navbar-toggle');
const navigation = document.querySelector('.nav-links');
const navigationLinks = [...document.querySelectorAll('.nav-links a')];

function closeNavigation() {
    // One shared close path prevents stale open state after link, Escape, or resize events.
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
    if (isOpen) {
        navigation?.querySelector('a')?.focus();
    }
});

navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
        closeNavigation();
        const target = document.querySelector(link.getAttribute('href'));
        const heading = target?.querySelector('h1, h2, h3');
        if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const wasOpen = navigationToggle?.getAttribute('aria-expanded') === 'true';
        closeNavigation();
        if (wasOpen) {
            navigationToggle?.focus();
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeNavigation();
    }
});

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
