const bcrypt = require('bcrypt');
const {MD5} = require('crypto-js');
const jwt = require('jsonwebtoken');

// const secret = 'mysecret';

// const secretSalt = 

// const user = {
//     id: 1,
//     token: MD5('angdawa').toString() + secretSalt
// }


// const receivedToken = '5ed34f06304fbdc779d8f9cd765e7bce';
// if(receivedToken === user.token){
//     console.log('move forward');
// }


// console.log(user)

const id = '1000';
const secret = 'supersecret';

const receivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y'


// const token = jwt.sign(id,secret);
const decode = jwt.verify(receivedToken,secret);

console.log(decode)