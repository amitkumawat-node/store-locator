var axios = require('axios');
var baseUrl = 'http://127.0.0.1:3000/api';


const getNearByStore = (data, cb) => {
    var latitude = data.latitude ? data.latitude : 26.9124;
    var longitude =data.longitude ? data.longitude : 75.7873;
    var radius = data.radius ? data.radius : 5000;
    var stores = [];
	axios({
        method:'get',
        url: baseUrl+'/near-by-stores?latitude='+latitude+'&longitude='+longitude+'&radius='+radius,
        responseType:'application/json'
    }).then(response =>{	
        if(response.data.status == true){
            stores = response.data.data;
        }
        cb(null, stores);
    })
};

const addStore =(data, cb) => {
    axios({
        method: 'post',
        url: baseUrl+'/add-store',
        data: data,
        responseType: 'application/json'
    }).then(response => {
        if(response.data.status == true){
            cb(null, true)
        }
        else
        {
            cb(true, null)
        }
    })
}
module.exports={
    getNearByStore: getNearByStore,
    addStore : addStore
}