import { ValidatorFn, AbstractControl } from '@angular/forms';

export function customPatternValid(config: any): ValidatorFn {
  return (control: AbstractControl) => {
    let urlRegEx: RegExp = config.pattern;
    if (control.value && !control.value.match(urlRegEx)) {
      return {
        invalidPattern: config.msg,
      };
    } else {
      return null;
    }
  };
}
