# Vue2.x生命周期图示

![生命周期图示](C:\Users\久处不厌\Desktop\搞学习搞学习\assets\images\lifecycle.png)

# Vue面试题

#### v-show和v-if的区别

**学习前答**：v-show和v-if虽然都可以通过数据对组件或节点进行显隐，但是v-show的实现原理是使用display：none将元素隐藏

但是v-if是对元素进行注销和创建，使用场景：对于会频繁进行显隐控制的元素使用v-show，不频繁的使用v-if；

#### 为何v-for中要用key

首先必须要使用key，不用会警告，并且最好使用与业务相关的一个key，如id

原因：vdom的diff算法中，有三个准则

1. 之对比同级dom

2. 如果tag不相等直接重建下面的节点

3. tag和key都相等则视为相同节点

   使用key能够让 diff算法中的updateChildren 方法更高效；对比新旧vdom如果key相同，直接把旧的移动过来，不然重建，

   所以 key的唯一性很重要，如果用index，index和没有key 区别不大，起不到实质作用
   
   **官方回答：**
   
   必须用key，且不能是index和random
   
   diff算法通过tag和key判断，是否是sameNode
   
   减少渲染次数，提升渲染性能

#### 描述Vue组件生命周期（有父子组件的情况）

**学习前答**：beforCreate ：组件创建之前运行

​					created： 组件创建之后运行

​					beformount：组件挂载前

​					mounted：组件挂在后

​					beforUpdate：组件更新前

​					updated：组件更新后

​					beforDestroy ：组件销毁前

​					destroy ：组件销毁后

​	父子组件：创建 =》外内内外   挂载=》外内内外   更新：？  注销？



**官方回答：**

单组件生命周期图

父子组件的关系

#### Vue组件如何通讯

**学习前答**：props+$emit   自定义事件 vuex

​			**官方回答：**

​	父子组件 props和this.$emit

​	自定义事件：event.$on event.$off event.$emit

​	vuex		

​	



#### 描述组件渲染和更新的过程

**学习前答** ：说不清楚

官方回答：看图

#### 双向数据绑定v-model的实现原理

**学习前答** 使用input中的input事件

使用@input 事件



#### 对MVVM 理解

#### created和mounted有什么区别？

created 只是把vue的实例给初始化了，只存在内存中，并没有渲染

mounted 组件真正的在页面中渲染完成了



#### computed有何特点

缓存，data不变不会重新计算

提高性能



#### 为何组件的data必须是一个函数

最根本的核心是：我们定义的.vue文件是一个class，每个地方使用这个类的时候，

实际上是对这个类的实例化，如果是个对象，多次实例化，会变量池互相污染，

data是方法的话，便形成了闭包



#### ajax请求应该放在哪个生命周期

mounted

JS是单线程，ajax异步获取数据

放在mounted之前没有用，只会让逻辑更加混乱



#### 如何将组件所有的props传递给子组件

```
<user v-bind="$props" />
```



#### 自定义v-model

看下面代码

```vue
父组件
<template>
	<childComponent 
                    v-model:name="name"
                    v-model:age:"age"
                    ></childComponent>
</template>
<script>
export default {
	data(){
	return {
		name:"吴某人",
		age:23
	}
	}
}
</script>

子组件 childComponent.vue
<template>
	<input :value="name" @input="$emit("update:name",$event.target.value)"/>
	<input:value="age" @input="$emit("update:age",$event.target.value)"/>
</template>
exprot default {
	props:{
	name:String,
	age:Number
	}
}
</script>
```



#### 多个组件有相同的逻辑，如何抽离？

用mixin

缺点：多对多：容易混乱



#### 何时使用异步组件？

加载大组件的时候

路由异步加载的时候



#### 何时使用keep-alive？

Tab选项卡

缓存组件，不需要重复渲染



#### 何时需要使用beforDestory？

解除自定义时间 event.$off

清除定时器

解绑自定义的dom事件，如window  scroll等



#### 什么是作用域插槽？

自己看



#### vuex中action和mutation有何区别？

action中存放的异步方法

mutation中存放原子级的同步方法

action可以整合多个mutation



#### Vue-router 常用的路由模式

hash （默认）

H5 history （需要服务端支持）

两者项目



#### 如何配置Vue-Router异步加载

使用 ()=>import "../views/component.vue"



#### 请用vnode描述一个DOM结构

tag，props，children



#### 监听data变化的核心API是什么？

Object.defineProperty

以及深度监听，监听数组

有何缺点

a、无法监听数组使用方法（pop，push等）导致的变化，vue2,能够劫持，是把这些方法都重写了

b、劫持对象需要一次性递归，层数越深越消耗性能，没有proxy方便

c、监听不到对象属性的添加和删除

#### Vue如何监听数组变化？

Object.defineProperty 不能监听数组变化

重新定义原型，重写push pop等方法，实现监听

proxy可以原生支持数组变化



#### 请描述响应式原理

监听data变化

组件渲染和更新的流程



