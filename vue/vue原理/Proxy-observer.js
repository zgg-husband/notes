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