type CtxFactory<CtxState, CtxMethod> = (store: CtxState) => CtxMethod;
type CtxBound<CtxState, CtxMethod extends (...args: any) => any> = (store: CtxState) => CtxMethod;

type FactoryCtx<CtxMethods, CtxState> = {
  [CtxMethodKey in keyof CtxMethods]: CtxFactory<CtxState & CtxMethods, CtxMethods[CtxMethodKey]>;
};

type StorePropertyGuard<CtxMethods, CtxState> = Record<string, any> & {
  [CtxMethodKey in keyof CtxMethods]: CtxMethodKey extends keyof CtxState ? never : CtxMethods[CtxMethodKey];
};

type CtxStateCallback<CtxState, Args extends any[] = any[], R = any> = (store: CtxState, ...args: Args) => R;

type StoreBoundCallback<CtxState, CtxCallback extends CtxStateCallback<CtxState>> = (
  ...args: Parameters<CtxCallback> extends [CtxState, ...infer A] ? A : never
) => ReturnType<CtxCallback>;

/**
 * Represents a fully immutable store combining base state and methods.
 *
 * @template CtxState - The base state object type.
 * @template CtxMethods - An object type containing store methods.
 */
export type CtxStore<CtxState, CtxMethods> = Readonly<CtxState & CtxMethods>;

/**
 * Creates an immutable store with optional method factories.
 *
 * @template CtxState - The type of the base state.
 * @template CtxMethods - The type of methods added to the store.
 * @param ctxState - Initial state of the store.
 * @param methodFactories - Optional object of factories that generate methods, bound to the store.
 * @returns A frozen store combining the base state and methods.
 *
 * @example
 * ```ts
 * type State = { count: number };
 * type Methods = { increment(a: number): number }
 * type MyStore = CtxStore<State, Methods>;
 * const increment = useCtxCallback<MyStore>((store, delta: number) => store.count + delta);
 * const store = useCtxStore({ count: 0 }, { increment });
 * console.log(store.increment(1)); // 1
 * ```
 */
export function useCtxStore<CtxState, CtxMethods extends StorePropertyGuard<CtxMethods, CtxState>>(
  ctxState: CtxState,
  methodFactories?: FactoryCtx<CtxMethods, CtxState>,
): CtxStore<CtxState, CtxMethods> {
  const store = { ...ctxState } as CtxState & Partial<CtxMethods>;

  if (methodFactories)
    for (const CtxMethodKey in methodFactories)
      store[CtxMethodKey] = methodFactories[CtxMethodKey](store as CtxState & CtxMethods);

  return Object.freeze(store as CtxState & CtxMethods);
}

/**
 * Wraps a callback function so that it is automatically bound to a store instance.
 *
 * @template CtxState - The type of the state to bind.
 * @param callback - A function that receives the store as its first argument, followed by other arguments.
 * @returns A function which, given a store instance, returns a version of the callback that only requires the additional arguments.
 * @example
 * ```ts
 * const bound = useCtxCallback((store, delta: number) => store.count + delta);
 * const incrementByTwo = bound(store);
 * console.log(incrementByTwo(2)); // store.count + 2
 * ```
 */
export function useCtxCallback<CtxState>(
  callback: (store: CtxState, ...args: any[]) => any,
): CtxBound<CtxState, StoreBoundCallback<CtxState, typeof callback>> {
  return ((store: CtxState) =>
    (...args: any[]) =>
      callback(store, ...args)) as any;
}
