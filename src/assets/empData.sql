select  distinct 
        100001 AS pidm
       ,term_code
       ,crn
       ,divs_code
       ,divs_desc
       ,dept_code
       ,dept_desc
       ,subj_code
       ,subj_desc
       ,crse_numb
       ,crse_title
  from fps_emp_dd_v
 where term_code = '202410'
 order by divs_code, dept_code;