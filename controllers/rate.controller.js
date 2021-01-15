const requestService = require('../helpers/request.service');

const getRate = async (req, res, next) => {
  const { base, currency } = req.query;

  if (!currency && !base) {
    return res.status(400).json({
      status: 400,
      error:
        "You must provide a value for the both the base and currency parameter",
    });
  }

  if (!base) {
    return res.status(400).json({
      status: 400,
      error: "You must provide a value for the base parameter",
    });
  }

  if (!currency) {
    return res.status(400).json({
      status: 400,
      error: "You must provide a value for the currency parameter",
    });
  }

  if (typeof base !== "string" || typeof currency !== "string") {
    return res.status(400).json({
         status: 400,
         error: "Base and Currency can only have string values.",
       });
  }

  // get list of currency
  const currencyList = currency.trim().split(",");

  let data = await requestService.get("https://api.exchangeratesapi.io/latest");

  const  currencies = currencyList.reduce((acc, cur) => {
    acc[cur] = data.rates[cur];
    return acc;
  }, {});

  return res.status(200).json({
    results: {
      base,
      date: data.date,
      rates: currencies,
    },
  });
};

module.exports = getRate;
