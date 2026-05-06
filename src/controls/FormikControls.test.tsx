import { Form, Formik } from "formik";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FormikCombobox } from "./FormikCombobox";
import { FormikInput } from "./FormikInput";
import { FormikListbox } from "./FormikListbox";
import { FormikRadioGroup } from "./FormikRadioGroup";
import { FormikSelect } from "./FormikSelect";
import { FormikSwitch } from "./FormikSwitch";
import { FormikTextarea } from "./FormikTextarea";

describe("Formik controls", () => {
  it("binds text controls and boolean controls to form fields", () => {
    const html = renderToStaticMarkup(
      <Formik
        initialValues={{
          email: "user@example.com",
          notes: "Initial note",
          enabled: true,
        }}
        onSubmit={() => undefined}
      >
        <Form>
          <FormikInput name="email" />
          <FormikTextarea name="notes" />
          <FormikSwitch name="enabled" label="Enabled" />
        </Form>
      </Formik>,
    );

    expect(html).toContain('name="email"');
    expect(html).toContain('value="user@example.com"');
    expect(html).toContain('name="notes"');
    expect(html).toContain('role="switch"');
    expect(html).toContain('data-headlessui-state="checked"');
  });

  it("binds option controls to form fields", () => {
    const html = renderToStaticMarkup(
      <Formik
        initialValues={{
          selectChoice: "a",
          listboxChoice: "b",
          comboboxChoice: "c",
          radioChoice: "d",
        }}
        onSubmit={() => undefined}
      >
        <Form>
          <FormikSelect
            name="selectChoice"
            options={[
              { value: "a", label: "Option A" },
              { value: "x", label: "Option X" },
            ]}
          />
          <FormikListbox
            name="listboxChoice"
            options={[
              { value: "b", label: "Option B" },
              { value: "y", label: "Option Y" },
            ]}
          />
          <FormikCombobox
            name="comboboxChoice"
            options={[
              { value: "c", label: "Option C" },
              { value: "z", label: "Option Z" },
            ]}
          />
          <FormikRadioGroup
            name="radioChoice"
            options={[
              { value: "d", label: "Option D" },
              { value: "w", label: "Option W" },
            ]}
          />
        </Form>
      </Formik>,
    );

    expect(html).toContain(">Option A<");
    expect(html).toContain(">Option B<");
    expect(html).toContain('name="comboboxChoice" value="c"');
    expect(html).toContain('value="d"');
  });
});
