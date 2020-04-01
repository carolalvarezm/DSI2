const cover = document.querySelectorAll(".cover");

cover.forEach(function(cover) {
    cover.addEventListener('click', function() {
        cover.classList.toggle("open");
    });
});