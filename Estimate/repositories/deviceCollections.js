 import {Device} from '../models/device.js';
import {DeviceDatabase} from './deviceDatabase.js'

export class DeviceCollections {
	
	constructor(){
		this.deviceDatabase = new DeviceDatabase();
		this.devices = this.buildDevices();
	}
	
	buildDevices(){
		const deviceList = [];
		const rawDevices = this.deviceDatabase.devices;
		
		/*
		  deviceクラス型のオブジェクトをdeviceDatabaseのデータを元に作成
		  for(const [name,data] of Object.entries(rawDevices))
		  は、まずrawDevicesにエントリーして一つを取り出して
		  const[name,data]に代入している
		  
		  例) "iPhone15", {price: ... , kaedokiPrice: ...}の
		     iPhone15をnameに代入、それ以外のkeyをまとめてdataに格納
		*/
		for(const [name, data] of Object.entries(rawDevices)){
			const device = new Device(
				name,
				data.devicePrice,
				data.kaedokiPrice,
				data.warranty,
				data.discount
			);
			deviceList.push(device);
		}
		
		return deviceList;
	}
	
	getAllDeviceNames() {
		return this.devices.map(device => device.name);
	}
	
	getDeviceData(name) {
		const deviceName = this.getDeviceName(name);
		if (!deviceName) return null;

		return {
			deviceName: deviceName.name,
			devicePrice: deviceName.devicePrice,
			kaedokiPrice: deviceName.kaedokiPrice,
			warranty: deviceName.warranty,
			discount: deviceName.discount
		};
	}
	
	getDeviceName(name){
		return this.devices.find(device=>device.name===name);
	}
	
	getDevicePrice(name){
		const deviceName = this.getDeviceName(name);
		return deviceName ? deviceName.devicePrice : null;
	}
	
	getDeviceKaedokiPrice(name){
		const deviceName = this.getDeviceName(name);
		return deviceName ? deviceName.kaedokiPrice : null;
	}
	
	getDeviceWarranty(name){
		const deviceName = this.getDeviceName(name);
		return deviceName && deviceName.warranty != null ? deviceName.warranty : 0;
	}
	
	getDeviceDiscount(name,contractType){
		const deviceName = this.getDeviceName(name);
		
		switch(contractType){
			case "機種変更":
				return deviceName.discount.upgrade;
			case "新規":
				return deviceName.discount.newContract;
			case "MNP":
				return deviceName.discount.mnp;
			default:
				return 0;
		}
	}
	
	updateDeviceInfo(deviceName, newInfo) {
		if (this.deviceDatabase.devices[deviceName]) {
			this.deviceDatabase.devices[deviceName] = {
				...this.deviceDatabase.devices[deviceName],
				...newInfo
			};
			
			// デバイス一覧も更新（Deviceインスタンスを更新）
			const index = this.devices.findIndex(device => device.name === deviceName);
			if (index !== -1) {
				this.devices[index] = new Device(
					deviceName,
					newInfo.devicePrice ?? this.devices[index].devicePrice,
					newInfo.kaedokiPrice ?? this.devices[index].kaedokiPrice,
					newInfo.warranty ?? this.devices[index].warranty,
					newInfo.discount ?? this.devices[index].discount
				);
			}
			this.deviceDatabase.saveToLocalStorage();
		} else {
			console.warn(`Device "${deviceName}" not found in deviceDatabase.`);
		}
	}


}