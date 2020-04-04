import Song from "./song.js";

class Player {
  constructor(mapa) {
    this.mapa = mapa;
  }

  run() {
    const song = [];
    Object.entries(this.mapa).forEach(element => {
      song.push(new Song(element));
    });
  }


}
export default Player;