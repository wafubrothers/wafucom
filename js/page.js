document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 4; // 每页显示条数
    const items = document.querySelectorAll('.solution-item'); // 每个列表块加 .solution-item
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    // 获取当前页码
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('page')) || 1;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
  
    // 显示当前页内容
    items.forEach((item, index) => {
      const start = (currentPage - 1) * itemsPerPage;
      const end = currentPage * itemsPerPage;
      item.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
  
    // 分页按钮高亮
    document.querySelectorAll('.pagination-page').forEach(btn => {
      const div = btn.querySelector('div');
      if (parseInt(div.textContent) === currentPage) {
        div.classList.add('bg-primary', 'text-white', 'hover:bg-secondary'); // 当前页
        div.classList.remove('bg-gray-200');
      } else {
        div.classList.remove('bg-primary', 'text-white');
        div.classList.add('bg-gray-200', 'hover:bg-gray-300');
      }
    });
  
    // 上一页/下一页按钮
    const prev = document.querySelector('.pagination-prev');
    const next = document.querySelector('.pagination-next');
  
    // 上一页链接与禁用状态
    if (prev) {
      if (currentPage === 1) {
        prev.classList.add('cursor-not-allowed');
        prev.classList.remove('hover:bg-gray-300');
        prev.addEventListener('click', e => e.preventDefault());
      } else {
        prev.classList.remove('cursor-not-allowed');
        prev.href = `/solu/solu-electronic.html?page=${currentPage - 1}`;
      }
    }
  
    // 下一页链接与禁用状态
    if (next) {
      if (currentPage === totalPages) {
        next.classList.add('cursor-not-allowed');
        next.classList.remove('hover:bg-gray-300');
        next.addEventListener('click', e => e.preventDefault());
      } else {
        next.classList.remove('cursor-not-allowed');
        next.href = `/solu/solu-electronic.html?page=${currentPage + 1}`;
      }
    }
  });
  