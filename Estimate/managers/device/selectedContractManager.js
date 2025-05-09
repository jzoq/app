import {elements} from '../../utils/elements.js';

export class SelectedContractManager{
	constructor({valueState}){
		this.valueState = valueState;
	}
	
	init(){
		elements.contractSelect.addEventListener('change',(event)=>{
			/* CSS更新 */
			elements.discountContainer.style.visibility='visible';
			
			/* valueStateに値を保管 */
			this.valueState.setContractType(event.target.value);
		});
	}
}