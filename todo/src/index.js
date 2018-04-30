import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const list = [
    {
        id: 0,
        content: "To sleep more",
        isDone: false
    },
    {
        id: 1,
        content: "Eating is life",
        isDone: false
    }
]
const Heading = ({heading}) =>
    <div className="heading">
        <h1>{heading}</h1>
    </div>

class SingleEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }
    
    render() {
        if (!this.props.entries){
            return null;
        } 

        return (
            <div className="entries">
                {
                    this.props.entries.map(item =>
                        <div className="entry" key={item.id}>
                            <p>{item.content}</p>
                        </div>
                    )
                }
            </div>
        )

    }
}

const CreateEntry = ({onKeyPress, value, onChange}) =>
    <input 
        type="text" 
        onKeyPress={onKeyPress} 
        value={value}
        onChange={onChange}
     />

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: "ToDo List",
            list: null,
            newEntryVal: ''
        }
    }

    componentDidMount() {
        this.setState({list})
    }

    handleCreateEntry = (event) => {
        if (event.key === 'Enter') {
            const org = this.state.list.slice();
            org.push({
                id: org.length,
                content: event.target.value,
                isDone: false
            });
            this.setState({list: org, newEntryVal: ''})
        }
    }

    handleOnChange = (event) =>
        this.setState({newEntryVal: event.target.value})

    render() {
        const {
            heading,
            list,
            newEntryVal
        } = this.state;

        return (
            <div className="content">
                <h1><Heading heading={heading}/></h1>
                <CreateEntry 
                    onKeyPress={this.handleCreateEntry} 
                    value={newEntryVal}
                    onChange={this.handleOnChange}
                />
                <SingleEntry entries={list} />
            </div>
        )
    }
}
ReactDOM.render(<ToDo />, document.getElementById('root'))