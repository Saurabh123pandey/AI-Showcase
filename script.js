// ================= Smooth Scrolling =================
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
// ================= Navbar Toggle (Hamburger) =================
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            // Toggle icon between ☰ and ✖
            menuToggle.innerHTML = navMenu.classList.contains("active") ? "✖" : "☰";
        });
    }
});
// ================= Scroll-to-Top Button =================
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// ================= Main Background Animation =================
const canvas = document.getElementById('ai-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let numParticles = Math.min(150, Math.floor(width / 8));
    const particles = [];
    const streams = [];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 0, 255, 0.8)';
            ctx.fill();
        }
    }

    class Stream {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.length = Math.random() * 50 + 20;
            this.speed = Math.random() * 2 + 1;
            this.color = `rgba(103, 58, 183, ${Math.random() * 0.6 + 0.4})`;
        }

        move() {
            this.y -= this.speed;
            if (this.y < -this.length) {
                this.y = height + this.length;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
    }

    function init() {
        particles.length = 0;
        streams.length = 0;
        for (let i = 0; i < numParticles; i++) particles.push(new Particle());
        for (let i = 0; i < numParticles / 2; i++) streams.push(new Stream());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(103, 58, 183, ${1 - dist / 150})`;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#111');
        gradient.addColorStop(1, `rgba(${Math.floor(80 + Math.sin(Date.now() / 2000) * 80)}, 0, 255, 0.25)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.move();
            p.draw();
        });

        streams.forEach(s => {
            s.move();
            s.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();
    // Resize Handling
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        numParticles = Math.min(150, Math.floor(width / 8));
        init();
    });
}
// ================= Footer Animation =================
const footerCanvas = document.getElementById('footer-bg');
if (footerCanvas) {
    const fctx = footerCanvas.getContext('2d');

    let fWidth = footerCanvas.width = footerCanvas.offsetWidth;
    let fHeight = footerCanvas.height = footerCanvas.offsetHeight;

    let fParticles = [];
    const fNumParticles = 50;

    class FParticle {
        constructor() {
            this.x = Math.random() * fWidth;
            this.y = Math.random() * fHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > fWidth) this.vx *= -1;
            if (this.y < 0 || this.y > fHeight) this.vy *= -1;
        }

        draw() {
            fctx.beginPath();
            fctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            fctx.fillStyle = 'rgba(103, 58, 183, 0.7)';
            fctx.fill();
        }
    }

    function initFooterParticles() {
        fParticles.length = 0;
        for (let i = 0; i < fNumParticles; i++) fParticles.push(new FParticle());
    }

    function connectFooterParticles() {
        for (let i = 0; i < fParticles.length; i++) {
            for (let j = i + 1; j < fParticles.length; j++) {
                let dx = fParticles[i].x - fParticles[j].x;
                let dy = fParticles[i].y - fParticles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    fctx.beginPath();
                    fctx.strokeStyle = `rgba(103, 58, 183, ${1 - dist / 100})`;
                    fctx.lineWidth = 0.6;
                    fctx.moveTo(fParticles[i].x, fParticles[i].y);
                    fctx.lineTo(fParticles[j].x, fParticles[j].y);
                    fctx.stroke();
                }
            }
        }
    }

    function animateFooter() {
        fctx.clearRect(0, 0, fWidth, fHeight);
        fParticles.forEach(p => {
            p.move();
            p.draw();
        });
        connectFooterParticles();
        requestAnimationFrame(animateFooter);
    }

    initFooterParticles();
    animateFooter();
    // Resize
    window.addEventListener('resize', () => {
        fWidth = footerCanvas.width = footerCanvas.offsetWidth;
        fHeight = footerCanvas.height = footerCanvas.offsetHeight;
        initFooterParticles();
    });
}
// ================= Navbar Animation =================
const navCanvas = document.getElementById('navbar-bg');
if (navCanvas) {
    const nctx = navCanvas.getContext('2d');

    let nWidth = navCanvas.width = navCanvas.offsetWidth;
    let nHeight = navCanvas.height = navCanvas.offsetHeight;

    let nParticles = [];
    const nNumParticles = 20;

    class NParticle {
        constructor() {
            this.x = Math.random() * nWidth;
            this.y = Math.random() * nHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > nWidth) this.vx *= -1;
            if (this.y < 0 || this.y > nHeight) this.vy *= -1;
        }

        draw() {
            nctx.beginPath();
            nctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            nctx.fillStyle = 'rgba(103, 58, 183, 0.7)';
            nctx.fill();
        }
    }

    function initNavbarParticles() {
        nParticles.length = 0;
        for (let i = 0; i < nNumParticles; i++) nParticles.push(new NParticle());
    }

    function connectNavbarParticles() {
        for (let i = 0; i < nParticles.length; i++) {
            for (let j = i + 1; j < nParticles.length; j++) {
                let dx = nParticles[i].x - nParticles[j].x;
                let dy = nParticles[i].y - nParticles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    nctx.beginPath();
                    nctx.strokeStyle = `rgba(103, 58, 183, ${1 - dist / 100})`;
                    nctx.lineWidth = 0.5;
                    nctx.moveTo(nParticles[i].x, nParticles[i].y);
                    nctx.lineTo(nParticles[j].x, nParticles[j].y);
                    nctx.stroke();
                }
            }
        }
    }

    function animateNavbar() {
        nctx.clearRect(0, 0, nWidth, nHeight);
        nParticles.forEach(p => {
            p.move();
            p.draw();
        });
        connectNavbarParticles();
        requestAnimationFrame(animateNavbar);
    }

    initNavbarParticles();
    animateNavbar();
    // Resize
    window.addEventListener('resize', () => {
        nWidth = navCanvas.width = navCanvas.offsetWidth;
        nHeight = navCanvas.height = navCanvas.offsetHeight;
        initNavbarParticles();
    });
}
