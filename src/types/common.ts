// 공통 타입

export type AnyObject = {
  [key: string]: any;
};

export type ValidateRule = {
  rule: RegExp; // 정규식 자바스크립트 객체
  match: boolean;
  message: string;
};
