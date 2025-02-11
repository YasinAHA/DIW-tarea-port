document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        once: false,
        disable: window.innerWidth <= 768
    });

    const animateBars = () => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, 100); // Pequeño retraso para que el reinicio sea visible
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
                //observer.unobserve(entry.target); // Dejar de observar después de ejecutar
            } else {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    bar.style.width = 0;
                });
            }
        });
    }, { threshold: 0.5 }); // Dispara cuando al menos el 50% del elemento es visible


    if (!(window.innerWidth < 768)) {
        observer.observe(document.querySelector('#about'));
    } else {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Modo oscuro 
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = document.getElementById('dark-mode-icon');

    // Verificar si el usuario ya ha activado el modo oscuro antes
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Alternar el modo oscuro al hacer clic
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

   /*  const ajustarContainer = () => {
        const container = document.getElementById('menu');

        if (container) { // Verifica que el elemento existe antes de manipularlo
            container.classList.toggle("container-fluid", window.matchMedia("(max-width: 768px)").matches);
            container.classList.toggle("container", !window.matchMedia("(max-width: 768px)").matches);
        }
    }

    // Ejecutar en la carga de la página
    ajustarContainer();

    // Ejecutar cuando cambia el tamaño de la ventana
    window.addEventListener("resize", ajustarContainer); */

    const form = document.querySelector('form.needs-validation');  // Selecciona el formulario

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        });
    }


    // Año actual
    document.getElementById("year").textContent = (new Date()).getFullYear();

});
