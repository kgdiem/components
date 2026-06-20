import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("renders a password field with a visibility toggle", () => {
    const html = renderToStaticMarkup(
      <PasswordInput name="password" placeholder="Enter password" />,
    );

    expect(html).toContain('type="password"');
    expect(html).toContain('name="password"');
    expect(html).toContain('aria-label="Show password"');
  });

  it("renders the visibility toggle inside the field as a postfix", () => {
    const html = renderToStaticMarkup(
      <PasswordInput name="password" placeholder="Enter password" />,
    );

    expect(html).toContain("focus-within:ring-[3px]");
    expect(html).toContain('aria-label="Show password"');
    expect(html).not.toContain("pr-9");
    expect(html.split("<input").length - 1).toBe(1);
    expect(html.indexOf("<input")).toBeLessThan(html.indexOf("<button"));
  });

  it("merges custom className and html attributes", () => {
    const html = renderToStaticMarkup(
      <PasswordInput autoComplete="current-password" className="max-w-sm" id="password-id" />,
    );

    expect(html).toContain("max-w-sm");
    expect(html).toContain('id="password-id"');
    expect(html).toContain('autoComplete="current-password"');
  });
});
