
class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            reminderDate: "",
            currentTime: ""
        }
        this.showReminder = this.showReminder.bind(this);
        this.setReminder = this.setReminder.bind(this);
    }
    showReminder(e){
        !e.target.nextSibling.classList.contains("reminder-settings")? e.target.nextSibling.classList.add("reminder-settings"): e.target.nextSibling.classList.remove("reminder-settings");
    }

    setReminder(e){
       
        let current_datetime = new Date();
        let formatted_date =  current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() +":" +  current_datetime.getMinutes()
        console.log(formatted_date)
        this.setState({
            reminderDate: e.target.parentNode.firstElementChild.value,
            currentTime: formatted_date
        })
        console.log(this.state.currentTime, this.state.reminderDate)
    }

    render(){
      
        return(
                <nav className="my-header">
                    <div>
                        <img className="myImg" src="https://www.freepnglogos.com/uploads/eagle-png-logo/morehead-state-eagle-png-logo-8.png">
                        </img>
                    </div>
                    <div>
                        <h4>My Todo List</h4>
                    </div>
                    <div>
                        <h5 onClick={this.showReminder} className="reminder">set a general reminder</h5>
                        <ul className="reminder-settings">
                            <input type="datetime-local"></input>
                            <span>Description</span>
                            <input placeholder="describe your event" type="text"></input>
                            <button onClick={this.setReminder} className="btn btn-info">Set Reminder</button>
                        </ul> 
                    </div>
                </nav>
        )
    }
}

 // Component responsible for the list of done things. 
class Finished extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            finished: this.props.finished,
        }
        this.makeRedo = this.makeRedo.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateState = this.updateState.bind(this)
    }

    deleteItem(e){
        let currentArray = this.state.finished; 
        let index = currentArray.indexOf(e.target.innerHTML);
        currentArray.splice(index,1);
        this.setState({
            finished: currentArray,
        })
    }

    updateState(e){
        let currentArray = this.state.finished;
        let index = currentArray.indexOf(e.target.innerHTML);
        currentArray.splice(index,1);
        this.setState({
            finished: currentArray,
        })
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        if(e.target.innerHTML === "X"){
            this.deleteItem(e);
        }else{
            let currentList = this.state.finished;
            let toMoveItem = e.target.parentNode.firstElementChild.innerHTML;
            let index = currentList.findIndex(item => item.title == toMoveItem ); 
            this.props.bringBack(currentList[index]);
            this.updateState(e);
        }
    }

    render(){    
        let myItems = this.state.finished;
        let myDoneList = myItems.map( 
            (x, i)=> <div onClick={this.makeRedo} key={i} className="card new-item" style={{width: "18rem"}}>
            <div key={"body"+i} className="card-body">
              <h5 key={"card-title"+i} className="card-title">{x.title}</h5>
              <p key={"card-text"+i}  className="card-text">{x.description}</p>
              <a key={"btn"+i}  href="#" className="btn btn-primary">Return to Todos</a>
            </div>
          </div>
         )  

        return(
            <div>
                <h2>Done List</h2>
                <ul>
                    {myDoneList}
                </ul>
            </div>
        )
    }
}

