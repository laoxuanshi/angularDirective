# angular自定义指令
## 滚动公告
 - 功能：滚动公告，关闭后30秒不会出现
 - 使用方法：`<roll-Notice notice-List="noticeList"></roll-Notice>`
  ```
  $scope.noticeList = [
  {
      content:'通知1',
      contentLink: 'https://www.zhihu.com',
      contentLinkWord: '链接1'
  },
  {
      content:'通知2',
      contentLink: 'https://www.zhihu.com',
      contentLinkWord: '链接2'
  }
  ]
  ```
