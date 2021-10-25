// 도로명 주소 관련 타입

export type Address = {
  zip: string;
  address1: string;
  address2: string | "";
};

export type DaumAddress = {
  address: string;
  autoJibunAddress: string;
  roadAddress: string;
  sigunguCode: string;
};
