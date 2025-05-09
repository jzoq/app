/* toolBarContainer */
import {ToolBarManager} from './toolBar/toolBarManager.js';

/* deviceContainer */
import {SelectedDeviceManager} from './device/selectedDeviceManager.js';
import {SelectedContractManager} from './device/selectedContractManager.js';
import {SelectedInstallmentsManager} from './device/selectedInstallmentsManager.js';
import {CheckedDevicePriceManager} from './device/checkedDevicePriceManager.js';
import {CheckedDeviceDiscountManager} from './device/checkedDeviceDiscountManager.js';

/* discountContainer */
import {CheckedDiscountManager} from './discount/checkedDiscountManager.js';
import {SelectedDiscountManager} from './discount/selectedDiscountManager.js';

/* planContainer */
import {SelectedPlanManager} from './plan/selectedPlanManager.js';
import {CheckedPlanManager} from './plan/checkedPlanManager.js';

/* optionContainer */
import {SelectedOptionManager} from './option/selectedOptionManager.js';
import {CheckedOptionManager} from './option/checkedOptionManager.js';

import {DisplayManager} from './displayManager.js';

export class MainManager{
	constructor(dependencies){
		this.valueState = dependencies.valueState;
		
		this.toolBarManagers = {
			action: new ToolBarManager({
				valueState: this.valueState,
				deviceCollections: dependencies.deviceCollections,
			}),
		};
		
		this.deviceManagers = {
			selected: new SelectedDeviceManager({
				valueState: this.valueState,
				deviceCollections: dependencies.deviceCollections,
				optionDatabase: dependencies.optionDatabase,
			}),
			contract: new SelectedContractManager({
				valueState: this.valueState,
			}),
			installments: new SelectedInstallmentsManager({
				valueState: this.valueState,
			}),
			checkedDevicePrice: new CheckedDevicePriceManager({
				valueState: this.valueState,
			}),
			checkedDeviceDiscount: new CheckedDeviceDiscountManager({
				valueState: this.valueState,
			}),
		};
		
		this.planManagers = {
			selected: new SelectedPlanManager({
				valueState: this.valueState,
				planDatabase: dependencies.planDatabase,
			}),
			checked: new CheckedPlanManager({
				valueState: this.valueState,
				planDatabase: dependencies.planDatabase,
			}),
		};
		
		this.optionsManagers = {
			selected: new SelectedOptionManager({
				valueState: this.valueState,
				optionDatabase: dependencies.optionDatabase,
			}),
			checked: new CheckedOptionManager({
				valueState: this.valueState,
			}),
		};
		
		this.discountManagers = {
			selected: new SelectedDiscountManager({
				valueState: this.valueState,
				discountDatabase: dependencies.discountDatabase,
			}),
			checkedDiscount: new CheckedDiscountManager({
				valueState: this.valueState,
			}),
		};
		
		this.uiManagers = {
			//action: new ActionContainerManager(...),
			display: new DisplayManager({
				valuestate: this.valueState,
			}),
		};
		this.valueState.subscribe(this.uiManagers.display);
	}
	
	init(){
		[this.deviceManagers,this.discountManagers,
		 this.planManagers,this.optionsManagers,
		 this.toolBarManagers].forEach(group => 
		 Object.values(group).forEach(m => m.init()));
	}
}