#### diff算法的时间复杂度？

O（n）



#### 简述diff算法过程

patch（elem，vnode）和 patch（vnode，newVnode）

patchVnode和addVnodes 和 removeVnodes

updateChildren (key的重要性)



####　Vue为何是异步渲染，$nextTick 有何用

提高渲染性能

$nextTick 会在渲染完成后执行回调



#### Vue常见的优化方式

合理使用v-show和v-if

合理使用computed

v-for时key使用与业务相关的唯一标示，以及避免和v-if同时使用

自定义事件，DOM事件及时销毁

合理使用异步组件

合理使用keep-alive

data层级不要太深

使用vue-loader 在开发环境做模板编译（预编译）

webpack层面的优化（后面讲）

前端通用的性能优化，如图片懒加载

使用SSR





# Vue基本使用

**重点**：

##### 基本使用

（1）v-html:会有XSS风险，会覆盖子组件

（2）｛｛｝｝中只能写表达式，不能写语句

（3）computed 有缓存，data不变则不会重新计算

（4）watch如何深度监听？答：见下面代码，使用 deep：true

（5）watch监听引用类型，拿不到oldVal，

```vue
//原理：引用类型，用的是引用地址而非值，所以新值和旧值用的是同一个地址，无法保存旧值

data:{
info:{
name:"aaa",
	city:{
	data:9
	}
}
},
watch:{
	info:{
	handler(oldVal,val){
		// 引用类型拿不到oldVal  
	},
	deep:true//深度监听
	}
}
```



##### 变量对象

```
style
:style ="{color:变量值}"
：style=["变量对象","变量对象"]
：style="变量对象"

class
:class="{类名：变量，类名：变量}"
：class=“[变量，变量]”
```



##### 条件渲染

（1）v-if v-else的用法，可使用变量，也可以使用===表达式

（2）v-if和v-show区别

（3）v-if和v-show使用场景

<span style="color:red;">*答案见上面面试题</span>



##### 循环（列表）渲染

（1）如何遍历对象？ ------------------- 也可以用v-for

（2）key的重要性。key不能乱写（如random或者index）,最好使用和业务相关的数据，如id

（3）v-for和v-if不能在同一个元素上使用！ 可以在v-for外层或内层用；



##### 事件

（1）event参数，自定义参数 ,event是原生的

```
如果绑定事件时，没有传参，方法中能够直接拿到event
否则需要用$event传过去
<button>+1< @click="handler"/button>
<button>+2< @click="handler2(2,$event)"/button>

handler(event){}
handler(val,event)
```



（2） 事件修饰符，按键修饰符；<span style="color:red;">*见文档</span>

（3）【观察】事件被绑定到哪里了，答：<span style="color:#ff6600;">事件被挂载到了当前元素上</span>>

​	

##### 表单

（1）v-model

（2）常见表单项 textarea checkbox radio select

（3）修饰符 lazy number trim

```vue
v-model.trim = "name" //去前后空格
v-model.lazy = "name" //输入之后变化，类似于防抖
v-model.number = "name" //转换成数值 
```







# Vue组件使用

（1）prop和$emit

```vue
父组件
<list :list = "list" @delete="deleteHandler"></list>
data:{
list:[]
}

子组件
<span @click = "deleteHandlerMy"></span>
props：{
	list:{
		type:Array,
		default(){
		return []
		}
	}
},
data:{
title:""
},
methods:{
deleteHandlerMy(){
this.$emit("delete",this.title)
}
}
```



（2）组件间的通讯 - 自定义事件

```vue
event  =new Vue()
event.$on  绑定自定义事件
event.$off 解绑自定义事件   组件销毁时解绑，否则会造成内存泄露
```



（3）组件生命周期

<span style="color:red;">*看官网图</span>

```vue
(1) 挂载阶段
(2) 更新阶段
(3) 销毁阶段
```

<span style="color:red;">父子组件情况</span>

create mounted 顺序

父c=>子c=>子m=>父m

beforUpdate updated顺序

父bu=>子bu=>子u=>父u





# Vue高级特性

**<span style="color:red;">*不一定常用，但一定要会</span>**

**<span style="color:red;">*考察候选人对Vue的掌握是否全面，且有深度</span>**

**<span style="color:red;">*考察做过的项目是否有深度和复杂性（至少能用到高级特性）</span>**

（1）自定义v-model  例如：颜色选择器

 *注意点： 子组件中的使用的是：value 而不是v-model

​					子组件的change和model.event要对应起来

​					text与props中的text对应起来

```
父组件
<Component v-model="name"></Component>
data:{
name:"sss"
}

子组件
<input type="text" :value="text" @input="$emit("change",$event.target.value)" />
model:{
		prop:"text",//对应props中的 text
		event:"change" //对应元素中的 change
},
props:{
	text:{
		type:String,
		default(){
		return "";
		}
		}
}
```



（2）$nextTick

​	Vue是异步渲染的框架

​	data数据改变之后，DOM不会立刻渲染

