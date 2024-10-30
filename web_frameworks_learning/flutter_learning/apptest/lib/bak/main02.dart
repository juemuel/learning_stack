// main02 TODOList
import 'package:flutter/material.dart';

// 1.1 子元素
class TodoItem {
  TodoItem({required this.name, this.completed = false});
  final String name;
  bool completed;
}

// 1.2 子元素部件（无状态维护：部分数据由父部件构造维护，本身无需维护状态。）
class TodoItemWidget extends StatelessWidget {
  TodoItemWidget({required this.todoItem, required this.onStateChanged})
      : super(key: ObjectKey(todoItem));
  final TodoItem todoItem;
  final void Function(TodoItem todoItem) onStateChanged;
  Color _getColor(BuildContext context) {
    return todoItem.completed ? Theme.of(context).primaryColor : Colors.black54;
  }

  TextStyle? _getTextStyle(BuildContext context) {
    // 如果任务已完成，返回带有删除线的样式
    if (todoItem.completed) {
      return const TextStyle(
        color: Colors.black54,
        decoration: TextDecoration.lineThrough,
      );
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      // 点击时调用回调函数，更新任务状态
      onTap: () {
        onStateChanged(todoItem);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(todoItem.name[0]),
      ),
      title: Text(
        todoItem.name,
        style: _getTextStyle(context),
      ),
    );
  }
}

// 2.1 父元素
class TodoList extends StatefulWidget {
  // 把构造时传入的key，传递给StatefulWidget的构造函数，保证了widget的唯一性
  const TodoList({required Key key, required this.todoItems}) : super(key: key);
  final List<TodoItem> todoItems;
  // 首次渲染时，会调用createState()方法，返回一个StatefulWidget对象
  @override
  TodoListWidget createState() => TodoListWidget();
}

// 2.2 父元素部件
class TodoListWidget extends State<TodoList> {
  final Set<TodoItem> _finishedList = Set<TodoItem>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('To-Do List'),
      ),
      // 使用列表显示待办事项
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        children: widget.todoItems.map((TodoItem todoItem) {
          return TodoItemWidget(
            todoItem: todoItem,
            onStateChanged: (TodoItem todoItem) {
              // 更新状态并触发重新构建(底层通过脏值检查更新内容，复用之前的件，不会重新调用createState)
              setState(() {
                todoItem.completed = !todoItem.completed;
                if (todoItem.completed) {
                  _finishedList.add(todoItem);
                } else {
                  _finishedList.remove(todoItem);
                }
              });
            },
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'To-Do App',
    home: TodoList(
      key: const Key("todo"),
      todoItems: [
        TodoItem(name: 'Reading'),
        TodoItem(name: 'Working'),
        TodoItem(name: 'Shopping'),
      ],
    ),
  ));
}
