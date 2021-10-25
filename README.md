# 회원 가입 폼

## 프로젝트 구조

### src

- types : 타입 파일 정의
- utils : 공통 유틸 함수 정의
- views : UI 폼 구현 클래스

### app.template.ts

- handlebars 활용 템플릿 => handlerbars 템플릿을 컴파일 하여 return
- view의 폼 템플릿도 구조 동일

### app.ts

- 회원 가입 폭 전체 UI를 관장하는 클래스

# Validation 설계하기

- Validation Rule을 어떻게 표현할 것인가?
- 하나의 입력 필드에 여러 가지 Validation Rule이 적용되야 하는 경우

### Validation Rule

- 정규식으로 표현하기
  - 문자열을 특정 규칙에 따라 찾는 것은 정규식을 활용해 패턴 매칭을 통해 높은 효율로 문자를 찾을 수 있음

### 멀티 룰 적용하기

- fields 라는 배열에 text Field들을 담아서, 반복문을 통해 랜더링 하는 방식으로 구현
  - Validation Rule 역시 배열로 만들어서 각 text Field별로 Validation Rule을 담도록 구현 (addValidationRule)

## Reference

- https://postcode.map.daum.net/guide
- https://www.slideshare.net/ibare/ss-39274621
- https://regexr.com
