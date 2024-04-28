import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join(__dirname, "db/contacts.json");

export async function listContacts() {
  const list = await fs.readFile(contactsPath, "utf-8");
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = [contacts].find(({ id }) => id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: contacts.length + 1, name, email, phone };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
}
