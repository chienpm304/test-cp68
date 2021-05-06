const io = require("socket.io-client")

var socket = io.connect("https://m.cophieu68.vn:6672");

// console.log(socket);

var _stockname = 'acb';

function requestInfoStock(){
    console.log("Requrest trigered!")
    // 

    // socket.emit('stockname', _stockname);
    socket.on("connect", () => {
        console.log('Connected' + socket.id); // x8WIv7-mJelg7on_ALbx
        socket.emit('stockname', _stockname);
    });
    socket.on("disconnect", () => {
        console.log('Disconnected' + socket.id); // undefined
    });
    socket.on('stockname_info', function(info) {
        if( info != "" ){
            console.log(info);
            var array_data = info.split("|");
            if( array_data[0] == _stockname ){
            // getAffectedStock(array_data);
            }
        }
    });
    socket.onAny((eventName, ...args) => {
        console.log(eventName, args);
    });

    socket.connect()
}

requestInfoStock();
// setInterval("requestInfoStock()", 10*1000);

// if (typeof(io) === 'object' ) {
    // requestInfoStock();
    // if( __hour >= 9 && __hour < 15 ){
    //     setInterval("requestInfoStock()", 10*1000);
    // }
// }
// socket.emit("hello", "world");

// socket.on("seq-num", (msg) => console.info(msg));

