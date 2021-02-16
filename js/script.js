// global variables
const nameElement = document.querySelector('#name');
const otherJobRole = document.querySelector('#other-job-role');
const jobOptionSelection = document.querySelector('#title');
const shirtsDesign = document.querySelector('#design');
const shirtsColor = document.querySelector('#color');

//disable the shirt color dropdown manu.
shirtsColor.disabled=true;
// give focus to name Input
nameElement.focus();
//hides the job role input on page load. if added during otherJobRole var declaration
//it will overrides the e.listener.
otherJobRole.hidden = true;
//this event hide/dipaly text field base on user job role selection
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