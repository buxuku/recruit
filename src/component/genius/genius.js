import React from "react";
import { getUserList } from "../../redux/chatuser.redux";
import { connect } from "react-redux";
import UserCard from '../usercard/usercard';
@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList("boss");
  }
  render() {
    const { userList } = this.props;
    return (
      <UserCard userList={userList} />
    );
  }
}
export default Genius;
