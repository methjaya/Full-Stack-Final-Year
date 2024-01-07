import decode from "jwt-decode";


class AuthService {

  getProfile() {
    return decode(this.getJwtToken());
  }

 
  isLoggedIn() {
    try {
      const token = this.getJwtToken();

      if (!token) {
        return false;
      }

      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return false;
      }
      else {
        return true;
      }
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }


  getJwtToken() {
    return localStorage.getItem("id_token");
  }

  // get user id
  getUserId() {
    return this.getProfile();

  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

const Auth = new AuthService();
export default Auth;
