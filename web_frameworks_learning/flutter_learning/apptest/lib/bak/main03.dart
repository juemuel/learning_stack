// mian03 常用布局
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Container',
    home: Center(child: _imageColumn()),
  ));
}

// 通过 Column 与 Row 的组合实现两行两列
Widget _imageColumn() => Container(
  decoration: const BoxDecoration(
    color: Colors.black26,
  ),
  child: Column(
    children: [
      _imageRow(),
      _imageRow(),
    ],
  ),
);
// 构建最终的 widget
Widget _imageContainer() => Expanded(
  child: Container(
    decoration: BoxDecoration(
      // 黑色边框
      border: Border.all(width: 10, color: Colors.black26),
      // 圆角
      borderRadius: const BorderRadius.all(const Radius.circular(4)),
    ),
    // 边距 4
    margin: const EdgeInsets.all(4),
    child: Image.network(
        'https://labfile.oss.aliyuncs.com/courses/2984/flutter.png'),
  ),
);
// 使用 Row 创建子元素
Widget _imageRow() => Row(
  children: [
    _imageContainer(),
    _imageContainer(),
  ],
);
