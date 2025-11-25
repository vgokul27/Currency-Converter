const API_BASE_URL = "https://api.exchangerate-api.com/v4/latest";

/**
 * Fetch exchange rates for a specific base currency
 * @param {string} baseCurrency - The base currency code (e.g., 'USD')
 * @returns {Promise<Object>} - Exchange rates data
 */
export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {Promise<Object>} - Conversion result with rate and converted amount
 */
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    const data = await fetchExchangeRates(fromCurrency);
    const rate = data.rates[toCurrency];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${toCurrency}`);
    }

    const convertedAmount = amount * rate;

    return {
      amount,
      fromCurrency,
      toCurrency,
      rate,
      convertedAmount,
      timestamp: data.time_last_updated,
    };
  } catch (error) {
    console.error("Error converting currency:", error);
    throw error;
  }
};

/**
 * Get exchange rate between two currencies
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {Promise<number>} - Exchange rate
 */
export const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const data = await fetchExchangeRates(fromCurrency);
    const rate = data.rates[toCurrency];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${toCurrency}`);
    }

    return rate;
  } catch (error) {
    console.error("Error getting exchange rate:", error);
    throw error;
  }
};

/**
 * Get multiple exchange rates for a base currency
 * @param {string} baseCurrency - Base currency code
 * @param {Array<string>} targetCurrencies - Array of target currency codes
 * @returns {Promise<Object>} - Object with exchange rates
 */
export const getMultipleRates = async (baseCurrency, targetCurrencies) => {
  try {
    const data = await fetchExchangeRates(baseCurrency);
    const rates = {};

    targetCurrencies.forEach((currency) => {
      if (data.rates[currency]) {
        rates[currency] = data.rates[currency];
      }
    });

    return rates;
  } catch (error) {
    console.error("Error getting multiple rates:", error);
    throw error;
  }
};

// Alternative API endpoint (using ExchangeRate-API with API key)
// You can sign up for a free API key at https://www.exchangerate-api.com/

const API_KEY = "ce699004a0636167220c818e"; // Replace with your API key
const API_V6_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const fetchExchangeRatesV6 = async (baseCurrency) => {
  try {
    const response = await fetch(`${API_V6_URL}/latest/${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("Error fetching exchange rates (V6):", error);
    throw error;
  }
};
