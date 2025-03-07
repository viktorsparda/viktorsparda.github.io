document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const contactForm = document.getElementById('contact-form');

    // Variables
    let currentSlide = 0;
    let autoSlideInterval;

    // Función para el Menú Responsivo
    function toggleMenu() {
        navbar.classList.toggle('active');
    }

    // Inicializar Menú
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú cuando se hace clic en un enlace
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

    // Función para cambiar de slide
    function goToSlide(slideIndex) {
        // Eliminar clase active de todos los slides e indicadores
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Añadir clase active al slide e indicador actual
        slides[slideIndex].classList.add('active');
        indicators[slideIndex].classList.add('active');

        // Actualizar currentSlide
        currentSlide = slideIndex;
    }

    // Función para ir al slide anterior
    function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        goToSlide(newIndex);
    }

    // Función para ir al slide siguiente
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        goToSlide(newIndex);
    }

    // Inicializar Carrusel
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Añadir eventos a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // Función para autoplay del carrusel
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambiar de slide cada 5 segundos
    }

    // Resetear el intervalo de autoplay
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Iniciar autoplay al cargar la página
    startAutoSlide();

    // Detener autoplay cuando el mouse está sobre el carrusel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Reanudar autoplay cuando el mouse sale del carrusel
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Añadir funcionalidad de swipe para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Umbral mínimo para considerar un swipe

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe a la izquierda (siguiente slide)
            nextSlide();
            resetAutoSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe a la derecha (slide anterior)
            prevSlide();
            resetAutoSlide();
        }
    }

    // Validaciones del Formulario de Contacto
    function mostrarError(campo, mensaje) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '0.8em';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = mensaje;

        // Eliminar mensajes de error anteriores
        const errorAnterior = campo.nextElementSibling;
        if (errorAnterior && errorAnterior.classList.contains('error-message')) {
            errorAnterior.remove();
        }

        // Insertar el mensaje de error después del campo
        campo.insertAdjacentElement('afterend', errorElement);
    }

    function eliminarError(campo) {
        const errorAnterior = campo.nextElementSibling;
        if (errorAnterior && errorAnterior.classList.contains('error-message')) {
            errorAnterior.remove();
        }
    }

    function validarCampo(campo, validacion, mensajeError) {
        let esValido = validacion(campo.value);

        if (!esValido) {
            campo.classList.add('invalid');
            mostrarError(campo, mensajeError);
        } else {
            campo.classList.remove('invalid');
            eliminarError(campo);
        }

        return esValido;
    }

    const validaciones = {
        nombre: value => value.trim().length >= 3, // Nombre debe tener al menos 3 caracteres
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Formato de email válido
        telefono: value => /^\d{10}$/.test(value), // Teléfono debe tener exactamente 10 dígitos
        mensaje: value => value.trim().length >= 10 // Mensaje debe tener al menos 10 caracteres
    };

    const mensajesError = {
        nombre: 'El nombre debe tener al menos 3 caracteres.',
        email: 'Por favor, ingresa un correo electrónico válido.',
        telefono: 'El teléfono debe tener exactamente 10 dígitos.',
        mensaje: 'El mensaje debe tener al menos 10 caracteres.'
    };

    // Validar al enviar el formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('name');
        const email = document.getElementById('email');
        const telefono = document.getElementById('phone');
        const mensaje = document.getElementById('message');

        const nombreValido = validarCampo(nombre, validaciones.nombre, mensajesError.nombre);
        const emailValido = validarCampo(email, validaciones.email, mensajesError.email);
        const telefonoValido = validarCampo(telefono, validaciones.telefono, mensajesError.telefono);
        const mensajeValido = validarCampo(mensaje, validaciones.mensaje, mensajesError.mensaje);

        if (nombreValido && emailValido && telefonoValido && mensajeValido) {
        alert('¡Mensaje enviado con éxito!'); // Mensaje de éxito
        contactForm.reset();
    } else {
        alert('Por favor, corrige los errores antes de continuar.'); // Mensaje de error general
    }
});

    // Validar campos mientras el usuario escribe
    document.getElementById('name').addEventListener('input', function() {
        validarCampo(this, validaciones.nombre, mensajesError.nombre);
    });

    document.getElementById('email').addEventListener('input', function() {
        validarCampo(this, validaciones.email, mensajesError.email);
    });

    document.getElementById('phone').addEventListener('input', function() {
        validarCampo(this, validaciones.telefono, mensajesError.telefono);
    });

    document.getElementById('message').addEventListener('input', function() {
        validarCampo(this, validaciones.mensaje, mensajesError.mensaje);
    });
});



document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', function () {
        let overlay = document.querySelector('.overlay');

        // Si no existe el overlay, lo creamos
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
        }

        // Mostramos el overlay
        overlay.style.display = 'block';

        // Expandimos la imagen
        this.classList.add('expanded');

        // Función para cerrar la imagen
        const closeImage = () => {
            image.classList.remove('expanded');
            overlay.style.display = 'none';
        };

        // Agregar evento al overlay para cerrar la imagen
        overlay.onclick = closeImage;

        // Para evitar que al hacer clic en la imagen se cierre inmediatamente
        setTimeout(() => {
            image.onclick = () => {
                closeImage();
                // Evitar que el clic en la imagen deshabilite futuras expansiones
                setTimeout(() => {
                    image.onclick = null; // Restauramos el evento inicial
                }, 100);
            };
        }, 100);
    });
});

