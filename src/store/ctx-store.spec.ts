import { useCtxCallback, useCtxStore } from "./ctx-store";

describe("CtxStore / useCtxCallback strict tests", () => {
  type State = { count: number; text: string };
  type Methods = {
    increment(delta: number): number;
    double(): number;
    append(s: string): string;
  };

  it("creates a store with factories strictly bound", () => {
    const store = useCtxStore<State, Methods>(
      { count: 5, text: "abc" },
      {
        increment: (s) => (delta: number) => s.count + delta,
        double: (s) => () => s.count * 2,
        append: (s) => (str: string) => s.text + str,
      },
    );

    expect(store.increment(3)).toBe(8);
    expect(store.double()).toBe(10);
    expect(store.append("XYZ")).toBe("abcXYZ");
    expect(Object.isFrozen(store)).toBe(true);
  });

  it("useCtxCallback binds store correctly", () => {
    type State = { count: number };
    type Methods = { increment(delta: number): number };

    const store = useCtxStore<State, Methods>({ count: 2 }, { increment: (s) => (delta) => s.count + delta });

    const cb = useCtxCallback<typeof store>((s, a: number, b: number) => s.count + a + b);
    const boundFn = cb(store);

    expect(boundFn(3, 5)).toBe(10);
  });

  it("multiple callbacks bound independently", () => {
    const store = useCtxStore<State, Methods>(
      { count: 4, text: "y" },
      { increment: (s) => (d) => s.count + d, double: (s) => () => s.count * 2, append: (s) => (str) => s.text + str },
    );

    const cb1 = useCtxCallback<typeof store>((s) => s.count * 2)(store);
    const cb2 = useCtxCallback<typeof store>((s, delta: number) => s.count + delta)(store);

    expect(cb1()).toBe(8);
    expect(cb2(5)).toBe(9);
  });

  it("factory cannot overwrite state properties", () => {
    const store = useCtxStore<State, { inc(): number }>({ count: 1, text: "t" }, { inc: (s) => () => s.count + 1 });

    expect(store.inc()).toBe(2);
    expect(store.count).toBe(1);
    expect(store.text).toBe("t");
  });

  it("callbacks still work even with frozen store", () => {
    const store = useCtxStore<State, Methods>(
      { count: 7, text: "z" },
      { increment: (s) => (d) => s.count + d, double: (s) => () => s.count * 2, append: (s) => (str) => s.text + str },
    );

    const fn = useCtxCallback<typeof store>((s, delta: number) => s.count + delta)(store);
    expect(fn(3)).toBe(10);
  });
});
