import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarSection,
} from "./Sidebar";

describe("Sidebar", () => {
  it("renders children in shell sections", () => {
    const html = renderToStaticMarkup(
      <Sidebar>
        <SidebarHeader>Logo</SidebarHeader>
        <SidebarNav>
          <SidebarSection>
            <SidebarItem>Dashboard</SidebarItem>
          </SidebarSection>
        </SidebarNav>
        <SidebarFooter>Profile</SidebarFooter>
      </Sidebar>,
    );

    expect(html).toContain("Logo");
    expect(html).toContain("Dashboard");
    expect(html).toContain("Profile");
    expect(html).toContain("<nav");
  });

  it("merges custom className values on shell and item", () => {
    const html = renderToStaticMarkup(
      <Sidebar className="w-64">
        <SidebarItem className="custom-item">Item</SidebarItem>
      </Sidebar>,
    );

    expect(html).toContain("w-64");
    expect(html).toContain("custom-item");
  });

  it("applies active styles on SidebarItem", () => {
    const html = renderToStaticMarkup(
      <SidebarItem active>Active item</SidebarItem>,
    );

    expect(html).toContain("bg-black/10");
    expect(html).toContain("text-textInverse");
  });

  it("renders inactive item styles by default", () => {
    const html = renderToStaticMarkup(<SidebarItem>Inactive item</SidebarItem>);

    expect(html).toContain("text-textInverse/80");
    expect(html).toContain("hover:bg-black/10");
    expect(html).not.toMatch(/transition-colors bg-black\/10 text-textInverse/);
  });

  it("supports polymorphic as rendering with passed-through props", () => {
    const html = renderToStaticMarkup(
      <SidebarItem as="a" href="/dashboard">
        Link item
      </SidebarItem>,
    );

    expect(html).toContain('href="/dashboard"');
    expect(html).toContain("<a ");
    expect(html).toContain("Link item");
  });

  it("uses Box-backed default rendering for SidebarItem", () => {
    const html = renderToStaticMarkup(<SidebarItem>Default item</SidebarItem>);

    expect(html).toMatch(/<div[^>]*>Default item<\/div>/);
  });
});
