class Api {

    static get(route) {
        return this.xhr(route,null,'GET');
    }
    static put(route,params){
        return this.xhr(route,params,'PUT');
    }
    static post(route,params){
        return this.xhr(route,params,'POST');
    }
    static delete(route,params){
        return this.xhr(route,params,'DELETE');
    }


    static headers(){
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
        }
    }
    static xhr(route,params,verb) {
        const host = 'http://localhost:3000';
        const url =`${host}${route}`;
        let options = Object.assign({method:verb}, params ? {body:JSON.stringify(params)} : null);
        options.headers = Api.headers();
        console.log(options);
        console.log(url)
        return fetch(url,options)
            .then(res =>res.json())
            .then(resJSON =>resJSON)
            .catch(err =>console.log(err))
    }
}
export default Api;