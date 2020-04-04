import Player from "./player.js";

const cover = document.querySelectorAll(".cover");

cover.forEach(function(cover) {
  cover.addEventListener("click", function() {
    cover.classList.toggle("open");
  });
});

const map = {
  ".item-1": "believer",
  ".item-2": "hey_brother",
  ".item-3": "we_will_rock_you",
};

const player = new Player(map);
player.run();