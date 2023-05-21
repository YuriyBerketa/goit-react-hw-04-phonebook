import {useEffect, useState } from "react";
import {ListContact} from "./ContactList";
// import data from './data/data.json';
import {Form} from './Form';
import { nanoid } from 'nanoid';
import {Filter} from "./Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Div } from "./App.styled";




export function App() {
  const [contacts, setContacts] = useState(()=> JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  const getVisibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    const storageContacts = localStorage.getItem('contacts');
    if (storageContacts) {
      setContacts(JSON.parse(storageContacts));
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

function deleteContact(contactId) {
  setContacts(prevState => prevState.filter(contact => contactId !== contact.id));
  };


  function addContact (data) {
    if (contacts.filter(contact => contact.name === data.name).lenght > 0) {
      Notify.warning(`${data.name} is already in contacts`)
      return;
    }
    const id = nanoid();
    const contact = { id: id, name: data.name, number: data.number };
    setContacts(state => [contact, ...state]);
  }

 function changeFilter(event) {
    setFilter( event.currentTarget.value )
  };

function deleteContact(contactId) {
  setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  
  

return (
      <Div>
        <h1>Phonebook</h1>
        <Form onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onChange={changeFilter}
        />

        <ListContact
          contacts={getVisibleContacts}
          onContactDelete={deleteContact}
        />

      </Div>
    )

}