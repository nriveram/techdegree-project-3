/**
 * The "Name" field - by default the name input will focus when page loads. 
 */

let nameInput = document.getElementById('name');
nameInput.focus(); 

/**
 * The "Job Role" section - an 'other job' input field will display when the user
 * selects 'other' in the job drop down menu. 
 */
let jobRoleMenu = document.getElementById('title');
let otherJobInput = document.getElementById('other-job-role');
otherJobInput.hidden = true; // hides the job input field 

jobRoleMenu.addEventListener('change', (e) => {
    let titleSelected = e.target.value; 
    // checks if 'other' is selected to display the other job input field 
    if (titleSelected === 'other') {
        otherJobInput.hidden = false; 
    } else {
        otherJobInput.hidden = true;
    }
}); 

/**
 * The "T-Shirt Info" section - enables the color menu when design/theme is
 * selected. 
 */

let designsMenu = document.getElementById('design'); 
let colorsMenu = document.getElementById('color'); 
let colorsMenuChildren = colorsMenu.children; 
colorsMenu.disabled = true; 


designsMenu.addEventListener('change', (e) => {
    colorsMenu.disabled = false;
    colorsMenuChildren[0].removeAttribute('selected');
    for (let i = 1; i < colorsMenuChildren.length; i++) {
        let designSelected = e.target.value; 
        let currentThemeElement = colorsMenuChildren[i]; 
        let currentThemeName = currentThemeElement.getAttribute('data-theme'); 
        // checks if the color is available for the design selected 
        if (currentThemeName === designSelected) {
            currentThemeElement.hidden = false; 
            // sets the selected attribute to first color on the list 
            if (i === 1 || i == 4) {
                currentThemeElement.setAttribute('selected', true);
            } 
        } else {
            currentThemeElement.hidden = true; 
            // removes the previous selected element 
            if (i === 1 || i == 4) {
                currentThemeElement.removeAttribute('selected');
            } 
        }
    } 

}); 

/**
 * The "Activities" section - updates the total cost of activities selected  
 */

let activitiesFieldElement = document.getElementById('activities'); 
let totalCostParagraphElement = document.getElementById('activities-cost'); 
let totalCost = 0; 

activitiesFieldElement.addEventListener('change', (e) => {
    let activitySelected = e.target; 
    let activitySelectedCost = +activitySelected.getAttribute('data-cost'); 
    // if activity is checked, adds costs 
    if (activitySelected.checked) {
        totalCost += activitySelectedCost; 
    } else {
        totalCost -= activitySelectedCost;
    }
    // updates new cost to the DOM 
    totalCostParagraphElement.innerHTML = `Total: $${totalCost}`; 
}); 

/**
 * The "Payment Info" section - sets the default payment to credit card. If user
 * selects a different payment from drop down menu, it will display 
 * its chosen payment method. 
 */

let paymentSelectElement = document.getElementById('payment'); 
let creditCardElement = document.getElementById('credit-card'); 
let paypalElement = document.getElementById('paypal');
let bitcoinElement = document.getElementById('bitcoin'); 
// by default it hides the other two payments 
paypalElement.hidden = true; 
bitcoinElement.hidden = true; 
// sets the default to credit card
paymentSelectElement.children[1].setAttribute('selected', true); 

// updates payment method according to user's selection and hides other payments
paymentSelectElement.addEventListener('change', (e) => {
    let currentPaymentSelection = e.target.value; 
    if (currentPaymentSelection === 'paypal') {
        paypalElement.hidden = false; 
        bitcoinElement.hidden = true;
        creditCardElement.hidden = true; 
    } else if (currentPaymentSelection === 'bitcoin') {
        paypalElement.hidden = true; 
        bitcoinElement.hidden = false;
        creditCardElement.hidden = true;
    } else {
        paypalElement.hidden = true; 
        bitcoinElement.hidden = true;
        creditCardElement.hidden = false;
    }

}); 

/**
 * The "Form Validation" sections - ensures that users aren't submitting a form 
 * without the required information. It validates the name, email, card number, 
 * ZIP, and CVV fields using regex. It also validates if at least one activity was
 * checked. 
 */
 
let emailInput = document.getElementById('email');
let cardNumberInput = document.getElementById('cc-num'); 
let zipInput = document.getElementById('zip'); 
let cvvInput = document.getElementById('cvv'); 
let formElement = document.querySelector('form'); 

// validates user input using regex and .test()  
let isValidName = () =>  /^[a-z]+$/i.test(nameInput.value); 
let isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value); 
let isValidZip = () => /^\d{5}$/.test(zipInput.value); 
let isValidCC = () => /^[^\s\-]+\d{13,16}$/.test(cardNumberInput.value); 
let isValidCVV = () => /^\d{3}$/.test(cvvInput.value); 
// helper function to validate if at least one activity was checked
let isActivitiesChecked = () => 
activitiesFieldElement.querySelectorAll("[type='checkbox']:checked").length > 0;
let activitiesBox = document.querySelector('#activities-box'); 

formElement.addEventListener('submit', (e) => {
    const validator = (inputElement, validationFunction) => {
        if (validationFunction()) {
            inputElement.parentNode.classList.add("valid"); 
            inputElement.parentNode.classList.remove("not-valid");
            //inputElement.nextElementSibling.style.display = 'none'; 
            inputElement.parentNode.lastElementChild.style.display = 'none';
        } else {
            // display error messages if input was not valid 
            e.preventDefault();
            inputElement.parentNode.classList.remove("valid"); 
            inputElement.parentNode.classList.add("not-valid"); 
            //inputElement.nextElementSibling.style.display = 'block'; 
            inputElement.parentNode.lastElementChild.style.display = 'block';
        }
    };
    // validates the inputs using a helper function 
    validator(nameInput, isValidName);
    validator(emailInput, isValidEmail); 
    validator(activitiesBox, isActivitiesChecked);
    // if the payment is a CC it will use more validations 
    if (paymentSelectElement.children[1].selected) {
        validator(zipInput, isValidZip);
        validator(cvvInput, isValidCVV); 
        validator(cardNumberInput, isValidCC); 
    } 
      
});

/**
 * The "Accessibility" section - adds a focus/blur state to the form to make
 * it more accessible 
 */

let activitiesInputs = activitiesFieldElement.querySelectorAll('input'); 

for (let i = 0; i < activitiesInputs.length; i++) {
    let currentInput = activitiesInputs[i];
    currentInput.addEventListener('focus', () => {
        currentInput.parentNode.classList.add('focus'); 
    }); 
    currentInput.addEventListener('blur', () => {
        currentInput.parentNode.classList.remove('focus');
    });
}
