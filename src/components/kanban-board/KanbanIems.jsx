import React from "react";

const KanbanIems = ({ el, STATUS_ITEMS, setChangeStatus }) => {
  let time = el.createdAt.split("T")[1].slice(0, 5);
  return (
    <div className="kanban__item">
      <p>{el.title}</p>
      <p className="kanban__commit">{el.desc}</p>
      <div className="kanban__status">
        <select
          onChange={(e) => setChangeStatus({ ...el, status: e.target.value })}
          value={el.status}
          name=""
          id=""
        >
          {STATUS_ITEMS?.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default KanbanIems;
