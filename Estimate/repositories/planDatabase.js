export class PlanDatabase {
  constructor() {
    this.plans = {
      eximo: {
        "ポイ活": 10615,
        "~1GB": 4565,
        "1~3GB": 5665,
        "~無制限": 7315
      },
      irumo: {
        "0.5GB": 550,
        "3GB": 2167,
        "6GB": 2827,
        "9GB": 3377
      },
      ahamo: {
        "30GB": 2970,
        "110GB": 4950
      }
    };
  }

  getPlanPrice(planName) {
	  for (const carrier in this.plans) {
	    for (const plan in this.plans[carrier]) {
	      const fullName = `${carrier} ${plan}`.replace(/\s+/g, '');
	      if (fullName === planName.replace(/\s+/g, '')) {
	        return this.plans[carrier][plan];
	      }
	    }
	  }
	  return null;
	}
}