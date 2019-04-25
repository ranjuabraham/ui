import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../../shared/window.service';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';

@Component({
  selector: 'app-food-menu-edit',
  templateUrl: './food-menu-edit.component.html',
  styleUrls: ['./food-menu-edit.component.scss']
})
export class FoodMenuEditComponent implements OnInit {
  public foodMenuForm: FormGroup;
  public prdctDetId;
  public subHallId;
  public foodTypeId;
  public foodMenuData;
  public nonChoices;
  public inputValue;
  public reservePercentage: number;
  public reservePeriod = false;
  public reserveAmount: number;
  public reservePeriodDays: number;
  public pricePerHeadAmount: number;
  public guaranteedPaxMinDec: number;
  public guaranteedPaxMin: number;
  public guaranteedPaxMinInput: any;
  public guaranteedPaxMaxInput: any;
  public guaranteedPaxMax: number;
  public buffetCostAmount: number;
  public offerDiscountValue: number;
  public offerDiscountAmount: number;
  public gstValue: number;
  public gstAmount: number;
  public subTotalAmount: number;
  public totalAmount: number;
  isSticky = false;
  isStickyCategory = false;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  loadList: any;
  foodList: any;
  fdCategoryId: any;
  categoryList: any;
  categoryArray: any;
  selectedMenus: any;
  selectedFoodItems: any;
  private currentSectionName;
  private sectionsIndex: any = [];
  sections: any;
  disabled = false;
  productDetId;
  userId;
  bookingId;
  itemList;
  public selectedItems: any; // assign selected buffet food items data from server

