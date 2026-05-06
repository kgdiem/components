import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { RadioGroup } from "./RadioGroup";

const OPTIONS = [
  {
    value: "email",
    label: "Email",
    description: "Receive updates by email",
  },
  {
    value: "sms",
    label: "SMS",
    description: "Receive updates by text",
    disabled: true,
  },
];

describe("RadioGroup", () => {
  it("renders options with selected value", () => {
    const html = renderToStaticMarkup(
      <RadioGroup options={OPTIONS} value="email" onChange={() => undefined} />,
    );

    expect(html).toContain(">Email<");
    expect(html).toContain(">Receive updates by email<");
    expect(html).toContain('data-headlessui-state="checked"');
  });

  it("renders disabled option attributes", () => {
    const html = renderToStaticMarkup(
      <RadioGroup options={OPTIONS} value="email" onChange={() => undefined} />,
    );

    expect(html).toContain(">SMS<");
    expect(html).toContain(">Receive updates by text<");
    expect(html).toContain("disabled");
  });
});
