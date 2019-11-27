import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let resultsTemplate = "";
  let resultsArr = store.State.songs;
  resultsArr.forEach(song => (resultsTemplate += song.Template));
  document.querySelector("#songs").innerHTML = resultsTemplate;
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let playlistTemplate = "";
  let playlistArr = store.State.playlist;
  playlistArr.forEach(song => (playlistTemplate += song.playlistTemplate));
  document.querySelector("#playlist").innerHTML = playlistTemplate;
}

//Public
export default class SongsController {
  constructor() {
    store.subscribe("songs", _drawResults);
    store.subscribe("playlist", _drawPlaylist);
    _drawResults();
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    event.preventDefault();
    SongService.addSong(id);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    event.preventDefault();
    SongService.removeSong(id);
  }
}
