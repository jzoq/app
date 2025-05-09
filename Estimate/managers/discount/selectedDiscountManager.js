import { elements } from '../../utils/elements.js';

export class SelectedDiscountManager {
	constructor({ valueState, discountDatabase }) {
		this.valueState = valueState;
		this.discountDatabase = discountDatabase;

		this.discountMappings = [
			{ element: elements.familyDiscountSelect, type: 'family', setter: this.valueState.setFamilyDiscount.bind(this.valueState) },
			{ element: elements.wifiDiscountSelect, type: 'wifi', setter: this.valueState.setWifiDiscount.bind(this.valueState) },
			{ element: elements.dcardDiscountSelect, type: 'dcard', setter: this.valueState.setDcardDiscount.bind(this.valueState) }
		];
	}

	init() {
		this.discountMappings.forEach(({ element, type, setter }) => {
			if (!element) {
				console.warn(`要素が見つかりません: ${type}DiscountSelect`);
				return;
			}
			element.addEventListener('change', (event) => {
				const selectedName = event.target.value;
				const price = this.discountDatabase.getDiscountPrice(type, selectedName);
				setter(price);
			});
		});
	}
}