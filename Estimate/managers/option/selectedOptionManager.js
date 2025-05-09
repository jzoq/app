import {elements} from '../../utils/elements.js';

export class SelectedOptionManager {
	constructor({ valueState, optionDatabase}) {
		this.valueState = valueState;
		this.optionDatabase = optionDatabase;

		this.optionConfigs = [
			{
				element: elements.callOptionSelect,
				category: 'call',
				setter: (optionName) => {
					const price = this.optionDatabase.getOptionPrice('call', optionName);
					this.valueState.setCallOption(price);
				},
			},
			{
				element: elements.warrantyOptionSelect,
				category: 'warranty',
				
				setter: (priceName) => {
					const price = this.optionDatabase.getOptionPrice('warranty', priceName);
					this.valueState.setWarrantyOption(priceName, price);
				},
				
			},
			{
				element: elements.mailOptionSelect,
				category: 'mail',
				setter: (optionName) => {
					const price = this.optionDatabase.getOptionPrice('mail', optionName);
					this.valueState.setMailOption(price);
				},
			},
			{
				element: elements.securityOptionSelect,
				category: 'security',
				setter: (optionName) => {
					const price = this.optionDatabase.getOptionPrice('security', optionName);
					this.valueState.setSecurityOption(price);
				},
			}
		];
	}

	init() {
		this.optionConfigs.forEach(({ element, category, setter }) => {
			element.addEventListener('change', (event) => {
				const optionName = event.target.value;
				const price = this.optionDatabase.getOptionPrice(category, optionName);
				setter(optionName, price);
			});
		});
	}
}