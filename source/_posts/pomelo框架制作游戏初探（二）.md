title: pomelo框架制作游戏初探(二) - 登陆模块
tags:
  - pomelo
  - 游戏开发
  - WhiteWord
  - NodeJS
date: 2015-12-09 13:58:39
---


好的那么接上篇[pomelo框架制作游戏初探（一）](/2015/11/26/pomelo框架制作游戏初探（一）/)
上篇初步介绍了pomelo框架的环境搭建与基本使用。那么现在开始来正式做一个项目吧，本次我想要做的项目是我自己根据Minecraft来的灵感想要做的一款沙盒类游戏，这里主要记录服务端与服务端交互的逻辑部分。

## 主界面 ##
![](/images/pomelo/login.jpg)

## 文件结构 ##
- /game-server #服务端代码
- /shared #共用逻辑
- /web-server #前端代码

## 服务端配置 ##
### 配置文件 ###
在pomelo框架下。服务端是基于一个JSON文件来实现服务端各个部分的数据交互的。该文件位于`/game-server/config/servers.json`。  

**servers.json**
```JSON
{
    "development": {
        "connector": [
            {
                "id": "connector-server-1",
                "host": "127.0.0.1",
                "port": 3150,
                "clientHost": "127.0.0.1",
                "clientPort": 3010,
                "frontend": true
            }
        ]
    },
    "production": {
        "connector": [
            {
                "id": "connector-server-1",
                "host": "127.0.0.1",
                "port": 3150,
                "clientHost": "127.0.0.1",
                "clientPort": 3010,
                "frontend": true
            }
        ]
    }
}
```
其中，有development和production两个参数分别表示开发环境和生产环境，来实现本地调试与正式运行相分离。下属为服务器的分类，常见的有connector服务器，chat服务器，gate服务器，area服务器等等，标识各种业务功能，如gate服务器负责负载均衡，将用户分配到不同的服务器处理。服务器分类下是一个数组。数组中每一个对象就是一个服务器的具体配置，配置的参数为:
- id #服务器的唯一标识
- host #服务器的ip地址
- port #服务器的连接端口号
- clientHost #面向客户端的ip，可不填
- clientPort #面向客户端的端口号，可不填
- frontend #客户端是否可见，当该值为true时clientHost与clientPort有效。默认为false
- ...

现在我想要添加一个gate服务器，来负责将连接的用户分配一个connector服务器来达到负载均衡的目的。那么我在`servers.json`的相应的地方加入这么一行参数：
`"gate": [{"id": "gate-server-1","host": "127.0.0.1","clientPort": 3014,"frontend": true}]`
[如何添加服务器>>](#添加服务器)

### 添加服务器 ###
对于pomelo来说，添加服务器很简单。如果代码按照规范写的话只需要修改`servers.json`配置文件即可。注意如果是要添加一个新的服务器类型的话需要在`/game-server/config/adminServers.json`中添加配置。否则直接修改`servers.json`配置文件会报错。如本例中添加了一个gate服务器类型：

**adminServers.json**
```JSON
[
    {
        "type": "connector",
        "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
    },
    {
        "type": "gate",
        "token": "agarxhqb98rpajloaxn34ga8xrunpagkjwlaw3ruxnpaagl29w4rxn"
    }
]
```

## 客户端连接 ##
### API ###
pomelo 框架提供了对客户端的API接口。这里暂时只讨论web端的API

- pomelo.init(params, cb) #初始化
- pomelo.request(route, msg, cb) #客户端请求
- pomelo.notify(route, msg) #客户端无回调请求
- pomelo.on(route, cb) #客户端响应
- pomelo.disconnect() #断开连接

### 客户端 ###
当打开网页时直接调用该代码。向gate服务器请求登陆
```javascript
function(){
	pomelo.init({
	    host: "127.0.0.1",
	    port: 3014,
	    log: true
	}, function () {
        //发送请求
	    pomelo.request("gate.gateHandler.queryEntry", {uid: 1}, function (data) {
	        alert(JSON.stringify(data));
	        pomelo.disconnect();
	    });
	})
}
```
初始化pomelo连接后，向服务器的`gate.gateHandler.queryEntry`请求数据，传递参数为`{uid: 1}`。

### 服务端 ###
** /game-server/app/servers/gate/handler/gateHandler.js **修改代码如下**:
```javascript
var Code = require('../../../../../shared/code');

module.exports = function(app){
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

//连接请求
Handler.prototype.queryEntry = function(msg, session, next) {
    var uid = msg.uid;//用户唯一标识
    if (!uid) {
        next(null, {code: Code.FAIL});
        return;
    }

    var connectors = this.app.getServersByType('connector');//获取服务器列表
    if (!connectors || connectors.length === 0) {
        next(null, {code: Code.GATE.FA_NO_SERVER_AVAILABLE});//没有可用的服务器
        return;
    }

    var res = connectors[0];//分配服务器
    next(null, {code: Code.OK, host: res.host, port: res.clientPort});//将分配数据传递给下层
};
```
其中code是一个客户端与服务端共用的数据集合。位于shared文件夹内
**/shared/code.js**
```javascript
module.exports = {
    OK: 200,
    FAIL: 500,

    ENTRY: {
        FA_TOKEN_INVALID: 1001,
        FA_TOKEN_EXPIRE: 1002,
        FA_USER_NOT_EXIST: 1003
    },

    GATE: {
        FA_NO_SERVER_AVAILABLE: 2001
    }
};
```

### 尝试连接 ###
当出现下图提示则说明连接正常。向gate服务器请求连接。gate服务器向用户分配了一个可用的连接服务器的IP与端口号
![](/images/pomelo/gateRequest.jpg)

## 客户端处理登陆请求 ##
好了。基本的请求分配服务器已经完成了。但是我们不能直接这么用。我们需要一个用户管理器去验证用户的账号密码，管理角色信息等等。这一部分和普通的网页是一致的。因此完全可以放在前端代码中写。`web-server`是基于express写的web服务器。这里直接在其中添加对账号与密码的验证。因为与pomelo框架无关所以不多累述。直接放出代码
**/web-server/app.js** 添加
```javascript
//登陆
app.post('/login', function(req, res) {
    var msg = req.body;

    var username = msg.username;
    var pwd = msg.password;
    if (!username || !pwd) {
        res.send({code: 500});
        return;
    }

    userDao.getUserByName(username, function(err, user) {
        if (err || !user) {
            console.log('username not exist!');
            res.send({code: 500});
            return;
        }
        if (pwd !== user.password) {
            // TODO code
            // password is wrong
            console.log('password incorrect!');
            res.send({code: 501});
            return;
        }

        console.log(username + ' login!');
        res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
    });
});
//注册
app.post('/register', function(req, res) {
    //console.log('req.params');
    var msg = req.body;
    if (!msg.name || !msg.password) {
        res.send({code: 500});
        return;
    }

    userDao.createUser(msg.name, msg.password, '', function(err, user) {
        if (err || !user) {
            console.error(err);
            if (err && err.code === 1062) {
                res.send({code: 501});
            } else {
                res.send({code: 500});
            }
        } else {
            console.log('A new user was created! --' + msg.name);
            res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
        }
    });
});
```
其中 **userDao** 是数据库用户管理对象。根据自己数据库来编写，用户从数据库中存取用户数据
