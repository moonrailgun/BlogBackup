title: Unity物理碰撞
tags:
  - unity
  - 游戏开发 

date: 2016-07-22 10:56:50 
---

unity物理碰撞大致能分为两大类：碰撞与触发。其碰撞具体属性由物体上的碰撞器组件（Collider）决定。而物体的物理性质由物体上的刚体组件（Rigidbody）决定。为使两个物体满足碰撞/触发条件。必须满足如下条件：
- 两个物体所在的层（Layer）为可相互碰撞的两个层
- 两个物体都必须有碰撞器组件
- 两个物体中至少有一个物体拥有刚体组件

满足如上条件方可使物体产生碰撞事件

碰撞与触发不同。碰撞会阻碍物体运动而触发不会。其区别由碰撞器组件上Is Trigger标识区别
碰撞函数：
OnCollisionEnter/OnCollisionExit/OnCollisionStay
触发函数：
OnTriggerEnter/OnTriggerExit/OnTriggerStay