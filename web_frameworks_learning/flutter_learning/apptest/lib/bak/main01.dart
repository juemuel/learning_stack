// main01 首页
import 'package:flutter/material.dart';

// 一、框架
// MaterialApp(title, home)、Material()、Scaffold()
// 二、布局与容器
// Row()横布局、Column()垂直布局、Center(); Container()方块容器、Expanded()弹性容器默认flex为1填满
// 三、基础组件
// Text()文本、AppBar()、ElevatedButton、FloatingActionButton、ListTile显列表
// GestureDetector()
// <Widget>[自定义()]
// IOS风格 Cupertino components
// 四、参数
// Image.network(URL)
// Color.xxxAccent
// 五、常见属性
// 标题与文本：leading、title、''文本
// 内容：home、child
// 颜色与样式：backgroundColor、decoration、color；style、height、width、mainAxisAlignment、CrossAxisAlignment
// 行为：onTap()、actions

// 一、主入口传入部件
void main() {
  runApp(const MaterialApp(
    title: 'My app',
    home: HomePage(),
  ));
}

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final VoidCallback? onMenuPressed;
  final VoidCallback? onSearchPressed;
  final String title;
  const CustomAppBar(
      {super.key,
      required this.title,
      this.onMenuPressed,
      this.onSearchPressed});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: const Icon(Icons.menu),
        tooltip: 'Menu',
        onPressed: onMenuPressed,
      ),
      title: Text(
        title,
        style: Theme.of(context).textTheme.headlineMedium,
      ),
      actions: <Widget>[
        IconButton(
          icon: const Icon(Icons.search),
          tooltip: 'Search',
          onPressed: onSearchPressed,
        ),
      ],
    );
  }
}

class CustomBody extends StatefulWidget {
  const CustomBody({super.key});
  @override
  CustomBodyState createState() => CustomBodyState();
}

class CustomBodyState extends State<CustomBody> {
  int _counter = 0;
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          const Text('You have pushed the button this many times:'),
          Text('$_counter'),
          ElevatedButton(
            onPressed: _incrementCounter,
            child: const Text('Click me'),
          ),
        ],
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: '首页',
        onMenuPressed: () {
          // 菜单按钮的回调函数
          print('Menu button pressed');
        },
        onSearchPressed: () {
          // 搜索按钮的回调函数
          print('Search button pressed');
        },
      ),
      // 内容部分
      body: Center(child: CustomBody()),
      // 悬浮按钮
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add',
        child: const Icon(Icons.add),
        onPressed: () {
          // 添加按钮的回调函数
          print('Add button pressed');
        },
      ),
    );
  }
}
