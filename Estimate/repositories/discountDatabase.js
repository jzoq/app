export class DiscountDatabase {
  constructor() {
    this.discounts = {
      family: {
        "ファミリー割引き ~2人": 550,
        "ファミリー割引き 3~": 1100,
        "なし": 0,
      },
      wifi: {
        "ドコモ光・home5Gセット割": 1100,
        "なし": 0,
      },
	  dcard:{
		  "dカード割": 187,
		  "なし": 0,
	  },
    };
  }

   getDiscountPrice(category, discountName) {
    if (this.discounts[category] && this.discounts[category][discountName] !== undefined) {
      return this.discounts[category][discountName];
    }
    return 0;
  }
}