const User = {
    name: "hitesh",
    email: "abc@gmail.com",
    isActive: false
}


function createUser({ name: string, isPaid: boolean}){}

function createCourse(): { name: string, price: number } {
    return { name: "react js", price: 399 }
}

createUser({ name: "amit", isPaid: false })

export {}