class DoneList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemsArr : [{title: "Some Great Stuff", description: "very interesting activity", dueDate: "20-05-2022", creationDate: new Date()}, {title: "more fun stuff", description: "do it while you can", dueDate: "28-07-2019", creationDate: new Date()}],
            done: "",
            doneArr: [],
        }
        this.returnBack = this.returnBack.bind(this);
        this.updateList = this.updateList.bind(this);
        this.markImportant = this.markImportant.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.setReminder = this.setReminder.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.sortList = this.sortList.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            done: ""
        })
        let itemsArr=this.state.itemsArr;
        itemsArr.push(newProps.newItem);
        this.setState({
            itemsArr,
        })       
    }

    sortList(e){

    }

    setReminder(e){
       let time = parseInt(e.value); 
       setTimeout( () => {
        alert(`Please do ${e.parentNode.children[0].innerHTML} now!!!`)
       }, 1000 * time * 60 )
    }

    handleBlur(e){
        let currentArray = this.state.itemsArr;
        let index = currentArray.findIndex(item => item.title == e.parentNode.children[0].innerHTML );
        let updatedItem = currentArray[index];
        updatedItem.title = e.previousSibling.value;
        currentArray.splice(index, 1, updatedItem);
        this.setState({
            itemsArr: currentArray
        })
    }

    moveElement(e){
        let tempArr = this.state.doneArr;
 
        let myItem = e.target.parentNode.firstElementChild.innerHTML;
        let myCurrentArray = this.state.itemsArr;
        let indexToMove = myCurrentArray.findIndex(item => item.title == myItem );
        tempArr.push(myCurrentArray[indexToMove]);
        this.setState({
            doneArr: tempArr,
        })
        
        myCurrentArray.splice(indexToMove,1);
        this.setState({
            itemsArr: myCurrentArray,  
        })     
    }

    markImportant(e){ 
        let tempArr = this.state.itemsArr;
        let index = tempArr.findIndex(item => item.title == e.parentNode.firstElementChild.innerHTML );
        let movedItem = tempArr[index];
        tempArr.splice(index, 1);
        tempArr.unshift(movedItem);
        this.setState({
            itemsArr: tempArr
        })   
        e.parentNode.parentNode.parentNode.children[0].classList.contains("bg-danger")? e.parentNode.parentNode.parentNode.children[0].classList.remove('bg-danger'):e.parentNode.parentNode.parentNode.children[0].classList.add('bg-danger');
    }

    deleteItem(e){
        let currentArray = this.state.itemsArr; 
        let index = currentArray.indexOf(e.target.innerHTML);
        currentArray.splice(index,1);
        this.setState({
            itemsArr: currentArray,
        })
    }

    updateList(e){  
        if(e.target.innerHTML == "X"){
            this.deleteItem(e);
        }else if(e.target.innerHTML == "Mark Important") {
            this.markImportant(e.target);
        } else if(e.target.innerHTML == "Edit") {
            this.handleBlur(e.target);
        } else if(e.target.classList[0] == "selectpicker") {
            this.setReminder(e.target)
        }else if(e.target.innerHTML === "Mark as Done") {
            this.moveElement(e);    
        }
    }

    returnBack(event){     
        let itemsArr=this.state.itemsArr;
        itemsArr.push(event)
        this.setState({
            itemsArr, 
        })    
    }

    render(){
        let name = this.state.itemsArr.map( 
            (x, i)=> <div id={i} onClick={this.updateList} className="card text-white bg-secondary mb-3 " style={{maxWidth: "25rem", maxHeight: "20rem"}} key={i}>
                    <div key={"card-header"+i} className="card-header">My Todo</div>
                    <div  key={"card-body"+i}  className="card-body">
                        <h5  key={"card-title"+i}  className="card-title text-center">{x.title}</h5>
                        <span key={"delete"+i} className="float-right text-warning cursor">X</span>
                        <p  key={"card-text"+i}  className="card-text">{x.description}</p>
                        <button key={"done"+i}  className="btn btn-info mr-3">Mark as Done</button>
                        <span key={i} className="important bg-white rounded-circle cursor">Mark Important</span>
                        <input placeholder="edit Text" className="form-control w-50 mt-1" key={"edit"+i}></input>
                        <button className="btn btn-light mt-1 mr-1" key={"btn-light"+i}>Edit</button>
                        <span>Set a reminder</span>
                        <select className="selectpicker" key={"select"+i}>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">one hour</option>
                        </select>
                        <label className="mr-3">Due Date of the Todo:</label>
                        <span>{x.dueDate}</span>
                    </div>   
                    </div>
         )
        return(
            <div>
                <label>Sort Items</label>
                <input className="form-control w-25 mb-3" onKeyPress={this.sortList}></input>
                <ul className="myList">
                    {name} 
                </ul>
                <Finished bringBack={this.returnBack} finished={this.state.doneArr}/>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(){
        super()
        this.state = {
            text : {title: "", description: "", dueDate: ""},
        }
        this.updateList = this.updateList.bind(this);
    }

    updateList(e){
        if(e.target.nextSibling.value != "" && e.target.parentNode.children[3].value != "" && e.target.parentNode.children[5].value != "" ){
            this.setState({
                text: {title: e.target.nextSibling.value, description: e.target.parentNode.children[3].value, dueDate: e.target.parentNode.children[5].value}, 
            })
            e.target.nextSibling.value = "";
            e.target.parentNode.children[3].value = "";
            e.target.parentNode.children[5].value = "";
        }else{
            alert("fill in all fields please!")
        }
    }

    render(){
        return(
            <div>
                <button onClick={this.updateList} className="btn btn-primary mb-3 mt-3">Add new Todo</button>
                <input  placeholder="What do you plan to do?"  className="form-control w-75 initial-input"></input>
                <span>Describe your activity</span>
                <input  placeholder="Add description"  className="form-control w-75 initial-input"></input>
                <span>When would you like to complete this task?</span>
                <input  type="date"  className="form-control w-25 initial-input"></input>
                <h2>What needs to be done?</h2>
                <DoneList newItem={this.state.text}/>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(){
        super()
    }
    render(){
        return(
            <div className="container">
                <Header/>
                <TodoList/>
            </div>       
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);


