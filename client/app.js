var socket = io();

$('form').on('submit', function () {
    var text = {
        message: $('#message').val(),
        initials: $('#initials').val()
    }
    socket.emit('message', text);
    $('#message').val('');
    return false;
});

socket.on('message', function (msg) {
    $('<li>').text(msg).appendTo('#history');
})

socket.on('history', function (history) {
    console.log(history);
    if (history) {
        history.forEach(msg => {
            $('<li>').text(msg.initials + " " + msg.message).appendTo('#history');
        });
    }
})


