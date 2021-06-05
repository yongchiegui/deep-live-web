import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { fetchTweets } from "../../actions/tweetsActions";
import "./DeepLiveTweets.css";

class DeepLiveTweets extends Component {
  state = {
    dateOfTweets: new Date(),
    numberOfTweets: 5
  };

  componentDidMount() {
    this.initializeTweets();
  }

  initializeTweets = () => {
    const { fetchTweets } = this.props;
    const { dateOfTweets } = this.state;

    fetchTweets(dateOfTweets); 
  }

  increaseNumberOfTweets = () => {
    const {
      tweetsState: {
        tweets
      },
      fetchTweets
    } = this.props;

    const {
      dateOfTweets,
      numberOfTweets
    } = this.state;

    if (numberOfTweets + 5 > tweets.length) {
      dateOfTweets.setDate(dateOfTweets.getDate() - 1);
      fetchTweets(dateOfTweets);
    }

    this.setState({
      dateOfTweets: dateOfTweets,
      numberOfTweets: numberOfTweets + 5
    });
  }

  renderTweet = (tweet) => {
    return (
      <Row key={tweet.id}>
        <Col>
          <TwitterTweetEmbed tweetId={tweet.id} />
        </Col>
        <Col>
          <p className="mt-2 TweetTranslation"> {tweet.translatedText} </p>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      tweetsState: {
        tweets
      }
    } = this.props;

    const { numberOfTweets } = this.state;

    const tweetsToDisplay = tweets.slice(0, numberOfTweets);

    return (
      <Container>
        {tweetsToDisplay && tweetsToDisplay.map(this.renderTweet)}
        <Row>
          <Button
            className="m-3"
            variant="primary"
            onClick={this.increaseNumberOfTweets}
          >
            Load More
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tweetsState: state.tweets
});

const mapDispatchToProps = {
  fetchTweets
}

export default connect(mapStateToProps, mapDispatchToProps)(DeepLiveTweets);