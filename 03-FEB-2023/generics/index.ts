//Array
//last


// const last = (arr: Array<number>) => {
//     return arr[arr.length-1];
// }


// const last = (arr: Array<any>) => {
//     return arr[arr.length-1];
// }


const last = <T>(arr: Array<T>) => {
    return arr[arr.length-1];
}

const lNum = last([1, 2, 3, 4]);

const lChar = last(['1', '2', '3', '4']);

const lChar1 = last<string>(['1', '2', '3', '4']);


const makeArray = <X, Y>(x: X, y: Y): [X, Y] =>{
    return [x, y];
}

const v = makeArray(5, 6);
const v1 = makeArray("a", "b");
const v3 = makeArray<string | null, number>("a", 5);


const makeFullName = <T extends { firstName: string, lastName:string }>(obj: T) => {
    return {
        ...obj,
        fullName: obj.firstName + " " + obj.lastName
    };
};

const v4 = makeFullName({ firstName: "Amit", lastName: "Khanka", age: 15 });


interface Tab<T>{
    id: string,
    position: number,
    data: T
};

type NumberTab = Tab<number>;
type StringTab = Tab<string>;