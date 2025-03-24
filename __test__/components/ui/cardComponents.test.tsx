import React from "react";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

describe("Card Components", () => {
  test("renders a card with content", () => {
    render(
      <div data-testid="card-wrapper">
        <Card>Card Content</Card>
      </div>,
    );
    const cardWrapper = screen.getByTestId("card-wrapper");
    expect(cardWrapper).toBeInTheDocument();
    expect(cardWrapper).toHaveTextContent("Card Content");
  });

  test("applies custom className to card", () => {
    render(
      <div data-testid="card-wrapper">
        <Card className="custom-class">Card Content</Card>
      </div>,
    );
    const cardWrapper = screen.getByTestId("card-wrapper");
    const cardDiv = cardWrapper.firstChild;
    expect(cardDiv).toHaveClass("custom-class");
  });

  test("renders a card header", () => {
    render(
      <div data-testid="header-wrapper">
        <CardHeader>Header Content</CardHeader>
      </div>,
    );
    const headerWrapper = screen.getByTestId("header-wrapper");
    expect(headerWrapper).toBeInTheDocument();
    expect(headerWrapper).toHaveTextContent("Header Content");
  });

  test("renders a card title", () => {
    render(
      <div data-testid="title-wrapper">
        <CardTitle>Title Content</CardTitle>
      </div>,
    );
    const titleWrapper = screen.getByTestId("title-wrapper");
    expect(titleWrapper).toBeInTheDocument();
    expect(titleWrapper).toHaveTextContent("Title Content");

    // Check the actual h3 element inside the wrapper
    const titleElement = titleWrapper.firstChild;
    expect(titleElement).toHaveClass("text-xl");
    expect(titleElement).toHaveClass("font-semibold");
  });

  test("renders card content", () => {
    render(
      <div data-testid="content-wrapper">
        <CardContent>Content Text</CardContent>
      </div>,
    );
    const contentWrapper = screen.getByTestId("content-wrapper");
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveTextContent("Content Text");

    // Check the actual div element inside the wrapper
    const contentElement = contentWrapper.firstChild;
    expect(contentElement).toHaveClass("px-6");
    expect(contentElement).toHaveClass("py-4");
  });

  test("card components compose together", () => {
    render(
      <div data-testid="compose-test">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card Content</CardContent>
        </Card>
      </div>,
    );

    const container = screen.getByTestId("compose-test");
    expect(container).toBeInTheDocument();

    // Check the content is correctly rendered
    expect(container).toHaveTextContent("Card Title");
    expect(container).toHaveTextContent("Card Content");

    // Verify the DOM structure
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass("rounded-lg");
    expect(cardElement).toHaveClass("border");

    // The first child of the card should be the header
    const headerElement = cardElement.firstChild as HTMLElement;
    expect(headerElement).toHaveClass("px-6");
    expect(headerElement).toHaveClass("py-4");
    expect(headerElement).toHaveClass("border-b");

    // The header should contain the title
    const titleElement = headerElement.firstChild as HTMLElement;
    expect(titleElement).toHaveClass("text-xl");
    expect(titleElement).toHaveClass("font-semibold");

    // The second child of the card should be the content
    const contentElement = cardElement.children[1] as HTMLElement;
    expect(contentElement).toHaveClass("px-6");
    expect(contentElement).toHaveClass("py-4");
  });
});
