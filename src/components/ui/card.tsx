import React from "react";


/** * @interface CardProps
 */
interface CardProps {
  /** The content to be displayed inside the card. */
  children: React.ReactNode;
  /** Optional additional CSS classes for styling. */
  className?: string;
}

/**
 * Card component for displaying content in a styled card layout.
 *
 * @param children - The content to be displayed inside the card.
 * @param className - Optional additional CSS classes for styling.
 *
 * Example usage:
 * ```tsx
 * <Card className="max-w-md">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     This is the content of the card.
 *   </CardContent>
 * </Card>
 * ```
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * CardHeader component for displaying the header section of a card.
 *
 * @param children - The content to be displayed in the header.
 * @param className - Optional additional CSS classes for styling.
 *
 * Example usage:
 * ```tsx
 * <CardHeader className="bg-gray-100">
 *   <CardTitle>My Card Title</CardTitle>
 * </CardHeader>
 * ```
 */
export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`px-6 py-4 border-b dark:border-gray-700 ${className}`}>{children}</div>;
}

/**
 *@interface CardTitleProps
 */
interface CardTitleProps {
  /** The content to be displayed as the title. */
  children: React.ReactNode;

  /** Optional additional CSS classes for styling. */
  className?: string;
}

/**
 * CardTitle component for displaying the title of a card.
 *
  * @param children - The content to be displayed as the title.
  * @param className - Optional additional CSS classes for styling.

* Example usage:
* ```tsx
* <CardTitle className="text-2xl">My Card Title</CardTitle>
* ``` 
  */
export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>;
}

/** * @interface CardContentProps
 */
interface CardContentProps {
  /** The content to be displayed inside the card content area. */
  children: React.ReactNode;
  /** Optional additional CSS classes for styling. */
  className?: string;
}

/**
 * CardContent component for displaying the main content area of a card.
 *
 * @param children - The content to be displayed inside the card content area.
 * @param className - Optional additional CSS classes for styling.
 *
 * Example usage:
 * ```tsx
 * <CardContent className="p-4">
 *   This is the main content of the card.
 * </CardContent>
 * ```
 */
export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
