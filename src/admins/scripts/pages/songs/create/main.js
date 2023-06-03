import FireBaseClient from "../../../../../services/firebase/firebaseClient";
import { DATABASE_NAME_SONG } from "../../../../../services/firebase/database";
import { waitingRedirect } from "../../../common/helpers";
let firebaseClientInstance = new FireBaseClient(DATABASE_NAME_SONG);
function songFormEl() {
    const createSongForm = document.querySelector('#form-wrapper');
    createSongForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameSongDom = document.querySelector('#name');
        const linkSongDom = document.querySelector('#link');
        const imageSongDom = document.querySelector('#image');
        let error = [];
        if (!nameSongDom) {
            error.push('Không tìm thấy dom là #nameSongDom');
        } else if (!linkSongDom) {
            error.push('Không tìm thấy dom #linkSongDom!');
        } else if (!imageSongDom) {
            error.push('Không tìm thấy dom #imageSongDom!');
        }
        const nameSongValue = nameSongDom?.value;
        const linkSongValue = linkSongDom?.value;
        const imageSongValue = imageSongDom?.value;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        if (nameSongValue.trim() === '') {
            errorDiv.textContent = 'Không được để trống ô tên bài hát!';
            createSongForm.appendChild(errorDiv);
        } else if (linkSongValue.trim() === '') {
            alert('Không được để trống ô url bài hát');
            errorDiv.textContent = 'Không được để trống ô url bài hát!';
            createSongForm.appendChild(errorDiv);
        } else if (imageSongValue.trim() === '') {
            errorDiv.textContent = 'Không được để trống ô ảnh bài hát!';
            createSongForm.appendChild(errorDiv);
        } else {
            errorDiv.remove();
            const songData = {
                name_song: nameSongValue,
                link_song: linkSongValue,
                image_song: imageSongValue,
            };
            sendRequestSongToFirebase(songData);
        }
    });
};

async function sendRequestSongToFirebase(songData) {
    firebaseClientInstance
        .setStoreSuccessMessage('Create song succeed!')
        .setStoreFailMessage('Create song failure!')
    const _SongID = await firebaseClientInstance.store(songData);

    if (_SongID) {
        waitingRedirect('list.html', 3000);
    }
}

songFormEl();