  constructor(public appService: AppService, private router: Router,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private el: ElementRef, public fb: FormBuilder, @Inject(DOCUMENT) private document: Document,
              @Inject(WINDOW) private window: Window) {

    this.productDetId = this.route.snapshot.queryParamMap.get('productDetId');
    this.subHallId = this.route.snapshot.queryParamMap.get('subHallId');
    this.foodTypeId = this.route.snapshot.queryParamMap.get('foodTypeId');
    this.userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
    this.bookingId = this.route.snapshot.queryParamMap.get('bookingId');
    this.foodMenuForm = fb.group({
      addrName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getFoodMenuList();
    if (document.body.scrollTop > 0) {
    }

  }

  getFoodMenuList() {
    this.appService.getFoodMenuList(this.productDetId, this.subHallId, this.foodTypeId, this.bookingId).subscribe(
      res => {
        this.foodMenuData = res;
        this.selectedItems = JSON.parse(res['select_items'].itemData);
        const unSelected = [];
        for (let i = 0; i < this.foodMenuData['menu'].length; i++) {
          const items = this.foodMenuData['menu'][i]['items'];
          for (let j = 0; j < items.length; j++) {
            for (let k = 0; k < this.selectedItems.length; k++) {
              const itemData = items[j];
              if (items[j].itemIdx === this.selectedItems[k]) {
                unSelected.push(itemData);
                for (let l = 0; l < unSelected.length; l++) {
                  unSelected[l].selected = true;
                }
              }
            }
          }
        }
        // console.log(unSelected);
        console.log('edit food menu item  -------------------------------------------');
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (this.foodMenuData) {
      for (let i = 0; i < this.foodMenuData['menu'].length; i++) {
        const inputElements = document.getElementById('checkbox-' + this.foodMenuData['menu'][i].catgId).querySelectorAll<HTMLInputElement>
        ('.mat-checkbox-input');
        const leftCategory = (<HTMLInputElement>document.getElementById('categoryId' + this.foodMenuData['menu'][i].catgId));
        const rightCategory = (<HTMLInputElement>document.getElementById('category' + this.foodMenuData['menu'][i].catgId));
        const leftPosition = leftCategory.offsetTop;
        const rightPosition = rightCategory.offsetTop;
        const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if (leftPosition[i] > rightPosition[i]) {
          leftCategory.classList.add('active-category');
        }
      }
    }
  }

  @HostListener('scroll', ['$event'])
  onElementScroll($event) {
  }

  foodMenuHeader(reachedTarget: boolean): void {
    if (reachedTarget) {
      console.log('Yeah, we reached our destination');
    } else {
      console.log('Ohoh, something interrupted us');
    }
  }

  identify(index, foodMenus) {
    const cateId = foodMenus.catgId;
    const stickyHeader = cateId.offsetTop;
  }

  private getCurrentSectionName() {
    if (this.foodMenuData) {
      for (let i = 0; i < this.foodMenuData['menu'].length; i++) {
        const inputElements = document.getElementById('checkbox-' + this.foodMenuData['menu'][i].catgId).querySelectorAll<HTMLInputElement>
        ('.mat-checkbox-input');

        const leftCategory = (<HTMLInputElement>document.getElementById('categoryId' + this.foodMenuData['menu'][i].catgId));
        const rightCategory = (<HTMLInputElement>document.getElementById('category' + this.foodMenuData['menu'][i].catgId));
        const leftPosition = leftCategory.offsetTop;
        const rightPosition = rightCategory.offsetTop;
        if (leftPosition === rightPosition) {
          leftCategory.classList.add('active-category');
        }
      }
    }
    const scrollDistance: number = this.el.nativeElement.offsetTop;
    const offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
  }


  getCheckedItemList() {
    this.checkedList = [];
    this.categoryList = [];
    this.itemList = [];
    console.log(this.foodMenuData);
    if (this.foodMenuData) {
      const foodList = this.foodMenuData.menu;
      for (let i = 0; i < foodList.length; i++) {
        const foodItem = foodList[i].items;
        for (let j = 0; j < foodItem.length; j++) {
          const items = foodItem[j];
          if (items.selected) {
            this.checkedList.push({
              ['category']: foodList[i].catgHdr,
              ['categoryId']: foodList[i].catgId,
              ['limit']: foodList[i].limit,
              value: [{itemId: items.itemId, itemIdx: items.itemIdx, itemHdr: items.itemHdr, selected: items.selected}]
            });
            this.itemList.push(items.itemIdx);
          }
          this.categoryList.push({
            ['category']: foodList[i].catgHdr,
            ['categoryId']: foodList[i].catgId,
            ['limit']: foodList[i].limit,
            ['count']: 0,
            ['value']: [items]
          });
        }
      }
      const output = [];
      const output1 = [];
      this.categoryList.forEach(function (item) {
        const existing = output.filter(function (v, id) {
          return v.category === item.category;
        });
        if (existing.length) {
          const existingIndex = output.indexOf(existing[0]);
          output[existingIndex].value = output[existingIndex].value.concat(item.value);
          // console.log(output[existingIndex].value);
        } else {
          if (typeof item.value === 'string') {
            item.value = [item.value];
          }
          output.push(item);
        }
      });

      this.checkedList.forEach(function (item) {
        const existing1 = output1.filter(function (v, id) {
          return v.category === item.category;
        });
        if (existing1.length) {
          const existingIndex1 = output1.indexOf(existing1[0]);
          output1[existingIndex1].value = output1[existingIndex1].value.concat(item.value);
          // console.log(output[existingIndex].value);
        } else {
          if (typeof item.value === 'string') {
            item.value = [item.value];
          }
          output1.push(item);
        }
      });
      this.selectedFoodItems = output;
      this.loadList = output1;
      if (output.length) {
        for (let c = 0; c < output.length; c++) {
          for (let cc = 0; cc < output1.length; cc++) {
            if (output1[cc].categoryId === output[c].categoryId) {
              const ccc = output1[cc].value.length;
              const assignCount = output[c].count = ccc;
            }
          }
          const getValue = output[c].value;
          for (let z = 0; z < getValue.length; z++) {
            if (output[c].categoryId === getValue[z].catgId) { console.log('krishna');
              if (output[c].limit === output[c].count) {
                const inputElements = document.getElementById('checkbox-' + output[c].categoryId).querySelectorAll<HTMLInputElement>
                ('.mat-checkbox-input');
                for (let uncheck = 0; uncheck < inputElements.length; uncheck++) {
                  if (!inputElements[uncheck].checked) {
                    const input = document.getElementById('checkbox-' + output[c].categoryId).querySelectorAll<HTMLInputElement>
                    ('.mat-checkbox-layout');
                    const checkedValue = inputElements[uncheck];
                    checkedValue.classList.add('sticky');
                    checkedValue.setAttribute('disabled', 'true');
                    input[uncheck].setAttribute('style', 'cursor: default;color: rgb(84, 84, 84);');
                  }
                }
              } else {
                const inputElements = document.getElementById('checkbox-' + output[c].categoryId).querySelectorAll<HTMLInputElement>
                ('.mat-checkbox-input');
                for (let check = 0; check < inputElements.length; check++) {
                  const checkedValue = inputElements[check];
                  checkedValue.classList.remove('sticky');
                  checkedValue.removeAttribute('disabled');
                }
              }
            }

          }
        }
      }
    }

    if (this.foodMenuData) {
      this.nonChoices = this.foodMenuData.buffet[0];
    }

    if (this.foodMenuData) {
      const cartValues = this.foodMenuData.tariff[0];
      this.pricePerHeadAmount = cartValues.buffCost;
      this.guaranteedPaxMinInput = cartValues.buffMin;
      this.guaranteedPaxMinDec = cartValues.buffMin;
      this.guaranteedPaxMin = cartValues.buffMin;
      this.guaranteedPaxMaxInput = cartValues.buffMax;
      this.guaranteedPaxMax = cartValues.buffMax;
      this.buffetCostAmount = this.pricePerHeadAmount * this.guaranteedPaxMin;
      this.offerDiscountValue = cartValues.buffDisc;
      this.offerDiscountAmount = this.buffetCostAmount * this.offerDiscountValue / 100;
      this.subTotalAmount = this.buffetCostAmount - this.offerDiscountAmount;
      this.gstValue = cartValues.buffTax;
      this.gstAmount = this.subTotalAmount * this.gstValue / 100;
      this.totalAmount = this.subTotalAmount + this.gstAmount;


      const reservePercentage = cartValues['reserVal'];
      this.reserveAmount = this.totalAmount * reservePercentage / 100;
      const reservePeriods = cartValues.reserDays;
      if (reservePercentage === 0) {
        this.reservePeriodDays = reservePeriods + 180;
      } else {
        this.reservePeriodDays = reservePeriods;
      }
      const reservePeriodDays = this.reservePeriodDays;
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + reservePeriodDays);
      const reservePeriod = currentDate;

      const month = 4;
      const day = 8;
      const year = 2019;

      const date1 = new Date(month + '-' + (day) + '-' + year);
      const eventDate = new Date(date1.toDateString());
      if (reservePeriod < eventDate) {
        this.reservePeriod = true;
      } else {
        this.reservePeriod = false;
      }
    }
  }


  continueToBook() {
    const cartValues = this.foodMenuData.tariff[0];
    if (this.foodMenuData) {
      // console.log(this.selectedFoodItems);
      for (let i = 0; i < this.selectedFoodItems.length; i++) {
        if (this.selectedFoodItems[i].limit === this.selectedFoodItems[i].count) {
          const message = (<HTMLInputElement>document.getElementById('message' + this.selectedFoodItems[i].categoryId));
          message.style.display = 'none';
        }
        if (this.selectedFoodItems[i].limit > this.selectedFoodItems[i].count) {
          const rightCategory = (<HTMLInputElement>document.getElementById('category' + this.selectedFoodItems[i].categoryId));
          const message = (<HTMLInputElement>document.getElementById('message' + this.selectedFoodItems[i].categoryId));
          const categoryPosition = rightCategory.offsetTop;

          message.style.display = 'block';
          message.innerHTML = this.selectedFoodItems[i].limit - this.selectedFoodItems[i].count + ' ' + 'Item(s) are missing in ' +
            this.selectedFoodItems[i].category;
          // rightCategory.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
          window.scroll({top: rightCategory.offsetTop, behavior: 'smooth'});
          return false;
        }
      }
      if (this.inputValue) {
        alert('Please confirm the Guaranteed total guests count : ' + this.inputValue + ' ?');
      } else {
        alert('Please confirm the Guaranteed total guests count : ' + cartValues['buffMin'] + ' ?');
      }
      if (cartValues['buffMin'] > this.inputValue) {
        alert('Very Sorry!!! Very Low Count, Minimum Count is ' + cartValues['buffMin'] + 'Only!!!');
        return false;
      }
    }
    this.bookDialog();
  }

  /* product book dialog box */
  bookDialog(): void {
    if (this.inputValue) {
      this.guaranteedPaxMin = JSON.parse(this.inputValue);
    }
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: {
        buffetData: this.loadList,
        guaranteedPax: this.guaranteedPaxMin,
        bookingLevel: 2,
        blockType: 1,
        prdctDetId: this.productDetId,
        foodTypeId: this.foodTypeId,
        bookingId: this.bookingId,
        userId: this.userId,
        itemList: this.itemList,
        tariffData: {
          pricePerHeadCost: this.pricePerHeadAmount,
          guaranteedPax: this.guaranteedPaxMin,
          buffetCostAmount: this.buffetCostAmount,
          offerDiscountValue: this.offerDiscountValue,
          offerDiscountAmount: this.offerDiscountAmount,
          subTotalAmount: this.subTotalAmount,
          gstValue: this.gstValue,
          gstAmount: this.gstAmount,
          totalAmount: this.totalAmount
        }
      },
      width: '50%',
    });
  }

  continueToReserve() {
    if (this.foodMenuData) {
      // console.log(this.selectedFoodItems);
      for (let i = 0; i < this.selectedFoodItems.length; i++) {
        if (this.selectedFoodItems[i].limit === this.selectedFoodItems[i].count) {
          const message = (<HTMLInputElement>document.getElementById('message' + this.selectedFoodItems[i].categoryId));
          message.style.display = 'none';
        }
        if (this.selectedFoodItems[i].limit > this.selectedFoodItems[i].count) {
          const rightCategory = (<HTMLInputElement>document.getElementById('category' + this.selectedFoodItems[i].categoryId));
          const message = (<HTMLInputElement>document.getElementById('message' + this.selectedFoodItems[i].categoryId));
          const categoryPosition = rightCategory.offsetTop;

          message.style.display = 'block';
          message.innerHTML = this.selectedFoodItems[i].limit - this.selectedFoodItems[i].count + ' ' + 'Item(s) are missing in ' +
            this.selectedFoodItems[i].category;
          // rightCategory.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
          window.scroll({top: rightCategory.offsetTop, behavior: 'smooth'});
          // alert(this.selectedFoodItems[i].limit - this.selectedFoodItems[i].count + ' ' + 'Item(s) are missing in ' +
          //   this.selectedFoodItems[i].category);
          // alert('Few food items are not selected. Please select all items to proceed!!!' + this.selectedFoodItems[i].limit);
          return false;
        }
      }
      // alert('Please confirm the Guaranteed total guests count : ' + this.inputValue + ' ?');
      if (this.guaranteedPaxMin > this.inputValue) {
        alert('Very Sorry!!! Very Low Count, Minimum Count is ' + this.guaranteedPaxMin + 'Only!!!');
        // this.guaranteedPaxMinInput = event.target.value(this.guaranteedPaxMax);
        const inputValue = (<HTMLInputElement>document.getElementById('guaranteedPaxMinInput')).value = this.guaranteedPaxMinInput;
        const cartValues = this.foodMenuData.tariff[0];
        this.pricePerHeadAmount = cartValues.buffCost;
        this.guaranteedPaxMin = inputValue;
        this.buffetCostAmount = this.pricePerHeadAmount * this.guaranteedPaxMin;
        this.offerDiscountValue = cartValues.buffDisc;
        this.offerDiscountAmount = this.buffetCostAmount * this.offerDiscountValue / 100;
        this.subTotalAmount = this.buffetCostAmount - this.offerDiscountAmount;
        this.gstValue = cartValues.buffTax;
        this.gstAmount = this.subTotalAmount * this.gstValue / 100;
        this.totalAmount = this.subTotalAmount + this.gstAmount;
        return false;
      }
    }
  }

  guaranteedPax(event: any) {
    this.inputValue = event.target.value;
    // console.log(values);

    if (this.foodMenuData) {
      if (this.guaranteedPaxMax < this.inputValue) {
        alert('Sorry!!! Limit Exceed, Max Limit is ' + this.guaranteedPaxMax + ' Only!!!');
        // this.guaranteedPaxMinInput = event.target.value(this.guaranteedPaxMax);
        this.inputValue = (<HTMLInputElement>document.getElementById('guaranteedPaxMinInput')).value = this.guaranteedPaxMaxInput;
        const cartValues = this.foodMenuData.tariff[0];
        this.pricePerHeadAmount = cartValues.buffCost;
        this.guaranteedPaxMax = this.inputValue;
        this.buffetCostAmount = this.pricePerHeadAmount * this.guaranteedPaxMax;
        this.offerDiscountValue = cartValues.buffDisc;
        this.offerDiscountAmount = this.buffetCostAmount * this.offerDiscountValue / 100;
        this.subTotalAmount = this.buffetCostAmount - this.offerDiscountAmount;
        this.gstValue = cartValues.buffTax;
        this.gstAmount = this.subTotalAmount * this.gstValue / 100;
        this.totalAmount = this.subTotalAmount + this.gstAmount;
      }
      if (this.guaranteedPaxMax >= this.inputValue) {
        const cartValues = this.foodMenuData.tariff[0];
        this.pricePerHeadAmount = cartValues.buffCost;
        this.guaranteedPaxMin = this.inputValue;
        this.guaranteedPaxMax = cartValues.buffMax;
        this.buffetCostAmount = this.pricePerHeadAmount * this.guaranteedPaxMin;
        this.offerDiscountValue = cartValues.buffDisc;
        this.offerDiscountAmount = this.buffetCostAmount * this.offerDiscountValue / 100;
        this.subTotalAmount = this.buffetCostAmount - this.offerDiscountAmount;
        this.gstValue = cartValues.buffTax;
        this.gstAmount = this.subTotalAmount * this.gstValue / 100;
        this.totalAmount = this.subTotalAmount + this.gstAmount;
      }
    }
  }

  getUnique(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

}
