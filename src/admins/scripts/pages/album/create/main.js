import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database"
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';

function albumFormEl() {
    const createAlbumForm = document.querySelector('#form-wrapper');
    createAlbumForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumNameDom = document.querySelector('#album-name');
        const albumReleaseAtDom = document.querySelector('#release-at')
        if (!albumNameDom) {
            throw new Error('Không tìm thấy dom là #album-name!');
        } else if (!albumReleaseAtDom) {
            throw new Error('Không tìm thấy dom là #albumReleaseAtDom!');
        }
        const albumNameValue = albumNameDom?.value;
        const albumReleaseAtValue = albumReleaseAtDom?.value;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        if (albumNameValue.trim().length === 0) {
            errorDiv.createText = 'Không được để trống ô Album - Name!';
            createAlbumForm.appendChild(errorDiv);
        } else if (albumReleaseAtValue.trim().length === 0) {
            errorDiv.createText = 'Không được để trống ô năm phát hành!';
            createAlbumForm.appendChild(errorDiv);
        } else {
            errorDiv.remove();
        }
        const formData = new FormData();
        formData.append('name_album', albumNameValue);
        formData.append('release_at', albumReleaseAtValue);
        sendRequestSongToFirebase(formData);
    });
};

async function sendRequestSongToFirebase(formData) {
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM);
        const songDoc = addDoc(songCollection, {
            name_album: formData.get('name_album'),
            release_at: formData.get('release_at'),
            id_album: uuidv4(),
            create_at: serverTimestamp()
        });
        const data = await songDoc;
        if (data) {
            toastr.info('Create song succeed!');
            setTimeout(function () {
                window.location.href = 'list-album.html';
            }, 3000);
        }
    } catch (err) {
        toastr.info('Create song failure!');
    }
};
albumFormEl();