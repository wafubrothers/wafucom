const inlineSvgIcons = {
  bars: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  times: '<path d="M6 6l12 12M18 6L6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  'paper-plane': '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>',
  spinner: '<path d="M21 12a9 9 0 1 1-6.2-8.6"/>'
};

function setInlineSvgIcon(svgElement, iconName) {
  if (!svgElement || !inlineSvgIcons[iconName]) return;
  svgElement.dataset.icon = iconName;
  svgElement.innerHTML = inlineSvgIcons[iconName];
}

function inlineSvg(iconName, classes = '') {
  return `<svg class="svg-icon ${classes}" data-icon="${iconName}" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inlineSvgIcons[iconName]}</svg>`;
}

function runWhenIdle(callback) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  window.setTimeout(callback, 1000);
}

function initFloatingContactButtons() {
  runWhenIdle(() => {
    if (document.getElementById('button-list')) return;

    const buttonListHTML = `
      <div id="button-list" class="fixed right-6 top-2/3 -translate-y-1/2 z-[9999]">
        <div class="w-12 h-36 relative text-white shadow-lg flex flex-col items-center justify-center">
          <div class="group">
            <button class="w-12 h-12 flex items-center justify-center p-0 bg-green-500 hover:bg-green-600 relative overflow-hidden group border-b border-white">
              <img src="/images/whatsApp-icon.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-0 will-change-transform">
              <img src="/images/whatsApp-icon.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-100 will-change-transform">
            </button>
            <div class="absolute right-full mr-2 top-0 w-48 bg-white text-gray-800 shadow-lg rounded-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <img src="/images/whatsApp.jpg" alt="WhatsApp QR code" loading="lazy" decoding="async" class="mb-1">
              <p class="text-center">Tel/Wa:</p>
              <p class="text-center">+86-17376311087</p>
            </div>
          </div>

          <div class="group">
            <a href="https://x.com/wafu_Airleak" target="_blank" rel="noopener noreferrer">
              <button class="w-12 h-12 flex items-center justify-center p-0 transition-all duration-500 ease bg-black hover:bg-gray-700 relative overflow-hidden group border-b border-white">
                <img src="/images/x.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-0 will-change-transform">
                <img src="/images/x.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-100 will-change-transform">
              </button>
            </a>
          </div>

          <div class="group">
            <button class="w-12 h-12 flex items-center justify-center p-0 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 relative overflow-hidden group">
              <img src="/images/instagram.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-0 will-change-transform">
              <img src="/images/instagram.png" alt="" loading="lazy" decoding="async" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-100 will-change-transform">
            </button>
            <div class="absolute right-full mr-2 top-12 w-48 bg-white text-gray-800 shadow-lg rounded-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <img src="/images/wafu_airleak_qr.png" alt="Instagram QR code" loading="lazy" decoding="async" class="mb-1">
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', buttonListHTML);
  });
}

function initCertificateCarousel() {
  const container = document.getElementById('carouselItems');
  const textDisplay = document.getElementById('textDisplay');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!container || !textDisplay || !prevBtn || !nextBtn) return;

  const certificates = [
    { img: '/images/about/certificate/wf-gert_16.jpg', text: 'FCC Certification' },
    { img: '/images/about/certificate/wf-gert_15.jpg', text: 'CE Certification' },
    { img: '/images/about/certificate/wf-gert_11.jpg', text: 'Integrity Enterprise Certification' },
    { img: '/images/about/certificate/wf-gert_13.jpg', text: '50+ Patents' },
    { img: '/images/about/certificate/wf-gert_10.jpg', text: 'Supplier Rating Certification' }
  ];
  const totalItems = certificates.length;
  let currentIndex = 2;
  let autoPlayTimer = null;
  let resizeTimer = null;

  function renderItems() {
    const fragment = document.createDocumentFragment();

    certificates.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'carousel-item w-[160px] sm:w-[220px] md:w-[330px]';
      div.innerHTML = `
        <div class="cert-border">
          <img src="${item.img}" alt="${item.text}" loading="lazy" decoding="async">
        </div>
      `;
      div.addEventListener('click', () => {
        if (index === currentIndex) return;
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
      });
      fragment.appendChild(div);
    });

    container.textContent = '';
    container.appendChild(fragment);
  }

  function updateCarousel() {
    const items = container.querySelectorAll('.carousel-item');
    const isMobile = window.innerWidth < 768;

    items.forEach((item, index) => {
      let diff = index - currentIndex;
      const half = Math.floor(totalItems / 2);

      if (Math.abs(diff) > half) {
        diff += diff > 0 ? -totalItems : totalItems;
      }

      let translateX = 0;
      let scale = 0.8;
      let zIndex = 1;
      let opacity = 0.3;
      let display = 'block';

      if (!isMobile) {
        if (diff === 0) {
          scale = 1;
          zIndex = 10;
          opacity = 1;
        } else if (Math.abs(diff) === 1) {
          translateX = diff * 190;
          scale = 0.85;
          zIndex = 5;
          opacity = 0.9;
        } else if (Math.abs(diff) === 2) {
          translateX = diff * 190;
          scale = 0.7;
          zIndex = 2;
          opacity = 0.6;
        } else {
          display = 'none';
        }
      } else if (diff === 0) {
        scale = 1;
        zIndex = 10;
        opacity = 1;
      } else if (Math.abs(diff) === 1) {
        translateX = diff * 110;
        scale = 0.8;
        zIndex = 5;
        opacity = 0.8;
      } else {
        display = 'none';
      }

      item.style.transform = `translateX(${translateX}px) scale(${scale})`;
      item.style.zIndex = zIndex;
      item.style.opacity = opacity;
      item.style.display = display;
    });

    textDisplay.textContent = certificates[currentIndex].text;
  }

  function startAutoPlay() {
    window.clearInterval(autoPlayTimer);
    autoPlayTimer = window.setInterval(() => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }, 7000);
  }

  function resetAutoPlay() {
    startAutoPlay();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    resetAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    resetAutoPlay();
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(updateCarousel, 100);
  });

  renderItems();
  updateCarousel();
  startAutoPlay();
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  const menuIcon = menuBtn.querySelector('svg[data-icon]');
  if (!menuIcon) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      setInlineSvgIcon(menuIcon, 'times');
      menuIcon.classList.add('rotate-90');
    } else {
      menuIcon.classList.remove('rotate-90');
      setInlineSvgIcon(menuIcon, 'bars');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1180 || mobileMenu.classList.contains('hidden')) return;
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('rotate-90');
    setInlineSvgIcon(menuIcon, 'bars');
  });

  document.querySelectorAll('.mobile-dropdown button').forEach((button) => {
    button.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector('svg[data-icon]');
      if (!content) return;

      content.classList.toggle('hidden');
      if (!icon) return;

      if (content.classList.contains('hidden')) {
        icon.classList.remove('rotate-45');
        setInlineSvgIcon(icon, 'plus');
      } else {
        setInlineSvgIcon(icon, 'minus');
        icon.classList.add('rotate-45');
      }
    });
  });
}

function initHeroCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const carouselContainer = document.querySelector('.carousel-container');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;
  let isTransitioning = false;

  function showSlideContent(slide) {
    const content = slide.querySelector('.carousel-content');
    if (!content) return;
    content.classList.remove('translate-y-8', 'opacity-0');
    content.classList.add('translate-y-0', 'opacity-100');
  }

  function resetSlideContent(slide) {
    const content = slide.querySelector('.carousel-content');
    if (!content) return;
    content.classList.add('translate-y-8', 'opacity-0');
    content.classList.remove('translate-y-0', 'opacity-100');
  }

  function startSlideInterval() {
    window.clearInterval(slideInterval);
    slideInterval = window.setInterval(() => {
      if (!isTransitioning) {
        showSlide((currentSlide + 1) % slides.length);
      }
    }, 5000);
  }

  function stopSlideInterval() {
    window.clearInterval(slideInterval);
  }

  function updateIndicators(index) {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
      indicator.classList.toggle('w-12', i === index);
      indicator.classList.toggle('opacity-100', i === index);
      indicator.classList.toggle('w-3', i !== index);
      indicator.classList.toggle('opacity-50', i !== index);
    });
  }

  function showSlide(index) {
    if (isTransitioning || currentSlide === index || !slides[index]) return;

    isTransitioning = true;
    slides[currentSlide].classList.remove('opacity-100', 'translate-x-0');
    slides[currentSlide].classList.add('opacity-0', 'translate-x-0');
    resetSlideContent(slides[currentSlide]);
    updateIndicators(index);

    window.setTimeout(() => {
      slides[index].classList.remove('opacity-0', 'translate-x-full');
      slides[index].classList.add('opacity-100', 'translate-x-0');

      window.setTimeout(() => {
        showSlideContent(slides[index]);
        currentSlide = index;
        isTransitioning = false;
      }, 100);
    }, 500);
  }

  slides[0].classList.remove('opacity-0', 'translate-x-full');
  slides[0].classList.add('opacity-100', 'translate-x-0');
  window.setTimeout(() => showSlideContent(slides[0]), 100);
  startSlideInterval();

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      stopSlideInterval();
      showSlide((currentSlide - 1 + slides.length) % slides.length);
      startSlideInterval();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (isTransitioning) return;
      stopSlideInterval();
      showSlide((currentSlide + 1) % slides.length);
      startSlideInterval();
    });
  }

  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopSlideInterval);
    carouselContainer.addEventListener('mouseleave', startSlideInterval);
  }
}

function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  let ticking = false;

  function updateButton() {
    const shouldShow = window.scrollY > 300;
    backToTopButton.classList.toggle('opacity-0', !shouldShow);
    backToTopButton.classList.toggle('invisible', !shouldShow);
    backToTopButton.classList.toggle('translate-y-10', !shouldShow);
    backToTopButton.classList.toggle('opacity-100', shouldShow);
    backToTopButton.classList.toggle('visible', shouldShow);
    backToTopButton.classList.toggle('translate-y-0', shouldShow);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateButton);
  }, { passive: true });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');
  if (!contactForm || !submitButton || !formStatus) return;

  const emailJsPublicKey = 'gG4UKJ8mchOA1dfcq';
  const emailJsSrc = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  let emailJsLoader = null;

  function loadEmailJs() {
    if (window.emailjs) {
      return Promise.resolve(window.emailjs);
    }

    if (!emailJsLoader) {
      emailJsLoader = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = emailJsSrc;
        script.async = true;
        script.onload = () => {
          if (!window.emailjs) {
            reject(new Error('EmailJS failed to initialize.'));
            return;
          }

          window.emailjs.init(emailJsPublicKey);
          resolve(window.emailjs);
        };
        script.onerror = () => reject(new Error('EmailJS failed to load.'));
        document.head.appendChild(script);
      }).catch((error) => {
        emailJsLoader = null;
        throw error;
      });
    }

    return emailJsLoader;
  }

  function showStatus(message, type = 'info') {
    const classMap = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800'
    };

    formStatus.innerHTML = message;
    formStatus.className = `p-4 rounded text-center ${classMap[type]}`;
    formStatus.classList.remove('hidden');
  }

  function clearErrors() {
    ['namecompany', 'phone', 'email', 'product', 'application', 'message'].forEach((field) => {
      const input = document.getElementById(`contact-${field}`);
      const errorText = document.getElementById(`error-${field}`);
      if (input) input.classList.remove('border-red-500');
      if (errorText) {
        errorText.textContent = '';
        errorText.classList.add('hidden');
      }
    });
  }

  function setError(field, message) {
    const input = document.getElementById(`contact-${field}`);
    const errorText = document.getElementById(`error-${field}`);
    if (input) input.classList.add('border-red-500');
    if (errorText) {
      errorText.textContent = message;
      errorText.classList.remove('hidden');
    }
  }

  function validate(formData) {
    clearErrors();
    let isValid = true;

    if (!formData.namecompany.trim() || !/^[\p{L}\p{M}\s]{2,50}$/u.test(formData.namecompany)) {
      setError('namecompany', 'Please enter a valid name or company name (2-50 characters, letters and spaces only, no numbers or symbols).');
      isValid = false;
    }

    if (!formData.phone.trim() || !/^(\+?\d{1,4}[-\s]?)?(\(?\d{2,4}\)?[-\s]?)?\d{6,10}$/.test(formData.phone)) {
      setError('phone', 'Please enter a valid phone number (supports mobile and landline formats).');
      isValid = false;
    }

    if (!formData.email.trim() || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!formData.product.trim() || formData.product.length > 100) {
      setError('product', 'Please enter the product name (maximum 100 characters).');
      isValid = false;
    }

    if (!formData.application.trim() || formData.application.length < 10 || formData.application.length > 300) {
      setError('application', 'Please describe the application scenario (10-300 characters).');
      isValid = false;
    }

    if (!formData.message.trim() || formData.message.length > 500) {
      setError('message', 'Message cannot be empty and must not exceed 500 characters.');
      isValid = false;
    }

    return isValid;
  }

  contactForm.addEventListener('pointerenter', loadEmailJs, { once: true, passive: true });
  contactForm.addEventListener('focusin', loadEmailJs, { once: true });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('contact-namecompany');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const productInput = document.getElementById('contact-product');
    const applicationInput = document.getElementById('contact-application');
    const messageInput = document.getElementById('contact-message');

    const formData = {
      namecompany: nameInput ? nameInput.value : '',
      name: nameInput ? nameInput.value : '',
      phone: phoneInput ? phoneInput.value : '',
      email: emailInput ? emailInput.value : '',
      product: productInput ? productInput.value : '',
      application: applicationInput ? applicationInput.value : '',
      message: messageInput ? messageInput.value : ''
    };

    if (!validate(formData)) {
      showStatus('Please correct the errors in the form before submitting.', 'error');
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = `${inlineSvg('spinner', 'mr-2 spin')} Sending...`;
    showStatus('Sending, please wait...', 'info');

    try {
      const emailClient = await loadEmailJs();
      await emailClient.send('service_11vaisg', 'template_fa2fqcs', formData);
      showStatus('Thank you for your inquiry. We will get back to you shortly!', 'success');
      contactForm.reset();
      clearErrors();
      window.setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 1000);
    } catch (error) {
      console.error(error);
      showStatus('Submission failed. Please try again later.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = `${inlineSvg('paper-plane', 'mr-2')} Send Message`;
    }
  });
}

function initPhoneCopy() {
  const btn = document.getElementById('copyPhoneBtn');
  const text = document.getElementById('phoneText');
  if (!btn || !text) return;

  const phone = btn.getAttribute('data-phone') || text.textContent;

  function setText(newText) {
    text.classList.add('opacity-0');
    window.setTimeout(() => {
      text.innerText = newText;
      text.classList.remove('opacity-0');
    }, 150);
  }

  btn.addEventListener('mouseenter', () => setText('Click to Copy'));
  btn.addEventListener('mouseleave', () => setText(phone));
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setText('Copied');
      window.setTimeout(() => setText(phone), 1500);
    } catch (error) {
      setText('Copy Failed');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFloatingContactButtons();
  initMobileMenu();
  initHeroCarousel();
  initBackToTop();
  initContactForm();
  initPhoneCopy();
  initCertificateCarousel();
});
