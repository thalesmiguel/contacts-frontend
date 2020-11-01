import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      currentContact: {
        id: null,
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      error: ""
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    const first_name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentContact: {
          ...prevState.currentContact,
          first_name: first_name
        }
      };
    });
  }

  onChangeLastName(e) {
    const last_name = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        last_name: last_name
      }
    }));
  }

  onChangePhoneNumber(e) {
    const phone_number = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        phone_number: phone_number
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        email: email
      }
    }));
  }

  getContact(id) {
    ContactDataService.get(id)
      .then(response => {
        this.setState({
          currentContact: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateContact() {
    ContactDataService.update(
      this.state.currentContact.id,
      this.state.currentContact
    )
      .then(response => {
        console.log(response.data);
        this.props.history.push({pathname: '/contacts', state: { message: 'Contact updated' }})
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: Object.entries(e.response.data['errors']).map((key) => (key[0] + " " + key[1])).join(", ")
        });
      });
  }

  deleteContact() {
    ContactDataService.delete(this.state.currentContact.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push({pathname: '/contacts', state: { message: 'Contact deleted' }})
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;
    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Contact</h4>
            <form>
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  value={currentContact.first_name}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  value={currentContact.last_name}
                  onChange={this.onChangeLastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone-number">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone-number"
                  value={currentContact.phone_number}
                  onChange={this.onChangePhoneNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentContact.email}
                  onChange={this.onChangeEmail}
                />
              </div>
            </form>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={e =>
                window.confirm("Are you sure you wish to delete this item?") &&
                this.deleteContact(e)
              }
            >
              Delete
            </button>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-primary"
              onClick={this.updateContact}
            >
              Update
            </button>

            {this.state.error ? (
              <div className="alert alert-danger" role="alert">
              {this.state.error}
              </div>
            ) : ("")}

          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Contact...</p>
          </div>
        )}
      </div>
    );
  }
}
