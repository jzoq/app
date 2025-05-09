import {elements} from '../utils/elements.js';

export class DisplayManager {
	constructor({state}) {
		this.state = state;
	}

	update(state) {
		const devicePrice = parseInt(state.currentDevicePrice);
		const deviceInstallmentsPrice = state.currentDeviceInstallmentsPrice;
		const kaedokiPrice = state.currentKaedokiPrice;
		const kaedokiInstallmentsPrice = state.currentKaedokiInstallmentsPrice;
		
		/* deviceContainer */
		elements.devicePrice.textContent = `${devicePrice.toLocaleString()} 円`;
		
		elements.normalPrice.textContent = `${devicePrice.toLocaleString()} 円`;
		elements.normalMonthlyPrice.textContent = `${deviceInstallmentsPrice.toLocaleString()} 円`;
		elements.kaedokiPrice.textContent = `${kaedokiPrice.toLocaleString()} 円`;
		elements.kaedokiMonthlyPrice.textContent = `${kaedokiInstallmentsPrice.toLocaleString()} 円`;
		
		elements.eximoPrice.textContent = `${state.currentEximoPrice.toLocaleString()} 円`;
		elements.irumoPrice.textContent = `${state.currentIrumoPrice.toLocaleString()} 円`;
		elements.ahamoPrice.textContent = `${state.currentAhamoPrice.toLocaleString()} 円`;
		
		elements.callOptionPrice.textContent = `${state.currentCallOptionPrice.toLocaleString()} 円`;
		
		if (elements.warrantyOptionSelect.value === "補償") {
			elements.warrantyOptionPrice.textContent = `0 円`;
		} else {
			elements.warrantyOptionPrice.textContent = `${state.currentWarrantyOptionPrice.toLocaleString()} 円`;
		}
		elements.mailOptionPrice.textContent = `${state.currentMailOptionPrice.toLocaleString()} 円`;
		elements.securityOptionPrice.textContent = `${state.currentSecurityOptionPrice.toLocaleString()} 円`;
		
		elements.familyDiscountPrice.textContent = `${state.currentFamilyDiscountPrice.toLocaleString()} 円`;
		elements.wifiDiscountPrice.textContent = `${state.currentWifiDiscountPrice.toLocaleString()} 円`;
		elements.dcardDiscountPrice.textContent = `${state.currentDcardDiscountPrice.toLocaleString()} 円`;
		
		elements.totalContainer.textContent = `合計 ${state.totalPrice.toLocaleString()} 円`;
	}
}