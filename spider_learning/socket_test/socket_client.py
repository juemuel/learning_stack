# socket 客户端
import socket
# 1.调用socket()创建套接字
client = socket.socket()

# 2.调用connect()连接ip和端口
# win和mac/linux 的终端中查询自己的ip地址，可以填127.0.0.1或查到的本地ipv4地址10.171.13.76
# 虚拟机也会有额外的ip
client.connect(('127.0.0.1', 8000))

# 3.1调用send()向服务器传一个数据，两种方式：常用.encode
# client.send(b"hello")
# client.send("hello".encode("utf8"))

# 3.2调用send()，连续发送用户输入内容,以'#'作为结尾；
# 留意解码方式d.encode("utf-8")，将数据解码成utf-8格式
# while True:
#     input_data = input()
#     client.send(input_data.encode("utf8"))

# 3.3调用send()与recv()，实现发送端接收端双向通信，
# 客户端接收一次进入服务消息；接收多次服务应答
# server_data = client.recv(1024)
# print("server response:{}".format(server_data.decode("utf8")))
# while True:
#     input_data = input()
#     client.send(input_data.encode("utf8"))
#     server_data = client.recv(1024)
#     print("server response:{}".format(server_data.decode("utf8")))

# 3.4多
while True:
    input_data = input()
    client.send(input_data.encode("utf8"))
    server_data = client.recv(1024)
    print("server response:{}".format(server_data.decode("utf8")))

# 4. 关闭连接
client.close()
