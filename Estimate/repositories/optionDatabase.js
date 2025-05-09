export class OptionDatabase {
	constructor() {
    	this.options = {
      		call: {
        		"5分通話無料": 880,
       			"かけ放題": 1980,
        		"なし": 0,
      		},
      		warranty: {
        		"smartあんしん補償": 0, //<-端末選択時に価格が設定される
       			"モバイルe保険": 770,
        		"なし": 0,
      		},
	  		mail:{
		  		"ドコモメール": 330,
		  		"その他キャリアメール": 330,
		  		"なし": 0,
	  		},
      		security: {
        		"あんしんセキュリティ": 550,
        		"ウイルスバスター 1台版": 770,
				"ウイルスバスター 3台版": 990,
				"なし": 0,
      		}
    	};
	}
  
	getOptionPrice(category, optionName, deviceName=null){
		return this.options[category]?.[optionName] ?? 0;
	}
	
	/* 端末選択時、その端末のsmartあんしん補償の価格を格納 */
	setSmartWarrantyPrice(price){
		this.options.warranty["smartあんしん補償"] = price;
	}
}