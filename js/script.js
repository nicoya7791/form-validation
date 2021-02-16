// global variables
const nameElement = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const jobOptionSelection = document.querySelector('#title');
const shirtsDesign = document.querySelector('#design');
const shirtsColor = document.querySelector('#color');
const activityBoxInput = document.querySelectorAll('#activities-box input');
const paymentMethod = document.querySelectorAll('#payment option');
const paypalOption = document.querySelector('#paypal');
const bitcoinOption = document.querySelector('#bitcoin');
const creditCardOption = document.querySelector('#credit-card');
let payOptionArray=[paypalOption, creditCardOption, bitcoinOption];
let totalCost = 0;
//set credit card as default on pageload. Using for loop, so if more payments added will still work.
for (let i = 0; i < paymentMethod.length; i++) {
	let payId = paymentMethod[i].value;
	if (payId==='credit-card') {
		paymentMethod[i].selected =true;
	};
	
}

//by default shows credit card on load.
creditCardOption.selected = true;
//disable the shirt color dropdown manu.
shirtsColor.disabled=true;
// give focus to name Input
nameElement.focus();
//hides the job role input on page load. if added during otherJobRole var declaration
//it will overrides the e.listener.
otherJobRole.hidden = true;
//this event hide/diplay text field base on user job role selection
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
	const clickedValue = clicked.value;
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
//event listener on activities field set.
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

//event listener to show or hide pay options.
document.querySelector('#payment').addEventListener('change', (e)=>{
	let = payMethodClicked = e.target.value;
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

