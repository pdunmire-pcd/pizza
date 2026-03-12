export function validateForm(data) {
    console.log("Server side validation happens here");

    console.log(data);
    /* Data Object
    {
        fname: 'Paris',
        lname: 'Dunmire',
        email: 'parisdunmire19@gmail.com',
        method: 'pickup',
        toppings: [ 'green peppers', 'spicy sausage', 'onions', 'Prociutto' ],
        size: 'medium',
        comment: 'light onions',
        discount: 'on'
    }
  */

    //Store error messages in an array called errors
    const errors = [];

    //Validate first name
    if (!data.fname|| data.fname.trim() == "") {
        errors.push("First name is required.");
        
    }
    console.log(errors);
    
    //Validate last name
    if (!data.lname || data.lname.trim() == ""){
        errors.push("Last name is required.")
    }

    //Validate email
    if (!data.email || data.email.trim() == "") {
        errors.push("email is required.")
    }
    //Validate method

    const validMethods = ['pickup', 'delivery'];
    if(!validMethods.includes(data.method)) {
        errors.push("Method must be pickup or delivery");
        }

    //Validate toppings

    //Validate pizza size
    const validPizzaSize = ['small','medium','large'];
    if(!validPizzaSize.includes(data.size)) {
        errors.push("must be a topping valid option");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

