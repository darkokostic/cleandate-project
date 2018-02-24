var server = require('http').Server();

var io = require('socket.io')(server);

var Redis = require('ioredis');
var redis = new Redis();
redis.psubscribe('chat-channel.*');



redis.on('pmessage', function (pattern, channel, message) {
    console.log('here');

    message = JSON.parse(message);
    console.log(channel);
    io.emit(channel + ':' + message.event, message);
});

server.listen(3000);