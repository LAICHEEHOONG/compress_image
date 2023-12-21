import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex mx-auto px-4 py-2 space-x-4">
      <button
        type="button"
        className="inline-block rounded-md px-2 py-1 bg-blue-500 text-white"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span className="font-bold text-lg text-gray-700">{count}</span>
      <button
        type="button"
        className="inline-block rounded-md px-2 py-1 bg-red-500 text-white"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}
