import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";
import { v4 as uuidv4 } from 'uuid';

function createAlbumSong() {
    const createAlbumSongForm = document.querySelector('#form-wrapper');
    createAlbumSongForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumIDsDom = document.querySelector('#albums-id');
        const songIDsDom = document.querySelector('#song-ids');
        if (!albumIDsDom || !songIDsDom) {
            throw new Error('Không tìm thấy dom là #albums-id hoac dom là #song-ids');
        }
        const albumIDsValue = albumIDsDom.value;
        const songIDsValue = songIDsDom.value;
        const songIDsArray = songIDsValue.split(',');
        if (albumIDsValue.trim().length === 0 || songIDsValue.trim().length === 0) {
            console.log('Không được để trống id album hoặc id songs');
        }
        sendRequestSongToFirebase(albumIDsValue, songIDsArray);
    });
};

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
        window.location.href = 'list-albums-songs.html';
    } catch (err) {
        alert('Create songs failure!');
    }
};
createAlbumSong();
