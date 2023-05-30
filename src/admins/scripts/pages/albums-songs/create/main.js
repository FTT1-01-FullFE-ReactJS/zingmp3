import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr'
import { waitingRedirect } from "../../../common/helpers";



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
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM_SONG);
        for (const songID of albumSongData.song_id_arr) {
            const songDoc = await addDoc(songCollection, {
                id: uuidv4(),
                album_id: albumSongData.album_id,
                song_id: songID,
                create_at: serverTimestamp()
            });
            if (songDoc) {
                toastr.info('Create song succeed!');
                await waitingRedirect('list-albums-songs.html', 3000);
            }
        }
    } catch (err) {
        toastr.info('Create song failure!');
    }
};

albumSongFormEl();
