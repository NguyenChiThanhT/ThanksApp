const URL ="http://localhost:3000/person/";
function putPerson(id,name,count,countbegin,email,image) {
    return fetch(URL + id,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name:name,
            count:count,
            countbegin:countbegin,
            email:email,
            image:image
        }),
    })
        .then(res => res.json())
        .then(resJSON => resJSON)
        .catch(error => console.log(error))
}
export default putPerson;