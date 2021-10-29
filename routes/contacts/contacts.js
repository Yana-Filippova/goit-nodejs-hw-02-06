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

const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");

router.get("/", guard, wrapError(getContacts));

router.get("/:contactId", guard, validateContactId, wrapError(getContactById));

router.post("/", guard, validateContact, wrapError(addContact));

router.delete(
  "/:contactId",
  guard,
  validateContactId,
  wrapError(removeContact)
);

router.put(
  "/:contactId",
  guard,
  [(validateContactId, validateContact)],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite/",
  guard,
  [(validateContactId, validateContactStatus)],
  wrapError(updateFavoriteContactStatus)
);

module.exports = router;
