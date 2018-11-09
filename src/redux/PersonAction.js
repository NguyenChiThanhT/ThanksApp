import Login from '../api/Login';
import Api from '../api/Api';
import {AsyncStorage} from 'react-native';
export function fetchingPeopleRequest(){
    return {type: "FETCHING_PEOPLE_REQUEST"}
}
export function fetchingPeopleSuccess(person){
    return {
        type: "FETCHING_PEOPLE_SUCCESS",
        person: person
    }
}
export function fetchingPeopleFailure(error){
    return {
        type:"FETCHING_PEOPLE_FAILURE",
        errorMessage:error
    }
}
export function modalVisibleg() {
       return {type:"MODALVISIBLE"};
}
export function modalVisiblegPost() {
    return {type:"MODALVISIBLE_POST"};
}
export function setid(id,name,count,countbegin,email,image) {
    return {type:"ID",id:id,name:name,count:count,countbegin:countbegin,email:email,image:image}
}
export function LoginUser() {
       return dispatch =>{
            AsyncStorage.multiGet(["pass"]).then((data) =>{
                console.log(data);
            })
       }
}
export function SetUser(){
       return dispatch =>{

           Login()
               .then((results) =>{
                   password = results[0].password;
                   AsyncStorage.multiSet([
                       ["pass",password]
                   ])
               })
               .catch(error => dispatch(fetchingPeopleFailure(error)))
       }
}
export function togglemodalVisible() {
       return dispatch =>{
           dispatch(modalVisibleg())
       }
}
export function togglemodalVisiblePost() {
    return dispatch =>{
        dispatch(modalVisiblegPost())
    }
}
export function Defaultt(id,name,count,countbegin,email,image) {
       return dispatch =>{
               dispatch(modalVisiblegPost())
               var params = {id,name,count,countbegin,email,image};
               return Api.put('/person/'+id,params)
                   .then(res =>console.log(res))
                   .catch(error =>console.log(error))
       }
}
export function UpdateCountBegin(id,name,count,countbegin,email,image){
       return dispatch =>{
           dispatch(fetchingPeopleRequest())
           var params = {id,name,count,countbegin,email,image};
           return Api.put('/person/'+id,params)
               .then(res =>console.log(res))
               .catch(error =>console.log(error))
       }
}
export function SetId(id,name,count,countbegin,arrperson,email,image) {
       return dispatch =>{
           dispatch(setid(id,name,count,countbegin,email,image))
           dispatch(modalVisiblegPost())
           for (var i =0; i < arrperson.length; i++){
               if (arrperson[i].id === id) {
                   arrperson.splice(i,1);
               }
           }
           dispatch(fetchingPeopleSuccess(arrperson))
       }
}
export function SetPersonFromFileCSV(arrperson) {
    return dispatch =>{
        dispatch(fetchingPeopleSuccess(arrperson))
    }
}
export function fetchPeople(){
    return dispatch => {
        dispatch(fetchingPeopleRequest())
        return Api.get('/person')
            .then(results => dispatch(fetchingPeopleSuccess(results)))
            .catch(error => dispatch(fetchingPeopleFailure(error)))
    }
}