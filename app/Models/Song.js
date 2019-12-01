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
    <div class="card mb-3 w-100 d-flex">
    <div class="row no-gutters">
      <div class="col-3 align-self-center">
        <img src="${this.albumArt}" height="75" width="75" alt="fdgs">
      </div>
      <div class="col-9">
        <div class="card-body d-flex justify-content-center flex-column">
          <p class="card-title mb-0"><b>${this.title}</b></p>
          <p class="card-text font1 mb-0">${this.artist} | ${this.album}</p>
          <p class="card-text font2 mb-0">${this.price}</p>
          <button type="button" class="btn add-btn" onclick="app.songsController.addSong('${this._id}')">Add Song</button>
        </div>
      </div>
    </div>
    </div>
    <div>
    <audio class="audio" src="${this.preview}" controls></audio>
    </div>

        `;
  }

  get playlistTemplate() {
    return `
    <div class="card pl-2 mb-3 w-100 d-flex">
    <div class="row no-gutters">
      <div class="col-3 align-self-center">
        <img src="${this.albumArt}" height="75" width="75" alt="fdgs">
      </div>
      <div class="col-9">
        <div class="card-body d-flex justify-content-center flex-column">
          <p class="card-title mb-0"><b>${this.title}</b></p>
          <p class="card-text font1 mb-0">${this.artist}</p>
          <p class="card-text font2 mb-0">${this.album}</p>
          <button type="button" class="btn remove-btn" onclick="app.songsController.removeSong('${this._id}')">Remove me</button>
        </div>
      </div>
    </div>
    </div>
    <div>
    <audio class="audio" src="${this.preview}" controls></audio>
    </div>

        `;
  }
  get currentTemplate() {
    return `
    <img src="${this.albumArt}" height="420" width="420" alt="active music" />
          <div class="d-flex flex-column align-items-center">
            <h3>${this.title} - ${this.artist}</h3>
            <p>Album: ${this.album} | Price: ${this.price} here</p>
            <audio src="${this.preview}" controls></audio>
          </div>`;
  }
}
