import React, { useState } from 'react'

export default function MyComponent() {
  const [number, setNumber] = useState(0);
  return (
    <h1 onClick={() => setNumber(number + 1)}>
         welcome, You number is {number}.
     </h1>
  );
}

