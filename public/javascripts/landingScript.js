preloader = document.getElementById('preloader');
main = document.getElementById('main');
window.addEventListener('load', function () {
    preloader.style.display = 'none';
    main.style.display = 'flex';
});