​	$nextTick 会在Dom渲染之后被触发，以获取最新DOM节点

```
1.vue操作节点后不是立即渲染，所以一般操作完data后，获取的先关联的节点数据不是最新的，$nextTick 会等到渲染完成后在回调，在回调中能拿到dom最新状态
2.页面渲染时会将data的修改做整合，多次data修改只会渲染一次

this.$nextTick(()=>{
	console.log(this.$refs.ulNode.length)
})
```



（3）slot（常用）

​	基本使用

```
父组件

<slotComponent :url="url">
{{obj.name}}
</slotComponent>
data:{
	url:"http://localhost:3000/home",
	obj:{
		name:"xxx",
		age:"23"
	}
}

子组件
<a :herf="url">
	<slot>
		{{text}}   <!-- 但是因为有值传过来，现在这里显示 xxx -->
	</slot>
</a>

props:{
	url:{
		type:String,
		default(){
		return ""
		}
	}
	
},
data:{
		text:"这是一段默认问题，没有传值过来的时候，显示这段文字"
}
```

​	<span style="color:red">**??作用域插槽</span>

```
父组件

<slotComponent :url="url">
	<template v-solt="slotProps">
			{{obj.soltData.name}}
	</template>
</slotComponent>
data:{
	url:"http://localhost:3000/home",
	obj:{
		name:"xxx",
		age:"23"
	}
}

子组件
<a :herf="url">
	<slot :slotData="obj">
		{{obj.text}}   <!-- 但是因为有值传过来，现在这里显示 xxx -->
	</slot>
</a>

props:{
	url:{
		type:String,
		default(){
		return ""
		}
	}
	
},
data:{
		obj:{
		text:"这是一段默认问题，没有传值过来的时候，显示这段文字"
		}
}
```



​	具名插槽

```
父组件
<slot name="header"></solt>
<slot ></solt>
<slot name="footer"></solt>


子组件
<slotComponent :url="url">
	<template v-solt:header>
			{{obj.soltData.name}}
	</template>
	{{obj.soltData.name}}
	<template v-solt:footer>
			{{obj.soltData.name}}
	</template>
</slotComponent>
```



（4）动态异步组件

**动态组件**
（1）动态组件<component :is="component-name"> 用法
（2）根据数据，动态渲染的场景，即组件类型不确定
**异步组件**

```
（1）import()函数
（2）按需加载，异步加载大组件
//只有用到的时候才会被加在，相对于直接声明出来，这样更节省性能
components:{
	FromDemo:()=>import("../FormDemo")  //使用这种方法挂载到父组件上
}
```



（5）keep-alive

a、缓存组件

b、频繁切换，不需要重复渲染

c、Vue常见性能优化

```
使用方法 
优势：v-if，每次切换会把上一次状态的组件销毁，然后挂载这一次的组件，v-show，会在最开始的时候就加在所有组件，v-if搭配上keep-alive之后，既不会一次性全部挂在，在切换的时候又不会销毁，只会缓存，当组件的占用体积很大的时候，这样能够节省性能；
tab切换，用keep-alive最佳
<keep-alive>
<span v-if="flag==='A'">A</span>
<span v-if="flag==='B'">B</span>
<span v-if="flag==='C'">C</span>
</keep-alive>
data：{
	flag:"A"
}
```







（6） mixin

​	a、多个组件有相同的逻辑，抽离出来

​			其实就是创建一个js文件 内容布局和vue文件中的<script></script>一样

```
	vue文件中
	<script>
	import mixin from "../mixin.js"
	
	{
		mixin:["mxin"]
	}
	</script>
	这样 该vue文件中能够直接使用mixin.js中定义的方法和属性
```

​	b、mixin并不是完美的解决方案，会有一些问题

​			<!-- 变量来源不明确，不利于阅读

​			<!-- 多个mixin会造成命名冲突

​			<!-- mixin和组件可能出现多对多的关系，复杂度较高

​	c、vue3提出CompositionApi旨在解决这些问题

（7）refs

```
<span ref="text"></span>

this.$refs.text === 这个span节点
```





# Vuex使用

##### 面试考点并不多（因为熟悉Vue之后，vuex没有难度）

##### 但基本概念，基本使用和API必须要掌握

##### 可能会考察state的数据结构设计（后面讲）

**概念：**

（1）state => 状态

（2）getters 

（3）action => 异步方法

（4）mutation =>同步方法 原子操作



**使用：**

（1）dispatch =>调用方法

（2）commit =>更改状态

（3）mapState =>获取状态

（4）mapGetters =>获取getters

（5）mapActions =>获取actions

（6）mapMutations =>获取mutations



<span style="color:red;">**vuex图是最重要的</span>



# Vue-Router 使用

##### 面试考点不多（前提熟悉Vue）

##### 路由模式（hash、H5、history）

hash模式：路由中有#号  （默认）

H5 history模式：没有#号

后者需要server端支，mode：history能够切换成history模式                          

