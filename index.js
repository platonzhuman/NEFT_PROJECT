// JavaScript для экрана загрузки
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Имитация загрузки
    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Предзагрузка изображений галереи
    const imageUrls = [
        './images/1649.jpg',
        './images/44626.jpg', 
        './images/5377.jpg',
        './images/krasivyi-naturmort-s-vodoi.jpg',
        './images/krasivyi-zakat-nad-neftanym-mestorozdeniem-s-domkratom.jpg',
        './images/pole-s-domkratami-neftanyh-nasosov-v-okruzenii-zeleni-pod-pasmurnym-nebom-i-solnecnym-svetom.jpg',
        './images/pole-s-domkratami-neftanyh-nasosov-v-okruzenii-zeleni-pod-solnecnym-svetom.jpg',
        './images/siluet-maslanogo-nasosa-noc-u.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
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
    
    // JavaScript для формы обратной связи
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Не указан',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString('ru-RU')
        };
        
        try {
            // Отправляем данные на EmailJS
            await sendEmail(formData);
            
            // Показываем сообщение об успехе
            showMessage('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Очищаем форму
            contactForm.reset();
            
        } catch (error) {
            // Показываем сообщение об ошибке
            console.error('Ошибка отправки:', error);
            showMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.', 'error');
        } finally {
            // Скрываем индикатор загрузки
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Функция отправки email через EmailJS
    async function sendEmail(formData) {
        const serviceID = 'service_z9m4oa5'; // Ваш Service ID
        const templateID = 'template_qvzrofn'; // Ваш Template ID
        
        const templateParams = {
            to_email: 'pzhuman@inbox.ru',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            timestamp: formData.timestamp
        };
        
        return emailjs.send(serviceID, templateID, templateParams);
    }

    // Функция показа сообщений
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Автоматически скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Добавляем плавающие labels для полей формы
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        
        // Проверяем, есть ли уже значение при загрузке
        if (input.value) {
            group.querySelector('label').classList.add('active');
        }
        
        input.addEventListener('focus', function() {
            group.querySelector('label').classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                group.querySelector('label').classList.remove('active');
            }
        });
    });
});
// ФИКС ДЛЯ SAFARI - добавьте в конец index.js
function fixSafariIssues() {
    // Исправление анимации галереи в Safari
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const text = item.querySelector('.gallery-text');
        
        // Принудительно устанавливаем начальное состояние
        text.style.transform = 'translateY(100%)';
        text.style.transition = 'transform 0.4s ease';
        
        item.addEventListener('mouseenter', function() {
            text.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            text.style.transform = 'translateY(100%)';
        });
    });
    
    // Оптимизация загрузки изображений
    function optimizeImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Добавляем lazy loading
            img.setAttribute('loading', 'lazy');
            
            // Оптимизируем размеры
            if (img.naturalWidth > 800) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
        
        // Для background images в галерее
        const galleryImages = document.querySelectorAll('.gallery-image');
        galleryImages.forEach(bgImg => {
            const bgUrl = bgImg.style.backgroundImage.replace('url("', '').replace('")', '');
            if (bgUrl) {
                // Создаем предзагрузчик для background images
                const preloader = new Image();
                preloader.src = bgUrl;
                preloader.onload = function() {
                    // Изображение загружено, можно применять
                    bgImg.style.backgroundImage = `url(${bgUrl})`;
                };
            }
        });
    }
    
    // Запускаем оптимизацию после полной загрузки страницы
    window.addEventListener('load', optimizeImageLoading);
}

// Вызываем функцию исправлений
fixSafariIssues();