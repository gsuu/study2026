# Study Fixtures

이 폴더는 스터디 실습 교안을 바로 테스트할 수 있는 최소 HTML/CSS 골격입니다.

## 사용 방법

1. 원하는 `.html` 파일을 브라우저로 연다.
2. 각 파일 하단의 `TODO: JS 붙이기` 위치에
   - 잘못된 예시 코드
   - 1단계 최소 정답
   - 2단계 실무형 정답
   중 하나를 붙여서 동작을 비교한다.

## 포함 파일

- `tabs.html`
- `accordion.html`
- `modal.html`
- `dropdown.html`
- `filter-products.html`
- `cart.html`

## 의도

- HTML과 CSS는 테스트에 필요한 최소만 제공한다.
- 상태 설계와 리팩토링은 JS에 집중한다.
- DOM 구조는 dataset 기반으로 맞춰 두어서 `state -> setState -> render` 패턴을 바로 실습할 수 있다.

