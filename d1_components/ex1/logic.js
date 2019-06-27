
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
            finished: this.props.finished
        }
        this.makeRedo = this.makeRedo.bind(this);
    }

    // should deliever the info back to the todo list.
    makeRedo(e){
        this.props.bringBack(e.target.innerHTML);
      

        let currentArray = this.state.finished; 
        let index = currentArray.indexOf(e.target.innerHTML);
 
        currentArray.splice(index,1);
        console.log(currentArray)
        this.setState({
            finished: currentArray
        })
    }

 

    // supposed to update the array of done things by updating state.
    // componentWillReceiveProps(newProps){
        
    //     if(newProps.finished !== ""){
    //         let finished=this.state.finished;
    //         finished.push(newProps.finished)
    //         this.setState({
    //             finished
    //         }) 
    //     } 
    // }

    render(){
    
        let myItems = this.state.finished;
        console.log(myItems)

        let myDoneList = myItems.map( 
            (x, i)=> <h3 id={x} onClick={this.makeRedo}  key={`doneItem${i}`} className="new-item"
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
            doneArr: []
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
            let currentArray = this.state.itemsArr; 
            let index = currentArray.indexOf(e.target.innerHTML);
            currentArray.splice(index,1);
         
            this.setState({
                itemsArr: currentArray
            })
        }else {
            let tempArr = this.state.doneArr;
            tempArr.push(e.target.innerHTML);

            this.setState({
                done: e.target.innerHTML,
                doneArr: tempArr
            })
            let currentArray = this.state.itemsArr; 
            let index = currentArray.indexOf(e.target.innerHTML);
            currentArray.splice(index,1);
            this.setState({
                itemsArr: currentArray
            })
          
        }

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
            (x, i)=> <h4 id={i} onClick={this.updateList} className="list-item" key={i}
            >{x}<span key={i} className="float-right">X</span></h4>
         )
       
        return(
            <div>
                <ul>
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


