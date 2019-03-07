---
title: 前端编写全栈应用技术选型——rn、weex、apicloud到底选哪个
tags:
  - js
  - ReactNative
  - Weex
  - Apicloud
abbrlink: 481f2de4
date: 2017-10-24 14:20:47
---

## 前言

本文主要是经过部分调研，几种技术栈的初步调研与入门使用。以及部分网络资料的整理下得出的带有一部分主观判断的结论，并因互联网发展迅速的关系可能会有一定的时效性，因此在阅读本文的时候请读者酌情根据当前情况进行自己的思考与结论。

## 关于Apicloud

[apicloud](http://www.apicloud.com/)是国内一家闭源的html5移动端app解决方案提供商。用纯html的方式生成页面并通过原生注入jsbridge来与js进行交互。处理原生事件与页面切换。对于开发人员来说，是纯html+一个api事件。无需接触到任何底层，并如果有特殊需求可以自行开发原生应用模块来进行拓展。  
因为闭源的关系，国内社区并不是很火。因此名气不是很大。
类似产品有[AppCan](http://www.appcan.cn/)、[Dcloud](http://www.dcloud.io/)、[WeX5](http://www.wex5.com/wex5/)

## 技术比较

首先是一个对比表来区别几种技术栈。

| 技术特点 | Native | ReactNative | Weex | Apicloud |
|:-------:|:-------:|:-------:|:-------:|:-------:|
| 学习成本 | 高 | 中 | 中 | **低** |
| 开发成本 | 高 | 中 | **低** | **低** |
| 调试难度 | 难 | 难 | **简单** | 中 |
| 控制台输出 | **支持** | **支持** | **支持** | 不支持 |
| 断点调试 | **支持** | **支持** | **支持** | 不支持 |
| 开发工具 | **官方提供IDE** | 官方提供终端 | 官方提供终端 | **官方提供IDE** |
| 模拟器/真机 | 必须 | 必须 | **非必须** | 必须 |
| 开发硬件需求(ios) | Mac | Mac | **无** | **无** |
| 应用硬件需求(ios) | **All** | Android 4.1 (API 16), iOS 8.0+ | Android 4.1 (API 16), iOS 8.0+ and WebKit 534.30+ | *(未找到)* |
| 可拓展性 | **高** | 中 | 中 | 低 |
| 优化难度 | **低** | 中 | 中 | 高 |
| 渲染流畅 | **高** | **高** | **高** | 中 |
| 渲染方式 | **原生图形库** | Virtual DOM | Virtual DOM | Webview |
| 布局方式 | XML | React | Vue | **Html** |
| 样式写法 | 属性 | 基于css的对象 | 阉割版css | **原生css** |
| 代码结构 | **基于类** | **基于类** | **基于类** | 基于Page |
| 代码架构 | MVC | **MVVM** | **MVVM** | 无 |
| 技术栈 | JAVA+Android SDK;<br>OC/Swift + cocoa | React+ReactNative | Vue+Weex | **Html+Apicloud api** |
| 社区活跃度 | **活跃** | **活跃** | 一般 | 不活跃 |
| 开源闭源 | 开源(安卓,核心代码闭源);<br>闭源(ios) | 开源 | 开源 | 闭源 |
| 开源协议 | Apache(安卓) | [BSD](https://github.com/facebook/react-native/blob/master/LICENSE) | [Apache](https://github.com/apache/incubator-weex/blob/master/LICENSE) | / |
| 支持公司 | **谷歌苹果** | **Facebook** | **阿里巴巴** | 活了3年的小公司 |
| 坑量 | **少** | 多 | 多 | **少** |
| 遇坑概率 | **小** | 大 | 大 | **小** |
| 专业著作 | 《Android从入门到翻墙》;<br>《IOS从买Mac到装Windows》 | 《ReactNative从入坑到弃坑》 | 《Weex从信任到骂KPI》 | 无 |

以上大概是我个人总结出来的各个技术栈的区别。

## 关于KPI

为什么要在这里提一下KPI呢。就不得不说一说阿里传统。阿里的工资水平是基于 *关键绩效指标* 来进行升迁评估。因此为了个人、小组的工资待遇，必须要给上级做出点成绩来。也就是说要考虑到阿里的项目是不是基于这个原则来开源的项目。  
(PS: 据网络流传阿里内部自己都不用weex)  
这就是为什么业内普遍对weex很冷淡，而weex本身也没有花太多力气去推广。

## 关于技术选择

为什么说是技术选择呢？因为技术不是产品，技术是一种创新的态度。产品，要求的是稳，快。而技术，要的是新。如果是考虑技术的话。我会选择ReactNative 或者 Weex。这两者都是基于现代前端的MVVM架构诞生的以HTML技术编写原生应用的产品。它们不是用的手机端的html解释器与渲染引擎，而是以标签与嵌套描述原生组件的技术。因此它们的渲染效率可以直追原生应用。  
但是，它们尚不是一个很成熟的技术，不像原生技术有多年沉淀，不像html有厚重的历史。它们作为前端最前沿的技术（应当还要算上`NativeScript`），它们还比较年轻，换种说法就是坑比较多。在网上找找，大部分文章都是ReactNative踩坑大全、Weex踩过的坑。不可否认它们能够做出比较成熟，渲染效率也不错的APP应用。但是如果是作为一个产品的话，我们不得不计算上使用这个技术所需要花费的时间成本。

## 关于产品选择

如果只是为了实现一个产品的话。那么我推荐使用`Apicloud`等以html渲染方式的技术。其内核是`cordova`，前身是`phonegap`，也是前段跨平台编写原生应用的老前辈了。技术也是已经达到了一个相对成熟的地步。因为野心不大，所以坑少。牺牲一部分不明显的渲染效率来换取稳定且成熟的实现方式，我认为是一种很明智的选择。举个最简单例子。一个页面，原生渲染需要消耗10ms,而cordova需要消耗50ms。其中渲染效率相差整整5倍，然而实际上用户并不能感受到这之间明显的差别。当然如果是需要比较复杂的动画效果的话，这个问题可能会被放大。(人眼辨别连续运动的物体只需要每秒24帧，但是却可以很明显的感觉到每秒60帧与每秒30帧的区别)  
其问题还在于，对于喜欢折腾的技术人员来说，使用旧技术去做产品是一件很无趣的事情。如果是我自己的项目，我绝对不会去使用该类技术。因为真的很无聊。

## 代码风格

代码风格很重要，因为很明显的可以影响程序员的编写效率。一个好的框架可以极大程度上改变工作的进度。  
这里截取一部分代码，来感受下各个技术栈之间的差异。  


React: [F8App](https://github.com/fbsamples/f8app)
```javascript
var React = require('React');
var AppState = require('AppState');
var LoginScreen = require('./login/LoginScreen');
var PushNotificationsController = require('./PushNotificationsController');
var StyleSheet = require('StyleSheet');
var F8Navigator = require('F8Navigator');
var CodePush = require('react-native-code-push');
var View = require('View');
var StatusBar = require('StatusBar');
var {
  loadConfig,
  loadMaps,
  loadNotifications,
  loadSessions,
  loadFriendsSchedules,
  loadSurveys,
} = require('./actions');
var { updateInstallation } = require('./actions/installation');
var { connect } = require('react-redux');

var { version } = require('./env.js');

var F8App = React.createClass({
  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(loadNotifications());
    this.props.dispatch(loadMaps());
    this.props.dispatch(loadConfig());
    this.props.dispatch(loadSessions());
    this.props.dispatch(loadFriendsSchedules());
    this.props.dispatch(loadSurveys());

    updateInstallation({version});
    CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
  },

  componentWillUnmount: function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    if (appState === 'active') {
      this.props.dispatch(loadSessions());
      this.props.dispatch(loadNotifications());
      this.props.dispatch(loadSurveys());
      CodePush.sync({installMode: CodePush.InstallMode.ON_NEXT_RESUME});
    }
  },

  render: function() {
    if (!this.props.isLoggedIn) {
      return <LoginScreen />;
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
        <F8Navigator />
        <PushNotificationsController />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}

module.exports = connect(select)(F8App);
```

React 应用是基于组件(或者说类)，其特点是不直接接触html代码，而是返回一个虚拟dom，根据虚拟dom来修改前端显示。其所有的组件(包括根容器)都是基于`React.Component`这个类进行实现的，开发者要做的都是复写他的方法(主要是`render`方法)

-------

Weex: [yanxuan-weex-demo](https://github.com/zwwill/yanxuan-weex-demo)
```javascript
<template>
    <div class="wrapper">
        <text class="tlt iconfont">{{title}} &#xe74b;</text>
        <div class="box">
            <div class="box-item" v-for="i in items" @click="jumpWeb(i.url)">
                <image class="i-image" resize="cover" :src="i.bg"></image>
                <text class="i-name">{{i.name}}</text>
                <div class="i-price"><text class="i-price-n">{{i.price}}</text><text class="i-price-t">元起</text></div>
                <text class="i-state" v-if="i.state">{{i.state}}</text>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        background-color: #fff;
        padding-bottom: 6px;
    }
    .tlt{
        text-align: center;
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 26px;
        color:#333;
    }
    .box{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 750px;
    }
    .box-item{
        width: 350px;
        height: 226px;
        margin: 5px;
        padding: 20px;
        background-color: #efefef;
    }
    .i-name{
        position: relative;
        color:#333;
        font-size: 28px;
        width: 300px;
    }
    .i-price{
        position: relative;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
    }
    .i-price-n{
        color:#333;
        font-size: 36px;
    }
    .i-price-t{
        color:#333;
        font-size: 24px;
        margin-top: 12px;
    }
    .i-state{
        position: relative;
        font-size: 20px;
        color:#b8a989;
        width: 70px;
        margin-top: 10px;
        padding: 5px;
        line-height: 20px;
        text-align: center;
        border-width: 1px;
        border-color: #b8a989;
        border-radius: 4px;
    }
    .i-image{
        position: absolute;
        top:0;
        left: 0;
        width: 350px;
        height: 226px;
    }
</style>
<script>
    var navigator = weex.requireModule('navigator')
    import util from '../../src/assets/util';
    export default {
        props:["title","items"],
        data () {
            return {
            }
        },
        methods: {
            jumpWeb (_url) {
                if(!_url) return;
                const url = this.$getConfig().bundleUrl;
                navigator.push({
                    url: util.setBundleUrl(url, 'page/web.js?weburl='+_url) ,
                    animated: "true"
                });
            }
        }
    }
</script>
```

Weex2.x 是基于Vue作为前端驱动。一个vue文件是由`template`, `script`, `style`三个标签组成的。相比`React`更加趋近与网页端的写法。最后返回给解释器一个大对象，来对dom进行操作。当然我个人是不喜欢这种返回一个大对象的方式的。曾经也有一个类似操作一个大对象的前端工具叫`grunt`，然后被`gulp`取代了。。。

-------

Apicloud: [Answer](https://github.com/moonrailgun/Answer)
```html
<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <title></title>
    <link rel="stylesheet" type="text/css" href="../../css/api.css"/>
    <link rel="stylesheet" type="text/css" href="../../css/aui.css"/>
    <style>
        #userHeader {
            text-align: center;
            padding: 10px 0;
            background-color: #FFFFFF;
            margin-bottom: 10px;
        }
        #userHeader img {
            border-radius: 100%;
            width: 120px;
            height: 120px;
        }
        #userHeader h1 {
            font-size: 20px;
        }
        #userButton {
            display: -webkit-box;
            padding-bottom: 10px;
        }
        #userButton .aui-col-xs-6 {
            padding: 0 6px;
        }
        #userButton .aui-col-xs-6 .aui-btn {
            width: 100%;
            line-height: 26px;
        }
        #userInfo {
            background-color: #FFFFFF;
            padding: 0 12px;
            margin-bottom: 10px;
        }
        #userInfo li {
            border-bottom: 1px solid #e3e3e3;
            line-height: 56px;
        }
        #userInfo li:last-child {
            border-bottom: 0;
        }
        #userInfo li div {
            display: inline-block;
            margin-right: 15px;
            color: #8f8f94;
        }
    </style>
</head>
<body>
<div class="aui-content">
    <div id="userHeader">
        <img id="info-head" src="../../image/default_head.jpg"/>

        <h1 id="info-name">&nbsp;</h1>
    </div>
    <ul id="userInfo">
        <li>
            <div>性别</div>
            <span id="info-sex">&nbsp;</span>
        </li>
        <li>
            <div>学校</div>
            <span id="info-school">&nbsp;</span>
        </li>
        <li>
            <div>身份</div>
            <span id="info-role">&nbsp;</span>
        </li>
        <li>
            <div>简介</div>
            <span id="info-intro">&nbsp;</span>
        </li>
        <!--<li>-->
            <!--<div>话题</div>-->
            <!--<span id="info-topic-num">&nbsp;</span>-->
        <!--</li>-->
        <!--<li>-->
            <!--<div>回复</div>-->
            <!--<span id="info-reply-num">&nbsp;</span>-->
        <!--</li>-->
    </ul>
    <div id="userButton">
        <div class="aui-col-xs-6">
            <div class="aui-btn aui-btn-default" onclick="AddFriend();">关注</div>
        </div>
        <div class="aui-col-xs-6">
            <div class="aui-btn aui-btn-danger" onclick="SendMessage();">发消息</div>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="../../script/api.js"></script>
<script type="text/javascript">
    var userId;
    var userName, headImgUrl;
    var defaultHeadImg = '../../image/default_head.jpg';
    apiready = function () {
        $api.fixStatusBar($api.dom('header'));
        var pageParam = api.pageParam;
        userId = pageParam.userId;
        UpdateUserInfo(userId);
    };
    function UpdateUserInfo(userId) {
        if(!!userId){
            var model = api.require('model');
            var query = api.require('query');
            query.createQuery(function (ret, err) {
                if (ret && ret.qid) {
                    var queryId = ret.qid;
                    query.whereEqual({qid: ret.qid, column: 'id', value: userId});
                    query.include({qid: ret.qid, column: 'profile'});
                    model.findAll({
                        class: "user",
                        qid: queryId
                    }, function (ret, err) {
                        if (ret) {
                            var userInfo = ret[0];
                            var nickname = userName = userInfo.nickname;
                            var url = headImgUrl = userInfo.avatar ? userInfo.avatar.url : defaultHeadImg;
                            var profile = userInfo.profile || {
                                        role: '未知',
                                        school: '未知',
                                        intro: '这家伙很懒什么都没写',
                                        sex: '未知'
                                    };
                            $api.attr($api.byId('info-head'), 'src', url);
                            $api.html($api.byId('info-name'), nickname);
                            $api.html($api.byId('info-sex'), profile.sex);
                            $api.html($api.byId('info-school'), profile.school);
                            $api.html($api.byId('info-role'), profile.school);
                            $api.html($api.byId('info-intro'), profile.intro);
                        }
                    });
                }
            });
        }
    }
    //添加好友
    function AddFriend() {
        var myUserInfo = $api.getStorage('userInfo');
        if (!!myUserInfo && !!myUserInfo.userId && !!userId) {
            api.showProgress({
                style: 'default',
                animationType: 'fade',
                title: '努力加载中...',
                text: '先喝杯茶...'
            });
            var myUserId = myUserInfo.userId;
            var model = api.require('model');
            var query = api.require('query');
            query.createQuery(function (ret, err) {
                if (ret && ret.qid) {
                    var queryId = ret.qid;
                    query.whereEqual({qid: queryId, column: 'userId', value: myUserId});
                    model.findAll({
                        class: "Friends",
                        qid: queryId
                    }, function (ret, err) {
                        if (!!ret && ret.length > 0) {
                            //有该条数据
                            var data = ret[0];
                            var id = data.id;
                            var friends = data.friends;
                            if (!!friends.default) {
                                if (friends.default.indexOf(userId) >= 0) {
                                    //已经添加过
                                    api.toast({msg: '已经添加过该好友了'});
                                    return;
                                } else {
                                    friends.default.push(userId);
                                }
                            } else {
                                friends.default = [userId];
                            }
                            model.updateById({
                                class: 'Friends',
                                id: id,
                                value: {
                                    friends: friends
                                }
                            }, function (ret, err) {
                                api.hideProgress();
                                if (!!ret) {
                                    api.toast({msg: '添加好友成功'});
                                } else {
                                    api.toast({msg: '网络异常'});
                                }
                            })
                        } else if (!!ret && ret.length == 0) {
                            //没有该条数据
                            api.hideProgress();
                            model.insert({
                                class: 'Friends',
                                value: {
                                    userId: userId,
                                    friends: {
                                        default: [userId]
                                    }
                                }
                            });
                            api.toast({msg: '添加好友成功'});
                        }
                    });
                }
            });
        } else {
            api.toast({msg: '您尚未登录'});
        }
    }
    //发送消息
    function SendMessage() {
        if (!!userId && !!userName && !!headImgUrl) {
            api.openWin({
                name: 'chattingFrame',
                url: '../message/chattingFrame.html',
                pageParam: {
                    targetId: userId,
                    targetName: userName,
                    headImgUrl: headImgUrl,
                    conversationType: 'PRIVATE'
                }
            });
        }
    }
</script>
</html>
```

而`Apicloud`这种技术就是基于html实现的，而每个html对应一个网页对应一个窗口。和普通的网页编写非常类似。这也就是为什么该项技术成熟的原因。因为完全就是玩个的编写方式。当然区别就是提供了一个可以供js调用的原生服务的接口。

## 总结

具体选择哪项技术，要根据自己的实际需求来决定。任何脱离实际需求的选择都是耍流氓。  
但是，如果决定选择ReactNative或者Weex这样注定是未来趋势的新技术的话。就必须做好不断踩坑的打算，毕竟我们需要给予这些技术以发展的时间。当然，reactjs与vue已经是相对成熟的技术了，如果是为了学习的话。顺便学习一门新的技术也是一个不错的决定。
