import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

function Content() {
  const [val, setval] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
 JSON.parse(localStorage.getItem('todo_list'))
  }, []);

  const addItems =  (listName) => {
    const id = list.length ? list[list.length - 1].id + 1 : 1;
    const addItem = { id, checked: false, listName };
    const listItem = [...list, addItem];
    setList(listItem);
    localStorage.setItem('User Information', JSON.stringify(listItem))
  };

  const handleChecked =  (id) => {
    const checked = list.map((list) =>
      list.id === id ? { ...list, checked: !list.checked } : list)
      setList(checked);
      localStorage.setItem('User Information', JSON.stringify(checked))
  };

  const handleDelete =  (id) => {
    const deleteItem = list.filter((list) => list.id !== id);
    setList(deleteItem);
    localStorage.setItem('User Information', JSON.stringify(deleteItem))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItems(val);
    setval("");
  };

  
  return (
    
    <main className="main">
      <div className="content">
        <h1 className="header">TodayTodoList</h1>
        
      <form  className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="addItem"
          required
          value={val}
          onChange={(e) => setval(e.target.value)}
          />
              <button className="additemButton" type="submit">AddItem</button>
        </form>
        
      <div className="newItems">
        {list.length ? null : <p style={{color:"white"}}>Your list is empty</p>}
     
        <ul className="ul">
          {list.map((iteams) => (
            <li className="li" key={iteams.id}>
              <input
                className="checkBox"
                type="checkbox"
                checked={iteams.checked}
                onChange={() => handleChecked(iteams.id)}
              />
              <label
                className="label"
                onDoubleClick={() => handleChecked(iteams.id)}
                style={
                  iteams.checked ? { textDecoration: "line-through" } : null
                }> {iteams.listName} </label>

        <FaTrashAlt
                className="trash"
                role="button"
                onClick={() => handleDelete(iteams.id)} />
            </li>
          ))}
          </ul>
       </div>
    </div>
  </main>
        
  );
}

export default Content;