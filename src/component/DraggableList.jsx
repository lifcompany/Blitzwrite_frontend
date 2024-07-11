import React, { useState } from 'react';

const DraggableList = () => {
    const [items, setItems] = useState([
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
        { id: 'item4', content: 'Item 4' },
        { id: 'item5', content: 'Item 5' },
    ]);

    const onDragStart = (e, index) => {
        // Placeholder function to handle drag start behavior if needed
    };

    const onDragOver = (e) => {
        e.preventDefault();
        // Placeholder function to handle drag over behavior if needed
    };

    const onDragEnd = (e, result) => {
        if (!result.destination) {
            return;
        }

        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setItems(newItems);
    };

    return (
        <div>
            <ul onDragOver={onDragOver}>
                {items.map((item, index) => (
                    <li
                        key={item.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, index)}
                        onDragEnd={(e) => onDragEnd(e, { source: { index }, destination: { index: index } })}
                        style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: '#456C86',
                            color: 'white',
                            cursor: 'move'
                        }}
                    >
                        {item.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DraggableList;
