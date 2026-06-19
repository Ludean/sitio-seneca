// ==========================================================================
// 1. INICIALIZACIÓN AUTOMÁTICA DE CARRUSELES PREMIUM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll('.card-carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.card-carousel-track');
        const slidesCount = track.children.length;
        
        // Solo inyectar botones si el elemento tiene más de una imagen
        if (slidesCount > 1) {
            carousel.setAttribute('data-index', '0');
            
            const btnPrev = document.createElement('button');
            btnPrev.className = 'card-carousel-btn prev';
            btnPrev.innerHTML = '‹';
            btnPrev.onclick = () => moveCardSlide(carousel, -1);
            
            const btnNext = document.createElement('button');
            btnNext.className = 'card-carousel-btn next';
            btnNext.innerHTML = '›';
            btnNext.onclick = () => moveCardSlide(carousel, 1);
            
            carousel.appendChild(btnPrev);
            carousel.appendChild(btnNext);
        }
    });
});

// Función Maestra para desplazar los Carruseles internos
function moveCardSlide(carousel, direction) {
    const track = carousel.querySelector('.card-carousel-track');
    const slidesCount = track.children.length;
    
    let currentIndex = parseInt(carousel.getAttribute('data-index')) || 0;
    
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = slidesCount - 1;
    } else if (currentIndex >= slidesCount) {
        currentIndex = 0;
    }
    
    carousel.setAttribute('data-index', currentIndex);
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// ==========================================================================
// 2. CONTROL DEL BOTÓN "IR ARRIBA" (SCROLL TO TOP)
// ==========================================================================
const topBtn = document.getElementById("btn-back-to-top");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================================================
// 3. FUNCIONALIDAD DEL MENÚ HAMBURGUESA EN MÓVILES
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navMenu.classList.remove("active");
        });
    });
});

// ==========================================================================
// 4. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Apuntamos a todos los componentes que queremos elevar dinámicamente
    const elementsToAnimate = document.querySelectorAll('.infra-item, .docente-card, .vida-card, .oferta-card, .mv-box, .modelo-box');
    
    elementsToAnimate.forEach(el => el.classList.add('scroll-animate'));

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.12 // Se activa cuando asoma el 12% del componente
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target); // Evita repetir la animación
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        scrollObserver.observe(element);
    });
});

// ==========================================================================
// 5. SEGUIMIENTO DE MENÚ ACTIVO SEGÚN EL SCROLL
// ==========================================================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 220)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});