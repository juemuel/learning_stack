"""
    需求：
        1. 实现聊天服务器
        2. 实现聊天客户端
    功能：
        1. 登录
        2. 退出
        3. 发送消息
        4. 获取离线消息
        5. 获取在线用户
"""
'''
    根据需求，设计了接口，完成了以下协议的制作，
    客户端发送如下不同dict，
    服务器通过action来分别解析
    
    qq这种软件实际上就在tcp协议基础上进一步封装的应用，当然会比这个模型复杂很多。
    相关的聊天协议还有XMPP协议、BT协议等，可以去看看
'''


# 协议与例子

# 登录
login_template = {
    "action": "login",
    "user": "bobby1"
}
# 给某个用户发送消息
send_data_template = {
    "action": "send_msg",
    "to": "user",
    "from": "user",
    "data": "i am bobby"
}
# 历史消息
offline_msg_template = {
    "action": "history_msg",
    "user": "user",
}
# 获取在线用户
get_user_template = {
    "action": "list_user"
}

# 退出
exit_template = {
    "action": "exit",
    "user": ""
}
