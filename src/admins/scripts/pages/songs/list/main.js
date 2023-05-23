import { query, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_SONG } from "../../../../../services/firebase/database";

const songQuery = query(collection(database, DATABASE_NAME_SONG));
onSnapshot(songQuery, snapshot => {
  const collection = [];
  snapshot.forEach(doc => {
    collection.push({...doc.data(), id: doc.id});
  });
  renderDom(collection);
});

function renderDom(songs) {
  console.log({ songs });
  const _html = songs.map(song => (
    `<tr>
    <td>${song.id}</td>
    <td>${song.name_song}</td>
    <td>
      <a href="${song.link_song}">${song.link_song}</a>
    </td>
    <td>
      <img width="30" height="30" src="${song.image_song}" alt="">
    </td>
    <td>
      <button>Delete</button>
      <button>Edit</button>
    </td>
  </tr>`
  ));

  document.querySelector('.table-data').innerHTML = _html.join('');
}