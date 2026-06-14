import { Building2, CreditCard, User, Users } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Tab, Tabs } from "./Tabs";

const renderTabs = () =>
  renderToStaticMarkup(
    <Tabs aria-label="Settings">
      <Tab label="My Account" icon={User}>
        <a href="/account">My Account</a>
      </Tab>
      <Tab label="Company" icon={Building2}>
        <a href="/company">Company</a>
      </Tab>
      <Tab label="Team Members" current icon={Users}>
        <a href="/team">Team Members</a>
      </Tab>
      <Tab label="Billing" icon={CreditCard} className="custom-tab">
        <a href="/billing">Billing</a>
      </Tab>
    </Tabs>,
  );

describe("Tabs", () => {
  it("renders desktop nav with aria-label", () => {
    const html = renderTabs();

    expect(html).toContain('aria-label="Settings"');
    expect(html).toContain(">My Account<");
    expect(html).toContain(">Team Members<");
  });

  it("marks the active tab with aria-current and active classes", () => {
    const html = renderTabs();

    expect(html).toContain('aria-current="page"');
    expect(html).toContain("border-primary");
    expect(html).toContain("text-text");
    expect(html).toContain("font-semibold");
  });

  it("renders mobile select with all labels and current default", () => {
    const html = renderTabs();

    expect(html).toContain('aria-label="Select a tab"');
    expect(html).toContain("<option");
    expect(html).toContain(">My Account<");
    expect(html).toContain(">Company<");
    expect(html).toContain(">Team Members<");
    expect(html).toContain(">Billing<");
    expect(html).toContain('value="Team Members"');
  });

  it("renders icons when provided", () => {
    const html = renderTabs();

    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain("lucide-user");
  });

  it("merges custom className onto tab child", () => {
    const html = renderTabs();

    expect(html).toContain("custom-tab");
  });

  it("uses custom mobile aria-label when provided", () => {
    const html = renderToStaticMarkup(
      <Tabs mobileAriaLabel="Choose section">
        <Tab label="Overview" current>
          <a href="/overview">Overview</a>
        </Tab>
      </Tabs>,
    );

    expect(html).toContain('aria-label="Choose section"');
  });
});
