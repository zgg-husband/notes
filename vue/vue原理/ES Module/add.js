import a from "./yz"

function add(x,y){
    //执行了
    console.log("执行了",a)
    a(x,y)
}
export default add