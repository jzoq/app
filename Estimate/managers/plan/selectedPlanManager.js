import {elements} from '../../utils/elements.js';

export class SelectedPlanManager {
	constructor({valueState, planDatabase}) {
		this.valueState = valueState;
		this.planDatabase = planDatabase;

		this.selectMappings = [
			{ element: elements.eximoSelect, setter: 'setEximoPlan' },
			{ element: elements.irumoSelect, setter: 'setIrumoPlan' },
			{ element: elements.ahamoSelect, setter: 'setAhamoPlan' }
		];
	}

	init() {
		this.selectMappings.forEach(({ element, setter }) => {
			element.addEventListener('change', (event) => {
				const planName = event.target.value;
				const planPrice = this.planDatabase.getPlanPrice(planName);
				if (typeof this.valueState[setter] === 'function') {
					this.valueState[setter](planPrice);
				}
			});
		});
	}
}