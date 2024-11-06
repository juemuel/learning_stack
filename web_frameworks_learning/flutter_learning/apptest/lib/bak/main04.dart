// mian03 常用布局
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Container',
    // 配置首页（从上往下的列布局）
    home: _ConfigContainer(),
  ));
}

class _ConfigContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Views'),
      // ),
      body: Container(
          decoration: const BoxDecoration(
            color: Colors.white54,
          ),
          // 注意需要保证滚动视图有独立的ScrollController
          child:
          // NestedScrollView(
          //   headerSliverBuilder:
          //         (BuildContext context, bool innerBoxIsScrolled) {
          //       return <Widget>[
          //         const SliverAppBar(
          //           pinned: true,
          //           expandedHeight: 50.0,
          //           flexibleSpace: FlexibleSpaceBar(
          //             title: Text('悬浮标题'),
          //           ),
          //         ),
          //       ];
          //     },
          //   body:
          SingleChildScrollView(
            child: Column(
              children: [
                const Text('行布局'),
                _RowView(),
                _RowView(),
                const Text('宫格布局'),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 200), // 设置固定高度
                  child: _GridView(),
                ),
                const Text('列表容器'),
                ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 200), // 设置固定高度
                  child: _ListView(),
                ),
                const Text('堆叠容器'),
                _StackView(),
                const Text('卡片容器'),
                _CardView()
              ],
            ),
            // )
          )
      ),
    );
  }
}
// 1. 宫格布局
Widget _GridView() => GridView.extent(
  // shrinkWrap: true,
  // physics: NeverScrollableScrollPhysics(),
    maxCrossAxisExtent: 150,
    padding: const EdgeInsets.all(4),
    mainAxisSpacing: 4,
    crossAxisSpacing: 4,
    children: List.generate(6, (i) => Container(
        child: Image.network(
            'https://labfile.oss.aliyuncs.com/courses/2984/flutter.png'))
    )
);
// 2. 行布局
Widget _RowView() => Row(
  children: [
    _imageItem(),
    _imageItem(),
    _imageItem(),
    _imageItem(),
  ],
);
Widget _imageItem() => Expanded(
  child: Container(
    decoration: BoxDecoration(
      border: Border.all(width: 10, color: Colors.black26),
      borderRadius: const BorderRadius.all(const Radius.circular(4)),
    ),
    // 边距 4
    margin: const EdgeInsets.all(4),
    child: Image.network(
        'https://labfile.oss.aliyuncs.com/courses/2984/flutter.png'),
  ),
);
// 3.列表布局
Widget _ListView() => ListView.builder(
  // shrinkWrap: true, // 关键：使 ListView 不占据无限高度
  // physics: NeverScrollableScrollPhysics(), // 关键：禁用 ListView 的滚动
  itemCount: 3, // 列表项的数量
  itemBuilder: (context, index) {
    final items = [
      {'title': 'Tom', 'subtitle': '123-45678', 'icon': Icons.phone},
      {'title': 'Jerry', 'subtitle': '123-45678', 'icon': Icons.phone},
      {'title': 'Kitty', 'subtitle': '123-45678', 'icon': Icons.phone},
    ];

    if (index < items.length) {
      final item = items[index];
      return Column(
        children: [
          ListTitleItem(
            item['title'] as String, // 显式类型转换
            item['subtitle'] as String, // 显式类型转换
            item['icon'] as IconData, // 显式类型转换
          ),
          Divider(),
        ],
      );
    } else {
      return SizedBox.shrink(); // 返回一个空的 widget
    }
  },
);
ListTile ListTitleItem(String title, String subtitle, IconData icon) => ListTile(
  // 标题部分
  title: Text(title,
      style: TextStyle(
        fontWeight: FontWeight.w500,
        fontSize: 20,
      )),
  // 副标题，显示的是灰色和小字
  subtitle: Text(subtitle),
  // 左边的 icon
  leading: Icon(
    icon,
    color: Colors.blue[500],
  ),
);
// 4.堆叠流式布局
Widget _StackView() => Stack(
  alignment: const Alignment(0.6, 0.6),
  children: [
    // 图片是第一个子元素，会在最底部
    Image.network(
        'https://labfile.oss.aliyuncs.com/courses/2984/flutter.png'),
    // 这里我们创建一个黑色透明背景的文本元素在图片的上方
    Container(
      decoration: BoxDecoration(
        color: Colors.black45,
      ),
      child: Text(
        'This is Flutter',
        style: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    ),
  ],
);
// 5. 卡片布局
class _CardView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return _buildCard();
  }

  Widget _buildCard() => SizedBox(
    height: 210,
    child: Card(
      child: Column(
        children: [
          ListTile(
            title: Text('xxxx Street',
                style: TextStyle(fontWeight: FontWeight.w500)),
            subtitle: Text('Bei jing'),
            leading: Icon(Icons.theater_comedy, color: Colors.blue[500]),
          ),
          Divider(),
          ListTile(
            title: Text('(010) 123-1212',
                style: TextStyle(fontWeight: FontWeight.w500)),
            leading: Icon(Icons.contact_phone, color: Colors.blue[500]),
          ),
          ListTile(
            title: Text('hello@163.com'),
            leading: Icon(Icons.contact_mail, color: Colors.blue[500]),
          ),
        ],
      ),
    ),
  );
}
