document.addEventListener('DOMContentLoaded', function () {
    var player = document.getElementById('youtube-product-player');
    var caption = document.getElementById('youtube-product-caption');
    var options = document.querySelectorAll('.youtube-video-option');

    if (!player || !caption || !options.length) {
        return;
    }

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            var videoId = option.dataset.youtubeVideo;
            var title = option.dataset.videoTitle;

            if (!videoId || !title) {
                return;
            }

            player.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0';
            player.title = title;
            caption.textContent = title;

            options.forEach(function (item) {
                var selected = item === option;
                var status = item.querySelector('.video-option-status');

                item.setAttribute('aria-pressed', String(selected));
                item.classList.toggle('is-active', selected);
                item.classList.toggle('border-primary', selected);
                item.classList.toggle('shadow-sm', selected);
                item.classList.toggle('border-gray-200', !selected);

                if (status) {
                    status.textContent = selected ? 'Now Playing' : 'Play Video';
                    status.classList.toggle('text-primary', selected);
                    status.classList.toggle('text-gray-500', !selected);
                }
            });
        });
    });
});
