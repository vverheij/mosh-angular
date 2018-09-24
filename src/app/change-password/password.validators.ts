import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidators {
    static validOldPassword(control:AbstractControl){
        return new Promise((resolve) => {
            setTimeout(() => {
                if (control.value !== '1234') {
                    resolve({ invalidOldPassword: true });
                } else {
                    resolve( null );
                }    
        }, 500);
        });
    }

    static passwordsShouldMatch(control: AbstractControl)  {
        let newPassword = control.get('newPassword');
        let confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value){
            return { passwordsShouldMatch: true };
        } else {
            return null
        }
    }
}