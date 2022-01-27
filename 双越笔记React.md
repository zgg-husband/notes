# React面试题

#### React组件如何通讯

#### JSX本质是什么

#### context是什么，有何用途

#### shouldComponentUpdate的用途

#### 描述redux单项数据流

#### setState是同步还是异步？（场景题）





# React vs Vue

#### React和Vue一样重要（特别是大厂面试），力求两者都会

#### React和Vue有很多相通之处，而且正在趋于一致

#### React比Vue学习成本高，尤其对初学者



# React使用

### 基本使用（常用，必须会）

​	**基础渲染**

- 变量、表达式
- class style
- 子元素和组件

**事件**

- bind this

- 关于event参数

  - 不传参的情况下，默认传一个event，这里的event是React封装的SyntheticEvent(组合事件)，模拟出来Dom事件所有的能力
  - 在传了参的情况下，最后追加一个参数 就是event事件对象

  - 所有的事件，都被挂载到document上（React17开始就不是绑在Document上了，而是绑定到了root组件上，有利于多个React版本共存，例如微前端）

  - 和Dom事件不一样，和Vue的事件也不一样

- 传递自定义事件



**表单**

- 受控组件
- input textarea select 用 value
- checkbox radio 用cheched



**组件使用**

- props传递数据
- props 传递函数
- props 类型检查

### 高级特性

### Redux和React-router使用

