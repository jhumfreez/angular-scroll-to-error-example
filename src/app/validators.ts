import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function validateAnimal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // For demo purposes only
    const validAnimals = [
      'dog',
      'cat',
      'rabbit',
      'monkey',
      'eagle',
      'parakeet',
      'snake',
      'gecko',
    ];
    const inputValue = control.value || '';
    if (validAnimals.indexOf(inputValue.toLowerCase()) < 0) {
      return {
        invalidAnimal: {
          provided: control.value,
          validOptions: validAnimals.toString(),
        },
      };
    }
    return null;
  };
}
