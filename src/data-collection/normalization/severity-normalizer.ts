export class SeverityNormalizer {

    static normalize(severity: string): "Low" | "Medium" | "High" | "Critical" {

        const value = severity.toLowerCase();

        if (value.includes("red") || value.includes("critical"))
            return "Critical";

        if (value.includes("orange") || value.includes("high"))
            return "High";

        if (value.includes("yellow") || value.includes("medium"))
            return "Medium";

        return "Low";
    }

}