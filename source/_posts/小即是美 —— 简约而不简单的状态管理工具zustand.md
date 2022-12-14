---
title: 小即是美 —— 简约而不简单的状态管理工具zustand
tags:
  - typescript
  - zustand
  - 状态管理
date: 2022-12-13 17:27:12
---

我用过或了解过前端业界大部分流行的状态管理库。他们有的很复杂，有的很简单。有的用了一些深度改造的手段来优化细节，有的则是平铺直叙的告诉所有使用者发生了变化。在技术方案诡异多变与层出不穷的当下，只有一个状态管理库让我深深着迷，她极度精简到让我觉得不能再简单了，但是她也足够完备到应对任何场景。而我就一直在追究这样的一个宛如艺术品一样的状态管理库，经过一段时间的使用，我很确定她就是我的梦中情库。

她的名字叫 `zustand`

Github: [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

## 极简定义

我们先看看其他业界的状态管理库的使用方式:

以比较主流的`redux`和`mobx`为例, 这里直接复制了官网的最小示例。

**redux(@reduxjs/toolkit)**

```typescript
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));
store.dispatch(incremented());
store.dispatch(incremented());
store.dispatch(decremented());
```

**mobx**

```typescript
import React from "react";
import ReactDOM from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();

// Build a "user interface" that uses the observable state.
const TimerView = observer(({ timer }) => (
  <button onClick={() => timer.reset()}>
    Seconds passed: {timer.secondsPassed}
  </button>
));

ReactDOM.render(<TimerView timer={myTimer} />, document.body);

// Update the 'Seconds passed: X' text every second.
setInterval(() => {
  myTimer.increase();
}, 1000);
```

在 `redux` 中，我们需要先构建 `reducer` 来记录如何处理状态，然后根据`reducer`构建一个`store`。取值是通过`store`来获取，修改则需要通过 基于`reducer`一一对应的`action`来修改。
这样就确保了数据流永远是单向流动的: 即 `UI -> action -> reducer -> state -> UI` 这样的过程。其响应式的实现就是在执行`action -> reducer`的过程中收集到了变化，然后通知所有订阅这个`store`的所有人。然后订阅者再通过名为`selector`的函数来比对变更决定自身是否要更新。

如:
```typescript
const Foo = () => {
  useSelector(state => state.count.value)
}
```

我们再来看看另一派的实现: `mobx` 定义了一个 `class` 作为存储数据的`store`, 而对于数据的任何修改都是用一种类似原生的方式 —— 直接赋值来实现的。即既可以直接访问`store`中修改里面的值也可以通过调用`store`暴露出的方法来修改数据。而数据的取值也是直接通过最简单的数据访问来实现的。
看上去非常美好，但是这是通过一些"黑魔法"来实现的，当执行`makeAutoObservable(this)`的那一刻，原来的成员变量已经不是原来的数据了，已经变成了由`mobx`包裹了一层实现的 **可观察对象**, 即这些对象的赋值与取值都不是原来的含义了。这也就是为什么`mobx`可以实现`reactive`响应式的原因。

这时候我们再来看看`zustand`是怎么做的:

```typescript
import create from 'zustand'

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

function BearCounter() {
  const bears = useBearStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}
```

是的，只需要简单的一个对象就定义了一个`store`，不需要特意去区分是`state`还是`action`, 也不需要特意去构造一个 `class` 来做的非常臃肿。`zustand` 就是用最简单的设计去做一些事情，甚至其核心代码只有`500`行不到。

> redux本身最核心的代码只有200行左右，但是如果要在react中使用需要加上`redux-react`和`@reduxjs/toolkit` 就远远超过了

另外可以注意到的是，`zustand`天生设计了一种场景就是`react`环境。其他"有野心"的状态管理库往往是从 `vanilla` 环境(纯js环境)开始设计，然后增加了对`react`的支持，可能后续还会增加其他框架的支持。但是`zustand`则不是，天生支持了`react`环境，然后基于`react`环境再衍生出`vanilla`环境的支持。

那么很多人就会好奇，既然都支持`vanilla`和`react`，那么从哪个环境开始设计有什么区别么？

答案是有的，从不同的环境开始会从底层设计上就带来很大的偏差，最后落地到使用方来说就是基本使用需要调用的代码、运行时以及复杂度的差异。在我过去的开发经验告诉我这样是正确的，我几乎没有看见过哪个库能同时在多个框架中都能如鱼得水的。不同的框架会有不同的生态，而哪些特有的生态则是最贴合的，如`redux`之于`react`，`pinia`之于`vue`, `rxjs`之于`Angular`。很少有哪个库能够在多个环境中"讨好"的。因此`zustand`就一种非常聪明的做法，专注于一点非常重要。

那么回到`zustand`的基本使用，我们可以看到`zustand`通过`create`导出的是一个 `react hook`, 通过这个`hook` 我们可以直接拿到store里面的`state`和`action`，非常类似于`redux`的`useSelector`。不同的是不需要`dispatch`来推送`action`, 也没有任何模板代码，数据类型天生区分了`state`和`action`, 只需要最简单的调用即可。

相比于`mobx`, 也没有什么"黑魔法", 简单而不容易出错。而且也不像`mobx`会因为依赖`class`实现的`store`而引入天然的问题(比如作为数据store不应该有生命周期，而`class`的`constructor`天生就成为了生命周期的一种)

> 人的恐惧往往来自未知，`mobx` 的对象就是这样的一个黑盒。这就是我不怎么喜欢 `mobx`的原因

## 那么，怎么应用到所有场景呢

`zustand`是一种非常简单的实现，简单到让人觉得是不是总有一些场合是无法覆盖到的。而这就是我觉得`zustand`是一件艺术品的原因。因为他总有巧妙的方式来不失优雅的适配任何我想要的场景。

### 在纯js中调用? 可以

```typescript
useBearStore.getState()
```

通过`getState`方式就可以获取最新的状态，在使用的过程中需要注意这是一个函数，目的是在运行时中获取到最新的值。里面的数据不是`reactive`的。

### 想要有作用域? 可以

```tsx
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

const store = createStore(...) // vanilla store without hooks

const StoreContext = createContext()

const App = () => (
  <StoreContext.Provider value={store}>
    ...
  </StoreContext.Provider>
)

const Component = () => {
  const store = useContext(StoreContext)
  const slice = useStore(store, selector)
  ...
```

与原生 `react` 的 `Context`结合就能实现作用域的效果。并且进一步将`store`的创建合并到组件中，也能获得组件相关的生命周期。

### 想要在不同的store中相互调用？可以

通过`useBearStore.getState()` 就能实现`store`间相互调用。当然需要注意管理好`store`间的依赖关系。

### 想要中间件? 没问题

`zustand` 的库自带了一些中间件，其实现也非常简单。参考`zustand/middleware`的实现可以学习如何制作`zustand`的中间件。

### 想要处理异步action？没问题

在`redux`早期，想要做异步`action`是非常头疼的事情，而`rtk`出来后会稍微好一点，但是也很麻烦。而在`zustand`，可以非常简单
```typescript
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))
```

## 不足与思考

再好的设计如果不加限制也会出现 `shit code`。想要把 `zustand` 这样小巧而精美的库用好而不是用坏需要一定的技术管理能力。盲目的去使用新的技术并不一定能给技术团队带来一些收益，但是可以带来新的思考。

另一方面，`zustand` 是一种全局`store`的设计，不能说这种设计不好，但是也意味着带来了一种比较经典的技术难题，即依赖管理。当项目中出现相互依赖的时候，如何管理，怎么确保在后续的维护中不构成污染，在调试时不会引入噪音。这是我认为所有的`全局store`都会面临的问题。
