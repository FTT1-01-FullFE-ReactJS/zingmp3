import { auth, FacebookAuthProvider, signInWithPopup } from '../../../services/firebase';

const provider = new FacebookAuthProvider();
const facebookLoginButton = document.getElementById('login-facebook-button');

facebookLoginButton.addEventListener('click', async function() {
    // [Gọi api] tới facebook để xin login
    // Promise
    const data = await signInWithPopup(auth, provider);//10s
    console.log({
      data
    });
});