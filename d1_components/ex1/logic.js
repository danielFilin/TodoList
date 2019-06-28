
class Header extends React.Component {

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
                        <div className="invisible"></div>
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
            description: this.props.description
        }
        this.makeRedo = this.makeRedo.bind(this);
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        if(e.target.innerHTML === "X"){
            let currentArray = this.state.finished; 
            let currentDescription = this.state.description;
            let index = currentArray.indexOf(e.target.innerHTML);
            currentArray.splice(index,1);
            currentDescription.splice(index, 1);
            this.setState({
                finished: currentArray,
                description: currentDescription
            })
        }else{
            this.props.bringBack(e.target.innerHTML);

            let currentArray = this.state.finished; 
            let currentDescription = this.state.description; 
            let index = currentArray.indexOf(e.target.innerHTML);
            let item = currentDescription[index];
            this.props.bringBackDescription({description: item.description, dueDate: item.dueDate});
            currentArray.splice(index,1);
            currentDescription.splice(index, 1);
            console.log(currentArray)
            this.setState({
                finished: currentArray,
                description: currentDescription
            })
        }
    }

    render(){    
        let myItems = this.state.finished;
        let myDoneList = myItems.map( 
            (x, i)=> <h3 id={x} onClick={this.makeRedo}  key={`doneItem${i}`} className="new-item"
            >{x}<span key={i} className="float-right">X</span></h3>
         )  

         let description = this.state.description.map( 
            (x, i)=> <p id={i} className="list-item" key={i}
            >{x.description}<span className="myDate">{x.dueDate}</span></p>
         )
        return(
            <div>
                <h2>Done List</h2>
                <ul>
                    {myDoneList}
                </ul>
                <div className="description">
                    {description}
                </div>
            </div>
        )
    }
}

class DoneList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            itemsArr : ["Some Great Stuff", "more fun stuff"],
            done: "",
            doneArr: [],
            description: [{description: "very interesting activity", dueDate: "any time!"},
            {description: "do it while you can", dueDate: "not now"}],
            doneDesc: []
        }
        this.returnBack = this.returnBack.bind(this);
        this.updateList = this.updateList.bind(this);
        this.markImportant = this.markImportant.bind(this);
        this.returnBackDescription = this.returnBackDescription.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.setReminder = this.setReminder.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            done: ""
        })
        console.log(this.state.description)
        let itemsArr=this.state.itemsArr;
        itemsArr.push(newProps.newItem);
        let description = this.state.description;
        description.push(newProps.newDescription);
        this.setState({
            itemsArr,
            description   
        })     
        console.log(this.state.description)
  
    }

    setReminder(e){
       let time = parseInt(e.value); 
       setTimeout( () => {
        alert(`Please do ${e.parentNode.children[1].innerHTML} now!!!`)
       }, 1000 * time * 60 )

    }

    handleBlur(e){
        let currentArray = this.state.itemsArr;
        let index = currentArray.indexOf(e.parentNode.children[1].innerHTML);
        currentArray.splice(index, 1, e.value);
        console.log(e.parentNode.children[1].innerHTML);
        this.setState({
            itemsArr: currentArray
        })
    }

    moveElement(e){
        let tempArr = this.state.doneArr;
        tempArr.push(e.target.innerHTML);
        let tempDescription = this.state.description;
        tempDescription.push(this.state.doneDesc);
        let currentArray = this.state.itemsArr; 
        let index = currentArray.indexOf(e.target.innerHTML);
        let doneDesc = this.state.doneDesc;
        doneDesc.push(tempDescription[index]);
        this.setState({
            done: e.target.innerHTML,
            doneArr: tempArr,
            doneDesc: doneDesc
        })
        currentArray.splice(index,1);
        tempDescription.splice(index,1)
        this.setState({
            itemsArr: currentArray,  
            description: tempDescription
        })     
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

    updateList(e){  
        if(e.target.innerHTML == "X"){
            
            let currentArray = this.state.itemsArr; 
            let currentDescription = this.state.description;
            let index = currentArray.indexOf(e.target.innerHTML);
            currentArray.splice(index,1);
            currentDescription.splice(index, 1);
         
            this.setState({
                itemsArr: currentArray,
                description: currentDescription
            })
        }else if(e.target.innerHTML == "Mark Important") {
            this.markImportant(e.target);
         
        } else if(e.target.classList[0] == "form-control") {
            this.handleBlur(e.target);
            
        } else if(e.target.classList[0] == "selectpicker") {
            this.setReminder(e.target)
            
        }else {
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
            (x, i)=> <h4 id={i} onClick={this.updateList} className="list-item my-list-item" key={i}
            ><span key={i} className="float-left important">Mark Important</span>{x}<span key={"delete"+i} className="float-right">X</span><input placeholder="edit Text" className="form-control w-50" key={"edit"+i}></input>
            <select className="selectpicker" key={"select"+i}>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">one hour</option>
          </select></h4>
         )
         let description = this.state.description.map( 
            (x, i)=> <p id={i} className="list-item" key={i}
            >{x.description}<span className="myDate">{x.dueDate}</span></p>
         )
       
        return(
            <div>
                <ul className="myList">
                    {name} 
                </ul>
                <div className="description">
                    {description}
                </div>
                <Finished bringBack={this.returnBack} bringBackDescription={this.returnBackDescription} finished={this.state.doneArr} description={this.state.doneDesc}/>
            </div>
           
        )
    }
}

class TodoList extends React.Component {
    constructor(){
        super()
        this.state = {
            text : "",
            description: {description: "", dueDate: ""}
        }
        this.updateList = this.updateList.bind(this);
    }

    updateList(e){
        console.log(e.target.parentNode.children[3].value)
        this.setState({
            text: e.target.nextSibling.value, 
            description: {description: e.target.parentNode.children[3].value, dueDate: e.target.parentNode.children[5].value}
        })
        e.target.nextSibling.value = "";
        e.target.parentNode.children[3].value = "";
        e.target.parentNode.children[5].value = "";
    }

    render(){
        return(
            <div>
                <button onClick={this.updateList} className="btn btn-primary mb-3 mt-3">Add new Todo</button>
                <input placeholder="What do you plan to do?"  className="form-control w-75"></input>
                <span>Describe your activity</span>
                <input placeholder="Add description"  className="form-control w-75"></input>
                <span>When would you like to complete this task?</span>
                <input type="date"  className="form-control w-25"></input>
                <DoneList newItem={this.state.text} newDescription={this.state.description}/>
                
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


