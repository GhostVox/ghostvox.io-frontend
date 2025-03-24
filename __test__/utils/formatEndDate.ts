import { formatEndDate } from "@/utils/formatEndDate";

describe("formatEndDate", () => {
  test("should format ISO date string into short date format", () => {
    const isoDate = "2023-05-15T14:30:00.000Z";
    const formattedDate = formatEndDate(isoDate);
    expect(formattedDate).toBe("May 15, 2023");
  });

  test("should handle different date formats", () => {
    const dates = [
      { input: "2023/12/25", expected: "Dec 25, 2023" },
      { input: "2023-01-01", expected: "Jan 1, 2023" },
      { input: "March 17, 2023", expected: "Mar 17, 2023" },
    ];

    dates.forEach(({ input, expected }) => {
      const formattedDate = formatEndDate(input);
      expect(formattedDate).toBe(expected);
    });
  });

  test("should handle date objects converted to strings", () => {
    const date = new Date(2023, 6, 4); // July 4, 2023
    const formattedDate = formatEndDate(date.toISOString());
    expect(formattedDate).toBe("Jul 4, 2023");
  });

  test("should handle edge cases", () => {
    // Leap year
    const leapYearDate = "2024-02-29";
    expect(formatEndDate(leapYearDate)).toBe("Feb 29, 2024");

    // Year boundaries
    const newYearsEve = "2023-12-31";
    expect(formatEndDate(newYearsEve)).toBe("Dec 31, 2023");

    const newYearsDay = "2024-01-01";
    expect(formatEndDate(newYearsDay)).toBe("Jan 1, 2024");
  });

  test("should maintain consistent output regardless of user's locale", () => {
    // Save the original method
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;

    // Mock toLocaleDateString to simulate a different locale
    Date.prototype.toLocaleDateString = function (
      this: Date,
      _locales?: string | string[] | undefined,
      options?: Intl.DateTimeFormatOptions | undefined,
    ): string {
      // Force 'en-GB' format (day/month/year) regardless of what's passed in
      return originalToLocaleDateString.call(this, "en-GB", options);
    };

    try {
      // Even with 'en-GB' behavior, our function should enforce 'en-US'
      const date = "2023-05-15";
      const formattedDate = formatEndDate(date);

      // Should still match our expected 'en-US' format
      expect(formattedDate).toBe("May 15, 2023");
    } finally {
      // Restore the original method
      Date.prototype.toLocaleDateString = originalToLocaleDateString;
    }
  });
});
