import {elements} from '../../utils/elements.js';

export class SelectedDeviceManager{
	constructor({valueState,deviceCollections,optionDatabase}){
		this.valueState = valueState;
		this.deviceCollections = deviceCollections;
		this.optionDatabase = optionDatabase;
	}
	
	init(){
		elements.deviceSelect.addEventListener('change',(event)=>{
			//CSS更新
			elements.contractContent.style.visibility='visible';
			elements.installmentsNumSelect.style.opacity="1";
			elements.installmentsNumSelect.style.pointerEvents
														="auto";
														
			//端末情報取得と保存
			const data=this.deviceCollections.getDeviceData(
											event.target.value);
			this.valueState.setDeviceData(data);
			
			//smartあんしん補償の価格を端末ごとに更新
			const warrantyPrice = this.deviceCollections.
			getDeviceWarranty(data.deviceName);
			this.optionDatabase.
						setSmartWarrantyPrice(warrantyPrice);
		})
	}
}