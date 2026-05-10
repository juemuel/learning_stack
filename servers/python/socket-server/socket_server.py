# socket 服务端
import socket
import threading

# 1.调用sokcet()创建套接字
server = socket.socket()

# 2.调用bind()绑定本地ip和端口：绑定到0.0.0.0:8000 port
server.bind(('0.0.0.0', 8000))

# 3.调用listen()监听端口
server.listen()


# 4.调用accept() 等待连接, 若无连接则阻塞等待
# sock, addr = server.accept()

# 5.1调用recv()等待传输的数据实现单向接收
# data = ""
# while True:
#     tmp_data = sock.recv(1024)
#     if tmp_data:
#         data += tmp_data.decode("utf8")
#         if tmp_data.decode("utf8").endswith("#"):
#             break
#     else:
#         break;
# print(data)


# 5.2调用recv()和send()实现服务端和客户端的双向通信
# 向客户端表示连接成功
# data = ""
# if True:
#     sock.send("哈！你终于连上了!".encode("utf8"))
#     while True:
#         tmp_data = sock.recv(1024)
#         print(tmp_data.decode("utf8"))
#         input_data = input()
#         sock.send(input_data.encode("utf8"))


# 5.4 获取客户端连接并启动线程去处理，并注释4；此时每来一个新用户运行一个模式
# Thread()方法中需要用方法而是不方法名的调用
def handle_sock(sock, addr):
    while True:
        # recv方法是阻塞的
        tmp_data = sock.recv(1024)
        print(tmp_data.decode("utf8"))
        input_data = input()
        sock.send(input_data.encode("utf8"))

while True:
    # 阻塞等待连接
    sock, addr = server.accept()
    # 启动线程去处理新的用户连接
    client_thread = threading.Thread(target=handle_sock, args=(sock, addr))
    client_thread.start()

# 6.调用close关闭套接字（循环使用时可省略）
sock.close()


