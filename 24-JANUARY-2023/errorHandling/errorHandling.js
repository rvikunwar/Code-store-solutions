function validateData(){
    const form = document.getElementById('form');

    try{
        const formData = new FormData(form);
        console.log(formData, 'form data')

        for (const [key, value] of formData) {
            if(!value){
                console.log(value, 'value')
                throw new Error(`${key} can't be null`);
            }
        }   
    } catch(err){
        alert(err.message)
    }
        
}