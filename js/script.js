/**
 * The "Name" field 
 */
let nameInput = document.getElementById('name')
nameInput.focus(); 

/**
 * The "Job Role" section
 */
let jobRoleMenu = document.getElementById('title');
let otherJobInput = document.getElementById('other-job-role');
otherJobInput.hidden = true; 

jobRoleMenu.addEventListener('change', (e) => {
    let titleSelected = e.target.value; 
    if (titleSelected === 'other') {
        otherJobInput.hidden = false; 
    } else {
        otherJobInput.hidden = true;
    }
}); 

/**
 * The "T-Shirt Info" section
 */

let designsMenu = document.getElementById('design'); 
let colorsMenu = document.getElementById('color'); 
let colorsMenuChildren = colorsMenu.children; 
colorsMenu.disabled = true; 

designsMenu.addEventListener('change', (e) => {
    colorsMenu.disabled = false;
    for (let i = 1; i < colorsMenuChildren.length; i++) {
        let designSelected = e.target.value; 
        let currentThemeElement = colorsMenuChildren[i]
        let currentThemeName = currentThemeElement.getAttribute('data-theme'); 
        
        if (currentThemeName === designSelected) {
            currentThemeElement.hidden = false; 
            currentThemeElement.setAttribute('selected', true); 
        } else {
            currentThemeElement.hidden = true; 
            currentThemeElement.setAttribute('selected', false);
        }
    } 
    /*
    if (colorsMenu.value !== '') {
        colorsMenu.firstElementChild.selected = true; 
    } else {
        colorsMenu.firstElementChild.selected = false;
    }
    */
}); 

/**
 * The "Activities" section 
 */

let activitiesFieldElement = document.getElementById('activities'); 
let totalCostParagraphElement = document.getElementById('activities-cost'); 
let totalCost = 0; 

activitiesFieldElement.addEventListener('change', (e) => {
    let activitySelected = e.target; 
    let activitySelectedCost = +activitySelected.getAttribute('data-cost'); 
    if (activitySelected.checked) {
        totalCost += activitySelectedCost; 
    } else {
        totalCost -= activitySelectedCost;
    }
    totalCostParagraphElement.innerHTML = `Total: $${totalCost}`; 
}); 

/**
 * The "Payment Info" section 
 */

let paymentSelectElement = document.getElementById('payment'); 
let creditCardElement = document.getElementById('credit-card'); 
let paypalElement = document.getElementById('paypal');
let bitcoinElement = document.getElementById('bitcoin'); 

paypalElement.hidden = true; 
bitcoinElement.hidden = true; 

paymentSelectElement.children[1].setAttribute('selected', true); 

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



 