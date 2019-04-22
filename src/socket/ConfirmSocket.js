import SocketIOClient from 'socket.io-client';
import { func } from 'prop-types';
const socket = SocketIOClient('http://localhost:3003');

var inviting = false;

function receiveUsers(cb) {
    socket.on('users', onlineUsers => cb(null, onlineUsers));
}

function changeUserName(name){
    socket.emit('changeUserName',name)
}

function repeatedUserName(cb){
    socket.on('userExists',a =>cb(null))
}

function receiveInvite(cb){
    socket.on('receiveInvite', sender =>cb(null,sender));
}
function accept(cb){
    socket.on('accept', sender =>cb(null,sender));
}

function sendReceiveNotice(sender){
    socket.emit('accept',sender)
}

function rejectNotice(sender){
    socket.emit('not accept',sender)
}


function sendInvite(player){
    console.log('sending invite to ',player)
    socket.emit('send invite',player)
}

//game communication
function sendBoard(id,board){
    socket.emit('private message',id,board)
}
function receiveBoard(cb){
    console.log('i get a new message')
    socket.on('receive pm', board=>cb(null,board))
}


export {receiveUsers,
    changeUserName,
    repeatedUserName,
    receiveInvite,
    accept,
    sendReceiveNotice,
    rejectNotice,
    sendInvite,
    sendBoard,
    receiveBoard}