// Roles
const customerService = require("./roles/customerService");
const sales = require("./roles/sales");
const technical = require("./roles/technical");
const education = require("./roles/education");
const healthcare = require("./roles/healthcare");
const ecoAdvisor = require('./roles/ecoAdvisor');
const insurance = require('./roles/insurance');
const investment = require('./roles/investment');
const restaurant = require('./roles/restaurant');

// Moods
const friendly = require("./moods/friendly");
const sarcastic = require("./moods/sarcastic");
const formal = require("./moods/formal");
const humorous = require("./moods/humorous");
const assertive = require("./moods/assertive");
const empathetic = require("./moods/empathetic");
const enthusiastic = require("./moods/enthusiastic");
const informative = require("./moods/informative");
const neutral = require("./moods/neutral");

module.exports = {
  roles: {
    customerService,
    sales,
    technical,
    education,
    healthcare,
    ecoAdvisor,
    insurance,
    investment,
    restaurant
  },
  moods: {
    friendly,
    sarcastic,
    formal,
    humorous,
    motivational,
    assertive,
    empathetic,
    enthusiastic,
    informative,
    neutral
  },
};
