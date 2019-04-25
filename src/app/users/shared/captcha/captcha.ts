// globals.ts
import {ChangeDetectorRef, ElementRef, Injectable, ViewChild} from '@angular/core';
import {ReCaptcha2Component} from '../../../../packages/ngx-captcha-lib/src/lib';

declare var hljs: any;

@Injectable()
export class Captcha {

  readonly myConfigValue:string = 'abc';
  public readonly siteKey = '6LcMYXIUAAAAAJhiVrJOkrbypA18_Xz98SIoAhVM';
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild('langInput') langInput: ElementRef;

}
