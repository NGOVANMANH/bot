const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [
        {
            item: "TC 100",
            description: "Toner Cartridge",
            amount: 6000
        },
        {
            item: "USB_EXT",
            description: "USB Cable Extender",
            amount: 2000
        }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 'khk'
};

module.exports = {
    invoice
};