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
    let LEN: number = 8;
    if (str_v.length !== LEN) {
      return {
        railcarNumber: true
      };
    } else {
      /*
      Номер вагона: 7 4 8 5 4 6 8 8
      Множник: 2 1 2 1 2 1 2
      Розрядні добутки: 14 4 16 5 8 6 16
      Порозрядна сума: 1+4+4+1+6+5+8+6+1+6=42
      Порозрядна сума, яка визначається як сума цифр, округляєьться до повного десятка (тобто 50) 
      і від нього віднімається (50-42) – ця цифра і буде контрольною (8).
       */
      let numbers: Array<number> = [];
      let multiplers: Array<number> = [];
      let summators: Array<number> = [];

      let i: number = 0;
      let v_raz: number = v;

      for (i = 0; i < LEN; i++) {
        let val: number = Math.floor(v_raz / Math.pow(10, (LEN - i - 1)));
        numbers.push(val);
        multiplers.push(val);
        if (i === (LEN - 1)) { multiplers.pop(); }
        v_raz -= numbers[i] * Math.pow(10, (LEN - i - 1));
      }
      for (i = 0; i < LEN - 1; i += 2) {
        if ((i % 2) === 0) {
          multiplers[i] = numbers[i] * 2;
        }
      }
      multiplers.forEach((item: number): void => {
        if (item > 9) {
          summators.push(Math.floor(item / 10));
          summators.push(Math.floor(item % 10));
        } else {
          summators.push(item);
        }
      });
      let total: number = summators.reduce((a: number, b: number): number => {
        return a + b;
      });

      let control = (10 - (total - Math.floor(total / 10) * 10)) % 10;
      if (control !== numbers[LEN - 1]) {
        return {
          railcarNumber: true
        }
      }
      return null;
    }
  }
}
