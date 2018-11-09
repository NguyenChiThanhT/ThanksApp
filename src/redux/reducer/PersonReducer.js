const defaultState = {
    errorMessage:'',
    person:[],
    modalVisible:false,
    modalVisiblePost:false,
    id:0,
    name:null,
    count:null,
    countbegin:null,
    email:null,
    imahge:null
}
const personReducer = (state=defaultState,action) =>{
    switch (action.type) {
        case "FETCHING_PEOPLE_REQUEST":
            return {...state}
        case "FETCHING_PEOPLE_SUCCESS":
            return {...state,person:action.person}
        case "FETCHING_PEOPLE_FAILURE":
            return {...state,errorMessage:action.error}
        case "MODALVISIBLE":
            return {...state,modalVisible:!state.modalVisible}
        case "MODALVISIBLE_POST":
            return {...state,modalVisiblePost:!state.modalVisiblePost}
        case "ID":
            return {...state,id:action.id,name:action.name,count:action.count,countbegin: action.countbegin,email:action.email,image:action.image}
        default:
            return state;
    }
}
export default personReducer;