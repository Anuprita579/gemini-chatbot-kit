// Roles
const customerService = require("./roles/customerService");
const sales = require("./roles/sales");
const technical = require("./roles/technical");
const education = require("./roles/education");
const healthcare = require("./roles/healthcare");

// Moods
const friendly = require("./moods/friendly");
const sarcastic = require("./moods/sarcastic");
const formal = require("./moods/formal");
const humorous = require("./moods/humorous");
const motivational = require("./moods/motivational");

module.exports = {
  roles: {
    customerService,
    sales,
    technical,
    education,
    healthcare,
  },
  moods: {
    friendly,
    sarcastic,
    formal,
    humorous,
    motivational,
  },
};
