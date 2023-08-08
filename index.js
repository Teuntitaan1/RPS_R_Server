import { Server} from "socket.io";
import { Find_Chat } from "./Chatfunctions.js";

// chat functionality
var Chats = [{
    Name : "Test",
    Description : "The Best Chat Ever",
    Chat_Creation_Date : Date.now(),

    Messages : [],}
];

// server setup
const io = new Server({cors: {origin : "*",}});
io.on("connection", (Socket) => {
    console.log(`New Connection :)`);

    Socket.on("Join", (ChatName) => {
        
        const ChatExists = Chats.map((ChatIndex) => {return (ChatIndex.Name == ChatName ? true : false);}).includes(true);
        
        if (ChatExists) {
            Socket.join(ChatName);
            console.log("Gebruiker is ", ChatName, "Gejoind!");
            Socket.emit("ChatUpdate", Find_Chat(ChatName, Chats)); 
            Socket.emit("Join_Succes", ChatName);
        }
        else {
            Socket.emit("Chat_Error", "Deze chat bestaat niet!"); console.log("Gebruiker probeerde ", ChatName, "Te joinen maar deze bestaat niet!");  
        }
    });

    Socket.on("Leave", (ChatName) => {
        Socket.leave(ChatName);
    })     

    Socket.on("Create_Chat", (Chat) => {
        Chats.push(Chat);
    })


    Socket.on("Message", (Message) => {
        console.log("Got Message!");
        console.table(Message);
        Find_Chat(Message.To, Chats).Messages.push(Message);
        io.to(Message.To).emit("ChatUpdate", Find_Chat(Message.To, Chats));
        
    });

});

io.listen(4000);

const Example_Chat = {
    Name : "C5V1 Groepsapp",
    Description : "The Best Chat Ever",
    Chat_Creation_Date : Date.now(),

    Messages : [],
}

