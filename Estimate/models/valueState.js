/*
  現在の値の状態を保管するクラス
*/
export class ValueState{
	
	constructor(){
		this.state = {
			deviceName: "",
			devicePrice: 0,
			kaedokiPrice: 0,
			
			discount: 0,
			discountInfo: null,
			contractType: null,
			installments: 1,
			useDiscount: false,
			discountDevicePrice: 0,
			discountKaedokiPrice: 0,
			
			/* plan */
			eximoPrice: 4565,
			irumoPrice: 550,
			ahamoPrice: 2970,
			
			/* option */
			warranty: 0,
			mail: 330,
			
			/* discount */
			familyDiscountPrice: 0,
			wifiDiscountPrice: 1100,
			dcardDiscountPrice: 187,
			
			checkboxStates: {
				price: {checked:false,value:0},
				kaedokiPrice: {checked:false,value:0},
				eximoPlan:{checked:false,value:0},
				irumoPlan:{checked:false,value:0},
				ahamoPlan:{checked:false,value:0},
				callOption:{checked:false,value:0},
				warrantyOption:{checked:false,value:0},
				mailOption:{checked:false,value:0},
				securityOption:{checked:false,value:0},
				familyDiscount:{checked:false,value:0},
				wifiDiscount:{checked:false,value:0},
				dcardDiscount:{checked:false,value:0},
			}
		};
		this.observers = [];
	}
	
	subscribe(observer){
		this.observers.push(observer);
	}
	
	notify(){
		for(const observer of this.observers){
			observer.update(this);
		}
	}
	
	/* 端末選択時 */
	setDeviceData(data){
		const updateData = {
			...data,
			deviceName: data.name, // ← ここで deviceName を name からコピー
			discountInfo: data.discount,
		};
		this.state = {
			...this.state,
			...updateData // ← updateData を使う
		};
		
		if (this.state.contractType) {
			this.applyDiscount(this.state.contractType);
		}
		this.state.checkboxStates.price.value = this.currentDeviceInstallmentsPrice;
		this.state.checkboxStates.kaedokiPrice.value = this.currentKaedokiInstallmentsPrice;
		
		this.notify();
	}
	
	/* 契約種別選択時 */
	setContractType(type){
		this.state.contractType = type;
		this.applyDiscount(type);
		
		this.state.checkboxStates.price.value = this.currentDeviceInstallmentsPrice;
		this.state.checkboxStates.kaedokiPrice.value = this.currentKaedokiInstallmentsPrice;
		this.notify();
	}
	
	applyDiscount(type){
		const discountInfo = this.state.discountInfo;
		
		let discountAmount = 0;
		switch(type){
			case '機種変更':
				discountAmount = discountInfo.upgrade || 0;
				break;
			case '新規':
				discountAmount = discountInfo.newContract || 0;
				break;
			case 'MNP':
				discountAmount = discountInfo.mnp || 0;
				break;
		}
		this.state.discount = discountAmount;
		this.state.discountDevicePrice = this.state.devicePrice - discountAmount;
		this.state.discountKaedokiPrice = this.state.kaedokiPrice - discountAmount;
	}
	
	/* 分割回数選択時 */
	setInstallments(count){
	    this.state.installments = count || 1; // 0 や undefined が渡されることがないようにデフォルト値を設定
	    // 分割回数が変わったので、再計算してvalueに反映
	    if (this.state.checkboxStates.price.checked) {
	        this.state.checkboxStates.price.value = this.currentDeviceInstallmentsPrice;
	    }
	    if (this.state.checkboxStates.kaedokiPrice.checked) {
	        this.state.checkboxStates.kaedokiPrice.value = this.currentKaedokiInstallmentsPrice;
	    }
	    this.notify();
	}
	
	/* 割引チェックボックス押下時 */
	setUseDiscount(flg){
		this.state.useDiscount = flg;
		
		this.state.checkboxStates.price.value = this.currentDeviceInstallmentsPrice;
		this.state.checkboxStates.kaedokiPrice.value = this.currentKaedokiInstallmentsPrice;
		this.notify();
	}
	
	/* 端末価格チェックボックス押下時 */
	setCheckedDevicePrice(price){
		this.state.checkedDevicePrice = price;
		this.notify();
	}
	
	setEximoPlan(price) {
	  this.state.eximoPrice = price;
	
	  const state = this.state.checkboxStates.eximoPlan;
	  if (state?.checked) {
	    state.value = price;
	  }
	
	  this.notify();
	}
	
	setIrumoPlan(price) {
	  this.state.irumoPrice = price;
	
	  const state = this.state.checkboxStates.irumoPlan;
	  if (state?.checked) {
	    state.value = price;
	  }
	
	  this.notify();
	}
	
	setAhamoPlan(price) {
	  this.state.ahamoPrice = price;
	
	  const state = this.state.checkboxStates.ahamoPlan;
	  if (state?.checked) {
	    state.value = price;
	  }
	
	  this.notify();
	}
	
	setCallOption(price) {
	  this.state.callOptionPrice = price;
	
	  const state = this.state.checkboxStates.callOption;
	  if (state?.checked) {
	    state.value = price;
	  }
	
	  this.notify();
	}
	
