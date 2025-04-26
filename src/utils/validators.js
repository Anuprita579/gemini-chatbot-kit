function validateApiKey(apiKey) {
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("Invalid API key: API key must be a non-empty string");
  }
}

function validateOptions(options) {
  const validatedOptions = { ...options };

  // Validate temperature
  if (options.temperature !== undefined) {
    if (
      typeof options.temperature !== "number" ||
      options.temperature < 0 ||
      options.temperature > 1
    ) {
      throw new Error("Invalid temperature: Must be a number between 0 and 1");
    }
  }

  // Validate maxOutputTokens
  if (options.maxOutputTokens !== undefined) {
    if (
      !Number.isInteger(options.maxOutputTokens) ||
      options.maxOutputTokens <= 0
    ) {
      throw new Error("Invalid maxOutputTokens: Must be a positive integer");
    }
  }

  return validatedOptions;
}

module.exports = {
  validateApiKey,
  validateOptions,
};
