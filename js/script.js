// 侧边咨询悬浮按钮
document.addEventListener("DOMContentLoaded", function () {
  const buttonListHTML = `
    <div id="button-list" class="fixed right-6 top-2/3 -translate-y-1/2 z-[9999]">
      <div class="w-12 h-36 relative text-white shadow-lg flex flex-col items-center justify-center">

      <!-- WhatsApp -->
          <div class="group">
            <button class="w-12 h-12 flex items-center justify-center p-0 bg-green-500 hover:bg-green-600 relative overflow-hidden group border-b border-white">
              <img src="/images/whatsApp-icon.png" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-0 will-change-transform" />
            <img src="/images/whatsApp-icon.png" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-100 will-change-transform" />
            </button>
            <div class="absolute right-full mr-2 top-0 w-48 bg-white text-gray-800 shadow-lg rounded-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <img src="/images/whatsApp.jpg" alt="WhatsApp二维码" class="mb-1">
              <p class="text-center">Tel/Wa:</p>
              <p class="text-center">+86-17376311087</p>
            </div>
          </div>

        <!-- x -->
        <div class="group">
        <a href="https://x.com/wafu_Airleak" target="_blank">
          <button class="w-12 h-12 flex items-center justify-center p-0 transition-all duration-500 ease bg-black hover:bg-gray-700 relative overflow-hidden group border-b border-white">
            <img src="/images/x.png" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-100 group-hover:scale-0 will-change-transform" />
            <img src="/images/x.png" class="p-3 text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-100 will-change-transform" />
          </button> 
        </a>
           
        </div>

        <!-- ins -->
        <div class="group">
          <button class="w-12 h-12 flex items-center justify-center p-0
bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600
hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700
relative overflow-hidden group ">
            <i class="fa fa-instagram text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-110 group-hover:scale-0 will-change-transform"></i>
            <i class="fa fa-instagram text-xl flex items-center justify-center absolute transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-110 will-change-transform"></i>
          </button>
          <div class="absolute right-full mr-2 top-12 w-48 bg-white text-gray-800 shadow-lg rounded-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <img src="/images/wafu_airleak_qr.png" alt="Instagram QR Code" class="mb-1">
          </div>
        </div>

        

      </div>
    </div>
  `;

  console.log("函数启动");

  // 插入到 body 末尾
  document.body.insertAdjacentHTML("beforeend", buttonListHTML);
});


// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function () {
  // 移动端菜单切换
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = menuBtn.querySelector('i');

  menuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    // 切换图标（菜单/关闭）
    if (mobileMenu.classList.contains('hidden')) {
      menuIcon.classList.remove('fa-times', 'rotate-90');
      menuIcon.classList.add('fa-bars');
    } else {
      menuIcon.classList.remove('fa-bars');
      menuIcon.classList.add('fa-times', 'rotate-90');
    }
  });

  // 移动端下拉菜单交互
  document.querySelectorAll('.mobile-dropdown button').forEach(button => {
    button.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');

      content.classList.toggle('hidden');
      // 切换图标（+/-）
      if (content.classList.contains('hidden')) {
        icon.classList.remove('fa-minus', 'rotate-45');
        icon.classList.add('fa-plus');
      } else {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus', 'rotate-45');
      }
    });
  });
});
/* 轮播图*/
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let currentSlide = 0;
  let slideInterval;
  let isTransitioning = false;

  // 确保至少有一个幻灯片
  if (slides.length > 0) {
    // 立即显示第一张幻灯片，避免初始空白
    slides[0].classList.remove('opacity-0', 'translate-x-full');
    slides[0].classList.add('opacity-100', 'translate-x-0');

    // 显示第一张幻灯片的内容
    setTimeout(() => {
      const firstContent = slides[0].querySelector('.carousel-content');
      if (firstContent) {
        firstContent.classList.remove('translate-y-8', 'opacity-0');
        firstContent.classList.add('translate-y-0', 'opacity-100');
      }
    }, 100);

    // 启动自动轮播
    startSlideInterval();
  }

  // 自动轮播
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      if (!isTransitioning && slides.length > 0) {
        nextSlide();
      }
    }, 5000);
  }

  // 停止自动轮播
  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  // 显示指定幻灯片
  function showSlide(index) {
    if (isTransitioning || currentSlide === index || !slides[index]) return;

    isTransitioning = true;

    // 隐藏当前幻灯片
    slides[currentSlide].classList.remove('opacity-100', 'translate-x-0');
    slides[currentSlide].classList.add('opacity-0', 'translate-x-0');

    // 重置当前幻灯片内容
    const currentContent = slides[currentSlide].querySelector('.carousel-content');
    if (currentContent) {
      currentContent.classList.add('translate-y-8', 'opacity-0');
      currentContent.classList.remove('translate-y-0', 'opacity-100');
    }

    // 更新指示器
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active', 'w-12', 'opacity-100');
        indicator.classList.remove('w-3', 'opacity-50');
      } else {
        indicator.classList.remove('active', 'w-12', 'opacity-100');
        indicator.classList.add('w-3', 'opacity-50');
      }
    });

    // 等待过渡动画完成
    setTimeout(() => {
      // 显示新幻灯片
      slides[index].classList.remove('opacity-0', 'translate-x-full');
      slides[index].classList.add('opacity-100', 'translate-x-0');

      // 显示新幻灯片内容
      setTimeout(() => {
        const newContent = slides[index].querySelector('.carousel-content');
        if (newContent) {
          newContent.classList.remove('translate-y-8', 'opacity-0');
          newContent.classList.add('translate-y-0', 'opacity-100');
        }

        currentSlide = index;
        isTransitioning = false;
      }, 100);
    }, 500);
  }

  // 下一张幻灯片
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // 上一张幻灯片
  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // 事件监听
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (!isTransitioning && slides.length > 0) {
        stopSlideInterval();
        prevSlide();
        startSlideInterval();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (!isTransitioning && slides.length > 0) {
        stopSlideInterval();
        nextSlide();
        startSlideInterval();
      }
    });
  }

  // 鼠标悬停暂停轮播
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopSlideInterval);
    carouselContainer.addEventListener('mouseleave', startSlideInterval);
  }
});
/* 轮播图*/

