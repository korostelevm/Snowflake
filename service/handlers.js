
var _ = require('lodash')
var request = require('request');


const users = {
    index: function(payload){
        var user_list = [
            {name: 'a'},
            {name: 'b'},
        ]
        return new Promise((resolve, reject)=>{
            resolve({
                body:user_list
            })
        })
    }
}

module.exports = {
    users,
}