##### 路由配置（动态路由、懒加载）

动态路由：

```
{
path:/home/:id,//动态路由
name:"home",
component:()=>import "../home.vue"//懒加载
}

vue文件中：
<route-link :to="{name:'home',id:7}"></route-link>
```





# Vue原理

面试为何考察原理？

```
知其然知其所以然；
了解原理，才能应用的更好（内卷）；
大厂造轮子（业务定制，技术KPI）；
```

面试中如何考察？以何种方式？

```
考察重点，而不是考察细节，掌握好2/8原则
和使用相关的原理，例如vdom、模板渲染
整体流程是否全面？热门技术是否有深度
```

Vue原理包括哪些？

##### （1）组件化

**“很久以前“就有组件化**

asp jsp php 已经有组件化了

nodejs中也有类似的组件化

**数据驱动视图（MVVM，state）**

传统组件，只是静态渲染，更新还是依赖操作Dom

数据驱动视图-Vue=>Mvvm  React=>setState

M(<span style="color:red;">model</span>)v(<span style="color:red;">view</span>)v(<span style="color:red;">viewModel</span>)M(<span style="color:red;">model</span>):

```
                ViewModel
view---------->Dom Listeners----------->Model
view<----------Directives  <-----------Model

template对应view层
script中的data等对应model层
view通过时间更改model层，model层更改之后，因为双向绑定view层也会根据model的更改而更改
```



##### （2）响应式

组件data的数据一旦变化，立刻触发视图的更新

实现数据驱动视图的第一步

核心API-Object.defineProperty

Object.defineProperty的一些缺点（使用proxy代替）

但proxy兼容性不好，且无法polyfill

##### （3）vdom和difff

vdom是实现vue和react的重要基石

diff算法是vdom中最核心，最关键的部分

```
普通Dom
Dom操作非常消耗性能
以前用jQuery，可自行控制Dom操作的时机，手动调整

vDom
使用js模拟DOM结构（vnode）
//使用文档碎片，将所有的元素放到其中，使用js进行操作，操作完成之后一次性放到Dom中
新旧vnode对比，得出最小的更新范围，最后更新Dom  （diff算法）
数据驱动视图的模式下，有效控制DOM操作

diff算法
diff算法是vdom中最核心，最关键的部门
diss算法能在日常中使用vue React中体现出来（如key）

diff算法概述
diff=》”对比“，是一个广泛概念，如linux diff命令、git diff等
两个js也可以做diff，如 https://github.com/cujojs/jiff
两棵树做diff，vdom就是

diff算法将时间复杂度从 O(n^3) 优化到了O(n)
只比较同一层级，不跨级比较
tag不相同，则直接删掉重建，不再深度比较
tag和key，两者都相同，则认为是相同节点，不再做深度比较


diff算法总结
patchVnode
addVnodes removeVodes
updateChildren（key的重要性）


vdom和diff 总结
vdom核心概念很重要：h、vnode、patch、diff、key等
vdom存在的价值更加重要：数据驱动视图、控制Dom操作

patchNode  将新旧Vdom进行对比
updateChildren  对比children中有没有相同节点，相同的不变，不同的重建
```



##### （4）模板编译

（1）js的with语法

（2）模板render函数，再到vnode，再到渲染和更新

（3）vue组件可以用render代替template



##### （5）渲染/更新过程

（1）一个组件渲染到页面，修改data触发更新（数据驱动视图）

（2）其背后原理是什么，需要掌握哪些要点？

（3）考察对流程了解的全面过程

```
响应式：监听data属性getter setter(包括数组)
模板编译：模板到render函数，再到vnode
vdom：patch(elem,vnode)和patch(vnode,newVnode)

初次渲染过程：
1、解析模板为render函数（或在开发环境已完成，vue-loader）
2、触发响应式，监听data属性getter setter
3、执行render函数、生成vnode patch(elem,vnode)

更新过程
1、修改data，触发setter（此前在getter中已被监听）
2、重新执行render函数，生成newVnode
3、patch(vnode,newVnode)

异步渲染
1、回顾$nextTick
2、汇总data的修改，一次性更新视图
3、减少Dom操作次数,提高性能

总结：
渲染和响应式的关系
渲染和模板编译的关系
渲染和vdom的关系
```



##### （6）前端路由

**如何使用js实现hash路由**

##### hash的特点

（1）hash的变化会触发网页跳转，即浏览器的前进，后退

（2）变化不会刷新页面，spa必须的特点

（3）hash永远不会提交到server端（前端自生自灭）

##### H5 history

（1）用url规范的路由，但跳转时不刷新页面

（2）history.pushState //跳转路由

（3）window.onpopstate //监听浏览器前进后退事件

总结：这种模式就是，通过  history.pushState({name:"page1"},"","page1") 这个方法跳转页面，需要后端支持



# Vue原理-总结

（1）组件化的历史

（2）数据驱动视图

（3）MVVM

（4）Object.defineProperty

（5）劫持数据

