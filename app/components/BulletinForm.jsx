import Joi from 'joi';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import Save from 'material-ui/svg-icons/content/save'
import AssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';

const schema = Joi.object({
  title: Joi.string().trim().max(255),
  topic: Joi.string().trim().max(50),
  url: Joi.string().trim().uri({ scheme: /^https?/ })
});

const BulletinForm = React.createClass({
  getInitialState() {
    return {
      bulletin: this.props.bulletin,
      errors: {}

      // don't need this object, because data stored elsewhere already, reuse.
      // bulletin: {
      //     submitter: '',
      //     url: '',
      //     title: '',
      //     topic: ''
      // }
    };
  },

  handleBlur(event) {
    const { name, value } = event.target;
    const nextErrors = Object.assign({}, this.state.errors);
    const result = Joi.validate({ [name]: value }, schema)



      //guard clause. do a bunch of work to detect an error and then setState with new errors
    if (result.error) {
      //invalid
      // result.error => {}

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    delete nextErrors[name];

    this.setState({ errors: nextErrors });

      //valid
      // result.error => null
      // result.value => {"converted"} user input


    // github.com/hapijs/readme
  },

  handleChange(event) {
    // need event.target.value
    //we need to change this.state.bulletin
    const nextBulletin = Object.assign({}, this.state.bulletin, {
      // url: event.target.value
      [event.target.name]: event.target.value
    })

    this.setState({ bulletin: nextBulletin });
  },

  handleTouchTapCancel() {
      this.props.stopEditingBulletin(this.props.bulletin);
  },

  handleTouchTapSave() {
    const result = Joi.validate(this.state.bulletin, schema, {
      abortEarly: false,
      allowUnknown: true
    });

    if (result.error) {
      const nextErrors = {};

      for (const detail of result.error.details) {
        nextErrors[detail.path] = detail.message;
      }

      return this.setState({ errors: nextErrors });
    }

    const nextBulletin = Object.assign({}, result.value, { votes: 1 });

    this.props.updateBulletin(this.props.bulletin, nextBulletin);
    //
  },

  render() {
    const { bulletin, errors } = this.state;

    // const stylePaper = {
    //   margin: '10px',
    //   padding: '16px'
    // };

    // onSubmitTouchTap() {
    //
    // }


    const styleRaisedButton = {
      marginRight: '10px',
      marginTop: '40px'
    };

    const styleTextField = {
      display: 'block'
    };

    return <Paper className="paper">
      <h3>New Bulletin</h3>

      <TextField
        errorText={errors.url}
        floatingLabelText="url"
        fullWidth={true}
        name="url"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        style={styleTextField}
        value={bulletin.url}
      />
      <TextField
        errorText={errors.title}
        floatingLabelText="Title"
        fullWidth={true}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        name="title"

        value={bulletin.title}
      />
      <TextField
        errorText={errors.topic}
        floatingLabelText="Topic"
        fullWidth={true}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        name="topic"
        value={bulletin.topic}
      />
      <RaisedButton
        icon={<Cancel />}
        label="Cancel"
        onTouchTap={this.handleTouchTapCancel}
        primary={true}
        style={styleRaisedButton}
      />
      <RaisedButton
        icon={<AssignmentReturned />}
        label="Save"
        onTouchTap={this.handleTouchTapSave}
        // disabled={true}
        primary={true}
        style={styleRaisedButton}
      />
    </Paper>;
  }
});

export default BulletinForm;
