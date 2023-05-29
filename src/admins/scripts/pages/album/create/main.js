import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database"
import { waitingRedirect } from "../../../common/helpers";
import FireBaseClient from "../../../../../services/firebase/firebaseClient";

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
    let firebaseClient = new FireBaseClient(DATABASE_NAME_ALBUM);
    firebaseClient
        .setStoreSuccessMessage('Create song succeed!')
        .setStoreFailMessage('Create song failure!');

    const _albumID = await firebaseClient.store(albumData);

    if (_albumID) {
        waitingRedirect('list-album.html', 3000);
    }
};

albumFormEl();
