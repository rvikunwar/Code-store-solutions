let employees = [
    { name: "John", age: 30, department: "Sales", salary: 70000 },
    { name: "Jane", age: 35, department: "Marketing", salary: 50000 },
    { name: "Bob", age: 40, department: "IT", salary: 120000 },
    { name: "Bob", age: 20, department: "IT", salary: 60000 }

];

//Filter
let over35 = employees.filter(employee => employee.age > 35);
console.log(over35);


//map
let namePlusDept = employees.map(employee => employee.name+employee.department);
console.log(namePlusDept);


//reduce
let totalSalary = employees.reduce((acc, employee) => acc + employee.salary, 0);
console.log(totalSalary);

//sort
employees.sort((a, b)=>{
    return a.salary - b.salary
})
console.log(employees)


//forEach
employees.forEach(employee => console.log(employee.name));


//find
const empObj = employees.find(employee => employee.name === "Bob");
console.log(empObj)
