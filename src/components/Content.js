import List from "./ToDoList";
import ContentFooter from "./ContentFooter";
const Content = () => {
  return (
    <section className="main">
		<input className="toggle-all" type="checkbox"/>
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>
        <List/>
        <ContentFooter/>
	</section>
  )
}

export default Content