import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { useState } from "react";


const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementByAmount, setIncrementByAmount] = useState(0);
    
    const addValue = Number(incrementByAmount) || 0;

    const resetAll = () => {
        setIncrementByAmount(0);
        dispatch(reset());
    }


    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <input 
                type="text"
                value={incrementByAmount}
                onChange={(e) => setIncrementByAmount(e.target.value)}
            />

            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add Amount
                </button>

                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    )
}

export default Counter;