# Gemini Chatbot Kit

A customizable NPM library for easily integrating Google's Gemini AI-powered chatbots into your applications.

## Features

- 🤖 Pre-configured chatbot templates for different use cases
- ✨ Highly customizable prompts and behaviors
- 🔄 Simple API for managing conversations
- 🛠️ Utilities for common chatbot functions
- ⚡ Works with modern JavaScript environments

## Installation

```bash
npm i gemini-chatbot-kit
```
## Usage
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

The library comes with pre-configured templates for common use cases:

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

 
## 🎭 Available Moods

| Mood | Description | 
|:------ |:------------|
| **formal** | Professional, polite tone |
| **friendly** | Warm, casual, welcoming tone |
| **motivational** | Positive, uplifting, encouraging tone |
| **sarcastic** | Witty, ironic, teasing tone |
| **humorous** | Funny and light-hearted tone |

      
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
