import React, { memo } from "react";

const KanbanBlock = ({ status_items, items, setSelectedStatus }) => {
  return status_items?.map((el) => (
    <div key={el} className={`kanban__box ${el}`}>
      <div className="kanban__heading">
        <p> to start / {items(el).length}</p>
      </div>
      <div className="kanban__block">
        {items(el).length ? items(el) : <p>Empty</p>}
      </div>
      <button onClick={() => setSelectedStatus(el)} className="kanban__add_btn">
        Add item
      </button>
    </div>
  ));
};

export default memo(KanbanBlock);
