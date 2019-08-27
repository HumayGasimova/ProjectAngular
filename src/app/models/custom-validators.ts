import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductsService } from 'app/services/products.service';

export class CustomValidators {

    static shouldBeUrl(control: AbstractControl): ValidationErrors | null{
        if(!control.value.startsWith('https')){
            return {shouldBeUrl: true}
        }
        return null;
    }


    // static shouldBeNumber(control: AbstractControl): ValidationErrors | null{
    //     if(!control.value){
    //         return {shouldBeNumber: true}
    //     }
    //     return null;
    // }
    // titleExists(control: AbstractControl) : Promise<ValidationErrors | null>  {
    //     return new Promise((resolve,reject)=>{
    //         setTimeout(() => {
    //             console.log(this.products)
    //             let product = this.products.find(x => x.data.title === control.value);
              
    //             if(control.value === product.title){

                   
    //                 resolve ({ titleExists: true});
    //             }else{
    //                 resolve(null);
    //             }
    //         }, 2000);

    //     })
       

    // }

    
}