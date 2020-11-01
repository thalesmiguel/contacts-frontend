import React, { Component } from "react";
import ContactDataService from "../services/contact.service";
import { Link } from "react-router-dom";

export default class ContactHistory extends Component {
  constructor(props) {
    super(props);
    this.retrieveContacts = this.retrieveContacts.bind(this);

    this.state = {
      contactHistory: []
    };
  }

  componentDidMount() {
    this.retrieveContacts();
  }

  retrieveContacts() {
    ContactDataService.getHistory(this.props.match.params.id)
      .then(response => {
        this.setState({
          contactHistory: response.data['collection']
        });
        console.log(response.data['collection']);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { contactHistory } = this.state;
    return (
      <div className="list row">
        <div className="col-md-12">
          <h4>Contact History</h4>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">updated at</th>
                <th scope="col">attribute</th>
                <th scope="col">old value</th>
                <th scope="col">new value</th>
              </tr>
            </thead>
            <tbody>
              {contactHistory &&
                contactHistory.map((data, index) => (
                  data.changes.map((change, index) => (
                    <tr key={index}>
                      <td>{new Date(data.updated_at).toLocaleString()}</td>
                      <td>{change.attribute}</td>
                      <td>{change.old_value}</td>
                      <td>{change.new_value}</td>
                    </tr>
                  ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
