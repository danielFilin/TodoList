

 // Component responsible for the list of done things. 
class Finished extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            finished: ["do homework", "go out"]
        }
        this.makeRedo = this.makeRedo.bind(this);
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        this.props.bringBack(e.target.innerHTML);
        let that = document.getElementById(e.target.id);
        e.target.parentNode.removeChild(that);
    }

    // supposed to update the array of done things by updating state.
    componentWillReceiveProps(newProps){
        if(newProps.finished !== ""){
            let finished=this.state.finished;
            finished.push(newProps.finished)
            this.setState({
                finished
            }) 
        } 
        let doneItem =  document.querySelector(".new-item");
        for(let i = 0; i<doneItem.length; i++){
            doneItem[i].addEventListener("click", this.makeRedo )
        }
    }

    // adds an event listener to allow to move it to todo list. 

    componentDidMount() {
        document.querySelector(".new-item").addEventListener("click", this.makeRedo )
    }

    render(){
        let myDoneList = this.state.finished.map( 
            (x, i)=> <li id={x} onClick={this.makeRedo} key={`doneItem${i}`} className="new-item"
            >{x}</li>
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
            itemsArr : ["Some Great Stuff", "more fun stuff"],
            done: "",
            value: ""
        }
        this.returnBack = this.returnBack.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    componentWillReceiveProps(newProps){
        this.setState({
            done: ""
        })
        var itemsArr=this.state.itemsArr;
        itemsArr.push(newProps.newItem)
        this.setState({
            itemsArr,   
        })     
  
    }

    updateList(e){
        this.setState({
            done: e.target.innerHTML
        })
        e.target.parentNode.firstElementChild.remove()
    }

    componentDidMount() {
        document.querySelector(".list-item").addEventListener('click' , this.updateList) 
    }

    returnBack(event){     
        var itemsArr=this.state.itemsArr;
        itemsArr.push(event)
        this.setState({
            itemsArr,   
        })    
    }

    render(){
        let name = this.state.itemsArr.map( 
            (x, i)=> <h4 onClick={this.updateList} className="list-item" key={i}
            >{x}<span key={i} className="float-right">X</span></h4>
         )
       
        return(
            <div>
                <ul>
                    {name}
                </ul>
                <Finished bringBack={this.returnBack} finished={this.state.done}/>
            </div>
           
        )
    }
}

class TodoList extends React.Component {
    constructor(){
        super()
        this.state = {
            text : ""
        }

        this.updateList = this.updateList.bind(this);
    }

    updateList(e){
        this.setState({
            text: e.target.nextSibling.value
        })
        e.target.nextSibling.value = "";
    }

    render(){
        return(
            <div>
                <button onClick={this.updateList} className="btn btn-primary mb-3 mt-3">Add new Todo</button>
                <input  className="form-control w-75"></input>
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
                 <h1>My ToDo List</h1>
                <TodoList/>
            </div>
          
        )
    }

}


ReactDOM.render(
    <App/>,
    document.getElementById("root")
);