import toastr from 'toastr';
import { query, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { database } from '../../../services/firebase';

class renderDoms {
    static showList(collectionRef, renderDom) {
        const querySnapshot  = query(collection(database, collectionRef));
        onSnapshot(querySnapshot , snapshot => {
            const collection = [];
            snapshot.forEach(doc => {
                collection.push({ ...doc.data(), id: doc.id });
            });
            renderDom(collection)
        });
    }
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

export { waitingRedirect, catchException, showNotification, renderDoms };
