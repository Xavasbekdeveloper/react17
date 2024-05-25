import React, { useCallback, useEffect, useRef, useState } from "react";
import { DATA } from "@/static";
import KanbanBlock from "./KanbanBlock";
import KanbanIems from "./KanbanIems";

/**
 * ready
 * working
 * stuck
 * done
 */

const STATUS_ITEMS = ["ready", "working", "stuck", "done"];

const KanbanBoard = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("kanban-data")) || DATA
  );
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [changeStatus, setChangeStatus] = useState(null);

  const title = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (changeStatus) {
      let index = data.findIndex((el) => el.id === changeStatus.id);
      data.splice(index, 1, changeStatus);
      setData([...data]);
    }
  }, [changeStatus]);

  const filterByStatus = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <KanbanIems
          setChangeStatus={setChangeStatus}
          key={el.id}
          el={el}
          STATUS_ITEMS={STATUS_ITEMS}
        />
      ));
  };

  let memoFilterByStatus = useCallback(
    (status) => {
      return filterByStatus(status);
    },
    [data]
  );

  const handleCreateItem = (e) => {
    e.preventDefault();
    let date = new Date();
    let timeZoneGMT = (hour) =>
      new Date(date.getTime() + hour * 60 * 60 * 1000);
    let newItems = {
      id: date.getTime(),
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createdAt: timeZoneGMT(5).toISOString(),
    };
    setData((prev) => [...prev, newItems]);
    setSelectedStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn">Add</button>
          </div>
          <form
            onSubmit={handleCreateItem}
            className={`kanban__form ${selectedStatus ? "show" : ""}`}
          >
            <p>Create {selectedStatus}</p>
            <input ref={title} type="text" />
            <input ref={desc} type="text" />
            <button>Create</button>
            <button type="button" onClick={() => setSelectedStatus(null)}>
              Cancel
            </button>
          </form>
          <div className="kanban__wrapper">
            <KanbanBlock
              status_items={STATUS_ITEMS}
              items={memoFilterByStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
