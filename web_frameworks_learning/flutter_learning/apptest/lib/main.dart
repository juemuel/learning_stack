// mian03 常用布局
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Container',
    home: _ConfigContainer(),
  ));
}
class _ConfigContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          color: Colors.black26,
        ),
        child: Column(
          children: [
            Text('行布局'),
            _RowView(),
            Text('宫格布局'),
            Expanded(
              child: _GridView(),
            )
          ],
        ),
      ),
    );
  }
}
Widget _GridView() => GridView.extent(
  maxCrossAxisExtent: 150,
  padding: const EdgeInsets.all(4),
  mainAxisSpacing: 4,
  crossAxisSpacing: 4,
  children: _buildGridTileList(4)
  
);
// 使用 Row 创建子元素
Widget _RowView() => Row(
  children: [
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
    child: Image.network('https://labfile.oss.aliyuncs.com/courses/2984/flutter.png'),
  ),
);
List<Container> _buildGridTileList(int count) => List.generate(
    count,(i) => Container(child: Image.network('https://labfile.oss.aliyuncs.com/courses/2984/flutter.png')));
