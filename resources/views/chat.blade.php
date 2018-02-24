<!DOCTYPE html>
<html>
<head>
    <title>Chat App</title>
</head>
<body id="chat">

<form v-on="submit: send">
    <input v-model="message">
    <button>SEND</button>
</form>

<ul id="messages">
    <li v-repeat="message: messages">@{{message}}</li>
</ul>

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/0.12.15/vue.min.js"></script>

<script>
    var socket = io('http://homestead.dev:3000');

    new Vue({
        el: '#chat',

        data: {
            messages: [],
            message: ''
        },

        ready: function () {
            socket.on('chat-channel.*:App\\Events\\ChatEvent', function (response) {
                console.log(response);
                this.messages.push(response.data.message);
            }.bind(this));
        },

        methods: {
            send: function (e) {
                socket.emit('chat.message', this.message);
                this.message = '';
                e.preventDefault();
            }
        }
    });

</script>
</body>
</html>