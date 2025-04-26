const { createChatbot, templates } = require("../src");

async function testChatbot() {
  try {
    // Initialize chatbot with API key and default settings
    const apiKey = "YOUR_GEMINI_API_KEY";

    const chatbot = createChatbot(apiKey, {
      model: "gemini-1.5-pro",
      temperature: 0.7,
      maxOutputTokens: 512,
    });

    console.log("Chatbot initialized successfully");

    // Method 1: Apply templates individually with categories
    // Apply "sales" role template
    chatbot.applyTemplate("sales", "roles");
    // Then apply "formal" mood template
    chatbot.applyTemplate("formal", "moods");

    // Method 2: Or use the new combineTemplates method to apply multiple templates at once
    /*
    chatbot.combineTemplates([
      { name: 'sales', category: 'roles' },
      { name: 'formal', category: 'moods' }
    ]);
    */

    console.log("Sending first message...");
    const response = await chatbot.sendMessage("Hello");
    console.log("Bot:", response);

    // Test sending another message in the same conversation
    console.log("Sending second message...");
    const anotherResponse = await chatbot.sendMessage("I want to buy a dress");
    console.log("Bot:", anotherResponse);

    // Reset the chat
    chatbot.resetChat();
    console.log("Chat reset successfully");
  } catch (error) {
    console.error("Error in test chatbot:", error);
  }
}

testChatbot().catch((error) => {
  console.error("Unhandled error in testChatbot function:", error);
});
