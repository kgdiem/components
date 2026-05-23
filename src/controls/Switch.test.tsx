import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders switch with label and checked state", () => {
    const html = renderToStaticMarkup(
      <Switch checked label="Enable notifications" onChange={() => undefined} />,
    );

    expect(html).toContain('data-headlessui-state="checked"');
    expect(html).toContain(">Enable notifications<");
    expect(html).toContain("data-[checked]:bg-primary");
  });

  it("forwards id to the switch for label association", () => {
    const html = renderToStaticMarkup(
      <Switch id="field-alerts" onChange={() => undefined} />,
    );

    expect(html).toContain('id="field-alerts"');
  });

  it("renders switch with name and disabled attributes", () => {
    const html = renderToStaticMarkup(
      <Switch disabled label="Read only" name="alerts" onChange={() => undefined} />,
    );

    expect(html).toContain('role="switch"');
    expect(html).toContain("disabled");
  });
});
