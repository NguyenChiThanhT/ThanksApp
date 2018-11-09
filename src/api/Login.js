const URL = "http://localhost:3000/user";
function LoginAPI() {
    return fetch(URL)
        .then(res =>res.json())
        .then(resJSON =>resJSON)
}
export default LoginAPI;
