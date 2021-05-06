const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on("stockname_info", (msg) => console.info(msg));