import socket

http_client = socket.socket()
http_client.connect(("www.baidu.com", 80))
http_client.send("GET / HTTP/1.1\r\nConnection:close\r\n\r\n".encode("utf8"))

# 找到对应域名/ip，和端口，用request headers发送，即可模拟浏览器访问
# http_client.connect(("127.0.0.1", 8000))
# http_client.send("""
# 从f12中拿到request headers的文本即可，即可获得登陆状态下的页面
# """.encode("utf8"))

data = b""
while True:
    tmp = http_client.recv(1024)
    if tmp:
        data += tmp
    else:
        break

print(data.decode("utf8"))
