class Compile{
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if(this.isElement(this.$el)){
                //编译模板
            const fragment = this.node2Fragment(this.$el);
            console.log(fragment)

        }

    }
    isElement(node){
        return node.nodeType===1;
    }
    node2Fragment(el){
        const f = document.createDocumentFragment();
        let fristChild;     
        while(fristChild=el.fristChild){
            f.appendChild(fristChild);
        }
        return f;
    }
}

// class Vnode{
//     constructor(el){
//         this.$el = el;

//     }

//     createVnode(el){
//         const vnode = {};

//         return Vnode;
//     }

//     handelr(){

//     }
// }

// 入口
class MyVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data();
        this.$methods = options.methods;
        this.$vm = options;
        this.$created = options.created;
        if(this.$el){
            // 数据劫持
            // new ObServe(this.$data)
            // 模板编译
            new Compile(this.$el,this)
            this.proxy(this.$methods,this.$data);//this选择data和methods
            this.$created()
        }
        
    }

    proxy(methods,data){
        const bar = Object.assign(methods,data);
        for(let key in bar){
            Object.defineProperty(this,key,{
                get(){
                    return bar[key]
                },
                set(newVal){
                    bar[key] = newVal;
                }
            })
        }
    }
}