（6）Object.defineProperty的缺点

（7）vdom和diff应用背景

（8）vnode结构

（9）snabbdom使用：vnode、h、patch

（10）with语法

（11）模板编译为render函数

（12）执行render函数生成vnode

（13）初次渲染过程

（14）更新过程

（15）异步渲染

（16）hash

（17）H5 history

（18）两者对比





Vue面试真题演练

**1、vnode之于Vue的作用**

答：vnode是用JS对象模拟一个DOM树结构，在真实的DOM节点发生改变时，将改变映射到vnode，

然后利用diff算法和key对vnode进行对比，比对出最小改动的DOM，然后异步渲染将改变最终对应

到真实的DOM上，即以最小的成本更新DOM。

Vue利用vnode这样一个JS对象，一方面对DOM结构有了一份JS解析，一方面在接收到DOM修改时，

生成一份新的vnode，Vue能利用这份新vnode与旧的vnode进行对比，再直接修改DOM之前，做一

层拦截和过滤，帮助Vue在DOM渲染时，提高了性能；

自答：vnode是一份节点的js数据备份，相对于DOM节点，vnode这样的数据结构，更方便使用js

对其增删改查以及对比；



# Vue3

# Vue3.x生命周期图示

![](C:\Users\久处不厌\Desktop\搞学习搞学习\assets\images\lifecycle3.x.svg)



## Vue3面试题

#### Vue3比Vue2有什么优势？

答：1、性能更好                                4、更好的代码组织

​		2、体积更小								5、更好的逻辑抽离

​		3、更好的ts支持						 6、更多的新功能

#### 描述Vue3生命周期

答：

（1）optionsAPI 生命周期

​	beforeDestroy 改为 beforeUnmount

​	Destroy改为Unmounted

​	其他的和Vue2 一样

（2）Composition API生命周期

​	beforeCreate和created被setup代替

​	其他的都和options API一样

​			

#### 如何看待Composition API 和Options API?

答：

（1）Composition API带来了什么？

​		1、更好的代码组织

​		2、更好的逻辑复用（有一道专门的面试题）

​		3、更好的类型推导

（2）CompositionAPI和OptionsApi如何选择

​		1、不建议共用，会引起混乱

​		2、小型项目、业务逻辑简单，用OptionsAPI

​		3、中大型项目、逻辑复杂、用CompositionAPI

（3）不要误解CompositionAPI

CompositionAPI属于高阶技巧，不是基础必会

CompositionAPI是为了解决复杂业务逻辑而设计的

CompositionAPI就像Hooks在React中的地位

#### 如何理解ref toRef和toRefs？

（1）这些是什么？

​		1、ref

​			a、生成值类型（不是引用型类型）的响应式数据

​			b、可应于模板和reactive

​			c、通过.value修改值

​			d、能够获取DOM元素

```vue
<template>
<p ref="elemRef">这是一行文字</p>
<span>{{name}}--{{state.age}}</span>  <!-- <span>吴某人--23</span> -->
</template>
<script>
import {ref,onMounted,reactive} from "vue"
export default{
	setup(){
		const nameRef = ref("吴某人");
		const ageRef = ref("23");
		const elemRef = ref(null);//与Dom上的ref同名
		onMounted(()=>{
			console.log("elemRef template") 
			console.log(elemRef.value)//<p ref="elemRef">这是一行文字</p>
			console.log(elemRef.value.innerText)//这是一行文字
		})
		const state = reactive({
			age
		})
		return {
				state,
				name
		}
	}
}
</script>
```

​	2、toRef

​		a、toRef一个reactive中一个属性之后，两者会存在双向绑定关系；

​		b、toRef如果用于普通对象，两者不会存在双向绑定的关系

```vue
<template>
<span>{{state.name}}--{{nameToRef}}</span> 
<!-- <span>吴某人--吴某人</span> -->
<!--两秒后 <span>吴某人toRef被改变--吴某人toRef被改变</span> -->
<!--再两秒后 <span>吴某人reactive被改变--吴某人reactive被改变</span> -->
</template>
<script>
import {ref,toRef,onMounted,reactive} from "vue"
export default{
	setup(){
		const state = reactive({
			name:"吴某人",
			age:"23"
		})
		const nameToRef = toRef(state,"age");
		setTimeout(()=>{
			nameToRef.value = "吴某人toRef被改变"//两秒之后，template中两个“吴某人”都会变成“吴某人toRef被改变”
			
		},2000)
		setTimeout(()=>{
			state.name = "吴某人reactive被改变"//两秒之后，template中两个“吴某人toRef被改变”都会变成“吴某人reactive被改变”
		},2000)
		return {
			state,
			nameToRef
		}
	}
}
</script>
```

3、toRefs

​	a、将响应式对象（reactive封装）转换成普通对象

​	b、对象的每个prop都是对应的ref

​	c、两者保持引用关系

