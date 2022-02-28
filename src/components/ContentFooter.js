import {useSelector, useDispatch} from "react-redux";
import { editActiveFilter, clearCompleted, selectTodo} from "../redux/todos/todosSlice";

const ContentFooter = () => {

    const dispatch = useDispatch();
    const items = useSelector(selectTodo);
    const itemsLeft = items.filter(item => { return item.completed === false }).length;

    const activeFilter = useSelector(state => state.todos.activeFilter);



    return (
    <footer className="footer">
    <span className="todo-count">
        <strong>{itemsLeft} </strong>
        item{itemsLeft > 1 ? "s" : " "} left
    </span>
    <ul className="filters">
        <li>
            <a href="/#" onClick={({target})=>dispatch(editActiveFilter("all"))} className={activeFilter === "all" ? "selected" : ""}>All</a>
        </li>
        <li>
            <a href="/#" onClick={({target})=>dispatch(editActiveFilter("active"))} className={activeFilter === "active" ? "selected" : ""}>Active</a>
        </li>
        <li>
            <a href="/#" onClick={({target})=>dispatch(editActiveFilter("completed"))} className={activeFilter === "completed" ? "selected" : ""}>Completed</a>
        </li>
    </ul>

    <button onClick={()=> dispatch(clearCompleted())} className="clear-completed">
        Clear completed
    </button>
</footer>
  )
}

export default ContentFooter