import React from "react";
import { getUserList } from "../../redux/chatuser.redux";
import { connect } from "react-redux";
import UserCard from '../usercard/usercard';
@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList("genius");
  }
  render() {
    const { userList } = this.props;
    return (
      <UserCard userList={userList} />
    );
  }
}
export default Boss;
