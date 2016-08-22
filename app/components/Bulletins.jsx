import Bulletin from 'components/Bulletin';
import React from 'react';
import BulletinForm from 'components/BulletinForm';
import weakKey from 'weak-key';

const Bulletins = React.createClass({
  render() {
    const { editing, params } = this.props;
    let { bulletins } = this.props;

    { /* let bulletins = this.props.bulletins; */}

    if (params.topic) {
      bulletins = bulletins.filter((bulletin) => bulletin.topic === params.topic);
    }

    // puts the order that posts will appear, in this case by vote count
    bulletins.sort((p1, p2) => p1.votes < p2.votes);

      // the .map
    return <main>
    {bulletins.map((bulletin) => {
      if (bulletin === editing) {
        return <BulletinForm
          bulletin={bulletin}
          key={weakKey(bulletin)}
          stopEditingBulletin={this.props.stopEditingBulletin}
          updateBulletin={this.props.updateBulletin}
        />;
      }

      return <Bulletin
        bulletin={bulletin}
        decrementVotes={this.props.decrementVotes}
        incrementVotes={this.props.incrementVotes}
        key={weakKey(bulletin)}
      />;
    })}
    </main>;
  }
});

export default Bulletins;
