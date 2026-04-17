# 5월 스터디 실습 교안

이 문서는 상태 중심 사고 훈련을 실제로 손으로 연습하기 위한 실습 교안입니다.

핵심은 구현 많이 하기보다 아래 3가지를 반복하는 것입니다.

1. 코딩 전에 상태를 먼저 정의하기
2. DOM 직접 제어 코드를 상태 기반으로 바꾸기
3. 코드 품질을 상태 기준으로 설명하기

## 실습 공통 원칙

- 먼저 상태를 적고, 그 다음에 코드로 갑니다.
- 이벤트 핸들러는 상태를 바꾸는 역할만 합니다.
- DOM 반영은 `render()`에서만 합니다.
- 계산 가능한 값은 state로 저장하지 않습니다.
- 잘못된 코드를 고칠 때는 "무엇이 진짜 상태인가"부터 다시 봅니다.

## 실습 공통 제출 형식

모든 문제는 아래 순서로 정리합니다.

1. 현재 코드의 문제
2. 진짜 state는 무엇인가
3. derived value는 무엇인가
4. 상태 변경 지점은 어디로 모을 것인가
5. 1단계 최소 정답
6. 2단계 실무형 정답
7. 왜 이렇게 리팩토링했는지 설명

## 공통 템플릿

```js
import { createStore } from './create-ui-store.js';

const store = createStore(
  {},
  {
    derive(state) {
      return {};
    }
  }
);

function render({ state, derived }) {
  // state를 기준으로 UI 반영
}

store.subscribe(render, { immediate: true });
```

실무 기준으로는 정답과 템플릿 모두 [templates/create-ui-store.js](D:\_GitHub\study2026\templates\create-ui-store.js:1)를 사용하는 방식으로 통일합니다.
fixture만 예외입니다. fixture는 일부러 잘못된 예시 코드를 넣어 두는 실습 재료라서 공용 store를 쓰지 않습니다.

## 실습 방법

각 문제는 아래 순서로 진행합니다.

1. 해당 fixture 파일을 브라우저로 엽니다.
2. 현재 들어 있는 잘못된 예시 JS가 어떻게 동작하는지 먼저 확인합니다.
3. 파일 하단 `<script>`의 JS를 직접 수정해서 리팩토링합니다.
4. 먼저 `1단계 최소 정답`을 만듭니다.
5. 그 다음 `2단계 실무형 정답`으로 확장할 수 있는지 봅니다.

---

# 문제 1. 탭 전환

## fixture

