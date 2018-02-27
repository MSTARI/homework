window.onscroll = function () {
    var scroll = document.documentElement.scrollTop,
        nav = document.querySelector('nav'),
        footer = document.querySelector('footer');
    if (scroll > 500) {
        nav.style.top = -scroll + 544 + 'px';
        footer.style.bottom = -scroll + 495 + 'px';
    } else {
        nav.style.top = 44 + 'px';
        footer.style.bottom = -5 + 'px';
    }
}