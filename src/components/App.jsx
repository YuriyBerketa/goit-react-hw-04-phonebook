import React, { Component } from "react";
import {ListContact} from "./ContactList";
// import data from './data/data.json';
import {Form} from './Form';
import { nanoid } from 'nanoid';
import {Filter} from "./Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Div } from "./App.styled";

export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  };
  
  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contactId !== contact.id)
    }))
  };

  ContactAdd = (data) => {

    if (this.state.contacts.filter(contact => contact.name === data.name).length > 0) {
      Notify.warning(`${data.name} is already in contacts`)
      return
    }

    const id = nanoid();
    const contact = { id: id, name: data.name, number: data.number };
    const contacts = [contact, ...this.state.contacts];

    this.setState({ contacts: contacts });
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value })
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }
  
  componentDidMount() {
    const contact = localStorage.getItem('contact');
    const parsedContacts = JSON.parse(contact);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
}

  componentDidUpdate(prevProps, prevState) {
    
    if (this.state.contacts !== prevState.contact) {
      // console.log('contacts обновился');
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }


  render() { 

    const visibleContacts = this.getVisibleContacts();

    return (
      <Div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.ContactAdd} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.changeFilter}
        />

        <ListContact
          contacts={visibleContacts}
          onContactDelete={this.deleteContact}
        />

      </Div>
    )
  }
}
