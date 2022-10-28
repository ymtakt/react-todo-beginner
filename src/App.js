import React, { useState } from 'react';

import css from './style.css';

const App = () => {
  // const [title, setTitle] = useState('');
  // const [priority, setPriority] = useState('');
  // const [date, setDate] = useState('');

  const [todo, setTodo] = useState({ id: 0, title: '', priority: '', date: '' });
  /**todo一覧のリストのstate */
  const [todoList, setTodoList] = useState([]);
  /**完了リストのstate */
  const [completeTodos, setCompleteTodos] = useState([]);

  /**todo新規作成のクリックイベント */
  const handleCreateTodo = () => {
    if (todo.title === '' || todo.priority === '' || todo.date === '') return console.log('空文字');
    setTodoList([
      ...todoList,
      {
        ...todo,
        id: todoList.length + 1,
      }]);
    setTodo({ title: '' });
  };

  /**完了リストへの追加 */
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...todoList];
    newIncompleteTodos.splice(index, 1);

    /**filterでtodo(id)以外の新たにreturnで配列作る */

    const newCompleteTodos = [...completeTodos, todoList[index]];
    setTodoList(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  /**完了リストからtodoへ戻す */
  const onClickReturn = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...todoList, completeTodos[index]];
    setTodoList(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  /**完了リストから削除 */
  const onClickDelete = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
  };


  const EditIncompleteTodos = (e, index, property) => {
    const newTodos = [...todoList];
    /** */
    newTodos.splice(index, 1, { ...todoList[index], [property]: e.target.value });
    setTodoList(newTodos);
  };

  return (
    <div className='App'>
      <h1>TODOリスト</h1>
      <div className="container">
        <div className='input-todo'>

          <label htmlFor="title">TODOタイトル</label>
          <input
            className='input-todo__text'
            name='title'
            placeholder='TODOを入力してください'
            value={todo.title}
            onChange={(e) => setTodo((todo) => ({
              ...todo,
              title: e.target.value
            }))
            }
          />

          <div className="flex flex__between">
            <div className="input-todo__half">
              <label htmlFor='priority'>優先度:</label>
              <select
                name="priority"
                id="priority"
                value={todo.priority}
                onChange={(e) => setTodo((todo) => ({
                  ...todo,
                  priority: e.target.value
                }))}
              >
                <option value="">選択してください</option>
                <option value="高い">高い</option>
                <option value="低い">低い</option>
              </select>
            </div>

            <div className="input-todo__half">
              <label htmlFor="complete">タスク完了予定日</label>
              <input
                type="date"
                id="complete"
                name="complete"
                value={todo.date}
                onChange={(e) => setTodo((todo) => {
                  return {
                    ...todo,
                    date: e.target.value
                  }
                })}
              ></input>
            </div>
          </div>

          <button
            className='input-todo__btn'
            onClick={handleCreateTodo}
          >追加</button>
        </div>

        <div className='scheduled-task'>
          <h2>タスク一覧</h2>
          <ul>
            {todoList.map((todo, index) => {
              return (
                <>
                  <li key={todo.id}>
                    {/* {console.log(todo)} */}
                    <div className="scheduled-task__priority"><span>優先度</span>：{todo.priority}</div>
                    <div className="scheduled-task__complete"><span>完了予定日</span>：{todo.date}</div>
                    <input
                      className='scheduled-task__text'
                      type="text"
                      value={todo.title}
                      /** */
                      onChange={(e) => EditIncompleteTodos(e, index, 'title')}
                    >
                    </input>
                    <div className='flex flex__end'>
                      {/* <button onClick={() => onClickEdit(index)}>編集</button> */}
                      <button onClick={() => onClickComplete(index)}>完了</button>
                    </div>
                  </li>
                </>
              );
            })
            }
          </ul>
        </div>
        <div className='complete-tast'>
          <h2>完了タスク</h2>
          <ul>

            {completeTodos.map((todo, index) => {
              return (
                <>
                  <li>
                    <p>{todo.title}</p>
                    <div className='flex flex__end'>
                      <button onClick={() => onClickReturn(index)}>戻す</button>
                      <button onClick={() => onClickDelete(index)}>削除</button>
                    </div>
                  </li>
                </>
              );
            })
            }
          </ul>
        </div>
      </div >
    </div >
  );
};

export default App;


