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
- `sequelize`对连接池的支持更加好，并天然支持事务。
- `sequelize`天生继承了一些中大型后台项目需要的一些特性如`timestamp`, `migrations`。而`node-orm`只有第三方开发者提供的插件，并没有官方支持。
- `node-orm`是一个很老的项目了，开发者的维护已经不在提供维护了，对于一些问题可能没法得到很好地解决。而`sequelize`的开发社区依旧非常活跃
- `sequelize`的star数是所有node的orm框架中最高，同类的orm还有[bookshelf](https://github.com/bookshelf/bookshelf), [persistencejs](https://github.com/coresmart/persistencejs)
