import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component {
  constructor(props) { // 매개변수 props 생성자
    super(props);
    this.state = { item: props.item, readOnly: true }; // 매개변수 item의 변수/값을 item에 대입
    this.delete = props.delete;
    this.toggleSelect = props.toggleSelect;
    this.setPriority = props.setPriority; // setPriority 함수 추가
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  }

  offReadOnlyMode = () => {
    this.setState({ readOnly: false });
  }

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
    }
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  }

  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = thisItem.done ? false : true;
    this.setState({ item: thisItem });
  }

  toggleSelectEventHandler = () => { // 선택 상태 토글 이벤트 핸들러 추가
    this.toggleSelect(this.state.item);
  }

  setPriorityHandler = (priority) => { // 중요도 설정 핸들러 추가
    this.setPriority(this.state.item, priority);
  }

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox
          checked={item.selected || false} // 선택 상태를 반영
          onChange={this.toggleSelectEventHandler} // 선택 상태 변경 핸들러
        />
        <ListItemText>
          <InputBase
            inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
          />
        </ListItemText>
        <div>
          {[1, 2, 3].map((num) => (
            <IconButton
              key={num}
              onClick={() => this.setPriorityHandler(num)}
              style={{ color: item.priority >= num ? 'gold' : 'gray' }}
            >
              {item.priority >= num ? <Star /> : <StarBorder />}
            </IconButton>
          ))}
        </div>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
