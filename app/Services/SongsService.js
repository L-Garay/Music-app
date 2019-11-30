import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/LoganG"
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url =
      "https://itunes.apple.com/search?callback=?&media=music&limit=25&term=" +
      query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData));
        console.log(results);

        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  getMySongs() {
    _sandBox
      .get("/songs")
      .then(res => {
        //TODO What are you going to do with this result
        let results = res.data.data.map(rawData => new Song(rawData));
        store.commit("playlist", results);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  addSong(id) {
    let specificSong = store.State.songs.find(s => s._id == id);
    _sandBox.post("/songs", specificSong).then(res => {
      this.getMySongs();
    });
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    let songToDelete = store.State.playlist.find(s => s._id == id);
    _sandBox.delete(`/songs/${id}`, songToDelete).then(res => {
      this.getMySongs();
    });
    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
