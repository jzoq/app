import {elements} from '../../utils/elements.js';

export class SelectedInstallmentsManager{
	constructor({valueState}){
		this.valueState = valueState;
	}
	
	init(){
		elements.installmentsNumSelect.addEventListener('change',(event)=>{
			/* valueStateに値を保管 */
			//this.valueState.setInstallments(1);//event.target.value);
			this.valueState.setInstallments(event.target.value);
		});
	}
}