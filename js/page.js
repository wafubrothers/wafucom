document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 4;
  const items = document.querySelectorAll('.solution-item');
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentPath = window.location.pathname;

  // 当前页
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('page')) || 1;
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  // 显示当前页内容
  items.forEach((item, index) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    item.style.display = (index >= start && index < end) ? 'block' : 'none';
  });

  // ====== 动态生成页码 ======
  const pagination = document.querySelector('.pagination');
  const nextBtn = document.querySelector('.pagination-next');

  // 插入页码到 prev 和 next 中间
  for (let i = 1; i <= totalPages; i++) {
    const a = document.createElement('a');
    a.href = `${currentPath}?page=${i}`;
    a.className = 'pagination-page';

    const div = document.createElement('div');
    div.textContent = i;
    div.className = 'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300';

    if (i === currentPage) {
      div.classList.add('bg-primary', 'text-white');
    } else {
      div.classList.add('bg-gray-200', 'hover:bg-gray-300');
    }

    a.appendChild(div);
    pagination.insertBefore(a, nextBtn);
  }

  // ====== 上一页 / 下一页 ======
  const prev = document.querySelector('.pagination-prev');
  const next = document.querySelector('.pagination-next');

  if (prev) {
    if (currentPage === 1) {
      prev.classList.add('cursor-not-allowed');
      prev.addEventListener('click', e => e.preventDefault());
      prev.classList.remove('hover:bg-gray-300');
    } else {
      prev.href = `${currentPath}?page=${currentPage - 1}`;
    }
  }

  if (next) {
    if (currentPage === totalPages) {
      next.classList.add('cursor-not-allowed');
      next.addEventListener('click', e => e.preventDefault());
      next.classList.remove('hover:bg-gray-300');
    } else {
      next.href = `${currentPath}?page=${currentPage + 1}`;
    }
  }
});
