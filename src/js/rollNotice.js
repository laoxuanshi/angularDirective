/**
 * Created by laoxuanshi on 2017/7/10.
 * 功能：滚动公告，关闭后30秒不会出现
 * 使用方法：<roll-Notice notice-List="noticeList"></roll-Notice>
 *  $scope.noticeList = [
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
 */
angular.module("myApp", [])
    .controller('myCtrl', function($scope) {
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
        ];
    })
    .directive("rollNotice", function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                noticeList: '='
            },
            template: '<div class="rollNotice" ng-show="noticeShow" >' +
            '<ul>' +
            '<li  ng-repeat="item in noticeList"><span class="content">{{item.content}}</span><a ng-show="item.contentLink" href="//{{item.contentLink}}"  target=_blank>{{item.contentLinkWord}}</a></li>' +
            '</ul>' +
            '<span class="close" ng-click="closeNotice()"></span>' +
            '</div>',
            link: function ($scope, iElement, attrs, ctrl) {
                $scope.noticeShow = false;

                var cookieItem = document.cookie.match(new RegExp("(^| )" + "noticeClose" + "=([^;]*)(;|$)"));
                if (cookieItem && cookieItem[2]  === '0') {
                    $scope.noticeShow = false;
                } else {
                    if ($scope.noticeList.length === 0) {
                        $scope.noticeShow = false;
                    } else {
                        $scope.noticeShow = true;
                        if($scope.noticeList.length > 1) {
                            var timeId;
                            $(iElement).hover(function () {
                                clearInterval(timeId);
                            }, function () {
                                timeId = setInterval(function () {
                                    var first = $(iElement).find("ul:first");
                                    var height = first.find("li:first").height(); //获取第一个li的高度
                                    first.animate({"marginTop": -height + "px"}, 600, function () {
                                        first.css({marginTop: 0}).find("li:first").appendTo(first); //设置上边距为零，为了下一次移动做准备
                                    });
                                }, 3000);
                            })
                        }
                    }
                }

                $scope.closeNotice = function () {
                    var exp = new Date();
                    exp.timeId(exp.getTime() + 30 * 1000);
                    document.cookie = "noticeClose=0;expires=" + exp.toGMTString() + ";path=/;";
                    $scope.noticeShow = false;

                };

            }
        }
})