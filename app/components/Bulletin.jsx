import KeyboardArrowDown
from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import React from 'react';

const Bulletin = React.createClass({
  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired
  },

  // for when your ui isn't perofmring well and you need to speed it up
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.post !== this.props.post;
  // },

  handleTouchTapUp() {
    this.props.incrementVotes(this.props.bulletin);
  },
  handleTouchTapDown() {
    this.props.decrementVotes(this.props.bulletin);
  },

  render() {
    const { bulletin } = this.props;

    // const bulletin = this.props.bulletin;

    const stylePaper = {
      display: 'flex'

      // margin: '10px',
      // padding: '16px'
      // migrated to style sheet as .paper
    };

    const styleVotes = {
      marginLeft: '7px'
    };

    const styleAside = {
      minWidth: '60px'
    };

    const styleSubTitle = {
      fontSize: '14px',
      marginTop: '8px'
    };

    const styleTitle = {
      fontSize: '22px',

      // lineHeight: '36px',
      textDecoration: 'none'
    };

    const styleTopic = {
      // fontSize: '14px',
      textDecoration: 'none'
    };

    const styleAction = Object.assign({}, styleTopic, {
      cursor: 'pointer',
      fontWeight: 500,
      marginRight: '8px'
    });

    return <Paper className="paper" style={stylePaper}>
      <aside style={styleAside}>
        <KeyboardArrowUp onTouchTap={this.handleTouchTapUp} />
        <div style={styleVotes}>{bulletin.votes}</div>
        <KeyboardArrowDown onTouchTap={this.handleTouchTapDown}/>
      </aside>
      <article>
        <a href={bulletin.url} style={styleTitle}>
          {bulletin.title}
        </a>
        <div style={styleSubTitle}>
        submitted by {bulletin.submitter} to {' '}

        <Link style={styleTopic} to={`/topics/${bulletin.topic}`}>
          {`/topics/${bulletin.topic}`}
        </Link>
      </div>

      <div>
        <a style={styleAction}>
          edit
        </a>
        <a style={styleAction}>
          delete
        </a>
      </div>
      {/* <a href={bulletin.url} style={styleTitle}>
      {bulletin.title}
    </a>
    <div style={styleTopic}>{bulletin.topic}</div> */}
    </article>
  </Paper>;
  }
});

export default Bulletin;
