// @vitest-environment happy-dom

import { Form, Formik, useFormikContext } from "formik";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";

import { FormikInput } from "./FormikInput";

type FormValues = {
  email: string;
};

function EmailValue() {
  const { values } = useFormikContext<FormValues>();

  return <output data-testid="email-value">{values.email}</output>;
}

describe("FormikInput", () => {
  let container: HTMLDivElement;
  let root: Root;

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders a clear button when clearable and the field has a value", () => {
    container = document.createElement("div");
    root = createRoot(container);

    act(() => {
      root.render(
        <Formik initialValues={{ email: "user@example.com" }} onSubmit={() => undefined}>
          <Form>
            <FormikInput clearable name="email" />
          </Form>
        </Formik>,
      );
    });

    expect(container.querySelector('[aria-label="Clear"]')).not.toBeNull();
  });

  it("clears the form field when the clear button is clicked", () => {
    container = document.createElement("div");
    root = createRoot(container);

    act(() => {
      root.render(
        <Formik initialValues={{ email: "user@example.com" }} onSubmit={() => undefined}>
          <Form>
            <FormikInput clearable name="email" />
            <EmailValue />
          </Form>
        </Formik>,
      );
    });

    const clearButton = container.querySelector('[aria-label="Clear"]');

    expect(clearButton).not.toBeNull();

    act(() => {
      clearButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.querySelector('[data-testid="email-value"]')?.textContent).toBe("");
    expect((container.querySelector('input[name="email"]') as HTMLInputElement).value).toBe("");
  });
});
