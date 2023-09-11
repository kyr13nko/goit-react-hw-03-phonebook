import { Component } from 'react';

import Notiflix from 'notiflix';
import { Button, Form, Input, Label } from './ContactForm.styled';

const INITIAL_STATE = { name: '', number: '' };

class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  onFormInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();

    const { name, number } = this.state;

    const contactExists = this.props.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (contactExists) {
      // alert(`${name} is already in contacts.`);
      Notiflix.Report.failure(
        'Contact already exists',
        `${name} is already in contacts`,
        'Back'
      );
      return;
    }

    // this.props.createContact(this.state);
    this.props.createContact({ name, number });
    Notiflix.Report.success(
      'Contact created',
      `${name} is now in your contacts`,
      'Done'
    );

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.onFormSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.onFormInput}
            value={name}
            required
          />
        </Label>
        <Label>
          Phone
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.onFormInput}
            value={number}
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

export default ContactForm;
