export interface EmpInfo {
  pidm: number;
  term_code: string;
  crn: string;
  divs_code: string;
  divs_desc: string;
  dept_code: string;
  dept_desc: string;
  subj_code: string;
  subj_desc: string;
  crse_numb: string;
  crse_title: string;
}

export interface Division {
  divs_code: string;
  divs_desc: string;
}

export interface Department {
  dept_code: string;
  dept_desc: string;
}

export interface Subject {
  subj_code: string;
  subj_desc: string;
}

export interface Course {
  crn: string;
  subj_code: string;
  crse_numb: string;
  crse_title: string;
}
