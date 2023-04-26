# qq服务器的基本功能、一直运行
# 1. 转发消息
# 2. 处理登陆
# 3. 处理退出
# 4. 维护历史消息，维护在线用户与维护用户连接
import socket
import threading
import json
from collections import defaultdict

# 1. 维护在线用户sock；
# 每连接一个client即维护其sock
# 使用defaultdict可有一个默认，即使为空
online_users = defaultdict(dict)

# 2. 维护用户的历史消息（即使离线也将保存在此处）
user_msgs = defaultdict(list)
exit = False

# 3. 创建socket并监听
server = socket.socket()
server.bind(("0.0.0.0", 8000))
server.listen()

def handle_sock(sock, addr):
    while True:
        # recv的时候需要解码decord
        data = sock.recv(1024)
        json_data = json.loads(data.decode("utf8"))
        action = json_data.get("action", "")
        # 1.若客户端要登陆，则在online_users中维护起对应用户的sock；
        if action == "login":
            # send的时候需要编码encode
            online_users[json_data["user"]] = sock
            sock.send("登陆成功！".encode("utf8"))
        # 2.若客户端需获取当前在线用户，则遍历获取
        # 语法熟悉：[a for b, c in d]，字典d以b:c(key:value)中遍历a
        elif action == "list_user":
            all_users = [user for user, sock in online_users.items()]
            sock.send(json.dumps(all_users).encode("utf8"))
        # 3.若客户端需获取历史信息：向客户发送data.user的信息
        elif action == "history_msg":
            sock.send(json.dumps(user_msgs.get(json_data["user"], [])).encode("utf8"))
            # if json_data["user"] in action:
            # sock.send(json.dumps(user_msgs[json_data["user"]])).encode("utf8")
        # 4.若客户端需发送信息：若data中to字段对应用户在online_user中，则向该用户发送data
        elif action == "send_msg":
            if json_data["to"] in online_users:
                online_users.get(json_data["to"]).send(json.dumps(json_data).encode("utf8"))
            user_msgs[json_data["to"]].append(json_data)
        # 5.若客户端需退出：则删除online_users中对应sock
        elif action == "exit":
            del online_users[json_data["user"]]
            sock.send("退出成功！".encode("utf8"))
while True:
    # 阻塞等待连接
    sock, addr = server.accept()
    # 启动一个线程处理用户连接
    client_thread = threading.Thread(target=handle_sock, args=(sock, addr))
    client_thread.start()

# 多线程去处理每个用户连接，防止主线程阻塞住
# 自定义了消息协议并且自己完成了消息协议的解析
