import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import emp from '../../assets/empData.json';

interface Depts {
  dept_code: string;
  dept_desc: string;
}

@Component({
  selector: 'app-json-dropdown',
  templateUrl: './json-dropdown.component.html',
  styleUrls: ['./json-dropdown.component.css'],
})
export class JsonDropdownComponent implements OnInit {
  empInfo: any[] = emp;
  divsList: any[] = [];
  deptList: any[] = [];

  ngOnInit(): void {
    this.divsList = this.getDivsDropDown(this.empInfo);
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    dept: [null, Validators.required],
    divs: [null, Validators.required],
    crn: [null, Validators.required],
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

  // --left off here
  getDivsDropDown(jsonArray: any[]): any {
    const uniqueDivs = [
      ...new Set(
        jsonArray.map((item) =>
          JSON.stringify({
            divs_code: item.divs_code,
            divs_desc: item.divs_desc,
          })
        )
      ),
    ].map((item) => JSON.parse(item));

    return uniqueDivs;
  }

  getDeptDropDown(divsCode: string) {
    const uniqueJson: { [key: string]: Depts } = {};

    for (let i = 0; i < this.empInfo.length; i++) {
      const item = this.empInfo[i];
      const currentDivsCode = item.divs_code;

      if (currentDivsCode === divsCode) {
        const uniqueKey = item.dept_code + '_' + item.dept_desc;

        if (!uniqueJson[uniqueKey]) {
          uniqueJson[uniqueKey] = {
            dept_code: item.dept_code,
            dept_desc: item.dept_desc,
          };
        }
      }
    }

    this.deptList = Object.values(uniqueJson);
  }
}
