// 룰셋에 관한 정의

import { ValidateRule } from "./types";

export const RequireRule: ValidateRule = {
  rule: /.+/,
  match: true,
  message: "필수 입력 항목입니다.",
};

export const RequireContainAt: ValidateRule = {
  rule: /^[^@]+$/,
  match: false,
  message: "이메일 양식에 어긋납니다.",
};

export const CantContainWhitespace: ValidateRule = {
  rule: /\s/,
  match: false,
  message: "공백을 포함할 수 없습니다.",
};

export const CantStartNumber: ValidateRule = {
  rule: /^\d/,
  match: false,
  message: "숫자로 시작하는 아이디는 사용할 수 없습니다.",
};

// 최소 글자 수를 체크하기 위해서는 인자로 최소 글자 수에 대한 값이 들어와야 하기 때문에 인자를 받아 함수로 감싸는 형태로 정의
export const MinimumLengthLimit = (limit: number): ValidateRule => ({
  rule: new RegExp(`(.){${limit}}`), // new RegExp는 / / 를 사용할 수 없을 때 사용
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});
