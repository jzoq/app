import {elements} from '../../utils/elements.js';

export class CheckedPlanManager {
	constructor({valueState, planDatabase}) {
		this.valueState = valueState;
		this.planDatabase = planDatabase;

		this.planConfigs = [
			{ name: 'eximoPlan', checkbox: elements.eximoCheckbox, currentPriceKey: 'currentEximoPrice' },
			{ name: 'irumoPlan', checkbox: elements.irumoCheckbox, currentPriceKey: 'currentIrumoPrice' },
			{ name: 'ahamoPlan', checkbox: elements.ahamoCheckbox, currentPriceKey: 'currentAhamoPrice' }
		];
	}

	init() {
		this.planConfigs.forEach((targetPlan) => {
			targetPlan.checkbox.addEventListener('change', (event) => {
				const isChecked = event.target.checked;

				// 他のチェックボックスはオフにする
				this.planConfigs.forEach((otherPlan) => {
					const isTarget = otherPlan.name === targetPlan.name;
					const shouldBeChecked = isTarget ? isChecked : false;
					otherPlan.checkbox.checked = shouldBeChecked;

					this.valueState.setCheckboxState(
						otherPlan.name,
						shouldBeChecked,
						this.valueState[otherPlan.currentPriceKey]
					);
				});
			});
		});
	}
}