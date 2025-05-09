import {elements} from './utils/elements.js';
import {MainManager} from './managers/mainManager.js';

import {ValueState} from './models/valueState.js';

import {DeviceCollections} from './repositories/deviceCollections.js';
import {PlanDatabase} from './repositories/planDatabase.js';
import {OptionDatabase} from './repositories/optionDatabase.js';
import {DiscountDatabase} from './repositories/discountDatabase.js';

const deviceCollections = new DeviceCollections();
const deviceNames = deviceCollections.getAllDeviceNames();

deviceNames.forEach(deviceName => {
	const option = document.createElement('option');
	option.value = deviceName;
	option.textContent = deviceName;
	elements.deviceSelect.appendChild(option);
});

//dependencies: 「依存オブジェクト」
const mainManagerDependencies = {
	valueState: new ValueState(),
	deviceCollections: new DeviceCollections(),
	planDatabase: new PlanDatabase(),
	optionDatabase: new OptionDatabase(),
	discountDatabase: new DiscountDatabase(),
};

//MainManagerに依存を注入して生成
const mainManager = new MainManager(mainManagerDependencies);

//初期化
mainManager.init();