[fixtures/tabs.html](D:\_GitHub\study2026\fixtures\tabs.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단의 `<script>` 안에 들어 있는 JS를 직접 바꾸세요.
현재 코드는 `.active` 클래스를 상태처럼 다루고 있습니다.

## 문제

`.active` 클래스를 직접 옮기는 탭 코드를 상태 기반으로 리팩토링하세요.

## 리팩토링 포인트

`.active` 클래스가 상태가 아니라, `activeTabId`가 상태여야 합니다.

## 상태 정의

```js
{ activeTabId: 'panel-overview' }
```

## 1단계 최소 정답 목표

- `activeTabId` 하나로 탭 버튼과 패널을 같이 제어합니다.
- 클릭 핸들러는 상태만 바꿉니다.
- `render()`에서만 `.active`를 반영합니다.

## 2단계 실무형 정답 목표

- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`
- 비활성 탭 `tabindex="-1"`
- `ArrowLeft`, `ArrowRight`, `Home`, `End` 지원

## 리뷰 질문

- 진짜 상태는 `activeTabId` 하나면 충분한가?
- 버튼과 패널이 같은 상태를 바라보는가?
- DOM class를 source of truth처럼 쓰고 있지 않은가?

---

# 문제 2. 아코디언

## fixture

[fixtures/accordion.html](D:\_GitHub\study2026\fixtures\accordion.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단 `<script>`의 JS를 직접 수정하세요.
현재 코드는 `classList`와 `style.display`를 같이 만지면서 DOM을 기준으로 열림 상태를 판단합니다.

## 문제

열림/닫힘을 `classList`와 `style.display`로 직접 다루는 아코디언 코드를 리팩토링하세요.

## 리팩토링 포인트

열림 여부를 DOM에서 읽지 말고 `openItemId` 또는 `openItemIds`로 관리해야 합니다.

## 상태 정의

```js
{ openItemId: null }
```

## 1단계 최소 정답 목표

- single 모드 기준으로 `openItemId`를 둡니다.
- 버튼 클릭 시 상태만 바꿉니다.
- `render()`에서 열림/닫힘 UI를 반영합니다.

## 2단계 실무형 정답 목표

- single / multi 모드 분리
- `aria-expanded`, `aria-controls`
- 패널 `id` 연결
- 필요 시 `hidden` 처리

## 리뷰 질문

- single 모드와 multi 모드의 상태 구조는 왜 다른가?
- 열림 상태를 class에서 읽는 순간 어떤 문제가 생기는가?

---

# 문제 3. 모달

## fixture

[fixtures/modal.html](D:\_GitHub\study2026\fixtures\modal.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단 `<script>`의 JS를 직접 수정하세요.
현재 코드는 열기, 닫기, 오버레이 클릭이 각각 DOM을 직접 수정하고 있습니다.

## 문제

열기/닫기/배경 클릭이 각각 DOM을 직접 바꾸는 모달 코드를 리팩토링하세요.

## 리팩토링 포인트

모든 진입점은 `isOpen`만 바꾸고, DOM 반영은 `render()`에서만 해야 합니다.

## 상태 정의

```js
{ isOpen: false }
```

## 1단계 최소 정답 목표

- `isOpen` 상태 하나만 둡니다.
- `openModal()`, `closeModal()`로 변경 지점을 모읍니다.
- 표시 상태와 body 스크롤은 `render()`에서만 반영합니다.

## 2단계 실무형 정답 목표

- 가능하면 `<dialog>` 사용
- `showModal()` / `close()`
- 포커스 이동 / 복원
- ESC / backdrop / 닫기 버튼 일관 처리

## 리뷰 질문

- 열고 닫는 책임이 여러 군데 퍼져 있지 않은가?
- body 스크롤 제어는 왜 상태가 아니라 반영 로직인가?

---

# 문제 4. 드롭다운

## fixture

[fixtures/dropdown.html](D:\_GitHub\study2026\fixtures\dropdown.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단 `<script>`의 JS를 직접 수정하세요.
현재 코드는 열기, 선택, 외부 클릭 닫기가 흩어져 있고, DOM을 직접 만지며 맞추고 있습니다.

## 문제

열기/닫기/선택/외부 클릭이 흩어진 드롭다운 코드를 리팩토링하세요.

## 리팩토링 포인트

`isOpen`과 `selectedValue`를 분리해야 흐름이 명확해집니다.

## 상태 정의

```js
{ isOpen: false, selectedValue: null }
```

## 1단계 최소 정답 목표

- `isOpen`, `selectedValue`를 분리합니다.
- 토글 버튼은 열림 상태만 바꿉니다.
- 선택 시 값 반영과 닫기를 한 흐름으로 묶습니다.

## 2단계 실무형 정답 목표

- 위젯 종류를 먼저 정의
- `select` 대체인지, `menu`인지, `listbox`인지 구분
- 역할에 맞는 ARIA
- 키보드 / 포커스 흐름 / ESC

## 리뷰 질문

- 이 위젯은 정확히 무엇인가?
- 선택값과 열림 상태는 왜 분리돼야 하는가?

---

# 문제 5. 필터 상품 목록

## fixture

[fixtures/filter-products.html](D:\_GitHub\study2026\fixtures\filter-products.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단 `<script>`의 JS를 직접 수정하세요.
현재 코드는 필터 결과 목록과 개수를 DOM에서 직접 계산하고 있습니다.

## 문제

카테고리별 표시와 결과 개수를 DOM에서 직접 처리하는 코드를 리팩토링하세요.

## 리팩토링 포인트

진짜 state는 `selectedCategory`뿐이고, 목록과 개수는 파생값입니다.

## 상태 정의

```js
{ selectedCategory: 'all' }
```

## 1단계 최소 정답 목표

- `selectedCategory`만 state로 둡니다.
- `visibleItems`, `visibleCount`는 계산으로 얻습니다.
- `render()`에서 버튼 활성화, 목록 표시, 개수를 같이 반영합니다.

## 2단계 실무형 정답 목표

- 정렬, 검색과 조합 가능한 파생값 구조
- 대량 목록 성능 고려
- 원본 데이터와 화면 데이터 분리

## 리뷰 질문

- 왜 `visibleItems`는 state가 아닌가?
- 결과 개수를 state로 저장하면 어떤 문제가 생기는가?

---

# 문제 6. 장바구니 수량 변경

## fixture

[fixtures/cart.html](D:\_GitHub\study2026\fixtures\cart.html:1)

## 실습 연결

위 fixture 파일을 열고, 파일 하단 `<script>`의 JS를 직접 수정하세요.
현재 코드는 수량과 가격을 DOM에서 읽고 다시 총합을 계산하고 있습니다.

## 문제

수량과 가격을 DOM에서 읽고 다시 합산하는 장바구니 코드를 리팩토링하세요.

## 리팩토링 포인트

`cartItems`만 state로 두고, 행 가격과 총 가격은 파생값으로 계산해야 합니다.

## 상태 정의

```js
{
  cartItems: [
    { id: 'item-1', unitPrice: 12000, quantity: 1 }
  ]
}
```

## 1단계 최소 정답 목표

- `cartItems`만 state로 둡니다.
- `updateQuantity(id, delta)`로 변경 지점을 모읍니다.
- 행 가격과 총 가격은 계산해서 렌더링합니다.

## 2단계 실무형 정답 목표

- `addItem`, `removeItem`, `changeQuantity`로 action 분리
- 통화 포맷 적용
- 조회 성능 개선
- 서버 동기화 / 품절 / 최소수량 정책 분리

## 리뷰 질문

- 왜 총 가격은 state가 아닌가?
- 상태 변경 지점이 한 함수 집합으로 모여 있는가?

---

## DAY 1 운영

- 문제를 보고 상태부터 정의합니다.
- 잘못된 코드의 핵심 문제를 찾습니다.
- derived value를 구분합니다.
- 코드 작성 없이 설계 발표를 먼저 합니다.

## DAY 2 운영

- fixture 파일의 하단 JS를 직접 수정합니다.
- 1단계 최소 정답을 먼저 만듭니다.
- 2단계 실무형 정답과 차이를 비교합니다.
- 리팩토링 이유를 설명합니다.

## 이 교안에서 가장 중요한 것

- "동작하게 만들기"보다 "왜 이렇게 상태를 잡았는지"를 설명해야 합니다.
- 정답 코드보다 상태 정의가 먼저입니다.
- 리팩토링은 코드 예쁘게 정리하는 작업이 아니라 상태 구조를 다시 잡는 작업입니다.
