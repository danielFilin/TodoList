
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
            finished: []
        }
        this.makeRedo = this.makeRedo.bind(this);
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        console.log(e.target.innerHTML)
        this.props.bringBack(e.target.innerHTML);
        let that = document.getElementById(e.target.id);
        let currentArray = this.state.finished; 
        //console.log(currentArray)
        let index = currentArray.indexOf(e.target.innerHTML);
       // console.log(index)
        currentArray.splice(index,1);
        //console.log(currentArray);
        e.target.parentNode.removeChild(that);
        this.setState({
            finished: currentArray
        })
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
        //console.log(newProps)
    }

    render(){
        let myDoneList = this.state.finished.map( 
            (x, i)=> <h3 id={x} onClick={this.makeRedo} key={`doneItem${i}`} className="new-item"
            >{x}</h3>
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

        if(e.target.innerHTML == "X"){
            e.target.parentElement.remove();


        }else {
            this.setState({
                done: e.target.innerHTML
            })
             var child =  e.target.parentNode.lastElementChild;  
                while (child) { 
                e.target.parentNode.removeChild(child); 
                child =  e.target.parentNode.lastElementChild; 
            }
        }     
    }

    componentDidMount() {
        document.querySelector(".list-item").addEventListener('click' , this.updateList) 
    }

    returnBack(event){     
        var itemsArr=this.state.itemsArr;
        itemsArr.push(event)
        console.log(itemsArr);
        this.setState({
            itemsArr,   
        })    
    }

    render(){
        let name = this.state.itemsArr.map( 
            (x, i)=> <h4 id={i} onClick={this.updateList} className="list-item" key={i}
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