const { createChatbot } = require("../src");

async function customExample() {
  // Initialize chatbot with custom settings
  const chatbot = createChatbot("YOUR_GEMINI_API_KEY", {
    model: "gemini-1.5-pro",
    temperature: 0.8,
    maxOutputTokens: 1024,
    systemPrompt: "You are a sarcastic assistant with a dark sense of humor.",
    onResponse: (response) => {
      console.log("Got response:", response);
    },
    beforeSend: (message) => {
      console.log("Sending message:", message);
      return message;
    },
  });

  // Apply the customer service template but customize the temperature
  chatbot.applyTemplate("customerService", "roles", { temperature: 0.5 });

  // Send a message
  const response = await chatbot.sendMessage("I need help with my order");
  console.log("Bot:", response);

  // Get current configuration
  console.log("Current config:", chatbot.getConfig());

  // Add a custom template to a custom category
  chatbot.addTemplates(
    {
      custom: {
        systemPrompt: "You are a custom assistant.",
        temperature: 0.6,
        maxOutputTokens: 512,
      },
    },
    "custom_categories"
  );

  // Apply the custom template from the custom category
  chatbot.applyTemplate("custom", "custom_categories");

  // Try another message
  const finalResponse = await chatbot.sendMessage("Tell me about yourself");
  console.log("Final response:", finalResponse);
}

customExample().catch(console.error);
