import formatter from "number-format.js"

export default (format, value) => {
    switch (format) {
        case "C0":
            return formatter("$###,##0.", value)
        case "C1":
            return formatter("$###,##0.0", value)
        case "C2":
            return formatter("$###,##0.00", value)
        case "N0":
            return formatter("###,##0.", value)
        case "N1":
            return formatter("###,##0.0", value)
        case "N2":
            return formatter("###,##0.00", value)
        case "P0":
            return formatter("0.%", value * 100)
        case "P1":
            return formatter("0.0%", value * 100)
        case "P2":
            return formatter("0.00%", value * 100)
    }
    return formatter(format, value)
}