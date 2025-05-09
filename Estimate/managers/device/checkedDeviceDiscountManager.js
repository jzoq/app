import {elements} from '../../utils/elements.js';

export class CheckedDeviceDiscountManager {
	constructor({valueState}) {
		this.valueState = valueState;
	}

	init() {
		// 割引ON/OFFのチェックボックス
		elements.discountCheckbox.addEventListener('change', (event) => {
			this.valueState.setUseDiscount(event.target.checked);
		});
	}
}