# create-ui-store.js 사용 체크리스트

팀에서 `create-ui-store.js`를 쓸 때는 아래만 지키면 됩니다.

## 기본 규칙

- state는 직접 수정하지 않습니다.
- 상태 변경은 `setState()` 또는 action 함수로만 합니다.
- 이벤트 핸들러는 상태만 바꿉니다.
- DOM 반영은 `render()`에서만 합니다.
- 계산 가능한 값은 `derive()`로 보냅니다.

## 구조 규칙

- `state`는 최소한으로 둡니다.
- 같은 의미의 값을 여러 개 저장하지 않습니다.
- `totalPrice`, `count`, `visibleItems` 같은 값은 state로 저장하지 않습니다.
- `openModal`, `closeModal`, `setActiveTab`처럼 action 이름을 분명하게 짓습니다.

## 리뷰 규칙

- source of truth가 DOM이 아니라 state인지 확인합니다.
- `render()` 밖에서 `classList`, `style`, `textContent`를 직접 만지지 않는지 확인합니다.
- 상태 변경 지점이 여러 군데 흩어져 있지 않은지 확인합니다.

## 마무리 규칙

- `subscribe()`를 썼으면 해제할 수 있어야 합니다.
- 페이지 종료나 정리 시 `destroy()`를 호출합니다.
- 공용 패턴은 페이지마다 다시 쓰지 말고 import 해서 씁니다.
