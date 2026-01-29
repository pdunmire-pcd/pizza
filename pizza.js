document.getElementById("pizza-form").onsubmit = () => {
    clearErrors();
    
    let isValid = true;

    //Validate first name
    let fname = document.getElementById("fname").value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block"; 
        isValid = false;
    }
    
    //Validate last name
    let lname = document.getElementById("lname").value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block"; 
    }

    //Validate email
    let email = document.getElementById("email").value.trim();
    if (!email) {
        document.getElementById("err-email").style.display = "block"; 
        isValid = false;
    }

    // Validate pizza size selection
    let size = document.getElementById("size").value;
    if (size === "none") {
        document.getElementById("err-size").style.display = "block"; 
        isValid = false;
    }

    let pickup = document.getElementById("pickup");
    let delivery = document.getElementById("delivery");
    if (!pickup.checked && !delivery.checked) {
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }

    return isValid;

}

/* Clear all error messages when form is submitted */
function clearErrors() {
    let errorElements = document.getElementsByClassName("err");
    for (let i=0; i<errorElements.length; i++) {
        errorElements[i].style.display = "none";
    }
}
