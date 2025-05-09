import {elements} from '../../utils/elements.js';

export class CheckedDevicePriceManager{
	constructor({valueState}){
		this.valueState = valueState;
	}
	
	//チェックボックスの状態変更時に呼ばれる共通処理
	handleCheckboxChange(checkboxType, checkboxState, oppositeCheckboxType, oppositeCheckboxState, priceType) {
	// 逆のチェックボックスを外す
	elements[oppositeCheckboxType].checked = false;

	// 現在のチェックボックスの状態を valueState に反映
	this.valueState.setCheckboxState(checkboxType, checkboxState, priceType);

	// 逆のチェックボックスの値を 0 に更新（OFFにしたので）
	const oppositePriceType = (checkboxType === 'price') ? 'kaedokiPrice' : 'price';
	this.valueState.setCheckboxState(oppositePriceType, false, 0);
}
	
	init() {
		elements.normalCheckbox.addEventListener('change', (event) => {
			const isChecked = event.target.checked;
			this.handleCheckboxChange('price',isChecked,'kaedokiCheckbox',false,isChecked?this.valueState.currentDeviceInstallmentsPrice:0);
		});
		
		elements.kaedokiCheckbox.addEventListener('change', (event) => {
			const isChecked = event.target.checked;
			this.handleCheckboxChange('kaedokiPrice',isChecked,'normalCheckbox',false,isChecked?this.valueState.currentKaedokiInstallmentsPrice:0);
		});
	}
}