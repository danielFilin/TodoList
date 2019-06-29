
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
        let currentDescription = this.state.description;
        let index = currentArray.indexOf(e.target.innerHTML);
        currentArray.splice(index,1);
        currentDescription.splice(index, 1);
        this.setState({
            finished: currentArray,
            description: currentDescription
        })
    }

    updateState(e){
        let currentArray = this.state.finished; 
        let currentDescription = this.state.description; 
        let index = currentArray.indexOf(e.target.innerHTML);
        let item = currentDescription[index];
        this.props.bringBackDescription({description: item.description, dueDate: item.dueDate});
        currentArray.splice(index,1);
        currentDescription.splice(index, 1);
        this.setState({
            finished: currentArray,
            description: currentDescription
        })
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        if(e.target.innerHTML === "X"){
            this.deleteItem(e);
        }else{
            this.props.bringBack(e.target.innerHTML);
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
            itemsArr : [{title: "Some Great Stuff", description: "very interesting activity", dueDate: "any time!"}, {title: "more fun stuff", description: "do it while you can", dueDate: "not now"}],
            done: "",
            doneArr: [],
            //description: [{},
            //{}],
            //doneDesc: []
        }
        this.returnBack = this.returnBack.bind(this);
        this.updateList = this.updateList.bind(this);
        this.markImportant = this.markImportant.bind(this);
        this.returnBackDescription = this.returnBackDescription.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.setReminder = this.setReminder.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            done: ""
        })
        let itemsArr=this.state.itemsArr;
        itemsArr.push(newProps.newItem);
        let description = this.state.description;
        description.push(newProps.newDescription);
        this.setState({
            itemsArr,
            description   
        })       
    }

    setReminder(e){
       let time = parseInt(e.value); 
       setTimeout( () => {
        alert(`Please do ${e.parentNode.children[1].innerHTML} now!!!`)
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
        console.log(this.state.itemsArr)
    }

    markImportant(e){
       
        e.nextSibling.classList.contains("important")? e.nextSibling.classList.remove('important'): e.nextSibling.classList.add('important');
        let tempArr = this.state.itemsArr;
        let index = tempArr.indexOf(e.nextSibling.innerHTML);
        tempArr.splice(index, 1);
        tempArr.unshift(e.nextSibling.innerHTML);
        this.setState({
            itemsArr: tempArr
        })
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

    returnBackDescription(event){     
        let descriptionArr = this.state.description;
        console.log(event)
        descriptionArr.push(event)
        this.setState({
            description: descriptionArr 
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
                        <select className="selectpicker" key={"select"+i}>
                            <option value="5">5 minutes</option>
                            <option value="10">10 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="60">one hour</option>
                        </select>
                    </div>   
                    </div>
         )
       
        return(
            <div>
                <ul className="myList">
                    {name} 
                </ul>
                <Finished bringBack={this.returnBack} bringBackDescription={this.returnBackDescription} finished={this.state.doneArr}/>
            </div>
        )
    }
}

class TodoList extends React.Component {
    constructor(){
        super()
        this.state = {
            text : {title: "", description: "", dueDate: ""},
            //description: {description: "", dueDate: ""},
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
        }
        alert("fill in all fields please!")
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


