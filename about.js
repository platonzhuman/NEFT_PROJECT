// JavaScript для экрана загрузки
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Быстрая загрузка - убираем экран через 1 секунду
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
    
    // JavaScript для выпадающих меню в футере на ПК
    const footerMenus = document.querySelectorAll('.footer-menu');
    
    // Для ПК добавляем обработчики наведения
    if (window.innerWidth > 768) {
        footerMenus.forEach(menu => {
            menu.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            menu.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // JavaScript для мобильного футера
    const mobileFooterToggle = document.querySelector('.mobile-footer-toggle');
    const mobileFooterOverlay = document.querySelector('.mobile-footer-overlay');
    const mobileFooterMenu = document.querySelector('.mobile-footer-menu');
    const mobileFooterClose = document.querySelector('.mobile-footer-close');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    // Открытие мобильного меню
    if (mobileFooterToggle) {
        mobileFooterToggle.addEventListener('click', function() {
            mobileFooterOverlay.classList.add('active');
            mobileFooterMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Закрытие мобильного меню
    function closeMobileMenu() {
        mobileFooterOverlay.classList.remove('active');
        mobileFooterMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileFooterClose) {
        mobileFooterClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileFooterOverlay) {
        mobileFooterOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Закрытие меню при клике на пункт
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Предотвращаем закрытие при клике на само меню
    if (mobileFooterMenu) {
        mobileFooterMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        // Закрываем мобильное меню при переходе на ПК версию
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Анимация счетчиков
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 секунды
            const step = target / (duration / 16); // 60 FPS
            
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Запускаем анимацию счетчиков когда они появляются в viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Исправление для Safari - альтернативная анимация для галереи
function fixSafariGallery() {
    // Эта функция будет вызываться из index.js для исправления галереи
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Альтернативный подход для Safari
        item.addEventListener('mouseenter', function() {
            const text = this.querySelector('.gallery-text');
            text.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            const text = this.querySelector('.gallery-text');
            text.style.transform = 'translateY(100%)';
        });
    });
}