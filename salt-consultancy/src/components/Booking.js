import React, {
  Component
} from 'react';

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
    };
  }
  componentDidMount() {
    fetch('/api/getList')
      .then(response => response.json())
      .then(data => this.setState({ hits: data }));
  }
  render() {
    const { hits } = this.state;
    return(
<div className="BookingContainer">
   <ul>
        {hits.map(user =>
        <div key={user.id}>
          <li>{user.id}</li>
          <li>{user.username}</li>
          <li>{user.password}</li>
        </div>
        )}
      </ul>
    </div>
    )
}
}


export default Booking;
