import Cookies from 'js-cookie';
function check_token() {
   if(!Cookies.get('user_access_token')) {
        window.location.href = 'login.html'
   }
};
export { check_token };