/**
 * 상태, 파생값, 구독을 한 곳에서 관리하는 UI store를 만듭니다.
 *
 * @param {Record<string, unknown>} initialState 초기 state 객체
 * @param {{
 *   derive?: (state: Record<string, unknown>) => Record<string, unknown>
 * }} [options] 파생값 계산 옵션
 * @returns {{
 *   getState: () => Readonly<Record<string, unknown>>,
 *   getDerivedState: () => Record<string, unknown>,
 *   getSnapshot: () => {
 *     state: Readonly<Record<string, unknown>>,
 *     derived: Record<string, unknown>
 *   },
 *   subscribe: (
 *     listener: (snapshot: {
 *       state: Readonly<Record<string, unknown>>,
 *       derived: Record<string, unknown>
 *     }) => void,
 *     config?: { immediate?: boolean }
 *   ) => () => void,
 *   setState: (
 *     patch:
 *       | Record<string, unknown>
 *       | ((state: Readonly<Record<string, unknown>>) => Record<string, unknown> | null | undefined)
 *   ) => Readonly<Record<string, unknown>>,
 *   destroy: () => void
 * }}
 */
export function createStore(initialState, options = {}) {
  const listeners = new Set();
  const derive = options.derive ?? (() => ({}));
  let state = Object.freeze({ ...initialState });

  /**
   * 현재 state를 반환합니다.
   *
   * @returns {Readonly<Record<string, unknown>>}
   */
  function getState() {
    return state;
  }

  /**
   * 현재 state 기준의 파생값을 반환합니다.
   *
   * @returns {Record<string, unknown>}
   */
  function getDerivedState() {
    return derive(state);
  }

  /**
   * state와 derived를 함께 반환합니다.
   *
   * @returns {{
   *   state: Readonly<Record<string, unknown>>,
   *   derived: Record<string, unknown>
   * }}
   */
  function getSnapshot() {
    return {
      state,
      derived: getDerivedState()
    };
  }

  /**
   * store 변경을 구독합니다.
   *
   * @param {(snapshot: {
   *   state: Readonly<Record<string, unknown>>,
   *   derived: Record<string, unknown>
   * }) => void} listener 변경 시 호출할 함수
   * @param {{ immediate?: boolean }} [config] 즉시 실행 여부
   * @returns {() => void} 구독 해제 함수
   */
  function subscribe(listener, config = {}) {
    listeners.add(listener);

    if (config.immediate) {
      listener(getSnapshot());
    }

    return () => {
      listeners.delete(listener);
    };
  }

  function notify() {
    const snapshot = getSnapshot();
    listeners.forEach((listener) => {
      listener(snapshot);
    });
  }

  /**
   * state 일부를 갱신하고, 실제 변경이 있을 때만 구독자에게 알립니다.
   *
   * @param {Record<string, unknown> | ((state: Readonly<Record<string, unknown>>) => Record<string, unknown> | null | undefined)} patch
   * 객체 또는 현재 state를 받아 patch를 반환하는 함수
   * @returns {Readonly<Record<string, unknown>>}
   */
  function setState(patch) {
    const partial =
      typeof patch === 'function' ? patch(state) : patch;

    if (!partial || typeof partial !== 'object') {
      return state;
    }

    const nextState = { ...state };
    let changed = false;

    Object.entries(partial).forEach(([key, value]) => {
      if (!Object.is(state[key], value)) {
        nextState[key] = value;
        changed = true;
      }
    });

    if (!changed) {
      return state;
    }

    state = Object.freeze(nextState);
    notify();
    return state;
  }

  /**
   * 모든 구독을 정리합니다.
   *
   * @returns {void}
   */
  function destroy() {
    listeners.clear();
  }

  return {
    getState,
    getDerivedState,
    getSnapshot,
    subscribe,
    setState,
    destroy
  };
}
