import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_SONG } from "../../../../../services/firebase/database";
import { v4 as uuidv4 } from 'uuid';
import toastr from 'toastr';
import { waitingRedirect } from "../../../common/common";

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
  try {
    const songCollection = collection(database, DATABASE_NAME_SONG);
    await addDoc(songCollection, {
      name_song: songData.name_song,
      link_song: songData.link_song,
      image_song: songData.image_song,
      id_song: uuidv4(),
      create_at: serverTimestamp(),
    });
    toastr.info('Create song succeed!');
    waitingRedirect('list.html', 3000);
  } catch (err) {
    toastr.info('Create song failure!');
    console.log(err);

  }
};

songFormEl();