```vue
和toRef效果一样，区别在于，toRefs拿到的是整个reactive对象
const state = reactive({
			name:"吴某人",
			age:"23"
		})
//const stateToRef = toRefs(state);

//方便解构
return toRefs(state)
```



（2）最佳使用方式

​		1、用reactive做对象的响应式，用ref做值类型的响应式

​		2、setup中返回toRefs（state）,或者toRef（state,"xxx"）

​		3、ref的变量命名都用xxxRef

​		4、合成函数返回响应式对象时，使用toRefs

​		

（3）进阶，深入理解

​		1、为何需要ref？

​			返回一般值类型，会丢失响应式

​			在setup，computed、合成函数，都有可能返回值类型

​			如果Vue不定义ref，用户会自己造ref，反而会混乱

​		2、为何需要.value？

​			ref是一个对象（不丢失响应式），value存储值

​			通过value属性的get和set实现响应式

​			用于模板、reactive时不需要.value,其他情况都需要 

​			值不存在引用这一说，他的每次赋值都是深拷贝，对象则不同，里面的某个属性改了，

他还是这个对象，他依旧继承着，再更改之前就继承着的方法

​		3、为何需要toRef toRefs？

​		初衷：不丢失响应式的情况下，把对象数据 **分解/扩散**

​		前提：针对响应式对象（reactive封装的）非普通对象

​		注意：**不创造**响应式，而是**延续**响应式

#### Vue3升级了哪些重要的功能？

（1）createApp			（2）emits属性

（3）生命周期               （4）多事件

（5）Fragment			 （6）移除 .sync

（7）异步组件的写法   （8）移除filter

（9）Teleport			   （10）Suspense

（11）CompositionAPI

**createApp**

```
vue2
const app = new Vue({})
Vue.use()  Vue.mixin()  Vue.component()  Vue.directive()

vue3
const app = Vue.createApp({})
app.use()  app.mixin()  app.component()  app.directive()
app.mount("#root")
```

**emits**

```
父组件
<span @onSayHello = "mySayHello">lilili</span> <!-- vue3.0.4新规则  自定义事件要用 @onXxxxx 命名 -->
mySayHello(info){
console.log(`${info}`);// "Hello wolrd!!!"
}

子组件
emits:["onSayHello"]
setup(props,{emits}){
		emit("onSayHello","Hello wolrd!!!")
}
```

**多事件处理**

```
<button @click="one($event),two($event)"></button>
能够同时执行多个事件
```

**fragment**

vue2,的template中必须要一个根节点，vue3不用，可以散装

```
vue2
<template>
<div>
<span>111</span>
<span>111</span>
</div>
</template>

vue3
<template>
<span>111</span>
<span>111</span>
</template>
```

**移除 .sync**

```
vue2
<MyComponent v-bind:title.sync = "title"/>

vue3
<MyComponent v-bind:title= "title"/>
```



**异步组件的写法**

```
vue2
components:{
	"my-component":()=>import("../MyComponent.vue")
}

vue3
import {createApp,defineAsyncComponent} from "vue"
components:{
	"my-component":defineAsyncComponent(()=>import("../MyComponent.vue"))
}
```

**移除filter**

就是没了

**Teleport**

可以吧teleport中的html放到 页面中组件外的其他地方

```
<button @click="flag=true">
显示弹窗
</button>
<teleport to="body"><!-- 把这块儿节点放到body里-->
	<div v-if="flag">
	...
	</div>
</teleport>
```

**Suspense**

```
这是一个语法糖，主要作用就是针对异步组件渲染前，展示一个默认的#fallback组件

<Suspense>
<template>
	<Text/> <!--这是一个异步组件-->
</template>
<template #fallback>   <!--默认展示 #fallback-->
	Loading...
</template>
</Suspense>
```

**Composition API**

<span style="color:red;">**readonly还不知道</span>

```
考点
reactive
ref相关
readonly
wacth和watchEffect
setup
生命周期钩子函数
```





#### Composition API 如何实现代码逻辑复用？

（1）抽离逻辑代码到一个函数

（2）函数命名约定为useXxxxx格式（React Hooks也是）

（3）在setup中引用useXxxxx函数

```vue
<template>
<!--conponent.vue-->
<p>mouse position {{xRef}}--{{yRef}}</p>
</template>
<script>
    import {reactive} from "vue" 
    import useMousePosition from "./useMousePosition.js"
    export default {
        name:"conponent",
        setup(){
            const {xRef,yRef} = useMousePosition()
                     
            return {
                xRef,
         		yRef
            }
        }
    }
</script>

```

```js
//useMousePosition.js
 import {ref,onMounted, onUnMounted} from "vue" 
 const useMousePosition = function(){
     const xRef = ref(0);
     const yRef = ref(0);
     function update(e){
			xRef.value = e.pageX;	
			yRef.value = e.pageY;	
            }
            
            onMounted(()=>{
                console.log("useMousePosition mounted!")
                window.addEventListener("mousemove",update)
            })
     		onUnMounted(()=>{
                 console.log("useMousePosition unmounted!")
                window.removeEventListener("mousemove",update)
			})
     
     return {
         xRef,
         yRef
     }
 }
 export default {
     useMousePosition
 }
```



