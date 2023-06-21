import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import emp from '../../assets/empData.json';

interface Record {
  [key: string]: any;
}

interface DivsDept {
  pidm: number;
  term_code: string;
  crn: string;
  dept_code: string;
  dept_desc: string;
  divs_code: string;
  divs_desc: string;
}

interface Divs {
  divs_code: string;
  divs_desc: string;
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
    this.divsList = this.divDD(this.empInfo, 'divs');
  }

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

  // --left off here
  divDD(jsonArray: any[], listType: string): any {
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

    let clean = [];

    if ((listType = 'divs')) {
      clean = jsonArray.filter(
        (jsonArray, index, self) =>
          index === self.findIndex((t) => t.divs_code === jsonArray.divs_code)
      );
    } else
      clean = jsonArray.filter(
        (jsonArray, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.dept_code === jsonArray.dept_code &&
              t.divs_code === jsonArray.divs_code
          )
      );

    return clean;
  }

  deptDD(divsCode: string): any {
    let clean = [];

    clean = this.divsList.filter((e) => {
      return e.name === divsCode;
    });

    return clean;
  }

  onSelect(event: any): any {
    this.deptList = this.divsList.filter((e) => {
      return e.divs_code === event;
    });
    console.log('blah', this.deptList);
  }
}
