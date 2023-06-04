import FireBaseClient from "../../../../../services/firebase/firebaseClient";
import { DATABASE_NAME_SONG } from "../../../../../services/firebase/database";

async function handle() {
  const firebaseClient = new FireBaseClient(DATABASE_NAME_SONG); // 1GB

  let listSongs = await firebaseClient.list();

  renderDom(listSongs);
}

function renderDom(data) {
  const _html = data.map(song => (
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

handle();
