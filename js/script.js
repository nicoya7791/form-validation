// global variables
const nameElement = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const jobOptionSelection = document.querySelector('#title');
const shirtsDesign = document.querySelector('#design');
const shirtsColor = document.querySelector('#color');
const activityBoxInput = document.querySelectorAll('#activities-box input');
let totalCost = 0;
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
	let p = document.querySelector('#activities-cost');
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