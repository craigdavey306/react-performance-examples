// Demonstrates how edits are batched before final value is rendered.

import React from 'react';

const MAX_EDITS = 100;

const BatchingUpdates = () => {
  const [value, setValue] = React.useState('loading...');

  function onStart() {
    setTimeout(() => {
      for (let i = 0; i < MAX_EDITS; i++) {
        setValue(`value ${i + 1}`);
      }
    }, 1);
  }

  return (
    <div>
      <p>
        Value: <em>{value}</em>
      </p>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default BatchingUpdates;
