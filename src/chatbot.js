const { GoogleGenerativeAI } = require("@google/generative-ai");

class Chatbot {
  constructor(options = {}) {
    // API configuration
    this.apiKey = options.apiKey;
    if (!this.apiKey) {
      throw new Error("Gemini API key is required");
    }

    // Update the default model name to the correct format
    // The model name format might have changed since you created the library
    this.model = options.model || "gemini-1.5-pro"; // Updated from 'gemini-pro'
    this.maxOutputTokens = options.maxOutputTokens || 1024;
    this.temperature = options.temperature || 0.7;
    this.topP = options.topP || 0.95;
    this.topK = options.topK || 40;

    // Chatbot configuration
    this.systemPrompt = options.systemPrompt || "You are a helpful assistant.";
    this.chatHistory = options.initialHistory || [];
    this.templates = options.templates || {};

    // Callbacks
    this.onError = options.onError || console.error;
    this.onResponse = options.onResponse || null;
    this.beforeSend = options.beforeSend || null;

    // Initialize Gemini API with the latest version of the library
    this.genAI = new GoogleGenerativeAI(this.apiKey);

    try {
      this.modelInstance = this.genAI.getGenerativeModel({
        model: this.model,
        generationConfig: {
          maxOutputTokens: this.maxOutputTokens,
          temperature: this.temperature,
          topP: this.topP,
          topK: this.topK,
        },
      });
      this.initChatSession();
    } catch (error) {
      console.error("Error initializing model:", error);
      throw new Error(`Failed to initialize Gemini model: ${error.message}`);
    }
  }

  formatChatHistory() {
    // Format chat history for Gemini API
    const history = [];

    this.chatHistory.forEach((message) => {
      const geminiRole = message.role === "assistant" ? "model" : message.role;

      // Only add if it's a valid role
      if (["user", "model", "function", "system"].includes(geminiRole)) {
        history.push({
          role: geminiRole,
          parts: [{ text: message.content }],
        });
      }
    });

    return history;
  }
  // Update the initChatSession method to handle the system prompt differently
  initChatSession() {
    // Create a new chat session
    this.chatSession = this.modelInstance.startChat({
      history: this.formatChatHistory(),
      generationConfig: {
        maxOutputTokens: this.maxOutputTokens,
        temperature: this.temperature,
        topP: this.topP,
        topK: this.topK,
      },
    });
  }
  // Update the sendMessage method to incorporate the system prompt
  async sendMessage(message, options = {}) {
    try {
      // Process message before sending if beforeSend callback is provided
      let processedMessage = this.beforeSend
        ? this.beforeSend(message)
        : message;

      // If this is the first message and we have a system prompt, prepend it to the user's message
      if (this.chatHistory.length === 0 && this.systemPrompt) {
        processedMessage = `${this.systemPrompt}\n\nUser: ${processedMessage}`;
      }

      // Send message to Gemini
      const result = await this.chatSession.sendMessage(processedMessage);
      const response = result.response.text();

      // Update chat history with the correct roles for Gemini
      this.chatHistory.push({ role: "user", content: processedMessage });
      this.chatHistory.push({ role: "model", content: response }); // Use "model" instead of "assistant"

      // Process response with callback if provided
      if (this.onResponse) {
        this.onResponse(response, this.chatHistory);
      }

      return response;
    } catch (error) {
      this.onError(error);
      return `Error: ${error.message}`;
    }
  }

  resetChat() {
    // Reset chat history and start a new session
    this.chatHistory = [];
    this.initChatSession();
  }

  setSystemPrompt(prompt) {
    // Update system prompt and reinitialize chat
    this.systemPrompt = prompt;
    this.initChatSession();
  }

  // Apply a template configuration
  applyTemplate(templateName, category = null, customizations = {}) {
    let template;

    // Check if category is provided
    if (category) {
      // Look for template in the specified category
      if (this.templates[category] && this.templates[category][templateName]) {
        template = this.templates[category][templateName];
      } else {
        throw new Error(
          `Template "${templateName}" not found in category "${category}"`
        );
      }
    } else {
      // Try to find the template directly or in any category
      if (this.templates[templateName]) {
        // Direct access (backward compatibility)
        template = this.templates[templateName];
      } else {
        // Search in all categories
        let found = false;
        for (const category in this.templates) {
          if (this.templates[category][templateName]) {
            template = this.templates[category][templateName];
            found = true;
            break;
          }
        }

        if (!found) {
          throw new Error(`Template "${templateName}" not found`);
        }
      }
    }

    // Apply template settings with customizations
    this.systemPrompt = customizations.systemPrompt || template.systemPrompt;
    this.temperature = customizations.temperature || template.temperature;
    this.maxOutputTokens =
      customizations.maxOutputTokens || template.maxOutputTokens;

    // Reinitialize chat session with new settings
    this.initChatSession();

    return this;
  }

  // Add a method to combine templates
  combineTemplates(templates = []) {
    // Reset to default settings
    this.systemPrompt = "You are a helpful assistant.";
    this.temperature = 0.7;
    this.maxOutputTokens = 1024;

    // Apply each template in sequence
    for (const template of templates) {
      const { name, category, customizations = {} } = template;
      try {
        // Get the template but don't reinitialize the chat session yet
        let templateObj;

        if (category) {
          if (this.templates[category] && this.templates[category][name]) {
            templateObj = this.templates[category][name];
          } else {
            console.error(
              `Template "${name}" not found in category "${category}"`
            );
            continue;
          }
        } else {
          // Try to find the template directly or in any category
          if (this.templates[name]) {
            templateObj = this.templates[name];
          } else {
            // Search in all categories
            let found = false;
            for (const cat in this.templates) {
              if (this.templates[cat][name]) {
                templateObj = this.templates[cat][name];
                found = true;
                break;
              }
            }

            if (!found) {
              console.error(`Template "${name}" not found`);
              continue;
            }
          }
        }

        // Combine settings from this template
        if (templateObj.systemPrompt) {
          this.systemPrompt += "\n\n" + templateObj.systemPrompt;
        }

        // Only override other settings if specified
        if (templateObj.temperature !== undefined) {
          this.temperature =
            customizations.temperature || templateObj.temperature;
        }

        if (templateObj.maxOutputTokens !== undefined) {
          this.maxOutputTokens =
            customizations.maxOutputTokens || templateObj.maxOutputTokens;
        }
      } catch (error) {
        console.error(`Error applying template "${name}":`, error);
      }
    }

    // Now initialize the chat session once after all templates are combined
    this.initChatSession();

    return this;
  }

  // Get current configuration
  getConfig() {
    return {
      model: this.model,
      systemPrompt: this.systemPrompt,
      temperature: this.temperature,
      maxOutputTokens: this.maxOutputTokens,
      topP: this.topP,
      topK: this.topK,
    };
  }

  // Get chat history
  getHistory() {
    return this.chatHistory;
  }

  // Add custom templates
  addTemplates(templates, category = null) {
    if (category) {
      // Add templates to a specific category
      if (!this.templates[category]) {
        this.templates[category] = {};
      }
      this.templates[category] = { ...this.templates[category], ...templates };
    } else {
      // Add templates at the top level for backward compatibility
      this.templates = { ...this.templates, ...templates };
    }
    return this;
  }
}

module.exports = Chatbot;
