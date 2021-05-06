const
    {Server} = require("socket.io"),
    server = new Server(8000);

let
    sequenceNumberByClient = new Map();

// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

const stocks = ['tcb', 'mbb', 'mwg', 'tpb', 'vhc'];

// sends each client its current sequence number
setInterval(() => {
    for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("stockname_info", stocks[Math.floor(Math.random() * 5)] + '|' + sequenceNumber);
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
}, 500);