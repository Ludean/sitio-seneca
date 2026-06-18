 // 1. INICIALIZACIÓN AUTOMÁTICA DE CARRUSELES
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

        // 2. CONTROL DEL BOTÓN "IR ARRIBA" (SCROLL TO TOP)
        const topBtn = document.getElementById("btn-back-to-top");

        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            // Muestra el botón si el scroll pasa de 400px
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
// --- FUNCIONALIDAD DEL MENÚ HAMBURGUESA EN MÓVILES ---
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    // Abre o cierra el menú al hacer clic en las 3 barras
    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });

    // Cierra el menú automáticamente cuando el usuario hace clic en una opción (Inicio, Nosotros, etc.)
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navMenu.classList.remove("active");
        });
    });
});