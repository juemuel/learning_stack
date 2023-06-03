// 一、变量
let id: number = 5;
let firstname: string = 'danny';
let hasDog: boolean = true;
let unit: number; // Declare variable without assigning a value
unit = 5;

// 但通常最好不要明确说明类型，因为TypeScript会自动推断变量的类型（类型推理）:
let age: string | number;
age = 26;
age = '26';



// 二、引用类型
let ids: number[] = [1, 2, 3, 4, 5]; // can only contain numbers
let names: string[] = ['Danny', 'Anna', 'Bazza']; // can only contain strings
let options: boolean[] = [true, false, false]; // can only contain true or false
let books: object[] = [
  { name: 'Fooled by randomness', author: 'Nassim Taleb' },
  { name: 'Sapiens', author: 'Yuval Noah Harari' },
]; // can only contain objects
let arr: any[] = ['hello', 1, true]; // any basically reverts TypeScript back into JavaScript
ids.push(6);
// ids.push('7'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.

// 联合类型->多类型数组
let person: (string | number | boolean)[] = ['Danny', 1, true];
person[0] = 100;
// person[1] = {name: 'Danny'} // Error - person array can't contain objects

let person1 = ['Danny', 1, true]; // This is identical to above example
person1[0] = 100;
// person1[1] = { name: 'Danny' }; // Error - person array can't contain objects


let person2: [string, number, boolean] = ['Danny', 1, true];
// person2[0] = 100; // Error - Value at index 0 can only be a string
