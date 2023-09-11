import { Component } from 'react';

import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';

import { Container } from './App.styled';
import { nanoid } from 'nanoid';
// import Notiflix from 'notiflix';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const LS_KEY = 'contacts_key';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactFromLS = JSON.parse(localStorage.getItem(LS_KEY));
    if (contactFromLS) this.setState({ contacts: contactFromLS });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contact !== this.state.contacts)
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }

  createContact = data => {
    const newContact = { id: nanoid(), ...data };

    this.setState(prev => ({ contacts: [newContact, ...prev.contacts] }));
  };

  filterChange = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
    // Notiflix.Report.success('Contact deleted', '', 'Okay');
    toast.success('Contact deleted!');
  };

  render() {
    const { contacts, filter } = this.state;

    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm contacts={contacts} createContact={this.createContact} />
          <h2>Contacts</h2>
          <Filter
            title="Find contacts by name"
            filterChange={this.filterChange}
          />
          <ContactsList
            contacts={filterContacts}
            deleteContact={this.deleteContact}
          />
        </Container>
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    );
  }
}

export default App;
