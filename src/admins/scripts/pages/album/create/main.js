import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database"
import { v4 as uuidv4 } from 'uuid';

function createAlbum() {
    const createAlbumForm = document.querySelector('#form-wrapper');
    createAlbumForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumNameDom = document.querySelector('#album-name');
        const albumReleaseAtDom = document.querySelector('#release-at')
        if (!albumNameDom || !albumReleaseAtDom) {
            throw new Error('Không tìm thấy dom là #album-name hoac dom là #albumReleaseAtDom');
        }
        const albumNameValue = albumNameDom.value;
        const albumReleaseAtValue = albumReleaseAtDom.value;
        if (albumNameValue.trim().length === 0 || albumReleaseAtValue.trim().length === 0) {
            toastr.info('Không được để trống các ô');
        }
        sendRequestSongToFirebase(albumNameValue, albumReleaseAtValue);
    });
};
async function sendRequestSongToFirebase(albumNameValue, albumReleaseAtValue) {
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM);
        const songDoc = addDoc(songCollection, {
            name_album: albumNameValue,
            release_at: albumReleaseAtValue,
            id_album: uuidv4(),
            create_at: serverTimestamp()
        });
        const data = await songDoc;
        if (data) {
            toastr.info('Create song succeed!');
            // window.location.href = 'list-album.html';
        }
    } catch (err) {
        toastr.info('Create song failure!');
    }
};
createAlbum();