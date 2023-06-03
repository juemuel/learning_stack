var id = 5;
var firstname = 'danny';
var hasDog = true;
var unit; // Declare variable without assigning a value
unit = 5;
// 但通常最好不要明确说明类型，因为TypeScript会自动推断变量的类型（类型推理）:
var age;
age = 26;
age = '26';
// 引用类型
var ids = [1, 2, 3, 4, 5]; // can only contain numbers
var names = ['Danny', 'Anna', 'Bazza']; // can only contain strings
var options = [true, false, false]; // can only contain true or false
var books = [
    { name: 'Fooled by randomness', author: 'Nassim Taleb' },
    { name: 'Sapiens', author: 'Yuval Noah Harari' },
]; // can only contain objects
var arr = ['hello', 1, true]; // any basically reverts TypeScript back into JavaScript
ids.push(6);
// ids.push('7'); // ERROR: Argument of type 'string' is not assignable to parameter of type 'number'.
// 联合类型->多类型数组
var person = ['Danny', 1, true];
person[0] = 100;
// person[1] = {name: 'Danny'} // Error - person array can't contain objects
var person1 = ['Danny', 1, true]; // This is identical to above example
person1[0] = 100;
// person1[1] = { name: 'Danny' }; // Error - person array can't contain objects
var person2 = ['Danny', 1, true];
// person2[0] = 100; // Error - Value at index 0 can only be a string