#### Vue3如何实现响应式

（1）回顾vue2.x的Object.defineProperty

（2）学习Proxy语法

```js
//get 监听获取钩子
//set 设置值钩子
//deleteProperty  删除钩子
let data = {
    name:"张三",
    age:20
}
const proxyData = new Proxy(data,{
    //target==>data
    //key==>键
    //recetive==>proxyData
	get(target,key,receiver){
		const result = Refect.get(target,key,receiver);
		console.log("get",key)
		return result;
	},
	set(target,key,receiver){
		const result = Refect.set(target,key,receiver);
		console.log("set",key,val)
		return result;
	},
	deleteProperty(target,key,receiver){
		const result = Refect.deleteProperty(target,key,receiver);
		console.log("deleteProperty",key)
		return result;
	}
})
```



（3）Vue3如何用Proxy实现响应式

​		a、基本应用

​		**b、Reflect**

​		Reflect作用：

​			和Proxy能力一一对应

​			规范化，标准化，函数式

​			代替Object的工具函数

​		c、实现响应式

```js
// 创建响应式
function reactive(target={}){
    if(typeof target!=="object" || target===null){
        // 不是对象或数组，则直接返回
        return target
    }


// 代理配置
const proxyConf = {
    get(target,key,receiver){
        // 只处理非原型的属性
        const ownKeys =Reflect.ownKeys(target)
        if(ownKeys.includes(key)===true){
            console.log('get',key)
        }
		const result = Reflect.get(target,key,receiver);
        
        // console.log("get",key)
        //深度监听
        //性能提升点
		return reactive(result);
	},
	set(target,key,val,receiver){
        //不重复修改数据
        const oldVal = target[key];
        if(val===oldVal){
            return true;
        }
		const result = Reflect.set(target,key,val,receiver);
		console.log("set",key,val)
		return result;
	},
	deleteProperty(target,key,receiver){
		const result = Reflect.deleteProperty(target,key,receiver);
		console.log("deleteProperty",key)
		return result;
	}
}

// 生成代理对象
const observed = new Proxy(target,proxyConf);

return observed;
}

// 测试数据
const data = {
    name:"张三",
    age:1,
    info:{
        city:"背景"
    }
}

const proxyData = reactive(data)
```





（4）两者对比

proxy:

​		深度监听，性能更好

​		可监听，新增/删除属性

​		可监听数组变化



#### watch和watchEffect的区别是什么？

两者都可以监听data属性变化

watch需要明确监听哪个属性，如果要初始化监听和深度监听，需要配置

watchEffect会根据会调用用到的属性，自动监听其变化，不需要配置，默认初始化监听（为了收集要监听的数据）

```vue
<template>
<!--conponent.vue-->
<p>{{name}}---{{age}}</p>
</template>
<script>
    import {reactive,toRefs,ref,watch,watchEffect} from "vue" 
    export default {
        name:"conponent",
        setup(){
            const number = ref(0);
            const state = rective({
                name:"吴某人",
                age:23
            })
            //watch
            //监听值类型
            watch("number",(newVal,oldVal)=>{
                console.log("watch",newVal,oldVal)// watch 200 0
			},{
                immediate:true  //初始化之前就监听，可选
            })
            //监听rective中某个值
            watch(()=>state.name,(newVal,oldVal)=>{
                console.log("watch",newVal,oldVal)// watch 张某人 吴某人
			},{
                immediate:true,  //初始化之前就监听，可选
                deep:true//深度监听
            })
            setTimeout(()=>{
                number.value = 200;
                state.name = "张某人"
			},2000)
            
            //watchEffect 回调中使用了啥就监听啥，并且默认初始化监听
            watchEffect(()=>{
                console.log("监听state.age",state.age);//监听state.age 23
			})
            setTimeout(()=>{                
                state.age = "34"//监听state.age 34
			},2000)
            return {
                number,
                ...toRefs(state)
            }
        }
    }
</script>

```



#### setup中如何获取组件实例？

**考这个题，是因为setup和其他的CompositionAPI中没有this  **

可以通过getCurrentInstance 获取当前实例

OptionsApi中照常能够使用this

```vue
<script>
	impor {onMounted,getCurrentInstance} from "vue"
	export default {
		data(){
		return {
			x:1,
			y:2
		}
		},
		setup(){
            console.log("this",this)//this undefined
            const instance = getCurrentInstance();
            console.log("instance",instance.data.x)//instance undefind  拿不到的原因：setup在组件初始化之前就执行了，那个时候data还没有出来
            onMounted(()=>{
                console.log("instance",instance.data.x) //1
            })
        }
		
	}
</script>
```



#### Vue3为何比Vue2快？

（1）proxy响应式

（2）PatchFlag

​	a、编译模板时，动态节点做标记

​	b、标记，分为不同类型，如TEXT,PROPS

