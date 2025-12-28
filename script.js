const siteConfig = {
    logo: {
        imageUrl: 'assets/yeditepelogo.png',
        name: 'Yeditepe Laundry',
        tagline: 'Profesyonel Otel Çamaşır Hizmeti',
    },
    heroSlider: [
        'assets/main.jpg',
        'assets/aboutus.jpg',
        'assets/gallery1.jpg',
        'assets/gallery2.jpg',
        'assets/gallery3.jpg',
        'assets/gallery4.jpg', 
        'assets/gallery5.jpg', 
        'assets/gallery11.jpg'
    ],
    aboutSlider: [
        'assets/gallery4.jpg',
        'assets/gallery5.jpg',
        'assets/gallery6.jpg',
        'assets/gallery7.jpg',
        'assets/gallery8.jpg',
        'assets/gallery9.jpg',
        'assets/gallery10.jpg', 
        'assets/gallery12.jpg',
        'assets/gallery11.jpg' 
    ],   
    gallery: {
    images: [
        'assets/gallery1.jpg',
        'assets/gallery2.jpg',
        'assets/gallery3.jpg',
        'assets/gallery4.jpg',
        'assets/gallery5.jpg',
        'assets/gallery6.jpg',
        'assets/gallery7.jpg',
        'assets/gallery8.jpg',
        'assets/gallery9.jpg',
        'assets/gallery10.jpg',
        'assets/gallery11.jpg', 
        'assets/gallery12.jpg' 
    ],
    videos: [
        'assets/galleryvid1.mp4',
        'assets/galleryvid2.mp4',
        'assets/galleryvid3.mp4',
        'assets/galleryvid4.mp4',
        'assets/galleryvid5.mp4',
        'assets/galleryvid6.mp4',
        'assets/galleryvid7.mp4',
        'assets/galleryvid8.mp4',
        'assets/galleryvid9.mp4' 
    ],
    altTexts: {
        images: [
            'Modern Çamaşır Makineleri',
            'Tesisimizden Görüntü',
            'Profesyonel Ekibimiz',
            'Endüstriyel Ekipman',
            'Temizlik Alanımız',
            'Çalışma Prosesi',
            'Kalite Kontrol',
            'Paketleme Alanı',
            'Teslimat Süreci',
            'Müşteri Memnuniyeti',
            'Yeni Tesis Görüntüsü 1', 
            'Yeni Tesis Görüntüsü 2'
        ],
        videos: [
            'Fabrika Turu',
            'Temizlik Süreci',
            'Kalite Kontrol Süreci',
            'Teslimat Süreci',
            'Müşteri Görüşleri',
            'Yeni Video İçeriği'
        ]
    }
},
    business: {
        address: 'İnönü Mah. Dolapdere Cad. No:12 Şişli<br>İstanbul, Türkiye',
        phone: '+90 530 952 86 94',
        fax: '+90 212 232 27 84',
        email: 'yeditepelaundry@gmail.com',
        hours: 'Pazartesi - Cumartesi: 08:00 - 19:00<br>Pazar: 10:00 - 17:00'
    }
};
(function() {
    emailjs.init("jH-KlJ2ffs_lGwfsp"); 
    const SERVICE_ID = "service_4rt2w5g";
    const TEMPLATE_ID = "template_2jf8cvh";
    
    window.emailConfig = {
        serviceId: SERVICE_ID,
        templateId: TEMPLATE_ID,
        receiverEmail: "mondevpro92@gmail.com"
    };
})();
document.addEventListener('DOMContentLoaded', function() {
    applySiteConfiguration();
    initializeSliders();
    initializeLightbox();
    initializeGalleryVisibility();
    initializeScrollAnimations();
    initializeGalleryTabs(); // Add this line

    const isFirstVisit = !localStorage.getItem('yeditepe_visited');
    if (isFirstVisit && window.emailConfig && window.emailConfig.serviceId === "YOUR_SERVICE_ID_HERE") {
        setTimeout(() => {
            showSetupInstructions();
            localStorage.setItem('yeditepe_visited', 'true');
        }, 2000);
    }
});    
    function applySiteConfiguration() {
    const logoIcons = document.querySelectorAll('.logo-icon');     
    logoIcons.forEach(logoIcon => {
        if (logoIcon) {
            // Check if we have an image URL
            if (siteConfig.logo.imageUrl) {
                // Use image logo
                logoIcon.innerHTML = `
                    <img src="${siteConfig.logo.imageUrl}" 
                         alt="${siteConfig.logo.name}" 
                         style="width: auto; height: 60px; object-fit: contain; display: block;">
                `;
            } else if (siteConfig.logo.iconClass) {
                logoIcon.innerHTML = `<i class="${siteConfig.logo.iconClass}" style="font-size: 50px;"></i>`;
            }
        }
    });
    const footerLogoIcon = document.querySelector('.footer-logo .logo-icon');
    if (footerLogoIcon && siteConfig.logo.imageUrl) {
        footerLogoIcon.innerHTML = `
            <img src="${siteConfig.logo.imageUrl}" 
                 alt="${siteConfig.logo.name}" 
                 style="width: auto; height: 60px; object-fit: contain; display: block; filter: brightness(0) invert(1);">
        `;
    } else if (footerLogoIcon && siteConfig.logo.iconClass) {
        footerLogoIcon.innerHTML = `<i class="${siteConfig.logo.iconClass}" style="font-size: 50px; color: white;"></i>`;
    }    
    const logoText = document.querySelector('.logo-text h1');
    const logoTagline = document.querySelector('.logo-text p');
    if (logoText) logoText.textContent = siteConfig.logo.name;
    if (logoTagline) logoTagline.textContent = siteConfig.logo.tagline;
    const footerLogoName = document.querySelector('.footer-logo .logo-text h1');
    const footerLogoTagline = document.querySelector('.footer-logo .logo-text p');
    if (footerLogoName) footerLogoName.textContent = siteConfig.logo.name;
    if (footerLogoTagline) footerLogoTagline.textContent = siteConfig.logo.tagline;
    const heroSliderWrapper = document.getElementById('hero-slider-wrapper');
    if (heroSliderWrapper && siteConfig.heroSlider && siteConfig.heroSlider.length > 0) {
        heroSliderWrapper.innerHTML = '';
        siteConfig.heroSlider.forEach((imageUrl, index) => {
            heroSliderWrapper.innerHTML += `
                <div class="swiper-slide">
                    <img src="${imageUrl}" alt="Yeditepe Laundry ${index + 1}">
                </div>
            `;
        });
    }
    const aboutSliderWrapper = document.getElementById('about-slider-wrapper');
    if (aboutSliderWrapper && siteConfig.aboutSlider && siteConfig.aboutSlider.length > 0) {
        aboutSliderWrapper.innerHTML = '';
        siteConfig.aboutSlider.forEach((imageUrl, index) => {
            aboutSliderWrapper.innerHTML += `
                <div class="swiper-slide">
                    <img src="${imageUrl}" alt="Hakkımızda ${index + 1}">
                </div>
            `;
        });
    }
    const galleryImagesContainer = document.getElementById('gallery-images-container');
    const galleryVideosContainer = document.getElementById('gallery-videos-container');
   if (galleryImagesContainer && siteConfig.gallery.images && siteConfig.gallery.images.length > 0) {
    galleryImagesContainer.innerHTML = '';
    siteConfig.gallery.images.forEach((imageUrl, index) => {
        const altText = siteConfig.gallery.altTexts?.images?.[index] || `Galeri Görseli ${index + 1}`;
        galleryImagesContainer.innerHTML += `
            <div class="gallery-item" data-type="image" data-src="${imageUrl}">
                <img src="${imageUrl}" alt="${altText}">
                <div class="gallery-item-caption">
                    <p>${altText}</p>
                </div>
            </div>
        `;
    });
}
    if (galleryVideosContainer && siteConfig.gallery.videos && siteConfig.gallery.videos.length > 0) {
    galleryVideosContainer.innerHTML = '';
    siteConfig.gallery.videos.forEach((videoUrl, index) => {
        const altText = siteConfig.gallery.altTexts?.videos?.[index] || `Video ${index + 1}`;
        galleryVideosContainer.innerHTML += `
            <div class="gallery-item video-item" data-type="video" data-src="${videoUrl}">
                <video preload="metadata">
                    <source src="${videoUrl}" type="video/mp4">
                    Tarayıcınız video etiketini desteklemiyor.
                </video>
                <div class="gallery-item-caption">
                    <p>${altText}</p>
                </div>
            </div>
        `;
    });
}    
    const contactDetails = document.querySelectorAll('.contact-details p');
    if (contactDetails.length >= 5) {
        contactDetails[0].innerHTML = siteConfig.business.address;
        contactDetails[1].textContent = siteConfig.business.phone;
        contactDetails[2].textContent = siteConfig.business.fax;
        contactDetails[3].textContent = siteConfig.business.email;
        contactDetails[4].innerHTML = siteConfig.business.hours;
    }
    const footerContactItems = document.querySelectorAll('.contact-info-item p');
    if (footerContactItems.length >= 4) {
    }    
    console.log('Site configuration applied successfully!');
}
function initializeSliders() {
    const heroSlider = new Swiper('.hero-slider', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-slider .swiper-pagination',
            clickable: true,
        },
        loop: true,
        speed: 800,
        effect: 'slide',
        slidesPerView: 1,
        spaceBetween: 0,
    });
    
    const aboutSlider = new Swiper('.about-slider', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.about-slider .swiper-pagination',
            clickable: true,
        },
        loop: true,
        speed: 800,
        effect: 'slide',
        slidesPerView: 1,
        spaceBetween: 0,
    });
}
function initializeLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxContent = document.getElementById('lightboxContent');
    const closeLightbox = document.querySelector('.close-lightbox');    
    document.addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;
        const type = galleryItem.getAttribute('data-type');
        const src = galleryItem.getAttribute('data-src');
        lightboxContent.innerHTML = '';
        if (type === 'image') {
            lightboxContent.innerHTML = `<img src="${src}" alt="Galeri Görseli">`;
        } else if (type === 'video') {
            lightboxContent.innerHTML = `
                <video controls autoplay muted playsinline>
                    <source src="${src}" type="video/mp4">
                    Tarayıcınız video etiketini desteklemiyor.
                </video>
            `;
        }     
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    closeLightbox.addEventListener('click', function() {
        closeLightboxModal();
    });
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightboxModal();
        }
    });
    function closeLightboxModal() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        const video = lightboxContent.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
}
           function initializeGalleryVisibility() {
    const galleryLinks = document.querySelectorAll('a[href="#gallery"]');
    const openGalleryLink = document.getElementById('openGalleryLink');
    const galleryContentWrapper = document.getElementById('galleryContentWrapper');
    const galleryMessage = document.getElementById('galleryMessage');
    let galleryOpened = false;
    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openGallery();
        });
    });
    if (openGalleryLink) {
        openGalleryLink.addEventListener('click', function(e) {
            e.preventDefault();
            openGallery();
        });
    }
    function openGallery() {
        if (!galleryOpened) {
            // Scroll to gallery section
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => {
                if (galleryMessage) {
                    galleryMessage.style.opacity = '0';
                    galleryMessage.style.transform = 'translateY(-20px)';
                    galleryMessage.style.transition = 'all 0.5s ease';                  
                    setTimeout(() => {
                        galleryMessage.style.display = 'none';
                        if (galleryContentWrapper) {
                            galleryContentWrapper.classList.add('visible');
                            galleryContentWrapper.style.opacity = '0';
                            galleryContentWrapper.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                galleryContentWrapper.style.opacity = '1';
                                galleryContentWrapper.style.transform = 'translateY(0)';
                                galleryContentWrapper.style.transition = 'all 0.6s ease';
                            }, 100);
                        }
                    }, 500);
                }
                galleryOpened = true;
            }, 500);
        }
    }
    if (window.location.hash === '#gallery') {
        setTimeout(() => {
            if (!galleryOpened) {
                openGallery();
            }
        }, 1000);
    }
}
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}
function initializeGalleryTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');      
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`gallery-${targetTab}`).classList.add('active');
        });
    });
}        
function showSetupInstructions() {
    const messageContainer = document.getElementById('form-messages');
    if (messageContainer) {
        messageContainer.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div>
                    <strong>Email Gönderimi Kurulum Gerektirir</strong><br>
                    Formun çalışması için EmailJS kurulumu yapmanız gerekiyor. 
                    Lütfen aşağıdaki adımları takip edin:
                    <ol style="margin-top: 10px; padding-left: 20px;">
                        <li><a href="https://www.emailjs.com" target="_blank">EmailJS.com</a>'a üye olun</li>
                        <li>Gmail veya başka bir email servisi ekleyin</li>
                        <li>Bir email şablonu oluşturun</li>
                        <li>Public Key, Service ID ve Template ID'yi alın</li>
                        <li>Bu kodda ilgili yerleri güncelleyin</li>
                    </ol>
                </div>
            </div>
        `;
    }
}
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    const icon = this.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();       
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;     
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }          
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const formMessages = document.getElementById('form-messages');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!window.emailConfig || window.emailConfig.serviceId === "YOUR_SERVICE_ID_HERE") {
        showMessage('error', 'Email gönderimi henüz yapılandırılmamış. Lütfen site sahibiyle iletişime geçin.');
        return;
    }
    if (!validateForm()) {
        return;
    }
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service_type: document.getElementById('service_type').value,
        message: document.getElementById('message').value,
        submission_date: new Date().toLocaleString('tr-TR'),
        website: 'Yeditepe Laundry Web Sitesi'
    };
    submitBtn.disabled = true;
    btnText.textContent = 'Gönderiliyor...';
    submitBtn.innerHTML = '<div class="spinner"></div> <span id="btn-text">Gönderiliyor...</span>';    
    try {
        const response = await emailjs.send(
            window.emailConfig.serviceId,
            window.emailConfig.templateId,
            formData
        );
        showMessage('success', 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        contactForm.reset();       
    } catch (error) {
        console.error('EmailJS Error:', error);
        showMessage('error', 'Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya doğrudan email gönderin.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span id="btn-text">Mesaj Gönder</span>';
        btnText.textContent = 'Mesaj Gönder';
    }
});
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    formMessages.innerHTML = '';
    if (!name) {
        showMessage('error', 'Lütfen adınızı soyadınızı giriniz.');
        document.getElementById('name').focus();
        return false;
    }  
    if (!email) {
        showMessage('error', 'Lütfen e-posta adresinizi giriniz.');
        document.getElementById('email').focus();
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Lütfen geçerli bir e-posta adresi giriniz.');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!phone) {
        showMessage('error', 'Lütfen telefon numaranızı giriniz.');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!message) {
        showMessage('error', 'Lütfen mesajınızı giriniz.');
        document.getElementById('message').focus();
        return false;
    }
    
    return true;
}

function showMessage(type, text) {

    formMessages.innerHTML = '';
    const messageEl = document.createElement('div');
    messageEl.className = `alert alert-${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    messageEl.innerHTML = `
        <i class="fas ${icon}"></i>
        <div>${text}</div>
    `;

    formMessages.appendChild(messageEl);

    formMessages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.15)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
