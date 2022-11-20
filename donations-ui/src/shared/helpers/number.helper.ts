export const centsToDollars = (cents: number | undefined) => 
    cents ?
    (cents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})
    : 0;