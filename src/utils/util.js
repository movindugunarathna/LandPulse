export function formatNumber(number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Regex pattern to match groups of 3 digits (except the last group)
    const pattern = /(?=(.{3})+(?!^))/g;

    // Insert spaces after every 3 digits (except the last group)
    return numberString.replace(pattern, " ");
}
