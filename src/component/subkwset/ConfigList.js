import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Config from "./Config";

const ConfigList = () => {
  const [configs, setConfigs] = useState([
    { id: "config1", content: "タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案" },
    { id: "config2", content: "タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案" },
    { id: "config3", content: "タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案タイト" },
    { id: "config4", content: "タイトル案タイトルル案タイトル案タイトル案タイトル案タイトル案タイトル案タイトル案" },
    { id: "config5", content: "タイトル案タイトル案タイトル案タイトル案タイイトル案タイトル案タイトル案タイトル案タイトル案" },
    { id: "config6", content: "イトル案タイトル案タイトル案タイトル案案タイトル案タイトル案" },
    { id: "config7", content: "タイ案タイトル案タイトル案" },
]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(configs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConfigs(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="configs">
        {(provided) => (
          <table {...provided.droppableProps} ref={provided.innerRef}>
            <tbody>
              {configs.map((config, index) => (
                <Draggable key={config.id} draggableId={config.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-full"
                    >
                      <td>
                        <Config content = {config.content} />
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ConfigList;