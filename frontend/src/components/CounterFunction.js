import React, {useState} from "react";

function CounterFunction() {

    let [number, setNumber] = useState(0)

    function Increment() {
        setNumber(++number)
    }

    return (
        <div>
            <h3>Functional Component</h3>
            <h1>Counter = {number}</h1>
            <button onClick={e =>Increment()}>Increment</button>
        </div>
    )
}

export default CounterFunction;