	setWarrantyOption(name,price) {
	    this.state.warranty = price;
	    const state = this.state.checkboxStates.warrantyOption;
	    if (state?.checked) {
			state.value = price;
	    }
	    this.notify();
	}
	
	setMailOption(price) {
	    this.state.mailOptionPrice = price;
	
	    const state = this.state.checkboxStates.mailOption;
	    if (state?.checked) {
	      state.value = price;
	    }
	    this.notify();
	}
	
	setSecurityOption(price) {
	  this.state.securityOptionPrice = price;
	
	  const state = this.state.checkboxStates.securityOption;
	  if (state?.checked) {
	    state.value = price;
	  }
	
	  this.notify();
	}
	
	setFamilyDiscount(price) {
	  this.state.familyDiscountPrice = price;
	
	  const state = this.state.checkboxStates.familyDiscount;
	  if (state?.checked) {
	    state.value = -(price);
	  }
	
	  this.notify();
	}
	
	setWifiDiscount(price) {
		this.state.wifiDiscountPrice = price;
	
	  const state = this.state.checkboxStates.wifiDiscount;
	  if (state?.checked) {
	    state.value = -(price);
	  }
	
	  this.notify();
	}
	
	setDcardDiscount(price) {
	  this.state.dcardDiscountPrice = price;
	
	  const state = this.state.checkboxStates.dcardDiscount;
	  if (state?.checked) {
	    state.value = -(price);
	  }
	
	  this.notify();
	}
	
	/* total加算用チェックボックス押下時 */
	setCheckboxState(name, isChecked, value) {
		if (this.state.checkboxStates.hasOwnProperty(name)) {
	    this.state.checkboxStates[name] = {
	      checked: isChecked,
	      value: value
	    };
	    this.notify();
	  }
	}
	
	resetAll() {
		this.state = {
			deviceName: "",
			devicePrice: 0,
			kaedokiPrice: 0,
			
			discount: 0,
			discountInfo: null,
			contractType: null,
			installments: 1,
			useDiscount: false,
			discountDevicePrice: 0,
			discountKaedokiPrice: 0,
			
			/* plan */
			eximoPrice: 4565,
			irumoPrice: 550,
			ahamoPrice: 2970,
			
			/* option */
			warranty: 0,
			mail: 330,
			
			/* discount */
			familyDiscountPrice: 1100,
			wifiDiscountPrice: 1100,
			dcardDiscountPrice: 187,
			
			checkboxStates: {
				price: {checked:false,value:0},
				kaedokiPrice: {checked:false,value:0},
				eximoPlan:{checked:false,value:0},
				irumoPlan:{checked:false,value:0},
				ahamoPlan:{checked:false,value:0},
				callOption:{checked:false,value:0},
				warrantyOption:{checked:false,value:0},
				mailOption:{checked:false,value:0},
				securityOption:{checked:false,value:0},
				familyDiscount:{checked:false,value:0},
				wifiDiscount:{checked:false,value:0},
				dcardDiscount:{checked:false,value:0},
			}
		};
		this.notify();
	}
	
	getDeviceData(){
		return {
			deviceName: this.state.deviceName,
			devicePrice: this.state.devicePrice,
			kaedokiPrice: this.state.kaedokiPrice,
			warranty: this.state.warranty,
			discount: this.state.discount
		};
	}
	
	get currentEximoPrice(){
		return this.state.eximoPrice;
	}
	
	get currentIrumoPrice(){
		return this.state.irumoPrice;
	}
	
	get currentAhamoPrice(){
		return this.state.ahamoPrice;
	}
	
	get currentDevicePrice(){
		return this.state.useDiscount ? 
			this.state.discountDevicePrice : this.state.devicePrice;
	}
	
	get currentDeviceInstallmentsPrice(){
		return this.state.useDiscount ? 
			Math.floor(this.state.discountDevicePrice/this.state.installments):
			Math.floor(this.state.devicePrice/this.state.installments);
	}
	
	get currentKaedokiPrice(){
		return this.state.useDiscount ?
			this.state.discountKaedokiPrice: this.state.kaedokiPrice;
	}
	
	get currentKaedokiInstallmentsPrice(){
	    return this.state.useDiscount ? 
	        Math.floor(this.state.discountKaedokiPrice / 23) :
	        Math.floor(this.state.kaedokiPrice / 23);
	}
	
	get currentCallOptionPrice(){
	    return this.state.callOptionPrice ?? 0;
	}
	
	get currentWarrantyOptionPrice(){
	    return this.state.warranty ?? 0;
	}

	get currentMailOptionPrice(){
	    return this.state.mailOptionPrice ?? 0;
	}

	get currentSecurityOptionPrice(){
	    return this.state.securityOptionPrice ?? 0;
	}
	
	get currentFamilyDiscountPrice(){
	    return this.state.familyDiscountPrice ?? 0;
	}
	
	get currentWifiDiscountPrice(){
	    return this.state.wifiDiscountPrice ?? 0;
	}
	
	get currentDcardDiscountPrice(){
	    return this.state.dcardDiscountPrice ?? 0;
	}
	
	get totalPrice() {
	    let total = 0;
	    for (const key in this.state.checkboxStates) {
	      const item = this.state.checkboxStates[key];
	      if (item.checked) {
	        total += item.value;
	      }
	    }
	    return total;
	}
}