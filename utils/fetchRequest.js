fetch("/receipts/process", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    retailer: "Store Name",
    purchaseDate: "2022-12-01",
    purchaseTime: "13:00",
    total: "13.37",
    items: [
      {
        shortDescription: "Item 1",
        price: "10.00"
      },
      {
        shortDescription: "Item 2",
        price: "3.37"
      },
    ]
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
