document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------
       Sticky Header
    ----------------------------------------------- */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* -----------------------------------------------
       Typewriter Animation
    ----------------------------------------------- */
    const typewriterElement = document.getElementById('typewriter');
    const words = ['Web Developer', 'Designer', 'Freelancer', 'Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Remove characters
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            // Add characters
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        // Word complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start the typewriter effect
    if (typewriterElement) {
        setTimeout(typeWriter, 1000);
    }

    /* -----------------------------------------------
       Mobile Navigation
    ----------------------------------------------- */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    /* -----------------------------------------------
       Active Link on Scroll
    ----------------------------------------------- */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* -----------------------------------------------
       Stats Counter Animation
    ----------------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    let hasAnimatedStats = false;
    let hasAnimatedSkills = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // The lower the slower

            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20); // ms
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    /* -----------------------------------------------
       Circular Skills Rendering & Animation
    ----------------------------------------------- */
    const skillsData = [
        { name: 'HTML5', percent: 85, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' },
        { name: 'CSS3', percent: 80, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' },
        { name: 'Javascript', percent: 60, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' },
        { name: 'PHP / MySQL', percent: 40, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' },
        { name: 'Photoshop', percent: 70, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' },
        { name: 'Illustrator', percent: 50, desc: 'Lorem ipsum dolor sit amet consectetur elit sed' }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    const renderSkills = () => {
        if (!skillsGrid) {
            console.error("Skills grid not found!"); // Debugging help
            return;
        }

        let html = '';
        skillsData.forEach(skill => {
            html += `
            <div class="skill-item">
                <div class="circular-progress" data-percent="${skill.percent}">
                    <svg class="progress-ring" width="140" height="140">
                        <circle class="progress-ring__bg" stroke="#f0f0f0" stroke-width="10" fill="transparent" r="60" cx="70" cy="70"/>
                        <circle class="progress-ring__circle" stroke="#0072ff" stroke-width="10" fill="transparent" r="60" cx="70" cy="70"/>
                    </svg>
                    <span class="percentage-text">${skill.percent}%</span>
                </div>
                <h4>${skill.name}</h4>
                <p>${skill.desc}</p>
            </div>
            `;
        });

        skillsGrid.innerHTML = html;

        // Initial setup for new circles
        const circles = document.querySelectorAll('.progress-ring__circle');
        circles.forEach(circle => {
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = circumference;
        });
    };

    // Render immediately
    renderSkills();

    const animateSkills = () => {
        const circles = document.querySelectorAll('.progress-ring__circle');
        circles.forEach(circle => {
            const container = circle.closest('.circular-progress');
            const percent = container.getAttribute('data-percent');
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        });
    };

    // Use Intersection Observer for triggering animation
    const statsSection = document.getElementById('stats');
    const skillsSection = document.getElementById('skills');

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                animateCounters();
                hasAnimatedStats = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedSkills) {
                animateSkills();
                hasAnimatedSkills = true;
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

});
