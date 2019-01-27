title: TRPG Engine开发手册——数据库框架迁移
date: 2019-01-24 16:36:55
tags:
- sequelizejs
- node-orm
- TRPG
- 后台
- node
- 数据库

---

## 为什么要迁移

TRPG Engine一开始设计是基于[node-orm](https://github.com/dresende/node-orm2)设计的数据库框架，对于一个后台系统来说。更换数据库框架是一件非常需要勇气的事情，其代价相当于项目重构。但是经过长时间的考虑，我还是决定将数据库框架从[node-orm](https://github.com/dresende/node-orm2)迁移到[sequelize](https://github.com/sequelize/sequelize)

迁移的理由:
- `sequelize`具有更加规范化的文档，便于学习
- `sequelize`天生支持`Promise`，而`node-orm`4版本以后虽然也支持`Promise`但是因为原函数为回调形式因此若要使用`find`的`Promise`版本需要使用`findAsync`
- `sequelize`对连接池的支持更加好，并能很大程度上减少数据库连接释放的问题。
- `sequelize`天生支持事务，但`node-orm`需要第三方插件。
- `sequelize`天生继承了一些中大型后台项目需要的一些特性如`timestamp`, `migrations`。而`node-orm`只有第三方开发者提供的插件，并没有官方支持。
- `node-orm`是一个很老的项目了，开发者的维护已经不在提供维护了，对于一些问题可能没法得到很好地解决。而`sequelize`的开发社区依旧非常活跃
- `sequelize`的star数是所有node的orm框架中最高，同类的orm还有[bookshelf](https://github.com/bookshelf/bookshelf), [persistencejs](https://github.com/coresmart/persistencejs)

## 迁移手册

### 注册方式


### 连接方式
首先`sequelize`是没有connect的概念的。它不像`node-orm`一样是需要在访问前先连接连接池。而是直接在操作连接实例上注册后操作数据库model即可。因此需要变更的部分为:
- 去除所有的connect方法
- 调整model的注册方式
- 直接返回给各个event app.storage.db， 而不是创建连接后的值。


### 关联方式
`sequelize`框架和`node-orm`一样有一对一、一对多、多对多的关联关系  
但是`node-orm`将其设定为两个接口，即hasOne和hasMany。其中hasOne同时可以是一对一关系和一对多关系  
迁移到`sequelize`时需要手动改写相对的关系，这一点无法借助重写方法的实现，因为`sequelize`同样有hasOne和hasMany接口且其意义不同。因此为了防止二义性，应当手动改写其方法。

### 数据库模型实例方法
在`node-orm`中模型的实例方法是在定义时的第二个参数中传入一个methods中的对象实现的，而`sequelize`是通过注册到模型对象的原型链`prototype`中实现。因此可以进行一个别名操作，即在注册数据库对象时重新定义define方法。将第二个参数的method提取出来并进行统一赋值。
