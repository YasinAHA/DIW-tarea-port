document.addEventListener('DOMContentLoaded', function () {
    // Inicialización de AOS (Animaciones al hacer scroll)
    AOS.init({
        once: false,
        disable: window.innerWidth <= 768
    });

    // Animación de las barras de progreso
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
            } else {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    bar.style.width = 0;
                });
            }
        });
    }, { threshold: 0.5 });

    if (!(window.innerWidth < 768)) {
        if (document.querySelector('#about')) {
            observer.observe(document.querySelector('#about'));
        }
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

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

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

    // Formulario de contacto con simulación de API
    const form = document.querySelector('form.needs-validation');

    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                const name = document.getElementById("name").value;
                const email = document.getElementById("email").value;
                const message = document.getElementById("message").value;

                fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        
                        document.getElementById("modalMessage").textContent = "Mensaje enviado correctamente.";
                        
                        // Inicializar y mostrar el modal
                        const modal = document.getElementById("responseModal");
                        const modalInstance = new bootstrap.Modal(modal);

                        modalInstance.show();
                        modal.removeAttribute("aria-hidden");

                        modal.addEventListener('hidden.bs.modal', () => {
                            modal.setAttribute("aria-hidden", "true");
                        });
                    })
                    .catch(error => {
                        document.getElementById("modalMessage").textContent = "Error al enviar el mensaje.";
                        
                        const modal = document.getElementById("responseModal");
                        const modalInstance = new bootstrap.Modal(modal);

                        modalInstance.show();
                        modal.removeAttribute("aria-hidden");

                        modal.addEventListener('hidden.bs.modal', () => {
                            modal.setAttribute("aria-hidden", "true");
                        });
                    });
            }
            form.classList.add('was-validated');
        });
    }

    // Año actual
    document.getElementById("year").textContent = (new Date()).getFullYear();
});
