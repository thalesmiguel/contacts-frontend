import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.newContact = this.newContact.bind(this);

    this.state = {
      id: null,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      submitted: false,
      error: ""
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  saveContact() {
    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      email: this.state.email
    };

    ContactDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          phone_number: response.data.phone_number,
          email: response.data.email,
          submitted: true
        });
        console.log(response.data);
        this.props.history.push({pathname: '/contacts', state: { message: 'Contact created' }})
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: Object.entries(e.response.data['errors']).map((key) => (key[0] + " " + key[1])).join(', ')
        });
      });
  }

  newContact() {
    this.setState({
      id: null,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        <h4>New Contact</h4>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newContact}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                required
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
                name="first-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                required
                value={this.state.last_name}
                onChange={this.onChangeLastName}
                name="last-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone-number">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone-number"
                required
                value={this.state.phone_number}
                onChange={this.onChangePhoneNumber}
                name="phone-number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-success"
              onClick={this.saveContact}
            >
              Submit
            </button>

            {this.state.error ? (
              <div className="alert alert-danger" role="alert">
              {this.state.error}
              </div>
            ) : ("")}
          </div>
        )}
      </div>
    );
  }
}