/**返回顶部按钮 */
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-10');
    backToTopButton.classList.add('opacity-100', 'visible', 'translate-y-0');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-10');
    backToTopButton.classList.remove('opacity-100', 'visible', 'translate-y-0');
  }
});
backToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
/**返回顶部按钮 */
// 播放器
document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('video');

  // 视频播放/暂停控制
  videos.forEach(video => {
    const overlay = video.parentElement.querySelector('.video-overlay');
    if (overlay) {
      video.addEventListener('play', () => {
        overlay.style.display = 'none';
      });
      video.addEventListener('pause', () => {
        overlay.style.display = 'flex';
      });
    }
  });

  // 视频延迟加载
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.load();
        videoObserver.unobserve(entry.target);
      }
    });
  });

  videos.forEach(video => {
    videoObserver.observe(video);
  });
});
// 播放器

/**emailjs */
document.addEventListener('DOMContentLoaded', function () {
  emailjs.init('gG4UKJ8mchOA1dfcq');

  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  // 显示统一状态提示
  function showStatus(message, type = 'info') {
    const classMap = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800'
    };

    if (formStatus) {
      formStatus.innerHTML = message;
      formStatus.className = `p-4 rounded text-center ${classMap[type]}`;
      formStatus.classList.remove('hidden');
    }
  }

  // 隐藏所有错误提示
  function clearErrors() {
    ['namecompany', 'phone', 'email', 'product', 'application', 'message'].forEach(field => {
      const input = document.getElementById(`contact-${field}`);
      const errorText = document.getElementById(`error-${field}`);
      if (input) input.classList.remove('border-red-500');
      if (errorText) {
        errorText.textContent = '';
        errorText.classList.add('hidden');
      }
    });
  }

  // 设置错误信息
  function setError(field, message) {
    const input = document.getElementById(`contact-${field}`);
    const errorText = document.getElementById(`error-${field}`);
    if (input) input.classList.add('border-red-500');
    if (errorText) {
      errorText.textContent = message;
      errorText.classList.remove('hidden');
    }
  }

  // Form validation
  function validate(formData) {
    clearErrors();
    let isValid = true;

    // Name / Company: allow letters in multiple languages, spaces, 2-50 characters
    if (!formData.namecompany.trim() || !/^[\p{L}\p{M}\s]{2,50}$/u.test(formData.namecompany)) {
      setError('namecompany', 'Please enter a valid name or company name (2-50 characters, letters and spaces only, no numbers or symbols).');
      isValid = false;
    }

    // Phone: supports international mobile and landline formats
    if (!formData.phone.trim() || !/^(\+?\d{1,4}[-\s]?)?(\(?\d{2,4}\)?[-\s]?)?\d{6,10}$/.test(formData.phone)) {
      setError('phone', 'Please enter a valid phone number (supports mobile and landline formats).');
      isValid = false;
    }

    // Email
    if (!formData.email.trim() || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    // Product name: required, max 100 characters
    if (!formData.product.trim() || formData.product.length > 100) {
      setError('product', 'Please enter the product name (maximum 100 characters).');
      isValid = false;
    }

    // Application scenario: required, 10-300 characters
    if (!formData.application.trim() || formData.application.length < 10 || formData.application.length > 300) {
      setError('application', 'Please describe the application scenario (10-300 characters).');
      isValid = false;
    }

    // Message: required, max 500 characters
    if (!formData.message.trim() || formData.message.length > 500) {
      setError('message', 'Message cannot be empty and must not exceed 500 characters.');
      isValid = false;
    }

    return isValid;
  }


  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // 收集表单数据
    const formData = {
      namecompany: document.getElementById('contact-namecompany').value,
      name: document.getElementById('contact-namecompany').value,
      phone: document.getElementById('contact-phone').value,
      email: document.getElementById('contact-email').value,
      product: document.getElementById('contact-product').value,
      application: document.getElementById('contact-application').value,
      message: document.getElementById('contact-message').value
    };

    // Validate the form
    if (!validate(formData)) {
      showStatus('Please correct the errors in the form before submitting.', 'error');
      return;
    }

    // Set submitting state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Sending...';
    showStatus('Sending, please wait...', 'info');

    emailjs.send('service_11vaisg', 'template_fa2fqcs', formData)
      .then(response => {
        showStatus('Thank you for your inquiry. We will get back to you shortly!', 'success');
        contactForm.reset();
        clearErrors();

        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        showStatus('Submission failed. Please try again later.', 'error');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fa fa-paper-plane mr-2"></i> Send Message';
      });

  });
});
/*emailjs*/

