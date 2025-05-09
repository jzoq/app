// 端末の全ての情報が書かれたクラス
export class DeviceDatabase {
    constructor() {
		const savedData = localStorage.getItem('deviceDatabase');
        if(savedData){
			this.devices = JSON.parse(savedData);
        }else{
			this.devices = {
				"iPhone16e 128GB": {
					devicePrice: 0,
					kaedokiPrice: 0,
					warranty: 0,
					discount: {
						upgrade: 0,
						mnp: 0,
						newContract: 0,
					}
				},
	            "iPhone16 128GB": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                	discount: {
	                        upgrade: 0,
	                        mnp: 0,
	                        newContract: 0
	                    }
	                },
	            "iPhone15 128GB": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "iPhone16 256GB": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "iPhone16 Pro 128GB": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "iPhone16 Pro 256GB": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "Google Pixel8a": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
				"Google Pixel9a": {
					devicePrice: 0,
					kaedokiPrice: 0,
					warranty: 0,
					discount: {
						upgrade: 0,
						mnp: 0,
						newContract: 0,
					}
				},
	            "Google Pixel9": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "Galaxy S25": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "Galaxy A55": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
				"Galaxy A25": {
					devicePrice: 0,
					kaedokiPrice: 0,
					warranty: 0,
					discount: {
						upgrade: 0,
						mnp: 0,
						newContract: 0
					}
				},
	            "Xperia 10VI": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "AQUOS wish4": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "AQUOS sense9": {
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
	            "arrows We2":{
	                devicePrice: 0,
	                kaedokiPrice: 0,
	                warranty: 0,
	                discount: {
	                    upgrade: 0,
	                    mnp: 0,
	                    newContract: 0
	                }
	            },
				"らくらくスマートフォン": {
					devicePrice: 0,
					kaedokiPrice: 0,
					warranty: 0,
					discount: {
						upgrade: 0,
						mnp: 0,
						newContract: 0
					}
				}
	        };
		}
    }
	
	saveToLocalStorage(){
		localStorage.setItem(
			'deviceDatabase',JSON.stringify(this.devices));
	}
}
