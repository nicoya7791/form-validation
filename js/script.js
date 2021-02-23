// Global variables
const form = document.querySelector('form');
const nameElement = document.querySelector('#name');
const email = document.querySelector('#email');
const otherJobRole = document.querySelector('#other-job-role');
const jobOptionSelection = document.querySelector('#title');
const shirtsDesign = document.querySelector('#design');
const shirtsColor = document.querySelector('#color');
const activityBoxInput = document.querySelectorAll('#activities-box input');
const costPara = document.querySelector('#activities-cost')
const paymentMethod = document.querySelectorAll('#payment option');
const paypalOption = document.querySelector('#paypal');
const bitcoinOption = document.querySelector('#bitcoin');
const creditCardOption = document.querySelector('#credit-card');
const cardNumber= document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');



let payOptionArray=[paypalOption, creditCardOption, bitcoinOption];
let totalCost = 0;



//disable the shirt color dropdown manu.
shirtsColor.disabled=true;
// give focus to name Input
nameElement.focus();
//hides the job role input on page load. If added during otherJobRole var declaration
//it will overrides the e.listener.
otherJobRole.hidden = true;

//show default payment opting on page load.
defaultPaymentMethod();

//This event hide the jobs roles not selected. I shows only currenty selection. 
jobOptionSelection.addEventListener('change', (e) => {
	for (let i = 0; i < jobOptionSelection.length; i++) {
		let jobSelection = jobOptionSelection[i].value;
		let currentSelection = e.target.value;
		if (jobSelection === currentSelection) {
			otherJobRole.hidden = false;
		} else {
			otherJobRole.hidden = true;
		}
	}
});
//===================================================================
//------------------T-SHIRT SECTION----------------------------------
//===================================================================
//Event listener to display color available base on the t-shirt theme selected. colors disabled if not theme selected.
shirtsDesign.addEventListener('change', (e)=>{
	const clicked = e.target;
	
	//gets the value of the selected design.
	const clickedValue = clicked.value;
	//if t-shirt design is selected, color options are available for that specific design.
	if(clickedValue){	
		//if t-shirt theme clicked then display t-shirt colors	
		shirtsColor.disabled = false;
		for (let i = 0; i < shirtsColor.length; i++) {
			const element = shirtsColor[i].getAttribute('data-theme');
			if(clickedValue === element){
				shirtsColor[i].style.display = 'inherit';
				shirtsColor[i].selected = true;
			}else{
				shirtsColor[i].style.display = 'none';
			}
					
		}
	}

})
//Prevent user from selecting activities same day and time.
//This function is call in the activity event listerner 
function activiySelection(event){
	const activityDayTime = event.dataset.dayAndTime;
	for (let i = 0; i < activityBoxInput.length; i++) {
		const element = activityBoxInput[i].dataset.dayAndTime;
		//check the attribute day and time of selected activity then disable the other with the same attribute.
		if (activityDayTime === element && event !== activityBoxInput[i]) {
			if(event.checked){				
			activityBoxInput[i].disabled = true;
			activityBoxInput[i].parentNode.classList.add('disabled')
			}
			else{
				activityBoxInput[i].disabled =false;
				activityBoxInput[i].parentNode.classList.remove('disabled');
			}
			
		}
	}

}

//=====================================================
// ----------ACTIVITIES EVENT LISTENER-----------------
//=====================================================

document.querySelector('#activities').addEventListener('change', (e)=>{
	const clickedActivity = e.target;
	activiySelection(clickedActivity);
	//p is used to display the total value in the html
	let p = document.querySelector('#activities-cost');
	//cost of activity that is chosen
	let clickedCost = clickedActivity.dataset.cost;
	//if user chose an ativity, the price gets added to total, if user uncheck the activity, the 
	//activity price gets deducted from total.
	if (clickedActivity.checked) {
		totalCost+= parseInt(clickedCost);
	}
	if (!clickedActivity.checked) {
		totalCost-=parseInt(clickedCost);
	}
	//displays the updated total cost.
	p.textContent = (`Total: $${totalCost}`);
})
//================ends activity event listener=========================

//=====================================================================
//------------------------PAYMENTS SECTION-----------------------------
//=====================================================================
//function to show credit card as default payment and hides the other options.
function defaultPaymentMethod(){
	//set credit card as default on pageload. Using for loop, so if more payments options added will still work.
	for (let i = 0; i < paymentMethod.length; i++) {
		let payId = paymentMethod[i].value;
		if (payId==='credit-card') {
			paymentMethod[i].selected =true;
		}
	}
	paypalOption.hidden=true;
	bitcoinOption.hidden=true;	
}

//event listener to show or hide payment options base on paymen method.
document.querySelector('#payment').addEventListener('change', (e)=>{
	let = payMethodClicked = e.target.value;
		//loop through array of option and hides the the ones not selected.
		for (let i = 0; i < payOptionArray.length; i++) {
			let element = payOptionArray[i].id;
			
			if(payMethodClicked===element){
				
				payOptionArray[i].hidden = false;
			}
			else{
				payOptionArray[i].hidden = true;
			}
		}
		
})
//==================ENDS PAYMENT SECTIONS================


