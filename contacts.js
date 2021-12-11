const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

const readContent = async () => {
  const content = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(content);
  return result;
};

const contactsList = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  if (contacts.length === newContacts.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { contactsList, getContactById, removeContact, addContact };