document.addEventListener('DOMContentLoaded', () => {
    // Inicializaciones Globales Requeridas
    initMenuMobile();
    initCarousels();
    initGalleryModal();
    initScrollRevelations();
});

/* ==========================================================================
   1. SISTEMA DE REVELACIÓN CINEMÁTICA ASIMÉTRICA INFINITA
   ========================================================================== */
function initScrollRevelations() {
    // Grillas de tarjetas con lógica cíclica de 3 elementos (Izquierda - Sube - Derecha)
    const tripleGrids = document.querySelectorAll('.oferta-cards-grid, .docentes-grid');
    
    tripleGrids.forEach(grid => {
        const cards = grid.children;
        Array.from(cards).forEach((card, index) => {
            card.classList.add('scroll-animate');
            const position = index % 3;
            
            if (position === 0) {
                card.classList.add('fade-left');
            } else if (position === 1) {
                card.classList.add('fade-up');
            } else if (position === 2) {
                card.classList.add('fade-right');
            }
        });
    });

    // Grilla específica de Infraestructura (4 elementos equilibrados)
    const infraItems = document.querySelectorAll('.infra-item');
    infraItems.forEach((item, index) => {
        item.classList.add('scroll-animate');
        if (index === 0) {
            item.classList.add('fade-left');
        } else if (index === infraItems.length - 1) {
            item.classList.add('fade-right');
        } else {
            item.classList.add('fade-up'); // Los dos bloques del centro suben ordenadamente
        }
    });

    // Captura unificada de los elementos a animar bajo demanda del viewport
    const animatedElements = document.querySelectorAll(
        '.scroll-animate, .nosotros-rhetoric-bg, .mv-box, .modelo-box, .galeria-item, .contacto-card-wrapper, .datos-wrapper'
    );
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "-10px 0px -30px 0px",
        threshold: 0.05
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.requestAnimationFrame(() => {
                    entry.target.classList.add('active');
                });
            } else {
                window.requestAnimationFrame(() => {
                    entry.target.classList.remove('active');
                });
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => intersectionObserver.observe(element));
}

/* ==========================================================================
   2. CONTROL DE NAVEGACIÓN Y MENÚ MÓVIL
   ========================================================================== */
function initMenuMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });

    // Control del botón Volver Arriba Y la clase Scrolled del Header
    const btnBackToTop = document.getElementById('btn-back-to-top');
    const header = document.querySelector('.header-premium'); // Seleccionamos el header

    window.addEventListener('scroll', () => {
        // 1. Lógica para el botón "Volver Arriba"
        if (window.scrollY > 400) {
            btnBackToTop.style.display = 'flex'; // Cambié a flex para que respete tu CSS
        } else {
            btnBackToTop.style.display = 'none';
        }

        // 2. Lógica para la clase "scrolled" del Header (NUEVO)
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ==========================================================================
   3. AUTOMATIZACIÓN DE CARRUSELES INTERNOS
   ========================================================================== */
function initCarousels() {
    const tracks = document.querySelectorAll('.card-carousel-track');
    
    tracks.forEach(track => {
        const slides = track.querySelectorAll('.card-slide');
        if (slides.length <= 1) return;

        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 3500); // Rotación fluida cada 3.5 segundos
    });
}

/* ==========================================================================
   4. MODAL EXPANDIBLE DE GALERÍA DE IMÁGENES
   ========================================================================== */
function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('img-expanded');
    const closeBtn = document.querySelector('.g-close');
    const bentoImages = document.querySelectorAll('.galeria-img-mock');

    if (!modal || !modalImg) return;

    bentoImages.forEach(imgBox => {
        imgBox.addEventListener('click', () => {
            const bgUrl = window.getComputedStyle(imgBox).backgroundImage;
            const cleanUrl = bgUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            modalImg.src = cleanUrl;
            document.body.style.overflow = 'hidden'; // Detiene scroll de fondo
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}