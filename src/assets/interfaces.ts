export interface Course {
  pidm: number;
  term_code: string;
  crn: string;
  divs_code: string;
  divs_desc: string;
  dept_code: string;
  dept_desc: string;
  subj_code: string;
  crse_numb: string;
  crse_title: string;
}

export interface Divs {
  divs_code: string;
  divs_desc: string;
}

export interface Dept {
  dept_code: string;
  dept_desc: string;
}

export interface CRN {
  crn: string;
  subj_code: string;
  crse_numb: string;
  crse_title: string;
}
