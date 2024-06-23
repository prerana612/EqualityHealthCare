import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export function addressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const formGroup = control as FormGroup;

        if (formGroup && formGroup.controls) {
            const latitude = formGroup.get('latitude')?.value;
            const longitude = formGroup.get('longitude')?.value;
            const full_address = formGroup.get('full_address')?.value;

            if ((!latitude || latitude.trim() === '') && (!longitude || longitude.trim() === '') && (!full_address || full_address.trim() === '')) {
                return { addressRequired: true };
            }
        }

        return null;
    };
}
