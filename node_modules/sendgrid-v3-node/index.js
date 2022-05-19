'use strict';
var axios = require('axios');

function throwError(err) {
    throw new Error(err);
}

module.exports.send_via_sendgrid = function(params) {
    var data = {
        'personalizations': [],
        'from': {
            'email': params.from_email,
            'name': params.from_name
        },
        'content': [
            {
                'type': 'text/html',
                'value': params.content
            }
        ]
    };
    if (params.hasOwnProperty('groups')) {
        if (typeof(params.groups) != 'object') {
            throwError('Invalid typeof "groups" in params. Must be array of objects.');
            return
        }

        params.groups.forEach(group => {
            var personalizations = {};
            var send_to = [];
            var send_cc = [];
            var send_bcc = [];
            
            if (!group.hasOwnProperty('to')) {
                throwError('Missing "to" in "groups" params.');
                return
            }

            if (typeof(group.to) == 'object') {
                group.to.forEach(email => {
                    send_to.push({ email });
                });
            } else {
                send_to.push({ 'email': group.to });
            }

            personalizations.to = send_to;

            if (group.hasOwnProperty('cc')) {
                if (typeof(group.cc) == 'object') {
                    group.cc.forEach(email => {
                        send_cc.push({ email });
                    });
                } else {
                    send_cc.push({ 'email': group.cc });
                }
    
                personalizations.cc = send_cc;
            }
    
            if (group.hasOwnProperty('bcc')) {
                if (typeof(group.bcc) == 'object') {
                    group.bcc.forEach(email => {
                        send_bcc.push({ email });
                    });
                } else {
                    send_bcc.push({ 'email': group.bcc });
                }
    
                personalizations.bcc = send_bcc;
            }

            personalizations.subject = group.subject;
            data['personalizations'].push(personalizations);
        });
    } else {
        var personalizations = {};
        var send_to = [];
        var send_cc = [];
        var send_bcc = [];

        if (!params.hasOwnProperty('to')) {
            throwError('Missing "to" in params.');
            return
        }
    
        if (typeof(params.to) == 'object') {
            params.to.forEach(email => {
                send_to.push({ email });
            });
        } else {
            send_to.push({ 'email': params.to });
        }
    
        personalizations.to = send_to;

        if (params.hasOwnProperty('cc')) {
            if (typeof(params.cc) == 'object') {
                params.cc.forEach(email => {
                    send_cc.push({ email });
                });
            } else {
                send_cc.push({ 'email': params.cc });
            }

            personalizations.cc = send_cc;
        }

        if (params.hasOwnProperty('bcc')) {
            if (typeof(params.bcc) == 'object') {
                params.bcc.forEach(email => {
                    send_bcc.push({ email });
                });
            } else {
                send_bcc.push({ 'email': params.bcc });
            }

            personalizations.bcc = send_bcc;
        }

        personalizations.subject = params.subject;
        data['personalizations'].push(personalizations);
    }

    return axios({
        method: 'POST',
        url: 'https://api.sendgrid.com/v3/mail/send',
        headers: {
            'Authorization': 'Bearer ' + params.sendgrid_key,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        data: JSON.stringify(data)
    });
}