export function Find_Chat(ChatName, Chats) {
    
    for (var i=0; i< Chats.length; i++) {
        if (ChatName == Chats[i].Name) {
            return Chats[i];
        }
    }
    return null;
}