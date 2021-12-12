const chalk = require("chalk");
const { Command } = require("commander");

const {
  contactsList,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsList();
      // console.table(contacts);
      break;

    case "get":
      const contactGettingById = await getContactById(id);
      if (!contactGettingById) {
        console.log(
          chalk.red(`Sorry but there is no contact with "${id}" ID!`)
        );
        return;
      }
      // console.log(chalk.yellow("Contact found!!!"));
      console.table(contactGettingById);
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      if (contact === void 0) {
        console.log(chalk.red("Please full in all inputs"));
        return;
      }
      console.log(contact);
      break;

    case "remove":
      const removingContact = await removeContact(id);
      if (removingContact === null) {
        // console.log(
        //   chalk.red(`Sorry but there is no contact with "${id}" ID!`)
        // );
        return;
      }
      // console.log(chalk.green(`Contact with id=${id} was success deleted!`));
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv).then(() => console.log(chalk.green("Operation success!")));
