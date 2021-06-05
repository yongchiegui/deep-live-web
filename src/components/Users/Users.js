import { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions/usersActions";

class Users extends Component {

  componentDidMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }

  renderUser = (user) => {
    return (
      <div key={user.id}>
        {user.name}
      </div>
    )
  }

  render() {
    const {
      usersState: {
        users
      }
    } = this.props;

    return (
      <div>
        {users.map(this.renderUser)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usersState: state.users
});

const mapDispatchToProps = {
  fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);