import React from "react";
import PropTypes from 'prop-types';
import { Contact, ContactsLi, BTN } from './ContactList.styled';

export function ListContact({ contacts, onContactDelete }) {
    return(
        <Contact>
            {contacts.map((e) =>
                <ContactsLi key={e.id}>
                    <span>{e.name} {e.number}</span>
                    <BTN onClick={() => onContactDelete(e.id)}>Delete</BTN>
                </ContactsLi>)}
        </Contact>

        
    );
    
}

ListContact.propTypes = {
    contacts: PropTypes.arrayOf(Object).isRequired,
    onContactDelete: PropTypes.func.isRequired,
}