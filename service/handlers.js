
var _ = require('lodash')
var request = require('request');

function get_random_color2() 
{
    var r = function () { return Math.floor(Math.random()*256) };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}

const icing = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const base = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const top = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const filling = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const more_filling = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const cherry = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

const toppings = {
    get: function(payload){
        return new Promise((resolve, reject)=>{
            resolve({
                body:{color:get_random_color2()}
            })
        })
    }
}

module.exports = {
    cherry,
    toppings,
    icing,
    top,
    filling,
    more_filling,
    base,
}