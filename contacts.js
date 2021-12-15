const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

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
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length === newContacts.length) {
    return;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  if (name === void 0 || email === void 0 || phone === void 0) {
    return;
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { contactsList, getContactById, removeContact, addContact };
