class Auth {

  // static - this means the function can be called on the Class not an instance

  static setToken(token) {

    // key is set to 'token', and value is set to the token which is received from the backend
    return localStorage.setItem('token', token);
  }

  // get the token from local storage
  static getToken() {
    return localStorage.getItem('token');
  }

  // !! convert a value into its boolean form
  static isAuthenticated() {
    return !!this.getToken();
  }

  static isBar() {
    const token = this.getPayload();
    return !!(token.barId !== null);
  }

  static logout() {
    localStorage.removeItem('token');
  }

  // JWT token - 1st is header, 2nd, payload, 3rd is verified signature - split by a dot
  //  the 2nd one gives the user id
  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

}

export default Auth;
