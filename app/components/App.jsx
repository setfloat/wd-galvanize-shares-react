import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

const App = React.createClass({
  getInitialState() {
    return {
      editing: null,

      bulletins: []
    };
  },

  componentWillMount() {
    // axios
    axios.get('/api/bulletins')
      .then((res) => {
        this.setState({ bulletins: res.data });
      })
      .catch((err) => {
        console.log(err)});
  },

  handleTouchTap() {
    const nextEditing = {
      submitter: 'stanleypaddles',
      title: '',
      topic: '',
      url: '',
      votes: Infinity
    };

    const nextBulletins = this.state.bulletins.concat(nextEditing);

    this.setState({ editing: nextEditing, bulletins: nextBulletins });
  },

  handleTitleTouchTap() {
    this.props.router.push('/');
  },

    // all of the matching bulletins, with the exception of one, which will be a
    // new bulletin object.
  incrementVotes(bulletin) {
    const nextBulletins =
    this.state.bulletins.map((element) => {
      if (bulletin !== element) {
        // filters out the incorrect bulletins we don't want to adjust
        return element;
      }

      return Object.assign({}, bulletin, { votes: bulletin.votes + 1 });
    });

    this.setState({ bulletins: nextBulletins });
  },

  decrementVotes(bulletin) {
    const nextBulletins =
    this.state.bulletins.map((element) => {
      if (bulletin !== element) {
        // filters out the incorrect bulletins we don't want to adjust
        return element;
      }

      return Object.assign({}, bulletin, { votes: bulletin.votes - 1 });
    });

    this.setState({ bulletins: nextBulletins });
  },

  stopEditingBulletin(bulletin) {
    // const nextBulletins = this.state.bulletins.filter((element) => bulletin
    // !== element);
    const nextBulletins = this.state.bulletins.filter((element) => {
      return bulletin !== element;
    });

    this.setState({ bulletins: nextBulletins, editing: null });
  },

  updateBulletin(bulletin, nextBulletin) {
    axios.post('/api/bulletins', nextBulletin)
      .then((res) => {
        const nextBulletins = this.state.bulletins.map((element) => {
          if (bulletin !== element) {
            return element;
          }

          // return nextBulletin;  replaced this with below.
          return res.data;
        });

        this.setState({ editing: null, bulletins: nextBulletins });
      });

      // .catch((err) => {
      //   console.error(err);
      // });
  },

  render() {
    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    const styleTitle = {
      cursor: 'pointer'
    };

    return <div>
      <AppBar
        onTitleTouchTap={this.handleTitleTouchTap}
        title="Galvanize Cares"
        titleStyle={styleTitle}
      >
        <FlatButton
          label="New Bulletin"
          onTouchTap={this.handleTouchTap}
          style={styleFlatButton}
        />
      </AppBar>

      {React.cloneElement(this.props.children, {
        bulletins: this.state.bulletins,
        editing: this.state.editing,
        decrementVotes: this.decrementVotes,
        incrementVotes: this.incrementVotes,
        stopEditingBulletin: this.stopEditingBulletin,
        updateBulletin: this.updateBulletin
      })}
      {console.log(React.cloneElement(this.props.children, {
        bulletins: this.state.bulletins,
        decrementVotes: this.decrementVotes,
        incrementVotes: this.incrementVotes
      }))}
    </div>;
  }
});

export default withRouter(App);
