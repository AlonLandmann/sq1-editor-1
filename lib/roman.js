export function intToRoman(n) {
    const romanNumerals = [
        ["m", 1000],
        ["cm", 900],
        ["d", 500],
        ["cd", 400],
        ["c", 100],
        ["xc", 90],
        ["l", 50],
        ["xl", 40],
        ["x", 10],
        ["ix", 9],
        ["v", 5],
        ["iv", 4],
        ["i", 1],
    ];

    let result = "";

    for (const [roman, value] of romanNumerals) {
        while (n >= value) {
            result += roman;
            n -= value;
        }
    }

    return result;
};