document.addEventListener("DOMContentLoaded", function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });
    
    // Navigation active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate toggle button
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Typing effect
    const textArray = [
        "🔥 Pre-final Year Student",
        "🧩 Problem Solver",
        "🚀 Full-Stack Enthusiast",
        "💻 Love for Coding"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector("#typing-text");
    
    function typeEffect() {
        let currentText = Array.from(textArray[textIndex]);
        let displayText = currentText.slice(0, charIndex).join("");
        
        typingElement.innerHTML = displayText;
        
        if (!isDeleting) {
            if (charIndex < currentText.length) {
                charIndex++;
                setTimeout(typeEffect, 100);
            } else {
                isDeleting = true;
                setTimeout(typeEffect, 1000);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                setTimeout(typeEffect, 500);
            }
        }
    }
    
    setTimeout(typeEffect, 500);
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            function updateStat() {
                const currentTime = Date.now();
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                const value = Math.floor(progress * target);
                stat.textContent = value;
                
                if (progress < 1) {
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = target;
                }
            }
            
            updateStat();
        });
    }
    
    // Initialize stats animation when the stats section is in view
    const aboutSection = document.querySelector('#about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
    
    // Experience & Education tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Project filter and pagination
    const projects = [
        {
            title: "Digital Learning for Disabilities",
            img: "Screenshot (104).png",
            desc: "An AI-powered web application designed to assist individuals with disabilities in learning through gesture recognition, voice commands, and an AI tutor. Developed during the MKCE Karur Hackathon to make education more interactive, accessible, and fun for everyone!",
            tags: ["HTML", "CSS", "JavaScript", "Python", "Django"],
            live: "https://github.com/Abishekkhanna/Digital-Learning-for-Disabilities",
            github: "https://github.com/Abishekkhanna/Digital-Learning-for-Disabilities",
            category: "AI & Accessibility"
        },
        { 
            title: "Smart Library Management System", 
            img: "Screenshot (2).png", 
            desc: "An AI-powered library management system using image processing for book recognition.", 
            tags: ["Python", "OpenCV", "Image Processing"], 
            live: "https://github.com/Abishekkhanna/Smart-Library-Management-System", 
            github: "https://github.com/Abishekkhanna/Smart-Library-Management-System",
            category: "app"
        },
        { 
            title: "ATM Machine", 
            img: "atm.jpg", 
            desc: "An ATM Machine System in Java enables users to authenticate via PIN, check balance, withdraw, deposit, transfer funds, and view a mini statement.", 
            tags: ["JAVA", "OOPS", "Interface"], 
            live: "https://github.com/Abishekkhanna/ATM_Machine_Java", 
            github: "https://github.com/Abishekkhanna/ATM_Machine_Java",
            category: "Programming"
        },
        { 
            title: "To Do Task Manager", 
            img: "image.png", 
            desc: "A task management system allowing users to add, edit, and track their to-do items.", 
            tags: ["HTML", "CSS", "JS"], 
            live: "https://abishekkhanna.github.io/To-Do-Task-Manager/", 
            github: "https://github.com/Abishekkhanna/To-Do-Task-Manager",
            category: "web"
        },
        { 
            title: "Guess The Number", 
            img: "Screenshot (94).png", 
            desc: "A fun number guessing game where users try to predict the correct number within a limited number of attempts.", 
            tags: ["HTML", "CSS", "JS"], 
            live: "https://abishekkhanna.github.io/Guess-The-Number-using-JS/", 
            github: "https://github.com/Abishekkhanna/Guess-The-Number-using-JS",
            category: "web"
        },
        { 
            title: "Tic Tac Toe", 
            img: "download.png", 
            desc: "A classic Tic Tac Toe game implemented with an AI opponent using dynamic programming.", 
            tags: ["Java", "Dynamic Programming"], 
            live: "https://github.com/Abishekkhanna/Tic-Tac-Toe-Game-using-Java", 
            github: "https://github.com/Abishekkhanna/Tic-Tac-Toe-Game-using-Java",
            category: "app"
        },
        { 
            title: "Restaurant Website", 
            img: "Screenshot (85).png", 
            desc: "A responsive restaurant website showcasing the menu, services, and contact details.", 
            tags: ["HTML", "CSS"], 
            live: "https://abishekkhanna.github.io/Restaurant-Website-using-HTML-CSS-/", 
            github: "https://github.com/Abishekkhanna/Restaurant-Website-using-HTML-CSS-",
            category: "web"
        },
        { 
            title: "Restaurant Website", 
            img: "Screenshot.png", 
            desc: "A fully responsive restaurant website with React Router for seamless navigation.", 
            tags: ["HTML", "CSS", "JS", "React JS", "Router"], 
            live: "https://abishekkhanna.github.io/React-project-pushed-using-Git/", 
            github: "https://github.com/Abishekkhanna/React-project-pushed-using-Git",
            category: "web"
        },
        { 
            title: "Furniture Store Website", 
            img: "Screenshot (95).png", 
            desc: "An online furniture store website displaying a variety of furniture collections.", 
            tags: ["HTML", "CSS", "JS"], 
            live: "https://abishekkhanna.github.io/Furniture-Website/", 
            github: "https://github.com/Abishekkhanna/Furniture-Website",
            category: "web"
        },
        { 
            title: "Landing Page", 
            img: "Screenshot (96).png", 
            desc: "A beautifully designed landing page for business promotion and lead generation.", 
            tags: ["HTML", "CSS", "JS"], 
            live: "https://abishekkhanna.github.io/Landing-Page---Codsoft/", 
            github: "https://github.com/Abishekkhanna/Landing-Page---Codsoft",
            category: "web"
        },
        { 
            title: "Lab Assistant ChatBot", 
            img: "chatbot.png", 
            desc: "An AI-powered chatbot designed for laboratory assistants to answer queries.", 
            tags: ["Python", "Jupyter Notebook", "Gradio"], 
            live: "", 
            github: "",
            category: "other"
        },
        { 
            title: "Calculator", 
            img: "Screenshot (97).png", 
            desc: "A simple and interactive calculator for performing basic arithmetic operations.", 
            tags: ["HTML", "CSS", "JS"], 
            live: "https://abishekkhanna.github.io/Calculator---Codsoft/", 
            github: "https://github.com/Abishekkhanna/Calculator---Codsoft",
            category: "web"
        },
        { 
            title: "Portfolio", 
            img: "Screenshot (98).png", 
            desc: "A personal portfolio website showcasing projects and skills.", 
            tags: ["HTML", "CSS"], 
            live: "https://abishekkhanna.github.io/Portfolio---Codsoft/", 
            github: "https://github.com/Abishekkhanna/Portfolio---Codsoft",
            category: "web"
        },
        { 
            title: "Personal Portfolio Single Page", 
            img: "Screenshot (99).png", 
            desc: "A single-page personal portfolio website with smooth scrolling and animations.", 
            tags: ["HTML", "CSS"], 
            live: "https://abishekkhanna.github.io/Personal-portfolio-Single-Page/", 
            github: "https://github.com/Abishekkhanna/Personal-portfolio-Single-Page",
            category: "web"
        }
    ];
    
    const itemsPerPage = 6;
    let currentPage = 1;
    let currentFilter = 'all';
    
    function displayProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        // Filter projects
        let filteredProjects = projects;
        if (currentFilter !== 'all') {
            filteredProjects = projects.filter(project => project.category === currentFilter);
        }
        
        // Calculate pagination
        const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
        
        // Display projects
        paginatedProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.img}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Update pagination
        setupPagination(totalPages);
    }
    
    function setupPagination(totalPages) {
        const paginationWrapper = document.getElementById('pagination-wrapper');
        paginationWrapper.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            
            if (i === currentPage) {
                button.classList.add('active');
            }
            
            button.addEventListener('click', () => {
                currentPage = i;
                displayProjects();
                
                // Scroll to projects section
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            paginationWrapper.appendChild(button);
        }
    }
    
    // Initialize projects
    displayProjects();
    
    // Set up project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            currentPage = 1;
            displayProjects();
        });
    });
    
    // Resume download button
    document.getElementById('downloadBtn').addEventListener('click', function(e) {
        e.preventDefault();
        
        const button = this;
        button.classList.add('loading');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        
        // Simulate download delay
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'Abishek_Khanna_Resume.pdf'; // Replace with actual resume path
            link.download = 'Abishek_Khanna_Resume.pdf';
            link.click();
            
            button.classList.remove('loading');
            button.innerHTML = '<i class="fas fa-download"></i> Download CV';
        }, 1500);
    });
    
    // Handle nav resume button
    document.getElementById('navResumeBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('downloadBtn').click();
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        // Add form validation and submission logic here if needed
        // This will be handled by getform.io as specified in the form action
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate on scroll (simple implementation)
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .stat-card, .timeline-item, .project-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(-10)';
            }
        });
    }
    
    // Initialize elements with starting animation state
    document.querySelectorAll('.skill-card, .stat-card, .timeline-item, .project-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call once on load and then on scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});  