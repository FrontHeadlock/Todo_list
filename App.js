import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Button } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, title: "Todo 1", done: false, selected: false, priority: 0 },
        { id: 1, title: "Todo 2", done: false, selected: false, priority: 0 },
      ],
      currentPage: 1,
      itemsPerPage: 8,
    };
  }

  componentDidMount() {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      this.setState({ items: storedItems });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
  }

  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    item.priority = 0; // 초기 중요도 설정
    thisItems.push(item);
    this.setState({ items: thisItems });
    console.log("items:", this.state.items);
  }

  delete = (item) => {
    const thisItems = this.state.items;
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      console.log("Update Items:", this.state.items);
    });
  }

  toggleSelect = (item) => { // 선택 상태를 토글하는 메서드 추가
    const thisItems = this.state.items.map(e => {
      if (e.id === item.id) {
        e.selected = !e.selected;
      }
      return e;
    });
    this.setState({ items: thisItems });
  }

  deleteSelected = () => { // 선택된 항목을 삭제하는 메서드 추가
    const thisItems = this.state.items.filter(e => !e.selected);
    this.setState({ items: thisItems }, () => {
      console.log("Deleted selected items:", this.state.items);
    });
  }

  deleteAll = () => { // 전체 항목을 삭제하는 메서드 추가
    this.setState({ items: [] }, () => {
      console.log("Deleted all items:", this.state.items);
    });
  }

  handlePageChange = (event, newPage) => { // 페이지 변경 핸들러 추가
    this.setState({ currentPage: newPage });
  }

  setPriority = (item, priority) => { // 중요도를 설정하는 메서드 추가
    const thisItems = this.state.items.map(e => {
      if (e.id === item.id) {
        e.priority = priority;
      }
      return e;
    });
    this.setState({ items: thisItems });
  }

  render() {
    const { items, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    var todoItems = currentItems.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {currentItems.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              toggleSelect={this.toggleSelect} // toggleSelect 메서드 전달
              delete={this.delete}
              setPriority={this.setPriority} // setPriority 메서드 전달
            />
          ))}
        </List>
      </Paper>
    );

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.deleteSelected}
            style={{ marginTop: 16 }} // 버튼에 마진 추가
          >
            일괄 삭제
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.deleteAll}
            style={{ marginTop: 16, marginLeft: 8 }} // 버튼에 마진 추가
          >
            Todo 초기화
          </Button>
          <div style={{ marginTop: 16 }}>
            {Array.from(Array(totalPages), (e, i) => {
              return (
                <Button
                  key={i}
                  variant="outlined"
                  color="primary"
                  onClick={(e) => this.handlePageChange(e, i + 1)}
                  style={{ margin: 4 }}
                >
                  {i + 1}
                </Button>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;

