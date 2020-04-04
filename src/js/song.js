import mp3AudioFile from "../assets/*.mp3";

class Song {
  constructor(cancion) {
    const indice = Object.keys(mp3AudioFile).indexOf(cancion[1]);
    const audio = new Audio(Object.values(mp3AudioFile)[indice]);
    const item = document.querySelector(cancion[0]);
    item.onclick = () => {
      if (audio.paused) audio.play();
      else audio.pause();
    };

  }

}

export default Song;