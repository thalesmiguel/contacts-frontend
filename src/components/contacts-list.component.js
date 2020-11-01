import React, { Component } from "react";
import ContactDataService from "../services/contact.service";
import { Link } from "react-router-dom";

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveContacts = this.retrieveContacts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveContact = this.setActiveContact.bind(this);

    this.state = {
      contacts: [],
      currentContact: null,
      currentIndex: -1,
      message: (this.props.location.state === undefined ? "" : this.props.location.state.message)
    };
  }

  componentDidMount() {
    this.retrieveContacts();
  }

  retrieveContacts() {
    ContactDataService.getAll()
      .then(response => {
        this.setState({
          contacts: response.data['collection']
        });
        console.log(response.data['collection']);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveContacts();
    this.setState({
      currentContact: null,
      currentIndex: -1
    });
  }

  setActiveContact(contact, index) {
    this.setState({
      currentContact: contact,
      currentIndex: index
    });
  }

  render() {
    const { contacts, currentContact, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-12">
          {this.state.message ? (
            <div className="alert alert-info alert-dismissible fade show" role="alert">
              {this.state.message}
            </div>
          ) : ("")}
        </div>
        <div className="col-md-6">
          <h4>Contacts List</h4>

          <ul className="list-group">
            {contacts &&
              contacts.map((contact, index) => (
                <li
                  className={
                    "list-group-item " +
                      (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveContact(contact, index)}
                  key={index}
                >
                  {contact.first_name} {contact.last_name}
                </li>
            ))}
          </ul>

          <Link
            to={"/add/"}
            className="m-3 btn btn-sm btn-primary"
          >
            Add a new contact
          </Link>
        </div>
        <div className="col-md-6">
          {currentContact ? (
            <div>
              <h4>Contact</h4>
                <div>
                  <label>
                    <strong>First Name:</strong>
                  </label>
                  {currentContact.first_name}
                </div>
                <div>
                  <label>
                    <strong>Last Name:</strong>
                  </label>
                  {currentContact.last_name}
                </div>
                <div>
                  <label>
                    <strong>Phone Number:</strong>
                  </label>
                  {currentContact.phone_number}
                </div>
                <div>
                  <label>
                    <strong>Email:</strong>
                  </label>
                  {currentContact.email}
                </div>

                <Link
                  to={"/contacts/" + currentContact.id}
                  className="m-3 btn btn-sm btn-info"
                >
                  Edit
                </Link>

                <Link
                  to={"/contacts/" + currentContact.id + "/history/"}
                  className="m-3 btn btn-sm btn-secondary"
                >
                  History
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please select a Contact...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
