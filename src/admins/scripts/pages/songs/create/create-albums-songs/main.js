
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../../services/firebase";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../../services/firebase/database";
import { v4 as uuidv4 } from 'uuid';

function createAlbumSong() {
    const createAlbumSongForm = document.querySelector('#form-wrapper');
    createAlbumSongForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumIDValue = document.querySelector('#albums-id').value;
        const songIDsValue = document.querySelector('#song-ids').value;
        const songIDsArray = songIDsValue.split(',');
        sendRequestSongToFirebase(albumIDValue, songIDsArray);
    });
}

async function sendRequestSongToFirebase(albumID, songIDsArray) {
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM_SONG);
        songIDsArray.forEach(async (songID) => {
            const songDoc = addDoc(songCollection, {
                id: uuidv4(),
                album_id: albumID,
                song_id: songID,
                create_at: serverTimestamp()
            });
            await songDoc;
        });
        alert('Create songs succeed!');
        window.location.href = 'list.html';
    } catch (err) {
        alert('Create songs failure!');
    }
}
createAlbumSong();
