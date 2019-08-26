import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
    static shouldBeUrl(control: AbstractControl): ValidationErrors | null{
        if(!control.value.startsWith('https')){
            return {shouldBeUrl: true}
        }
        return null;
    }
}