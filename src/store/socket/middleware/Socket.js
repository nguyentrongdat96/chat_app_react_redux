import * as Protocols from '../../../contant/Protocols.js';
import io from 'socket.io-client';

export default class Socket {
    constructor(onChange, onMessage, onUpdateUserList,onBroadCast) {
        this.onBroadCast=onBroadCast;
        this.onChange = onChange;
        this.onMessage = onMessage;
        this.onUpdateUserList = onUpdateUserList;
        this.socket = null;
        this.userid = null;
        this.port = 1336; //////////////////////////// FIX cứng
    }


    // Sự kiện nhấn nút connect
    connect = (userid) => {
        console.log("User name ở đây",userid);
        this.userid = userid;

        const host = `http://localhost:${this.port}`;
        this.socket = io.connect(host);

        /// listener
        this.socket.on(Protocols.CONNECT, this.onConnect);
        this.socket.on(Protocols.DISCONNECT, this.onDisconnect);

    }

    // Connect event from socket
    onConnect = () => {
        this.sendIden();
        this.socket.on(Protocols.MESSSAGE, this.onMessage);
        this.socket.on(Protocols.UPDATE_USER_LIST, this.onUpdateUserList);
        this.socket.on(Protocols.BROADCAST,this.onBroadCast);
        //  Ông này thay đổi cái connect status :))
        this.onChange(true);
    }

    sendIden = () => this.socket.emit(Protocols.IDENT, this.userid);

    onDisconnect = () => {
        this.onChange(false);
    }
    
    sendMessage = (message) => {
        console.log("MESSAGE SENT ",message);
        this.socket.emit(Protocols.MESSSAGE, message);
    }

    requestUserList = (userid) => this.socket.emit(Protocols.UPDATE_USER_LIST, userid);

    disconnect = () => this.socket.close();

}