// mian03 常用布局
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
title: 'Row',
    // 横向排列
    home: Row(
      children: [
        Container(
          decoration: BoxDecoration(color: Colors.blueAccent),
          height: 100,
          width: 100,
        ),
        Container(
          decoration: BoxDecoration(color: Colors.redAccent),
          height: 100,
          width: 100,
        ),
        Column(
          children: [
            Container(
              decoration: BoxDecoration(color: Colors.blueAccent),
              height: 100,
              width: 300,
            ),
            Container(
              decoration: BoxDecoration(color: Colors.redAccent),
              height: 100,
              width: 300,
            ),
            Container(
              decoration: BoxDecoration(color: Colors.yellowAccent),
              height: 100,
              width: 300,
            ),
            Container(
              decoration: BoxDecoration(color: Colors.greenAccent),
              height: 100,
              width: 300,
            )
          ],
        ),
      ],
    ),
  ));
}
