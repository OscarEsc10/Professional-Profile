document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todas las tarjetas de habilidades
    const skillCards = document.querySelectorAll('.skill-card');

    //Dynamic messages for each skill
    const dynamicMessages = {
        python: 'Data analysis with Pandas and automate complex tasks in seconds!',
        excel: 'Turn data into valuable insights with pivot tables, formulas, and Excel automation!',
        tailwind: 'Build modern and responsive interfaces in record time using Tailwind CSS utilities!',
        html: 'Build the structure of the web with HTML5 and bring your ideas to life!',
        css: 'Bring style and life to your projects with animations and responsive designs in CSS!',
        powerbi: 'Visualize and explore your data like never before with interactive dashboards in Power BI!',
        postgres: 'Manage and query robust, secure databases with PostgreSQL!',
        english: 'English level: A2. Constantly learning and improving every day!'
    };

    // Permitir abrir/cerrar cada tarjeta de habilidad de forma independiente
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            // Eliminar mensaje solo de la tarjeta actual
            const msg = card.querySelector('.dynamic-message');
            if (msg) msg.remove();
            // Alternar estado activo
            if (isActive) {
                card.classList.remove('active');
            } else {
                card.classList.add('active');
                const skill = card.getAttribute('data-skill');
                if (dynamicMessages[skill]) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'dynamic-message';
                    messageDiv.textContent = dynamicMessages[skill];
                    card.querySelector('h3').after(messageDiv);
                    setTimeout(() => {
                        messageDiv.classList.add('show');
                    }, 10);
                }
            }
        });
    });

    // Animación de entrada para las barras de progreso
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.style.width;
                }
            }
        });
    }, observerOptions);

    // Observar cada tarjeta de habilidad
    skillCards.forEach(card => {
        observer.observe(card);
    });



    // Función para scroll suave mejorado
    const smoothScroll = (targetElement) => {
        const headerOffset = 70; // Altura del navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Configuración de la animación
        const duration = 1000; // Duración en milisegundos
        const start = window.pageYOffset;
        const distance = offsetPosition - start;
        let startTime = null;

        // Función de animación
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Función de easing para movimiento más suave
            const easeInOutCubic = (t) => {
                return t < 0.5 
                    ? 4 * t * t * t 
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            window.scrollTo(0, start + distance * easeInOutCubic(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Agregar clase activa al enlace clickeado
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                // Efecto de desvanecimiento en la sección actual
                const currentSection = document.querySelector('.section.active');
                if (currentSection) {
                    currentSection.style.opacity = '0';
                    currentSection.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        currentSection.classList.remove('active');
                    }, 300);
                }

                // Activar la nueva sección
                setTimeout(() => {
                    targetElement.style.opacity = '0';
                    targetElement.style.transform = 'translateY(20px)';
                    targetElement.classList.add('active');
                    requestAnimationFrame(() => {
                        targetElement.style.opacity = '1';
                        targetElement.style.transform = 'translateY(0)';
                    });
                }, 300);

                // Iniciar el scroll suave
                smoothScroll(targetElement);
            }
        });
    });

    // Observador de intersección para las secciones
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-70px 0px 0px 0px'
    });

    // Observar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Funcionalidad de cambio de tema
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Actualizar el tema
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Actualizar el ícono
        updateThemeIcon(newTheme);

        // Agregar animación al botón
        themeToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 200);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}); 