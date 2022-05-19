# Sendgrid Node.js

This library allows you to quickly and easily use the Sendgrid API V3 via Node.js.

## Getting Started

### Installing

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://docs.npmjs.com/).

```
npm install --save sendgrid-v3-node
```

### Dependencies

* [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

## Quick Start

Sending a Single Email to a Single Recipient

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    to: 'TO_EMAIL' // REQUIRED: `string` email
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```

Sending a Single Email to a Single Recipient With a CC

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    to: 'TO_EMAIL', // REQUIRED: `string` email
    cc: 'TO_CC' // OPTIONAL: `string` email
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```

Sending a Single Email to a Single Recipient With a CC and a BCC

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    to: 'TO_EMAIL', // REQUIRED: `string` email
    cc: 'TO_CC', // OPTIONAL: `string` email
    bcc: 'TO_BCC' // OPTIONAL: `string` email
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```

Sending the same Email to Multiple Recipients

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    to: ['TO_EMAIL1', 'TO_EMAIL2', ...] // REQUIRED: array of `string` email
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```

Sending a Single Email to a Single Recipient With Multiple CCs/BCCs

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    to: ['TO_EMAIL1', 'TO_EMAIL2', ...], // REQUIRED: array of `string` email
    cc: ['TO_CC1', 'TO_CC2', ...], // OPTIONAL: array of `string` email
    bcc: ['TO_BCC1', 'TO_BCC2', ...] // OPTIONAL: array of `string` email
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```

Sending Two Different Emails to Two Different Groups of Recipients

```
const sendgrid = require('sendgrid-v3-node');

const mailOptions = {
    sendgrid_key: 'SENDGRID_KEY',
    from_email: 'FROM_EMAIL',
    from_name: 'FROM_NAME',
    groups: [
        {
            to: ['TO_EMAIL1', 'TO_EMAIL2', ...] or 'TO_EMAIL', // REQUIRED: array of `string` email or a `string` email
            cc: ['CC_EMAIL1', 'CC_EMAIL2', ...] or 'CC_EMAIL', // OPTIONAL: array of `string` email or a `string` email
            bcc: ['BCC_EMAIL1', 'BCC_EMAIL2', ...] or 'BCC_EMAIL', // OPTIONAL: array of `string` email or a `string` email
        },
        {
            to: ['TO_EMAIL1', 'TO_EMAIL2', ...] or 'TO_EMAIL', // REQUIRED: array of `string` email or a `string` email
            cc: ['CC_EMAIL1', 'CC_EMAIL2', ...] or 'CC_EMAIL', // OPTIONAL: array of `string` email or a `string` email
            bcc: ['BCC_EMAIL1', 'BCC_EMAIL2', ...] or 'BCC_EMAIL', // OPTIONAL: array of `string` email or a `string` email
        },
    ]
};

mailOptions.subject = 'SUBJECT';
mailOptions.content = 'CONTENT';
sendgrid.send_via_sendgrid(mailOptions).then(response => {
    console.log(response);
});
```