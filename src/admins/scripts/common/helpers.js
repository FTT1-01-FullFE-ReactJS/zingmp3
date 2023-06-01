import toastr from 'toastr';
import { collection as firestoreCollection, getDocs } from 'firebase/firestore';
import { database } from '../../../services/firebase';

async function showList(collectionRef, renderDom) {
  const collectionSnapshot = await getDocs(firestoreCollection(database, collectionRef));

  const collection = [];
  collectionSnapshot.forEach((doc) => {
    collection.push({ ...doc.data(), id: doc.id });
  });

  renderDom(collection);
}


async function waitingRedirect(url, timeout) {
    await new Promise(resolve => setTimeout(resolve, timeout));
    window.location.href = url;
}
function catchException(key, errors = {}) {
    let customError = errors?.custom_error || 'N/A';
    let catchError = errors?.catch_error || 'N/A';

    let errorMessage = JSON.stringify({
        type: key,
        errors: {
            custom_error: customError,
            catch_error: catchError,
        }
    });

    throw new Error(errorMessage);
}
function showNotification(key) {
    return {
        error: function (message = '') {
            toastr.error(`[${key}]: ${message}`);
        },
        success: function (message = '') {
            toastr.success(`[${key}]: ${message}`);
        }
    }
}

export { waitingRedirect, catchException, showNotification, showList };
