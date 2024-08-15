// Demonstrates the use of React.startTransition() to de-emphasize the importance of
// filtering the items over being able to type text into the input field.
import React, { useState } from 'react';

import { ITEMS_ARRAY_SIZE } from './constants';
import { Item } from './interfaces';

const unfilteredItems: Item[] = new Array(ITEMS_ARRAY_SIZE)
  .fill(null)
  .map((_, index) => ({ id: index, name: `Item ${index}` }));

const PrioritizingUpdates = () => {
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter(e.target.value);
    React.startTransition(() => {
      setItems(
        e.target.value === ''
          ? []
          : unfilteredItems.filter((item) => item.name.includes(e.target.value))
      );
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={onChange}
        />
      </div>
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrioritizingUpdates;
