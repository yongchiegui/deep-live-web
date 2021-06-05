import { Component } from "react";
import DeepLiveTweets from "../DeepLiveTweets/DeepLiveTweets";
import Users from "../Users/Users";
import "./DeepLive.css";

class DeepLive extends Component {
  render() {
    return (
      <div>
        <div id="Header">
          DEEP LIVE
        </div>
        <div>
          {/* <Users /> */}
          <DeepLiveTweets />
        </div>
      </div>
    );
  }
}

export default DeepLive;