/*分页控制 */
document.addEventListener('DOMContentLoaded', function () {
  // 获取DOM元素并验证存在性
  const pagination = document.getElementById('pagination');
  const newsList = document.getElementById('news-list');
  const loadingMask = document.getElementById('loading-mask');
  const pageItems = document.querySelectorAll('.page-news');

  // 如果没有分页元素或页面内容，直接返回
  if (!pagination || !newsList || !loadingMask || pageItems.length === 0) {
    return;
  }

  let currentPage = 1;
  const totalPages = pageItems.length;

  // 初始化页面
  if (totalPages > 0) {
    showPage(1);
  }

  // 分页点击事件（使用事件委托）
  pagination.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target.closest('.page-link');

    if (!target) return;

    const action = target.dataset.action;
    const page = parseInt(target.dataset.page);

    // 使用对象字面量替代复杂条件判断
    const pageActions = {
      'prev': () => currentPage > 1 && showPage(currentPage - 1),
      'next': () => currentPage < totalPages && showPage(currentPage + 1)
    };

    if (pageActions[action]) {
      pageActions[action]();
    } else if (page && page !== currentPage && page >= 1 && page <= totalPages) {
      showPage(page);
    }
  });

  // 显示指定页面
  function showPage(page) {
    // 验证页码有效性
    if (page < 1 || page > totalPages) {
      console.warn('无效的页码:', page);
      return;
    }

    // 显示加载动画
    loadingMask.classList.remove('hidden');

    // 使用requestAnimationFrame优化DOM操作
    requestAnimationFrame(() => {
      // 隐藏所有页面并添加过渡类
      pageItems.forEach(item => {
        item.classList.add('opacity-0');
      });

      // 使用Promise处理动画序列
      setTimeout(() => {
        pageItems.forEach(item => {
          item.classList.add('hidden');
        });

        // 更新当前页
        currentPage = page;

        // 显示目标页面
        const targetPage = document.querySelector(`.page-news[data-page="${page}"]`);
        if (targetPage) {
          targetPage.classList.remove('hidden');

          // 触发重排后添加淡入动画
          requestAnimationFrame(() => {
            targetPage.classList.remove('opacity-0');
          });
        }

        // 更新分页控件状态
        updatePagination();

        // 隐藏加载动画
        loadingMask.classList.add('hidden');

        // 平滑滚动到新闻列表顶部
        newsList.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 300); // 减少加载时间
    });
  }

  // 更新分页控件状态
  function updatePagination() {
    // 使用更具体的选择器
    const pageLinks = pagination.querySelectorAll('.page-link[data-page]');

    // 更新页码按钮状态
    pageLinks.forEach(link => {
      const linkPage = parseInt(link.dataset.page);
      const isActive = linkPage === currentPage;

      // 使用toggle方法简化类操作
      link.classList.toggle('bg-primary', isActive);
      link.classList.toggle('text-white', isActive);
      link.classList.toggle('bg-gray-100', !isActive);
      link.classList.toggle('text-gray-700', !isActive);
    });

    // 更新上一页/下一页按钮状态
    const prevBtn = pagination.querySelector('.page-link[data-action="prev"]').parentElement;
    const nextBtn = pagination.querySelector('.page-link[data-action="next"]').parentElement;

    prevBtn.classList.toggle('disabled', currentPage === 1);
    nextBtn.classList.toggle('disabled', currentPage === totalPages);
  }

  // 页面初始加载动画
  if (pageItems.length > 0) {
    setTimeout(() => {
      pageItems[0].classList.remove('opacity-0');
    }, 300);
  }
});
/**/

