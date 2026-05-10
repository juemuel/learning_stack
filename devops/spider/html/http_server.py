# socket服务端
# 可处理域名的直接访问localhost:8000; 为GET
# 可处理页面提交至该url的请求；为POST
import socket
import threading
import json

server = socket.socket()

# 这句话可以使socket关闭后，操作系统不保留端口，立即释放
server.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
# 绑定到0.0.0.0:8000端口上
server.bind(('0.0.0.0', 8000))
server.listen()

def handle_sock(sock, addr):
    while True:
        # recv方法是阻塞的
        # 若接收图片，则1024不够，1024*10试试
        tmp_data = sock.recv(1024*10)
        # 普通的url请求与文本类文件可以utf8，而图片等需要另外的
        tmp_data = tmp_data.decode("utf8")
        request_line = tmp_data.splitlines()[0]
        if request_line:
            method = request_line.split()[0]
            path = request_line.split()[1]
            if method == "GET":
                # action就在该路径下，直接访问首页GET，则返回html页面
                # 请求的资源共享给前端
                response_template = '''HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:63342

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/" method="POST" enctype="multipart/form-data">
    <input type="text" name="name"/>
    <input type="password" name="password">
    <input type="file" name="file">
    <input type="submit" value="登录">
</form>
</body>
</html>
            '''
                sock.send(response_template.encode("utf8"))
            elif method == "POST":
                response_template = '''HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:63342

{}
            '''
                data = [
                    {
                        "name": "django打造在线教育",
                        "teacher": "bobby",
                        "url": "https://coding.imooc.com/class/78.html"
                    },
                    {
                        "name": "python高级编程",
                        "teacher": "bobby",
                        "url": "https://coding.imooc.com/class/200.html"
                    },
                    {
                        "name": "scrapy分布式爬虫",
                        "teacher": "bobby",
                        "url": "https://coding.imooc.com/class/92.html"
                    },
                    {
                        "name": "django rest framework打造生鲜电商",
                        "teacher": "bobby",
                        "url": "https://coding.imooc.com/class/131.html"
                    },
                    {
                        "name": "tornado从入门到精通",
                        "teacher": "bobby",
                        "url": "https://coding.imooc.com/class/290.html"
                    },
                ]
                sock.send(response_template.format(json.dumps(data)).encode("utf8"))
                break
    sock.close()


# 获取客户端连接并启动线程去处理
while True:
    # 阻塞等待连接
    sock, addr = server.accept()

    # 启动一个线程去处理新的用户连接
    client_thread = threading.Thread(target=handle_sock, args=(sock, addr))
    client_thread.start()


