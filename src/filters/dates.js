

import Vue from 'vue';
import moment from 'moment';




Vue.filter('date', function (value) {
    return moment(value).format('ddd')
})

Vue.filter('hours', function (value) {

    const hour = Math.floor(value / 3600);
    const minute = Math.floor(value / 60) % 60;
    const seconds = value % 60

    let d_hour = hour < 10 ? `0${hour}` : hour
    let d_minute = minute < 10 ? `0${minute}` : minute
    let d_seconds = seconds < 10 ? `0${seconds}` : seconds

    return `${d_hour}:${d_minute}:${d_seconds}`


})