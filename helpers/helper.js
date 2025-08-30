export function formatPrice(input) {
    if (input == null) return "";

    let price = String(input).trim();

    price = price.replace(".", ",");

    if (!price.includes(",")) {
        return price + ",00";
    }

    let [whole, decimal] = price.split(",");
    decimal = (decimal || "0").padEnd(2, "0").slice(0, 2);

    return whole + "," + decimal;
}