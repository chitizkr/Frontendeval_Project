import { useState } from "react";
import "./UndoRedu.css";

const initialValue = 0;

function UndoRedu() {
  const [past, setPast] = useState([]);
  const [present, setPresent] = useState(initialValue);
  const [future, setFuture] = useState([]);
  const [click, setClick] = useState([]);

  function set(data) {
    setPast([...past, present]);
    setPresent((e) => e + data);
    setClick((e) => [...e, data]);
  }

  function undo() {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    const presentC = past.slice(0, past.length - 1);
    setFuture((el) => [present, ...el]);
    setPresent(prev);
    setPast(presentC);
  }

  function redo() {
    // alert("re");
    if (future.length === 0) return;
    const next = future[0];
    const newfuture = future.slice(1);

    setPresent(next);
    setPast([...past, next]);
    setFuture(newfuture);
  }

  return (
    <div>
      <h1>Undoable Counter</h1>
      <div className="button">
        <button className="btn" onClick={undo}>
          Undo
        </button>
        <button className="btn" onClick={redo} disabled={future.length === 1}>
          Redo
        </button>
        <button
          className="btn"
          onClick={() => {
            setPast([]);
            setPresent(initialValue);
            setFuture([]);
            setClick([]);
          }}
        >
          Reset
        </button>
      </div>
      <div className="body">
        <button className="btn-c" onClick={() => set(-1)}>
          -1
        </button>
        <button className="btn-c" onClick={() => set(-10)}>
          -10
        </button>
        <button className="btn-c" onClick={() => set(-100)}>
          -100
        </button>
        <h2>{present}</h2>
        <button className="btn-c" onClick={() => set(1)}>
          +1
        </button>
        <button className="btn-c" onClick={() => set(10)}>
          +10
        </button>
        <button className="btn-c" onClick={() => set(100)}>
          +100
        </button>
      </div>
      <div className="history">
        <h3>History</h3>
        <ul className="inline-list">
          {click.map((e, id) => (
            <li key={id} className="item-1">
              {e}
            </li>
          ))}
          {past.map((e, id) => (
            <li key={id} className="item-2">
              {e}
            </li>
          ))}
          {present && <li className="item-present">{present}</li>}
        </ul>
      </div>
    </div>
  );
}
export default UndoRedu;
