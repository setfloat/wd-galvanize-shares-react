import Bulletin from 'components/Bulletin';
import React from 'react';
import BulletinForm from 'components/BulletinForm';
import weakKey from 'weak-key';

const Bulletins = React.createClass({
  render() {
    const { editing, params } = this.props;
    let { bulletins } = this.props;
    {/* let bulletins = this.props.bulletins; */}

    if (params.topic) {
      bulletins = bulletins.filter((bulletin) => bulletin.topic === params.topic);
    }

    //puts the order that posts will appear, in this case by vote count
    bulletins.sort((p1, p2) => p1.votes < p2.votes);


      //the .map
    return <main>
    {bulletins.map((bulletin) => {

      if (bulletin === editing) {
        return <BulletinForm
        key={weakKey(bulletin)}
        bulletin={bulletin}
        updateBulletin={this.props.updateBulletin}
          stopEditingBulletin={this.props.stopEditingBulletin} />;
      }

      return <Bulletin
        key={weakKey(bulletin)}
        bulletin={bulletin}
        incrementVotes={this.props.incrementVotes}
        decrementVotes={this.props.decrementVotes}
      />
    })}
    </main>
  }
});

export default Bulletins;
