
const port = process.env.PORT || 1336;
const wss = require('socket.io')(port);
const connectStatus = require('./common.js').CONNECTION_STATUS;

wss.on(connectStatus.CONNECT, onConnection);

var users = {};
var userByConnection = {};
var userlist = {};
console.log("listenning on 1336");

// handle connection from user
function onConnection(ws) {
    console.log("Handle connection start");
    // listen on message 
    ws.on(connectStatus.DISCONNECT, onDisconnect);
    ws.on(connectStatus.MESSAGE, onMessage);
    ws.on(connectStatus.IDENT, onIdentify);
    ws.on(connectStatus.GET_USER_LIST, onGetUserList)

    //identify the user
    function onIdentify(userID) {
        // TÌm trong mảng user nếu user đã tồn tại 
        let user = users[userID];
        if (user) {
            // nếu user có tồn tại thêm kết nối (socket) vào mảng tài khoản đó ???
            user.push(ws);
        } else {
            // nếu chưa có user theo userid thì thêm mới với userID đó
            // Một user có thể có nhiều kết nối vậy nên gán theo mảng = [ws] chứ không phải = ws
            users[userID] = [ws];
        }

        // kiểm tra user đã có trên server chưa 
        let userinfo = userlist[userID];
        if (!userinfo) {
            userlist[userID] = userID;
        }

        // không hiểu đoạn ws.id được định nghĩa ở đâu
        userByConnection[ws.id] = userID;
        reportNewUser(userID);
    }

    function onGetUserList(userid) {
        console.log(`get user list for ${userid}`);
        let userconnections = users[userid];
        console.log(`Danh sách user hiện tại`, userlist);
        // loại thằng hiện tại ra khỏi danh sách user cần gửi
        let newlist = getPassDownUserList(userid);

        console.log(`Danh sách user đưa xuống cho ${userid}`, newlist);

        if (userconnections) {
            userconnections.forEach(x => {
                x.emit(connectStatus.GET_USER_LIST, newlist);
            });
        }
    }



    // handle disconnection
    function onDisconnect() {
        console.log("Disconnect handle start");
        // xóa các connection của user hiện tại 
        // lấy user iD từ mảng userbyConnection chứa userID theo mã của connection ? Có còn cách nào nhanh hơn không , tại sao lại phải lấy từ đây ????
        // Có thể do không lấy được từ user đã đăng xuất AKA đóng mẹ nó cửa sổ đang kết nối nên mới phải làm cách này, khổ vl
        let userid = userByConnection[ws.id]
        if (userid) {
            // Xóa trong mảng userByConnection đã
            delete userByConnection[ws.id];
            let userConnections = users[userid];
            if (userConnections) {
                //console.log("Kết nối của user :",userConnections);
                // vì 1 user có nhiều kết nối nên phải kiểm tra để xóa đúng kết nối đã disconnect
                if (userConnections.length > 1) {
                    userConnections.forEach((userConnection, index) => {
                        if (userConnection.id === ws.id) {
                            userConnections.splice(index, 1);
                        }
                    });
                    console.log(`User ${userid} vẫn còn ${userConnections.length} kết nối `);
                } else {
                    // Xóa trong danh sách user (trong danh sách này mỗi thằng chỉ có 1 đối tượng)
                    delete userlist[userid];
                    // Thông báo có user vừa disconect và update lại danh sách các user online cho thằng khác
                    updateUserList(userid);
                    ws.broadcast.emit(connectStatus.BROADCAST, `user ${userid} disconnected`);
                    delete users[userid];
                }
            }
        }

        console.log("Disconnected");
        // Remove listeners
        ws.removeListener(connectStatus.message, onMessage);
        ws.removeListener(connectStatus.IDENT, onIdentify);
        ws.removeListener(connectStatus.DISCONNECT, onDisconnect);
    }

    //handle message receive
    function onMessage(message) {
        console.log("Nhận tin nhắn từ ",message.to);
        receiverConnections = users[message.to]; // Mảng này chứa kết nối chứ không chứa thông tin user
    
        if (receiverConnections) {
            console.log('Receiver ' + message.to + ' is online on this server');
            
            receiverConnections.forEach(connection => {
                console.log("emitting receiver");
                connection.emit(connectStatus.MESSAGE, message);
            });
            
        } else {
            console.log('Receiver ' + message.to + ' is not online ')
        }

        // Vì một user có thể có nhiều kết nối nên  phải update lại tất cả các kết nối của user cũng hiển thị tin nhắn 
        senderConnections = users[message.from];
        if (senderConnections) { 
            console.log(`Sender ${message.from} có ${senderConnections.length} kết nối`);
            console.log("emitting sender");
            senderConnections.forEach(connection => {
                connection.emit(connectStatus.MESSAGE, message);
            });
        }
    }
    // Thông báo user mới connect với server
    function reportNewUser(userID) {
        // Báo cáo cho mấy thằng user là có thắng mới connect
        ws.broadcast.emit(connectStatus.BROADCAST, userID + ' Connected to server');
        updateUserList();

        // Hiển thị lại thông tin của thắng hiện vừa connect xem nó có mấy connection 
        let userConnections = users[userID];
        console.log(`User ${userID} có ${userConnections.length} kết nối`);
    }
}


// update lại danh sách các user online cho mấy thằng user khác
function updateUserList() {
    console.log("Update Lại danh sách user online cho các thanh niên còn lại ")
    // Trong danh sách userlist thì key và value là như nhau và nó có giá trị là userID
    Object.keys(userlist).forEach(key => {
            let userConnections = users[key];
            userConnections.forEach(x => {
                x.emit(connectStatus.UPDATE_USER_LIST, [userlist]);
            });
    });
    // Object.keys(users).forEach(x=>{
    //     if(x!=userID){
    //         //console.log(x+" "+userID);
    //         // Tại thắng này có nhiều kết nối nên có thể sẽ 
    //         users[x].forEach(y=>{
    //             y.emit(connectStatus.UPDATE_USER_LIST,[userlist]);
    //         })
    //     }
    // });
}
// Lấy danh sách các user trừ thằng đang yêu cầu ra
function getPassDownUserList(userID) {
    let newlist = [];
    if (userlist) {

        Object.keys(userlist).forEach(x => {
            if (userlist[x] != userID) {
                newlist.push(userlist[x]);
            }
        });
    }
    return newlist;
}



