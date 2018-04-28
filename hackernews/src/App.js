import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramove, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
]

const greet = "G'day Mate. It's React, mate";

const isSearched = (searchTerm) => 
  (item) => 
    item.title.toLowerCase()
      .includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      greet,
      searchTerm: ''
    }
    // Constructor to bind vars to component
    this.onDismiss = this.onDismiss.bind(this);
    // this.clickClicky = this.clickClicky.bind(this);  
  }

  onDismiss(id) {
    const updatedList = 
      this.state.list.filter (item => item.objectID !== id)
    this.setState({ list: updatedList})
  }

  onSearchChange = (event) => this.setState({ searchTerm: event.target.value})

  render() {
    const { 
      searchTerm,
      list, 
      greet
    } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <h1>{greet}</h1>
          <Clock />
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          > 
            Search
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({value, onChange, children}) => 
  <form>
    {children}: 
    <input type="text" value={value} onChange={onChange}/>
    <h1> You typed: {value} </h1>
  </form>

const largeCol = {width: '40%'}
const medCol = {width: '30%'}
const smallCol = {width: '10%'}
const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
    {list
      .filter(isSearched(pattern))
      .map(item => 
      <div key={item.objectID} className="table-row">
        <span style={largeCol}><a href={item.url} >{item.title}</a></span>
        <span style={medCol}>Author: {item.author}</span>
        <span style={smallCol}>Comments: {item.num_comments}</span>
        <span style={smallCol}>Points: {item.points}</span>
        <span>
          <Button onClick={() => 
            onDismiss(item.objectID)} 
            className="button-inline"
            type="button">
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({onClick, className = '', children}) =>
  <button 
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export {Search, Table};
export default App;
