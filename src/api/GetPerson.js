const URL = "http://localhost:3000/person";
function getPerson() {
    return fetch(URL)
        .then(res =>res.json())
        .then(resJSON =>resJSON)
}
export default getPerson;
