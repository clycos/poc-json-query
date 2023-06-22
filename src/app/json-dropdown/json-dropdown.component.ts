import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import emp from '../../assets/empData.json';
import { Course, Dept, CRN, Divs } from '../../assets/interfaces';
@Component({
  selector: 'app-json-dropdown',
  templateUrl: './json-dropdown.component.html',
  styleUrls: ['./json-dropdown.component.css'],
})
export class JsonDropdownComponent implements OnInit {
  empInfo: Course[] = emp;
  divsList: Divs[] = [];
  deptList: Dept[] = [];
  crnList: CRN[] = [];

  ngOnInit(): void {
    this.getDivsDropDown(this.empInfo);
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    divs: '',
    dept: ['', Validators.required],
    crn: '',
  });

  // --left off here
  getDivsDropDown(jsonArray: any[]) {
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

    this.divsList = uniqueDivs;
    if (this.divsList.length === 1) {
      this.addressForm.get('divs')?.setValue(this.divsList[0].divs_code);
      this.getDeptDropDown(this.divsList[0].divs_code);
    }
  }

  getDeptDropDown(divsCode: string) {
    this.addressForm.get('crn')?.reset();
    const uniqueJson: { [key: string]: Dept } = {};

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

    //set default value if only 1 option available
    if (this.deptList.length === 1) {
      this.addressForm.get('dept')?.setValue(this.deptList[0].dept_code);
      this.getCRNDropDown(this.deptList[0].dept_code);
    }
  }
  getCRNDropDown(deptCode: string) {
    const uniqueSet = new Set<string>();
    const uniqueJson: CRN[] = [];

    for (const data of this.empInfo) {
      if (data.dept_code === deptCode) {
        if (!uniqueSet.has(data.crn)) {
          uniqueSet.add(data.crn);
          uniqueJson.push({
            crn: data.crn,
            subj_code: data.subj_code,
            crse_numb: data.crse_numb,
            crse_title: data.crse_title,
          });
        }
      }
    }

    this.crnList = Object.values(uniqueJson);

    // set default value if only 1 option available
    if (this.crnList.length === 1) {
      this.addressForm.get('crn')?.setValue(this.crnList[0].crn);
    }
  }

  onSubmit(event: any): void {
    console.log(this.addressForm.value);
  }
}
