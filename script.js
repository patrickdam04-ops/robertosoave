document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) icon.setAttribute('data-lucide', 'x');
            else icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver(function(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); 
            }
        });
    }, revealOptions);
    revealElements.forEach(el => revealOnScroll.observe(el));

    const counterElement = document.getElementById('review-counter');
    let hasCounted = false;
    if(counterElement) {
        const counterObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                animateDecimalValue(counterElement, 0.0, 5.0, 2500);
            }
        }, { threshold: 0.5 });
        counterObserver.observe(counterElement);
    }

    function animateDecimalValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            let currentValue = (easeOutProgress * (end - start) + start);
            
            if (progress >= 1) obj.innerHTML = end.toFixed(1);
            else {
                obj.innerHTML = currentValue.toFixed(1);
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
