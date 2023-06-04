import { waitingRedirect } from "../../../common/helpers";
import FireBaseClient from "../../../../../services/firebase/firebaseClient";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";

const firebaseClient = new FireBaseClient(DATABASE_NAME_ALBUM_SONG);

function albumSongFormEl() {
  const createAlbumSongForm = document.querySelector('#form-wrapper');
  createAlbumSongForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const albumIDsDom = document.querySelector('#albums-id');
    const songIDsDom = document.querySelector('#song-ids');
    let error = [];
    if (!albumIDsDom) {
      error.push('Không tìm thấy dom là #albums-id');
    } else if (!songIDsDom) {
      error.push('Không tìm thấy dom là #song-ids');
    }
    const albumIDsValue = albumIDsDom?.value;
    const songIDsValue = songIDsDom?.value;
    const songIDsArray = songIDsValue.split(',');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    if (albumIDsValue.trim() === '') {
      errorDiv.createText = 'Không được để trống ô AlbumID!';
      createAlbumSongForm.appendChild(errorDiv);
    } else if (songIDsValue.trim() === '') {
      errorDiv.createText = 'Không được để trống ô SongID!';
      createAlbumSongForm.appendChild(errorDiv);
    } else {
      errorDiv.remove();
      const albumSongData = {
        album_id: albumIDsValue,
        song_id_arr: songIDsArray,
      };
      sendRequestSongToFirebase(albumSongData);
    }
  });
};

async function sendRequestSongToFirebase(albumSongData) {
  for (const songID of albumSongData.song_id_arr) {
    const songData = { ...albumSongData, song_id: songID };
    await firebaseClient
      .setStoreSuccessMessage('Create album-song succeed!')
      .setStoreFailMessage('Create album-song failure!')
      .store(songData);
  }
  waitingRedirect('list-albums-songs.html', 3000);
}

albumSongFormEl();
