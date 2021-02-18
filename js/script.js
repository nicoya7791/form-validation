// global variables
const form = document.querySelector('form');
const nameElement = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const jobOptionSelection = document.querySelector('#title');
const shirtsDesign = document.querySelector('#design');
const shirtsColor = document.querySelector('#color');
const activityBoxInput = document.querySelectorAll('#activities-box input');
const activityBox = document.querySelector('#activities-box');
const paymentMethod = document.querySelectorAll('#payment option');
const paypalOption = document.querySelector('#paypal');
const bitcoinOption = document.querySelector('#bitcoin');
const creditCardOption = document.querySelector('#credit-card');
let payOptionArray=[paypalOption, creditCardOption, bitcoinOption];
let totalCost = 0;



//disable the shirt color dropdown manu.
shirtsColor.disabled=true;
// give focus to name Input
nameElement.focus();
//hides the job role input on page load. if added during otherJobRole var declaration
//it will overrides the e.listener.
otherJobRole.hidden = true;
//this event hide/diplay the 'other' job selection.
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

//event listener to display color available base on the t-shirt theme.
shirtsDesign.addEventListener('change', (e)=>{
	const clicked = e.target;
	//gets the value of the selected design.
	const clickedValue = clicked.value;
	//if t-shirt design is selected, color options are available for that specific design.
	if(clickedValue){		
		shirtsColor.disabled = false;
		for (let i = 0; i < shirtsColor.length; i++) {
			const element = shirtsColor[i].getAttribute('data-theme');
			if(clickedValue === element){
				shirtsColor[i].style.display = 'inherit';
			}else{
				shirtsColor[i].style.display = 'none';
			}
					
		}
	}

})
//event listener on activities field set, add or substract cost of activities
document.querySelector('#activities').addEventListener('change', (e)=>{
	const clickedActivity = e.target;
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
//function to show credit card as default payment and hides the other options.
function defaultPaymentMethod(){
	//set credit card as default on pageload. Using for loop, so if more payments added will still work.
	
	for (let i = 0; i < paymentMethod.length; i++) {
		let payId = paymentMethod[i].value;
		if (payId==='credit-card') {
			paymentMethod[i].selected =true;
		}
	}
	paypalOption.hidden=true;
	bitcoinOption.hidden=true;
	
	
}
//show default payment opting on page load.
defaultPaymentMethod();


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
//=====================================================
// ----------------FORM VALIDATION---------------------
//=====================================================
//validate name field. Numbers allowed thanks to ELON MUSK.
const nameFieldValidator = ()=>{
	
	const nameIsValid = /^[a-zA-Z0-9]+ ?[a-zA-Z0-9]*?[ -]?[a-zA-Z0-9]*?$/.test(nameElement.value);
	
	if (nameIsValid) {
		validationPass(nameElement);
	} else {
		validationFail(nameElement);
	}
}
//email validation, validate most common emails.
const emailFieldValidator=()=>{
	const email = document.querySelector('#email');
	//const emailValue = email.value;
	const emailIsValid = /^[^@]+@[^@.]+\.[a-z]*$/i.test(email.value);
	
	if (emailIsValid) {
		validationPass(email);
	} else {
		validationFail(email);
	}
}	
//activities validation, if no activity total should be zero
const activiyValidator= ()=>{
	const activityIsValid = totalCost > 0;
	if (activityIsValid) {
		validationPass(activityBox);
	} else {
		validationFail(activityBox);
	}
}
//card number validator, number must be between 13 and 14 no spaces or dashes.
const cardNumberValidator = ()=>{
	const cardNumber= document.querySelector('#cc-num')
	const cardNumberIsValid = /^\d{13,16}$/.test(cardNumber.value);
	if (cardNumberIsValid) {
		validationPass(cardNumber);
	} else {
		validationFail(cardNumber);
	}
	
}
//zip code must be 5 digits no space or dash allowed
const zipCodeValidator=()=>{
	const zipCode = document.querySelector('#zip');
	const zipIsValid = /^\d{5}$/.test(zipCode.value);
	if (zipIsValid) {
		validationPass(zipCode);
	} else {
		validationFail(zipCode);
	}

}
//cvv must be 3 digtis no space or dashes allowed.
const cvvValidator = ()=>{
	const cvv = document.querySelector('#cvv');
	
	const cvvIsValid= /^\d{3}$/.test(cvv.value);
	if (cvvIsValid) {
		validationPass(cvv);
	} else {
		validationFail(cvv);
	}

	
}
//FORM EVENT LISTENER, CONDITION IF TRUE SUBMIT IF FALSE PREVENT DEFAULT.
form.addEventListener('submit', (e)=>{
	
	if(!nameFieldValidator()){
		e.preventDefault();
		console.log('name not valid');
	}
	if(!emailFieldValidator()){
		e.preventDefault();
		console.log('email not valid');
	}
	if(!activiyValidator()){
		e.preventDefault();
		console.log('activity not valid');
	}
	//only check this fields if the credict card option was selected.
	if(creditCardOption.hidden !== true){
		
		if(!cardNumberValidator())
			e.preventDefault();
			console.log('card not valid');

			
		if(!zipCodeValidator()){
			e.preventDefault();
			console.log('zip code not valid');
		}
		if(!cvvValidator()){
			e.preventDefault();
			console.log('cvv not valid');
		}
	}
	

})
//=====================================================
// ----------------ACCESSIBILITY---------------------
//=====================================================
//activityboxinput holds array of input.
for (let i = 0; i < activityBoxInput.length; i++) {
	activityBoxInput[i].addEventListener('focus', (e)=>{
		//adds focus to active label
		activityBoxInput[i].parentElement.classList.add('focus');

	});
	activityBoxInput[i].addEventListener('blur', (e)=>{
		//removes focus from inactive lable.
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
	elementLabel.className = 'valid';
	elementLabel.classList.remove('not-valid');
	//hides the hint is validation pass.
	elementLabel.lastElementChild.style.display = 'none';
	return 'is valid';
}

function validationFail(element) {
	let elementLabel = element.parentNode;

	elementLabel.className = 'not-valid';
	elementLabel.classList.remove('valid');
	//shows hint is validation fail.
	elementLabel.lastElementChild.style.display = 'block';
	
	return 'not valid';
}
