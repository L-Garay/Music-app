export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100; //.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
    <div class="card mb-3" style="max-width: 550px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="${this.albumArt}" height="150" width="150" alt="jlkdjf">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${this.title}</h5>
                      <p class="card-text">${this.artist}</p>
                      <p class="card-text">${this.album}</p>
                      <p class="card-text"><small class="text-muted">Price: ${this.price}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            <div>
              <audio src="${this.preview}" controls></audio>
              <button type="button" class="btn" onclick="app.songsController.addSong('${this._id}')">Add Song</button>
            </div>

        `;
  }

  get playlistTemplate() {
    return `
    <div class="card mb-3 w-100">
                <div class="row no-gutters">
                  <div class="col-md-2 justify-content-center justify-content-md-start">
                    <img src="${this.albumArt}" height="100" width="100" alt="fdgs">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body d-flex justify-content-center">
                      <p class="card-title p-3 mb-0"><b>${this.title}</b></p>
                      <p class="card-text p-3 mb-0">${this.artist}</p>
                      <p class="card-textm p-3 mb-0">${this.album}</p>
                    </div>
                  </div>
                </div>
              </div>
            <div class="">
              <audio src="${this.preview}" controls></audio>
              <button type="button" class="btn" onclick="app.songsController.removeSong('${this._id}')">Remove Song</button>
            </div>

        `;
  }
}
