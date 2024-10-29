import 'package:flutter/material.dart';
class TodoItem {
  const TodoItem({required this.name});
  final String name;
}

// 定义一个回调函数类型，用于处理待办事项的状态变化
typedef void TodoStateChangedCallback(TodoItem todoItem, bool completed);

// 构建子项目列表项的小部件(构造、渲染)
class TodoListWidget extends StatelessWidget {
  // 构造函数
  TodoListWidget({
    required this.todoItem,
    required this.completed,
    required this.onStateChanged,
  }) : super(key: ObjectKey(todoItem));

  // 待办事项
  final TodoItem todoItem;
  // 是否完成
  final bool completed;
  // 状态修改时的回调
  final TodoStateChangedCallback onStateChanged;

  // 获取颜色
  Color _getColor(BuildContext context) {
    // 如果任务已完成，返回主题颜色，否则返回灰色
    return completed ? Theme.of(context).primaryColor : Colors.black54;
  }

  // 获取文本样式
  TextStyle? _getTextStyle(BuildContext context) {
    // 如果任务已完成，返回带有删除线的样式
    if (completed) {
      return TextStyle(
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
        onStateChanged(todoItem, !completed);
      },
      leading: CircleAvatar(
        // 圆形头像的颜色根据任务状态变化
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

// 主要的待办事项列表小部件
class TodoList extends StatefulWidget {
  // 构造函数
  TodoList({required Key key, required this.todoItems}) : super(key: key);

  // 待办事项列表
  final List<TodoItem> todoItems;

  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  // 用于存储已完成的待办事项
  Set<TodoItem> _todoList = Set<TodoItem>();

  // 处理待办事项状态变化的回调函数
  void _handleItemChanged(TodoItem todoItem, bool completed) {
    // 更新状态并触发重新构建
    setState(() {
      if (completed) {
        _todoList.add(todoItem);
      } else {
        _todoList.remove(todoItem);
      }
    });
  }

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
          return TodoListWidget(
            todoItem: todoItem,
            completed: _todoList.contains(todoItem),
            onStateChanged: _handleItemChanged,
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
      todoItems: const <TodoItem>[
        TodoItem(name: 'Reading'),
        TodoItem(name: 'Working'),
        TodoItem(name: 'Shopping'),
      ],
    ),
  ));
}
