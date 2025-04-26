const Chatbot = require("./chatbot");
const templates = require("./templates");
const utils = require("./utils");

function createChatbot(apiKey, options = {}) {
  utils.validateApiKey(apiKey);
  const validatedOptions = utils.validateOptions(options);

  return new Chatbot({
    apiKey,
    ...validatedOptions,
    templates: templates,
  });
}

// Export the main functions and classes
module.exports = {
  createChatbot,
  Chatbot,
  templates,
};
