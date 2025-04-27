![npm version](https://img.shields.io/npm/v/gemini-chatbot-kit)
![license](https://img.shields.io/npm/l/gemini-chatbot-kit)
![downloads](https://img.shields.io/npm/dw/gemini-chatbot-kit)

# Gemini Chatbot Kit

Gemini Chatbot Kit is a customizable AI chatbot library built for easy integration of Google's Gemini AI into your applications. Create smart, conversational chatbots with just a few lines of code using this lightweight NPM library.

## Features

- 🤖 Pre-configured chatbot templates for different use cases
- ✨ Highly customizable prompts and behaviors
- 🔄 Simple API for managing conversations
- 🛠️ Built-in utilities for common chatbot functions
- ⚡ Optimized for modern JavaScript environments
- 🧩 Supports Custom Roles and Mood Control out of the box
- 🔗 Combined Templates for even richer chatbot personalities


## Why Gemini Chatbot Kit?

If you're looking for a Gemini AI chatbot library that's easy to set up, highly customizable, and powerful, Gemini Chatbot Kit is designed for you.
Whether you want to create a professional customer service bot, an informative educational tool, or a playful conversational AI, this library provides ready-to-use templates, mood switching, and flexible APIs for rapid development.

## Installation

Install the Gemini Chatbot Kit NPM package to start building your Gemini-powered chatbots:

```bash
npm i gemini-chatbot-kit
```
## Usage

Example of using Gemini Chatbot Kit to create a basic AI chatbot.

### Quick Start

```javascript
const { createChatbot } = require("gemini-chatbot-kit");

async function example() {
  // Initialize with your Gemini API key
  const chatbot = createChatbot("YOUR_GEMINI_API_KEY");

  // Send a message and get a response
  const response = await chatbot.sendMessage("Hello, how can you help me?");
  console.log("Bot:", response);
}

example();
```

### Using Templates

The Gemini Chatbot Kit supports pre-configured templates for common scenarios:

```javascript
const { createChatbot, templates } = require("gemini-chatbot-kit");

async function example() {
  const chatbot = createChatbot("YOUR_GEMINI_API_KEY");

    // Method 1: Apply templates individually with categories
    // Apply "sales" role template
    chatbot.applyTemplate('sales', 'roles');
    // Then apply "formal" mood template
    chatbot.applyTemplate('formal', 'moods');

    // Method 2: Or use the new combineTemplates method to apply multiple templates at once
    /*
    chatbot.combineTemplates([
      { name: 'sales', category: 'roles' },
      { name: 'formal', category: 'moods' }
    ]);
    */


  // Send a message
  const response = await chatbot.sendMessage("I need help with my order");
  console.log("Bot:", response);
}
```

## API Reference

### `createChatbot(apiKey, options)`

| Option | Type | Description | 
|:------ |:-----|:------------|
| **`apiKey`** | `String` | Your API Key for Gemini model |
| **`options.model`** | `String` | Model to use (see Supported Models below) |
| **`options.temperature`** | `Number` | Controls randomness (see Temperature Range) |
| **`options.maxOutputTokens`** | `Number` | Limits response length (see Max Output Tokens) |


### `chatbot.sendMessage(message, options)`

Sends a user message and returns the chatbot's reply.

### `chatbot.resetChat()`

Resets the ongoing conversation history.

### `chatbot.setSystemPrompt(prompt)`

Updates the system prompt.

### `chatbot.applyTemplate(templateName, category, customizations)`

Applies a pre-defined template from a specific category with optional customizations.

### `chatbot.combineTemplates(templates)`

Applies multiple templates at once, combining their effects.

### `chatbot.getConfig()`

Returns the current configuration.

### `chatbot.getHistory()`

Returns the conversation history.

### `chatbot.addTemplates(templates, category)`

Add your own custom templates to a specific category.

## Supported Models

| Model Name | Description | 
|:------ |:------------|
| **gemini-1.0-pro** | Gemini 1.0 Pro model |
| **gemini-1.5-pro** | Gemini 1.5 Pro model (default) |
| **gemini-1.5-flash** | Gemini 1.5 Flash model |


## Temperature Range

| Value | Behavior | 
|:------ |:------------|
| **0.0** | Very deterministic (focused) |
| **1.0** | Very creative (random responses) |

> [!TIP]
> Recommended range: 0.2 to 0.8

## Max Output Tokens Range

* Minimum: 200 tokens
* Maximum: 500 tokens
> [!TIP]
> More tokens = longer, more detailed answers.


## 🧑‍💼 Available Roles

| Role | Description | 
|:------ |:------------|
| **customerService** | Handles customer queries professionally |
| **education** | Acts like a teacher/educator |
| **healthcare** | Healthcare tone, non-prescriptive |
| **sales** | Promotes products or services |
| **technical** | Provides tech support & technical advice |
| **ecoAdvisor** | Provides advice on sustainable and eco-friendly practices |
| **insurance** | Guides users in choosing appropriate insurance policies |
| **investment** | Offers investment suggestions based on financial goals |
| **restaurant** | Assists users in browsing menus, ordering food, and delivery tracking |

 
## 🎭 Available Moods

| Mood | Description | 
|:------ |:------------|
| **formal** | Professional, polite tone |
| **friendly** | Warm, casual, welcoming tone |
| **motivational** | Positive, uplifting, encouraging tone |
| **sarcastic** | Witty, ironic, teasing tone |
| **humorous** | Funny and light-hearted tone |
| **assertive** | Direct, confident, and decisive tone |
| **empathetic** | Shows understanding, compassion, and emotional support |
| **enthusiastic** | High-energy, excited, and passionate tone |
| **informative** | Focused on giving clear, detailed information |
| **neutral** | Completely objective, balanced, no emotion |
    
      
## Example: Applying Role and Mood Together
```javascript
// Set chatbot to "Sales" tone
chatbot.applyTemplate('sales', 'roles');
// Then apply "Formal" mood
chatbot.applyTemplate('formal', 'moods');

// Or use combineTemplates to apply both at once
chatbot.combineTemplates([
  { name: 'sales', category: 'roles' },
  { name: 'formal', category: 'moods' }
]);
```
>[!NOTE]
> Applying a new template in the same category will override the previous one. Using combineTemplates() allows you to combine effects from different categories.

## How to Create a Custom Combined Template
```javascript
chatbot.addTemplates({
  productSupport: {
    systemPrompt: "You are a product support specialist for XYZ product.",
    temperature: 0.5,
    maxOutputTokens: 768,
  }
}, 'custom');

// Apply your custom template
chatbot.applyTemplate('productSupport', 'custom');
```

## 🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Related Keywords
gemini chatbot | AI chatbot library | Gemini chatbot kit | Google's Gemini chatbot | Gemini AI integration | customizable chatbot NPM package | chatbot development Node.js