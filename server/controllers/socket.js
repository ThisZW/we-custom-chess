const socketIO = require('socket.io')

var users=[]
// This creates our socket using the instance of the server

// This is what the socket.io syntax is like, we will work this later
module.exports = (server) =>{

  const io = socketIO(server)

  io.on('connection', socket => {
    socket.emit('users',users)

    socket.on('disconnect', () => {
      console.log('user disconnected')
      users.pop({id:socket.id,guestId:socket.username})
      socket.emit('users',users)
    })

    socket.on('send invite', function (to) {
      console.log(`${socket.username} sned a incite to ${to}`)
      var tmpU = users.find(user => user.userId === to )
      if(tmpU){
        console.log(tmpU)
      io.to(`${tmpU.id}`).emit('reveiveInvite',{id:socket.id,name:socket.username});
      }
    })

    socket.on('accept', function (to) {
      io.to(`${to.id}`).emit('accept',{id:socket.id,name:socket.username});
    }); 

    socket.on('not accept', function (to) {
      var tmpU = users.find(user => user.userId === to )
      io.to(`${to.id}`).emit('not accept',socket.username);
    }); 


    socket.on('private message', function (to,board) {
      console.log(`${socket.username} send ${board}`)
      io.to(`${to}`).emit('receive pm',board);
    });

    socket.on('changeUserName', function(data) {
      if(socket.username!= data){
        users = users.filter(user => user.userId != socket.username);
        tmpU = users.find(user => user.userId === data )
        if(!tmpU) {
          socket.username = data
          users.push({id: socket.id,
            userId: data
          });
          io.emit('users',users);
        } else {
          socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
      }
      });
  });
}