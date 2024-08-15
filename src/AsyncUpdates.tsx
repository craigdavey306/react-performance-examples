import React, { useState } from 'react';
import { ITEMS_ARRAY_SIZE } from './constants';
import { Item } from './interfaces';

const unfilteredItems: Item[] = new Array(ITEMS_ARRAY_SIZE)
  .fill(null)
  .map((_, index) => ({ id: index, name: `Item ${index}` }));

// async filtering
function filterItems(filter: string): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unfilteredItems.filter((item) => item.name.includes(filter)));
    }, 1000);
  });
}

const AsyncUpdates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  const handleInputOnChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    setFilter(event.target.value);
    setIsLoading(true);

    React.startTransition(() => {
      if (event.target.value === '') {
        setItems([]);
        setIsLoading(false);
      } else {
        filterItems(event.target.value).then((result) => {
          setItems(result);
          setIsLoading(false);
        });
      }
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={handleInputOnChange}
        />
      </div>
      <div>
        {isLoading && <em>loading...</em>}
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AsyncUpdates;