/**自动滚动js */
document.addEventListener('DOMContentLoaded', function () {
  // 获取DOM元素并验证存在性
  const track = document.getElementById('carousel-track');
  const carousel = document.getElementById('cert-carousel');
  const items = document.querySelectorAll('.cert-item');

  // 如果缺少必要的DOM元素，直接返回
  if (!track || !carousel || items.length === 0) {
    console.log('轮播功能初始化失败：缺少必要的DOM元素');
    return;
  }

  // 真实项数量（排除复制项）
  const realItems = items.length - 4;
  if (realItems <= 0) {
    console.log('轮播功能初始化失败：真实项数量不足');
    return;
  }

  let position = 0;
  let isDragging = false;
  let startX;
  let startPos;
  let autoScrollInterval;
  const autoScrollSpeed = 0.05; // 自动滚动速度（百分比/帧）
  let isAutoScrolling = true;

  // 根据屏幕尺寸计算单页滚动宽度
  function getScrollWidth() {
    if (window.innerWidth >= 1024) { // lg
      return 25; // 25%
    } else if (window.innerWidth >= 768) { // md
      return 33.333; // 33.333%
    } else if (window.innerWidth >= 640) { // sm
      return 50; // 50%
    } else {
      return 100; // 100%
    }
  }

  // 获取可见项数量
  function getVisibleItemsCount() {
    if (window.innerWidth >= 1024) {
      return 4;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else if (window.innerWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  }

  // 检查是否需要重置位置以实现无缝滚动
  function checkResetPosition() {
    const maxVisibleItems = getVisibleItemsCount();
    const maxScroll = (realItems - maxVisibleItems) * getScrollWidth();

    // 当滚动到接近复制内容时，平滑跳回实际内容
    if (Math.abs(position) >= maxScroll) {
      const virtualPos = position % maxScroll;

      // 使用requestAnimationFrame优化性能
      requestAnimationFrame(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(${virtualPos}%)`;
        position = virtualPos;
      });
    }
  }

  // 开始自动滚动
  function startAutoScroll() {
    cancelAnimationFrame(autoScrollInterval);

    function scroll() {
      position -= autoScrollSpeed;

      // 使用requestAnimationFrame优化性能
      requestAnimationFrame(() => {
        track.style.transform = `translateX(${position}%)`;
        checkResetPosition();
      });

      if (isAutoScrolling) {
        autoScrollInterval = requestAnimationFrame(scroll);
      }
    }

    autoScrollInterval = requestAnimationFrame(scroll);
  }

  // 暂停自动滚动
  function pauseAutoScroll() {
    isAutoScrolling = false;
    cancelAnimationFrame(autoScrollInterval);
  }

  // 鼠标/触摸事件处理
  function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    startPos = position;
    track.style.transition = 'none';
    pauseAutoScroll();
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const moveX = clientX - startX;
    const containerWidth = track.offsetWidth;

    // 防止容器宽度为0导致的计算错误
    if (containerWidth <= 0) return;

    const movePercentage = (moveX / containerWidth) * 100;

    position = startPos + movePercentage;

    // 使用requestAnimationFrame优化性能
    requestAnimationFrame(() => {
      track.style.transform = `translateX(${position}%)`;
    });
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    // 计算最近的停靠位置
    const scrollWidth = getScrollWidth();
    const targetIndex = Math.round(Math.abs(position) / scrollWidth);
    const targetPos = -targetIndex * scrollWidth;

    // 平滑滚动到最近的证书
    track.style.transition = 'transform 300ms ease-out';
    track.style.transform = `translateX(${targetPos}%)`;
    position = targetPos;

    // 检查是否需要无缝跳转
    setTimeout(checkResetPosition, 300);

    // 重新启动自动滚动
    isAutoScrolling = true;
    startAutoScroll();
  }

  // 绑定事件
  track.addEventListener('mousedown', handleDragStart);
  track.addEventListener('touchstart', handleDragStart, { passive: true });

  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove, { passive: true });

  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);

  // 鼠标进入/离开时控制自动滚动
  carousel.addEventListener('mouseenter', pauseAutoScroll);
  carousel.addEventListener('mouseleave', () => {
    if (!isDragging) {
      isAutoScrolling = true;
      startAutoScroll();
    }
  });

  // 窗口大小变化时重新计算
  window.addEventListener('resize', checkResetPosition);

  // 启动自动滚动
  startAutoScroll();

  // 添加窗口卸载事件，清理定时器
  window.addEventListener('unload', () => {
    cancelAnimationFrame(autoScrollInterval);
  });
});
/*自动滚动js*/

/**视频播放模拟器 */
document.addEventListener('DOMContentLoaded', function () {
  // 获取DOM元素并验证存在性
  const playButtons = document.querySelectorAll('.play-btn');
  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('videoPlayer');
  const closeModal = document.getElementById('closeModal');

  // 检查必要元素是否存在
  if (!videoModal || !videoPlayer || !closeModal || playButtons.length === 0) {
    console.log('视频模态框功能初始化失败：缺少必要的DOM元素');
    return;
  }

  // 模态框状态
  let currentVideoSrc = '';

  // 打开模态框函数
  function openModal(videoSrc) {
    if (!videoSrc) {
      console.warn('无效的视频源');
      return;
    }

    currentVideoSrc = videoSrc;
    videoPlayer.src = videoSrc;

    // 使用requestAnimationFrame优化显示动画
    requestAnimationFrame(() => {
      videoModal.classList.remove('hidden');
      videoModal.classList.add('flex');

      // 确保DOM更新后再播放视频
      setTimeout(() => {
        videoPlayer.play().catch(error => {
          console.error('视频播放失败:', error);
        });
      }, 100);
    });

    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeydown);

    // 防止页面滚动
    document.body.style.overflow = 'hidden';
  }

  // 关闭模态框函数
  function closeModalFunc() {
    videoPlayer.pause();
    videoPlayer.src = '';

    // 清除视频缓存（对于移动端更友好）
    videoPlayer.load();

    // 使用requestAnimationFrame优化隐藏动画
    requestAnimationFrame(() => {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
    });

    // 移除键盘事件监听
    document.removeEventListener('keydown', handleKeydown);

    // 恢复页面滚动
    document.body.style.overflow = '';
  }

  // 键盘事件处理
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeModalFunc();
    }
  }

  // 为所有播放按钮添加点击事件
  playButtons.forEach(button => {
    button.addEventListener('click', function () {
      const videoSrc = this.getAttribute('data-video');
      openModal(videoSrc);
    });
  });

  // 关闭按钮点击事件
  closeModal.addEventListener('click', closeModalFunc);

  // 模态框背景点击事件
  videoModal.addEventListener('click', function (e) {
    if (e.target === videoModal) {
      closeModalFunc();
    }
  });

  // 视频播放结束事件
  videoPlayer.addEventListener('ended', closeModalFunc);

  // 页面卸载时清理资源
  window.addEventListener('unload', () => {
    videoPlayer.pause();
    videoPlayer.src = '';
  });
});
/**视频播放器 */

/**产品图片切换js */
// 图片切换功能
function changeMainImage(src, event) {
  // 获取主图元素，不存在则退出
  const mainImage = document.getElementById('mainProductImg');
  if (!mainImage) return;
  mainImage.style.transition = 'opacity 0.3s ease';
  mainImage.style.opacity = '0';

  // 预加载图片并切换
  setTimeout(() => {
    const tempImg = new Image();
    tempImg.src = src;
    tempImg.onload = () => {
      mainImage.src = src;
      mainImage.style.opacity = '1';
    };
    tempImg.onerror = () => mainImage.style.opacity = '1';
  }, 300);

  // 更新缩略图选中状态
  if (event) {
    event.stopPropagation();
    // 重置所有缩略图边框
    document.querySelectorAll('.cursor-pointers').forEach(thumb => {
      thumb.classList.remove('border-primary');
      thumb.classList.add('border-transparent');
    });
    // 设置当前选中缩略图
    const current = event.target.closest('.cursor-pointers') || event.target;
    current.classList.remove('border-transparent');
    current.classList.add('border-primary');
  }
}
/** */
