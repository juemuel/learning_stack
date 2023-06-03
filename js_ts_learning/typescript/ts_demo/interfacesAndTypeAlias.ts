// 1. 接口（Interfaces）只能描述 object shapes；类型别名（Type aliases）可用于其他类型
type Name = string  // string
type Male = {       // object
  name: string
}
type Female = {     // object
  name: string 
}
type HumanSex = Male | Female   // union
type Children = [Female, Male, Female] // tuple


// 2. 一个接口可以通过多次声明修改
interface Human {
    name: string 
}
interface Human {
    legs: number 
}
// 等价于
interface Human {
  name: string 
  legs: number 
}

// 类型别名和接口都可以被扩展，但语法不同