const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContactStatus,
} = require("../../controllers/contacts");

const {
  validateContact,
  validateContactStatus,
  validateContactId,
} = require("./contactsValidation");

router.get("/", getContacts);

router.get("/:contactId", validateContactId, getContactById);

router.post("/", validateContact, addContact);

router.delete("/:contactId", validateContactId, removeContact);

router.put("/:contactId", [validateContactId, validateContact], updateContact);

router.patch(
  "/:contactId/favorite/",
  [validateContactId, validateContactStatus],
  updateFavoriteContactStatus
);

module.exports = router;
