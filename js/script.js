// global variables
const nameElement = document.querySelector('#name');
// give focus to name Input
nameElement.focus();
const otherJobRole = document.querySelector('#other-job-role');
//hides the job role input on page load. if added during otherJobRole var declaration
//it will overrides the e.listener.
otherJobRole.hidden = true;
const jobOptionSelection = document.querySelector('#title');
//this event hide/dipaly text filed base on user job role selection
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
