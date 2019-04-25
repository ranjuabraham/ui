
export class PopularHalls {
  constructor(
    public city: string,
    public discVal: number,
    public hallCount: number,
    public ovrAttrDetURL: any,
    public pincode: number,
    public prdctDetDesc: string,
    public prdctDetId: number,
    public prdctId: number,
    public prdctIsDet: number,
    public tariff: number,
    public userRating: number) {
  }
}

export class Gallery {
  constructor(
    public imgFtr: string,
    public imgFtrDet: string,
    public imgHdr: string,
    public imgId: number,
    public imgMover: string,
    public imgPath: string,
    public imgSeq: number,
    public imgType: string,
    public imgTypId: number,
    public prdctDetId: number,
    public prdctId: number) {
  }
}

/* modify search - list page */
export class ModifySearch {
  constructor(
    public id: number,
    public venue: string,
    public date: string
  ) {
  }
}

export class Filter {
  constructor(public categoryId: number,
              public categoryName: string) {
  }
}


export class HallComponent {
  constructor(
    public alwBlkTyp: number,
    public city: string,
    public countAttr: string,
    public discVal: number,
    public googleMap: string,
    public hallCount: number,
    public ovrAttrAct: number,
    public ovrAttrDetDesc: string,
    public ovrAttrDetName: string,
    public ovrAttrDetSpec: string,
    public ovrAttrDetURL: string,
    public pincode: string,
    public prdctDetDesc: string,
    public prdctDetId: number,
    public prdctId: number,
    public prdctIsDet: number,
    public ratingCount: number,
    public subPrdctDetId: number,
    public tariff: number,
    public userRating: number
  ) {
  }
}

/* Halls write review */
export class WriteReview {
  constructor(rvwTitle: string,
              rvwBody: string,
              rvwRating: number,
              rvwName: string,
              userId: number,
              rvwId: number,
              action: string) {
  }
}

/* get category from json (assets->data->category.json) (filter - list page) */
export class Category {
  constructor(public id: number,
              public name: string) {
  }
}

/* Details page */
export class SessionData {
  constructor(
    public adnlDurAct: number,
    public adnlDurFlg: string,
  ) {
  }
}

export class ProductDetails {
  constructor(
    public prdctDetId: number,
    public subHallId: string,
    public date: string,
    public eventTypeId: string,
    public sessionId: string,
    public foodId: string,
  ) {
  }
}
