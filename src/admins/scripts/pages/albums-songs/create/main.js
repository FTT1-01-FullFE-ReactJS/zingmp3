import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";
import { v4 as uuidv4 } from 'uuid';
import  toastr  from 'toastr'
import { waitingRedirect } from "../../../common/common";
function albumSongFormEl() {
    const createAlbumSongForm = document.querySelector('#form-wrapper');
    createAlbumSongForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumIDsDom = document.querySelector('#albums-id');
        const songIDsDom = document.querySelector('#song-ids');
        if (!albumIDsDom) {
            throw new Error('Không tìm thấy dom là #albums-id');
        } else if (!songIDsDom) {
            throw new Error('Không tìm thấy dom #song-ids');
        }
        const albumIDsValue = albumIDsDom?.value;
        const songIDsValue = songIDsDom?.value;
        const songIDsArray = songIDsValue.split(',');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        if (albumIDsValue.trim() === 0) {
            errorDiv.createText = 'Không được để trống ô AlbumID!';
            createAlbumSongForm.appendChild(errorDiv);
        } else if(songIDsValue.trim() === 0) {
            errorDiv.createText = 'Không được để trống ô SongID!';
            createAlbumSongForm.appendChild(errorDiv);
        } else {
            errorDiv.remove();
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
            const data = await songDoc;
            if(data) {
                toastr.info('Create song succeed!');
                waitingRedirect('list-albums-songs.html',3000);
            }
        });
    } catch (err) {
        toastr.info('Create song failure!');
    }
};
albumSongFormEl();
