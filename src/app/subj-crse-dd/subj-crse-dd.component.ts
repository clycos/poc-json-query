import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import emp from '../../assets/empData.json';
import { EmpInfo, Department, Course, Subject } from '../../assets/interfaces';
@Component({
  selector: 'app-subj-crse-dd',
  templateUrl: './subj-crse-dd.component.html',
  styleUrls: ['./subj-crse-dd.component.css'],
})
export class SubjCrseDdComponent implements OnInit {
  empInfo: EmpInfo[] = emp;
  subjList: Subject[] = [];
  deptList: Department[] = [];
  crnList: Course[] = [];

  ngOnInit(): void {
    this.getSubjectDropDown(this.empInfo);
  }

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    subj: '',
    dept: ['', Validators.required],
    crn: '',
  });

  getSubjectDropDown(jsonArray: any[]) {
    const uniqueSubj = [
      ...new Set(
        jsonArray.map((item) =>
          JSON.stringify({
            subj_code: item.subj_code,
            subj_desc: item.subj_desc,
          })
        )
      ),
    ].map((item) => JSON.parse(item));

    // assign uniquesub to subjList and then sort
    this.subjList = uniqueSubj.sort((a, b) =>
      a.subj_code > b.subj_code ? 1 : -1
    );

    if (this.subjList.length === 1) {
      this.addressForm.get('subj')?.setValue(this.subjList[0].subj_code);
      this.getDeptDropDown(this.subjList[0].subj_code);
    }
  }

  getDeptDropDown(subjCode: string) {
    this.addressForm.get('crn')?.reset();
    const uniqueJson: { [key: string]: Department } = {};

    for (let i = 0; i < this.empInfo.length; i++) {
      const item = this.empInfo[i];
      const currentSubjCode = item.subj_code;

      if (currentSubjCode === subjCode) {
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
    const uniqueJson: Course[] = [];

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
