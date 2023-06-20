import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import emp from '../../assets/empData.json';

@Component({
  selector: 'app-json-dropdown',
  templateUrl: './json-dropdown.component.html',
  styleUrls: ['./json-dropdown.component.css'],
})
export class JsonDropdownComponent {
  empInfo: any = emp;
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    dept: [null, Validators.required],
    divs: [null, Validators.required],
  });

  hasUnitNumber = false;

  divs = [
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
  ];

  onSubmit(): void {
    alert('Thanks!');
  }
}
