# Astro 상태 템플릿

이 템플릿은 팀의 제이쿼리식 바닐라 JS 습관을 끊기 위한 최소 골격입니다.

## 원칙

- DOM은 결과물이다.
- 상태는 `state`에만 둔다.
- 상태 변경은 `setState` 또는 action 함수로만 들어간다.
- UI 반영은 `render`에서만 한다.
- 계산 가능한 값은 `getDerivedState`에서 만든다.

## 기본 흐름

```js
state -> setState -> render
```

## 이 템플릿에서 바로 확장할 수 있는 것

- `state` 필드 추가
- `getDerivedState` 확장
- `setActiveTab`처럼 action 함수 추가
- `bindEvents`에 이벤트 연결 추가
- 필요 시 `subscribe` 패턴 도입

## 스터디 리뷰 질문

1. 지금 바뀐 것은 DOM인가, 상태인가?
2. 이 값은 state인가, derived value인가?
3. 상태 변경 지점이 한 곳으로 모여 있는가?
4. render가 아닌 곳에서 UI를 직접 만지고 있지 않은가?

## 사용 방식

1. `astro-state-template.astro`를 복사한다.
2. 기능 이름에 맞게 `state`를 먼저 다시 적는다.
3. 이벤트보다 먼저 action 함수를 정의한다.
4. 마지막에만 `render`를 수정한다.

## 실무형 한 파일 버전

- 최소 입문형: [astro-state-template.astro](D:\_GitHub\study2026\templates\astro-state-template.astro:1)
- 실무형 한 파일 버전: [astro-state-practical-template.astro](D:\_GitHub\study2026\templates\astro-state-practical-template.astro:1)
- 실무형 모달 예시: [astro-state-modal-template.astro](D:\_GitHub\study2026\templates\astro-state-modal-template.astro:1)
- 공용 store 유틸: [create-ui-store.js](D:\_GitHub\study2026\templates\create-ui-store.js:1)

실무형 버전에는 아래가 포함됩니다.

- import 해서 재사용할 수 있는 공용 store 유틸
- 직접 변경하지 않는 state 업데이트
- `Object.is` 기반 변경 감지
- `subscribe`
- `derive`
- action 함수 분리
- cleanup
- 탭 예제 기준 기본 접근성 속성

## 권장 사용 방식

각 페이지에서 store 유틸을 import 해서 사용합니다.

```js
import { createStore } from './create-ui-store.js';
```

이 방식이 좋은 이유는 아래와 같습니다.

- 상태 관리 패턴을 페이지마다 다시 쓰지 않아도 됩니다.
- `tabs`, `modal`, `dropdown`, `cart`가 같은 규칙으로 움직입니다.
- 팀 리뷰 기준도 store 유틸 기준으로 통일하기 쉽습니다.
- 사용 규칙 요약은 [docs/store-checklist.md](D:\_GitHub\study2026\docs\store-checklist.md:1)에서 바로 볼 수 있습니다.

## 통일 원칙

- 템플릿 파일과 정답 예시는 모두 `create-ui-store.js`를 사용합니다.
- fixture 파일만 예외입니다.
- fixture는 리팩토링 실습용 잘못된 코드이므로 공용 store를 쓰지 않습니다.

## 금지

- 이벤트 핸들러 안에서 DOM을 직접 계속 수정하기
- `classList`, `style.display`를 source of truth처럼 사용하기
- 파생값을 state에 저장하기
- 같은 의미의 상태를 여러 개 두기
