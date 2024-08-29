# socket 服务端，访问端口，以http形式返回内容
import socket
import json
import threading

# 1.调用sokcet()创建套接字
server = socket.socket()
# 这句话可以使socket关闭后，操作系统不保留端口，立即释放
server.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
# 2.调用bind()绑定本地ip和端口：绑定到0.0.0.0:8000 port
server.bind(('0.0.0.0', 8000))
# 3.调用listen()监听端口
server.listen()


# 4 获取客户端连接并启动线程去处理，并注释4；此时每来一个新用户运行一个模式
# Thread()方法中需要用方法而是不方法名的调用
def handle_sock(sock, addr):
    while True:
        # recv方法是阻塞的
        tmp_data = sock.recv(1024)
        print(tmp_data.decode("utf8"))
        welcome_page = '''HTTP/1.1 200 OK

<html>
    <head>
        <title>Build a website!</title>
    </head> 
    <body>
        Hello world, this is a very simple HTML documemt.
    </body>
</html>

'''
        sock.send(welcome_page.encode("utf8"))
        break
    # sock.close()放在哪里才合适？

while True:
    # 阻塞等待连接
    sock, addr = server.accept()
    # 启动线程去处理新的用户连接
    client_thread = threading.Thread(target=handle_sock, args=(sock, addr))
    client_thread.start()





