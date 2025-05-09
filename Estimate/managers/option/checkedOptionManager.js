import { elements } from '../../utils/elements.js';

export class CheckedOptionManager {
	constructor({ valueState }) {
		this.valueState = valueState;

		this.optionCheckboxes = [
			{ key: 'callOption',    element: elements.callOptionCheckbox,    priceKey: 'currentCallOptionPrice' },
			{ key: 'warrantyOption', element: elements.warrantyOptionCheckbox, priceKey: 'currentWarrantyOptionPrice' },
			{ key: 'mailOption',    element: elements.mailOptionCheckbox,    priceKey: 'currentMailOptionPrice' },
			{ key: 'securityOption', element: elements.securityOptionCheckbox, priceKey: 'currentSecurityOptionPrice' },
		];
	}

	init() {
		this.optionCheckboxes.forEach(({ key, element, priceKey }) => {
			element.addEventListener('change', (event) => {
				const isChecked = event.target.checked;
				const price = isChecked ? this.valueState[priceKey] : 0;

				this.valueState.setCheckboxState(key, isChecked, price);
			});
		});
	}
}