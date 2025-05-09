import {elements} from '../../utils/elements.js';

export class CheckedDiscountManager {
	constructor({valueState}) {
		this.valueState = valueState;
	}

	init() {
		// 個別の割引チェックボックスを一括で設定
		const checkboxMappings = [
			{
				element: elements.familyDiscountCheckbox,
				key: 'familyDiscount',
				priceKey: 'currentFamilyDiscountPrice'
			},
			{
				element: elements.wifiDiscountCheckbox,
				key: 'wifiDiscount',
				priceKey: 'currentWifiDiscountPrice'
			},
			{
				element: elements.dcardDiscountCheckbox,
				key: 'dcardDiscount',
				priceKey: 'currentDcardDiscountPrice'
			}
		];

		checkboxMappings.forEach(({element, key, priceKey}) => {
			element.addEventListener('change', (event) => {
				const isChecked = event.target.checked;
				const price = isChecked ? -this.valueState[priceKey] : 0;
				this.valueState.setCheckboxState(key, isChecked, price);
			});
		});
	}
}