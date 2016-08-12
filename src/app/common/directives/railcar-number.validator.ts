import { Directive, forwardRef, provide, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


export const RAILCAR_NUMBER_CONTROL_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RailcarNumberValidator),
    multi: true
};

@Directive({
  selector: '[railcarNumber][formControlName],[railcarNumber][formControl],[railcarNumber][ngModel]',
  providers: [
    RAILCAR_NUMBER_CONTROL_VALIDATOR
  ]
})
export class RailcarNumberValidator implements Validator {
  constructor() {
      // @todo constructor
  }
  validate(c: AbstractControl): { [key: string]: boolean } {
    // self value (e.g. retype password)
    let v = c.value;
    let str_v = '' + v;
    if (str_v.length !== 8) {
         return null;
    } else {
        // TODO: railcar number validator
       return {
            railcarNumber: true
       }
    }
  }
}
