// Script principal para ArtePapel
document.addEventListener("DOMContentLoaded", function() {
    // Atualiza o ano no footer
    document.getElementById("current-year").textContent = new Date().getFullYear();
    
    // Navegação fixa e efeito de scroll
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
        
        // Animação de elementos ao scroll
        animateOnScroll();
    });
    
    // Menu mobile toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Rolagem suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Carrega os produtos dinamicamente
    loadProducts();
    
    // Carrega a galeria dinamicamente
    loadGallery();
    
    // Inicializa o slider de depoimentos
    initTestimonialSlider();
    
    // Validação de formulário
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showAlert('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Por favor, insira um endereço de e-mail válido.', 'error');
                return;
            }
            
            // Simulação de envio de formulário
            showAlert('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        });
    }
    
    // Inicializa animações
    animateOnScroll();
});

// Função para carregar produtos
function loadProducts() {
    const products = [
        {
            name: "Papelaria Personalizada",
            description: "Materiais de papelaria exclusivos para sua marca ou evento",
            image: "img/produtos/incone_papelaria_personalizada.jpg"
        },
        {
            name: "Impressos Gráficos",
            description: "Soluções completas de impressão com alta qualidade",
            image: "img/produtos/icone_impressos_graficos.jpeg"
        },
        {
            name: "Embalagens Criativas",
            description: "Embalagens que destacam seu produto no mercado",
            image: "img/produtos/incone_embalagens_criativas.jpg"
        },
        {
            name: "Convites Especiais",
            description: "Convites personalizados para todos os tipos de eventos",
            image: "img/imagem4_convites_personalisados.jpg"
        }
    ];
    
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <a href="#contact" class="btn btn-outline">Solicitar Orçamento</a>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }
}

// Função para carregar galeria
function loadGallery() {
    const galleryItems = [
        { img: "img/imagem2_convite_casamento.jpg", caption: "Convite de Casamento" },
        { img: "img/imagem2_caderno_artesanal.jpg", caption: "Caderno Artesanal" },
        { img: "img/imagem3_embalagens_personalizadas.jpg", caption: "Embalagens Personalizadas" },
        { img: "img/imagem4_convites_personalisados.jpg", caption: "Convites Personalizados" },
        { img: "img/imagem1_convite_infantil.png", caption: "Convite Infantil" },
        { img: "img/imagem5_tecnologia_qualidade.jpg", caption: "Tecnologia e Qualidade" }
    ];
    
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        
        galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${item.img}" alt="${item.caption}">
                <div class="gallery-caption">
                    <h3>${item.caption}</h3>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Função para inicializar slider de depoimentos
function initTestimonialSlider() {
    const testimonials = [
        {
            text: "A ArtePapel superou todas as minhas expectativas! Os convites para meu casamento ficaram perfeitos e todos os convidados elogiaram.",
            name: "Monica",
            title: "Cliente Satisfeita",
            image: "img/avatars/avatar1Monica.jpg"
        },
        {
            text: "Excelente atendimento e produtos de alta qualidade. As embalagens personalizadas para minha loja online fizeram toda a diferença nas vendas.",
            name: "Magali",
            title: "Empreendedora",
            image: "img/avatars/avatar2Magali.jpg"
        },
        {
            text: "Profissionalismo e criatividade definem a ArtePapel. Recomendo para todos que buscam materiais gráficos de qualidade.",
            name: "Milena",
            title: "Designer",
            image: "img/avatars/avatar3milena.jpg"
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            const testimonialItem = document.createElement('div');
            testimonialItem.className = 'testimonial-item';
            testimonialItem.style.display = index === 0 ? 'block' : 'none';
            testimonialItem.dataset.index = index;
            
            testimonialItem.innerHTML = `
                <div class="testimonial-text">
                    <p>"${testimonial.text}"</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                    </div>
                    <div class="author-info">
                        <h4 class="author-name">${testimonial.name}</h4>
                        <p class="author-title">${testimonial.title}</p>
                    </div>
                </div>
            `;
            
            testimonialSlider.appendChild(testimonialItem);
        });
        
        // Adiciona controles de navegação
        const sliderControls = document.createElement('div');
        sliderControls.className = 'slider-controls';
        
        sliderControls.innerHTML = `
            <button class="slider-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
            <div class="slider-dots"></div>
            <button class="slider-next" aria-label="Próximo"><i class="fas fa-chevron-right"></i></button>
        `;
        
        testimonialSlider.appendChild(sliderControls);
        
        // Adiciona pontos indicadores
        const sliderDots = sliderControls.querySelector('.slider-dots');
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.classList.toggle('active', index === 0);
            dot.setAttribute('aria-label', `Depoimento ${index + 1}`);
            dot.dataset.index = index;
            
            sliderDots.appendChild(dot);
        });
        
        // Configura navegação do slider
        let currentIndex = 0;
        
        function showSlide(index) {
            const items = testimonialSlider.querySelectorAll('.testimonial-item');
            const dots = sliderDots.querySelectorAll('.slider-dot');
            
            items.forEach(item => item.style.display = 'none');
            dots.forEach(dot => dot.classList.remove('active'));
            
            items[index].style.display = 'block';
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Event listeners para controles
        sliderControls.querySelector('.slider-prev').addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showSlide(newIndex);
        });
        
        sliderControls.querySelector('.slider-next').addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % testimonials.length;
            showSlide(newIndex);
        });
        
        // Event listeners para pontos
        sliderDots.querySelectorAll('.slider-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                showSlide(index);
            });
        });
        
        // Auto-rotação do slider
        setInterval(() => {
            const newIndex = (currentIndex + 1) % testimonials.length;
            showSlide(newIndex);
        }, 5000);
    }
}

// Função para animar elementos ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar alertas
function showAlert(message, type) {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}

// Função para criar container de alertas
function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container';
    document.body.appendChild(container);
    return container;
}