​	c、diff算法时，可以区分静态节点，以及不同类型的动态节点

```
https://vue-next-template-explorer.netlify.app/
```



（3）hoistStatic

​	a、将静态节点的定义，提升到父作用域，缓存起来

​	b、多个相邻的静态节点，会被合并起来

​	c、典型的空间换时间的优化策略

（4）cacheHandler

​	a、缓存事件

（5）SSR优化

​	a、静态节点直接输出，绕过了vdom

​	b、动态节点还是需要动态渲染

（6）tree-shaking

​	a、编译时，根据不同的情况，引入不同的API

#### Vite是什么？

一个前端打包工具，Vue作者发起的项目

借助Vue的影响力，发展较快，和webpack竞争

优势：开发环境下无需打包，启动快

**问：Vite为何启动快**

​	开发环境下使用ES6 Module，无需打包 ------ 非常快

​	生产环境下使用rollup，并不会快很多

#### Composition API 和ReactHooks的对比

前者setup只会被调用一次，而后者函数会被多次调用；

前者无需useMemo（缓存数据） useCallback（缓存函数），因为setup只会被调用一次

前者无需顾虑调用顺序，而后者需要保证hooks的顺序一致

前者reactive+ref比后者useState，要难理解





## Vue3和JSX

### Vue3中JSX的基本应用

​	（1）基本使用

​	（2）使用.jsx格式文件和defineComponent

​	（3）引入自定义组件，传递属性

```jsx
//vue后缀文件
<script>
	import {ref} from "vue"
    export default {
        setup(){
            const nameRef = ref("吴某人")
             render = ()=>{
                return <p>demo {nameRef.value}</p>
            }
             return render
        }
    }
</script>
```

```jsx
//jsx后缀文件
import {defineComponent,ref} from "vue"
import Child from "./Child.jsx"
 /*export default defineComponent({
     name:"Demo1",
     props:["a","b"],
     setup(){
         
     }
 })*/

	export default defineComponent(()=>{
        const nameRef = ref("吴某人")
             render = ()=>{
                return <>
                    <p>demo {nameRef.value}</p>
                    <Child a={nameRef}></Child>
                    </>
            }
             return render
    })

```

```jsx
//child.jsx
/jsx后缀文件
import {defineComponent,ref} from "vue"
	export default defineComponent({
       props:["a"],
        setup(){
             render = ()=>{
                return <>
                    <p>child {props.a.value}</p>
                    </>
            }
             return render
        }
    })
```



​	

### JSX和template的区别

（1）语法上有很大的区别

​	jsx本质就是js代码，可以使用js的任何能力

​	tempalt只能嵌入简单的js表达式，其他需要指令，如v-if

​	jsx已经成为ES规范，tempalte还只是Vue自家规范

（2）本质上是相同的

​	都会被编译成js代码

​	

（3）具体示例：插值，自定义组件，属性和事件，条件和循环



### JSX和slot（体会JSX的优越性）

分别使用 template和jsx做一个选项卡





# Vue3 script setup（vue版本>=3.2）

（1）基本使用

​	顶级变量、自定义组件、可以直接用于模板

​	可正常使用ref reactive computed等能力

​	和其他<sript>同时使用

（2）属性和事件（defineProps,defineEmits）

```vue
<script setup>
//father.vue
import {ref,toRefs,reactive,defineProps} from "vue"
import child from "./child.vue"
let state = reactive({
	name:"123",
	account:"15271562370"
})
let {name,account} = state;
   const onChange = (info)=>{
	console.log("on change",info.city)
    }
   const  onDelete = (info)=>{
	console.log("on delete",info.city)
    }
</script>
<template>
<span>父组件</span>
<child :name="name" :account="account" @change="onChange" @delete = "onDelete"></child> // "on Change" 湖北
</template>



<script setup>
//child.vue
import {ref,toRefs,reactive,defineEmits,defineProps} from ".vue"
let age = ref(23);
    const state = reactive({
        id:1221212,
        city:"湖北"
    })

const props = defineProps(["name","account"]);
	emit = defineEmits(["change","delete"])
  	emitDelete(){
        emit("delete",state.id)
    }
    
</script>
<template>
	<span>{{name}}--{{account}}--{{age}}</span>
	<button @click = "$emit('change',info)">1</button>
	<button @click = "emitDelete">1</button>
	<button>2</button>
</template>
```



（3）defineExpose

​	暴露数据给父组件

```vue
<script setup>
//father.vue
    import {ref,onMounted} from "./child.vue"
import child from "./child.vue";
   const childGet = ref(null);
    onMounted(()=>{
	 
        console.log(childGet.value) // {aRef:100,b:"123"}
    })
    
</script>
<template>
<span>父组件</span>
<child ref="childGet"></child>
</template>



<script setup>
//child.vue
import {ref,defineExpose} from "./child.vue"
const aRef = ref(100);
const b = "123"
defineExpose({
        aRef,
        b
})
</script>
<template>
	
</template>
```



