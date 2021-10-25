// 사용자 정보 관련 타입 정의

import { Address } from "./address";

type User = {
  name: string;
  id: string;
  email: string;
  password: string;
  address?: Address;
};

export default User;
