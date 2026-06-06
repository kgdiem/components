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
    expect(html).toContain("pr-9");
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
