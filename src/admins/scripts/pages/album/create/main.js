import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database"
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import { waitingRedirect } from "../../../common/common";

function albumFormEl() {
    const createAlbumForm = document.querySelector('#form-wrapper');
    createAlbumForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const albumNameDom = document.querySelector('#album-name');
        const albumReleaseAtDom = document.querySelector('#release-at');
        let error = [];
        if (!albumNameDom) {
            error.push('Không tìm thấy dom là #album-name!');
        } else if (!albumReleaseAtDom) {
            error.push('Không tìm thấy dom là #albumReleaseAtDom');
        }
        if (albumNameDom?.length) {
            let errorDomArr = error.map(function(message) {
                return `<span>${message}</span>`;
            });
            let errorDomHTML = errorDomArr.join('');
            document.getElementById('your-error-element-id').innerHTML = errorDomHTML;
        }
        const albumNameValue = albumNameDom?.value;
        const albumReleaseAtValue = albumReleaseAtDom?.value;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        if (albumNameValue.trim() === 0) {
            errorDiv.createText = 'Không được để trống ô Album - Name!';
            createAlbumForm.appendChild(errorDiv);
        } else if (albumReleaseAtValue.trim() === 0) {
            errorDiv.createText = 'Không được để trống ô năm phát hành!';
            createAlbumForm.appendChild(errorDiv);
        } else {
            errorDiv.remove();
            const albumData = {
                name_album: albumNameValue,
                release_at: albumReleaseAtValue,
            };
            sendRequestSongToFirebase(albumData);
        }
    });
};

async function sendRequestSongToFirebase(albumData) {
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM);
        const songDoc = addDoc(songCollection, {
            name_album: albumData.name_album,
            release_at: albumData.albumReleaseAtValue,
            id_album: uuidv4(),
            create_at: serverTimestamp()
        });
        const data = await songDoc;
        if (data) {
            toastr.info('Create song succeed!');
            waitingRedirect('list-album.html',3000);
        }
    } catch (err) {
        toastr.info('Create song failure!');
    }
};
albumFormEl();