//=====================================================
// ----------------FORM FIELDS VALIDATION--------------
//=====================================================
//validate name field. Numbers allowed thanks to ELON MUSK.
const nameFieldValidator = ()=>{
	const nameIsValid = nameElement.value !== '';
	if (nameIsValid) {
		validationPass(nameElement);
	} else {
		validationFail(nameElement);
	}
	return nameIsValid;

}
//email validation, validate most common emails.
const emailFieldValidator=()=>{
	//const emailValue = email.value;
	const emailIsValid = /^[^@]+@[^@.]+\.[a-z]{2,}$/i.test(email.value);
	
	if (emailIsValid) {
		validationPass(email);
	} else {
		validationFail(email);
	}
	return emailIsValid;
}	
//activities validation, if no activity total should be zero
const activityValidator= ()=>{
	const activityIsValid = totalCost > 0;
	if (activityIsValid) {
		validationPass(costPara);
	} else {
		validationFail(costPara);
	}
	return activityIsValid;
}
//card number validator, number must be between 13 and 14 no spaces or dashes.
let cardNumberHint = document.querySelector('.cc-hint');
const cardNumberValidator = ()=>{
	const cardNumberIsValid = /^\d{13,16}$/.test(cardNumber.value);
	if (cardNumber.value.includes('-')){
		cardNumberHint.innerHTML='Credit card number must be between 13-16 digits. Enter numbers without dashes!'
		validationFail(cardNumber);
	}

	if (cardNumberIsValid) {
		validationPass(cardNumber);
		
	} else{
		validationFail(cardNumber);

	}	

	return cardNumberIsValid;
}
//zip code must be 5 digits no space or dash allowed
const zipCodeValidator=()=>{
	const zipIsValid = /^\d{5}$/.test(zipCode.value);
	if (zipIsValid) {
		validationPass(zipCode);
	} else {
		validationFail(zipCode);
	}
	return zipIsValid;
}
//cvv must be 3 digtis no space or dashes allowed.
const cvvValidator = ()=>{
	
	const cvvIsValid= /^\d{3}$/.test(cvv.value);
	if (cvvIsValid) {
		validationPass(cvv);
	} else {
		validationFail(cvv);
	}
	return cvvIsValid;	
}
//================ENDS FORM FIELDS VALIDATIONS===========

//=============================================
//-----------FORM EVENT LISTENER---------------
//=============================================
form.addEventListener('submit', (e)=>{
	
	if(!nameFieldValidator()){
		e.preventDefault();
	}
	if(!emailFieldValidator()){
		e.preventDefault();
	}
	if(!activityValidator()){
		e.preventDefault();
	}
	//only check this fields if the credict card option was selected.
	if(creditCardOption.hidden !== true){
		
		if(!cardNumberValidator()){
			e.preventDefault();
		}
			
		if(!zipCodeValidator()){
			e.preventDefault();
		}
		if(!cvvValidator()){
			e.preventDefault();
		}
	}
	

})
//=======================ENDS FORM EVENT LISTENER================


//=====================================================
//-------------REAL TIME VALIDATION--------------------
//=====================================================
nameElement.addEventListener('keyup', nameFieldValidator);
email.addEventListener('keyup', emailFieldValidator);
cardNumber.addEventListener('keyup', cardNumberValidator);
zipCode.addEventListener('keyup', zipCodeValidator);
cvv.addEventListener('keyup', cvvValidator);


//=====================================================
// ----------------ACCESSIBILITY---------------------
//=====================================================
//activityboxinput holds array of input. Adds and removes focus to activity labels
for (let i = 0; i < activityBoxInput.length; i++) {
	activityBoxInput[i].addEventListener('focus', (e)=>{
		//adds focus class to active label
		activityBoxInput[i].parentElement.classList.add('focus');

	});
	activityBoxInput[i].addEventListener('blur', (e)=>{
		//removes focus class from inactive lable.
		const activeLable = document.querySelector('.focus');
		if(activeLable){
			activeLable.classList.remove('focus');
		};
	})
}
//=====================================================
// ----------------ERROR VALIDATION HINTS--------------
//=====================================================
function validationPass(element) {
	let elementLabel = element.parentNode;
	elementLabel.classList.add('valid');
	elementLabel.classList.remove('not-valid');
	//hides the hint is validation pass.
	elementLabel.lastElementChild.style.display = 'none';
	return 'is valid';
}

function validationFail(element) {
	let elementLabel = element.parentNode;

	elementLabel.classList.add('not-valid');
	elementLabel.classList.remove('valid');
	//shows hint is validation fail.
	elementLabel.lastElementChild.style.display = 'block';
	
	return 'not valid';
}
