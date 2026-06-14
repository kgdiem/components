// @vitest-environment happy-dom

import { Home } from "lucide-react";
import { act, type ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";

import sidebarStoriesMeta from "../stories/Sidebar.stories";
import {
  Sidebar,
  SidebarDrawer,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarMobileButton,
  SidebarNav,
  SidebarSection,
} from "./Sidebar";

function renderDom(ui: ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(ui);
  });

  return {
    cleanup: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
      document.body.innerHTML = "";
    },
    container,
    html: document.body.innerHTML,
  };
}

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
      </Sidebar>
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
      </Sidebar>
    );

    expect(html).toContain("w-64");
    expect(html).toContain("custom-item");
  });

  it("applies active styles on SidebarItem", () => {
    const html = renderToStaticMarkup(
      <SidebarItem active>Active item</SidebarItem>
    );

    expect(html).toContain("bg-primarySubtle");
    expect(html).toContain("text-primary");
  });

  it("renders inactive item styles by default", () => {
    const html = renderToStaticMarkup(<SidebarItem>Inactive item</SidebarItem>);

    expect(html).toContain("text-textMuted");
    expect(html).toContain("hover:bg-surfaceMuted");
    expect(html).not.toMatch(/bg-primarySubtle text-primary/);
  });

  it("supports polymorphic as rendering with passed-through props", () => {
    const html = renderToStaticMarkup(
      <SidebarItem as="a" href="/dashboard">
        Link item
      </SidebarItem>
    );

    expect(html).toContain('href="/dashboard"');
    expect(html).toContain("<a ");
    expect(html).toContain("Link item");
  });

  it("uses Box-backed default rendering for SidebarItem", () => {
    const html = renderToStaticMarkup(<SidebarItem>Default item</SidebarItem>);

    expect(html).toMatch(/<div[^>]*>Default item<\/div>/);
  });

  it("marks the shell as collapsed when a collapsible sidebar is closed", () => {
    const html = renderToStaticMarkup(
      <Sidebar collapsible collapsed>
        <SidebarNav>
          <SidebarSection label="Main">
            <SidebarItem
              as="a"
              href="/dashboard"
              icon={Home}
              label="Dashboard"
            />
          </SidebarSection>
        </SidebarNav>
      </Sidebar>
    );

    expect(html).toContain('data-collapsible="true"');
    expect(html).toContain('data-collapsed="true"');
    expect(html).toContain('title="Dashboard"');
    expect(html).toContain("w-20");
    expect(html).not.toContain(" grow ");
  });

  it("uses the expanded width when a collapsible sidebar is open", () => {
    const html = renderToStaticMarkup(
      <Sidebar collapsible>
        <SidebarNav>
          <SidebarSection>
            <SidebarItem
              as="a"
              href="/dashboard"
              icon={Home}
              label="Dashboard"
            />
          </SidebarSection>
        </SidebarNav>
      </Sidebar>
    );

    expect(html).toContain("w-72");
    expect(html).not.toContain(" grow ");
  });

  it("renders a standard icon and label layout when label props are provided", () => {
    const html = renderToStaticMarkup(
      <SidebarItem
        as="a"
        href="/dashboard"
        badge="3"
        icon={Home}
        label="Dashboard"
      />
    );

    expect(html).toContain("Dashboard");
    expect(html).toContain(">3<");
    expect(html).toContain('aria-hidden="true"');
  });

  it("centers custom item content when a collapsible sidebar is collapsed", () => {
    const html = renderToStaticMarkup(
      <Sidebar collapsible collapsed>
        <SidebarNav>
          <SidebarSection>
            <SidebarItem as="a" href="/teams/design">
              <span>Design</span>
            </SidebarItem>
          </SidebarSection>
        </SidebarNav>
      </Sidebar>
    );

    expect(html).toContain(
      "group-data-[collapsed=true]/sidebar:justify-center"
    );
  });
});

describe("Sidebar mobile navigation", () => {
  it("renders a drawer panel for mobile navigation", () => {
    const result = renderDom(
      <SidebarDrawer open onClose={() => undefined}>
        <Sidebar className="h-full">
          <SidebarHeader>Logo</SidebarHeader>
          <SidebarNav>
            <SidebarSection>
              <SidebarItem
                as="a"
                href="/dashboard"
                icon={Home}
                label="Dashboard"
              />
            </SidebarSection>
          </SidebarNav>
        </Sidebar>
      </SidebarDrawer>
    );

    expect(result.html).toContain("Logo");
    expect(result.html).toContain("Dashboard");
    expect(result.html).toContain("max-w-xs");
    expect(result.html).toContain("justify-start");
    result.cleanup();
  });

  it("supports a contained drawer layout for embedded previews", () => {
    const result = renderDom(
      <div className="relative h-96 w-80">
        <SidebarDrawer contained open onClose={() => undefined}>
          <Sidebar className="h-full w-72">
            <SidebarHeader>Logo</SidebarHeader>
          </Sidebar>
        </SidebarDrawer>
      </div>
    );

    expect(result.html).toContain("absolute inset-0");
    expect(result.html).not.toContain("fixed inset-0 z-10 flex justify-start");
    result.cleanup();
  });

  it("anchors the contained drawer root to its preview frame", () => {
    const result = renderDom(
      <div className="relative h-96 w-80">
        <SidebarDrawer contained open onClose={() => undefined}>
          <Sidebar className="h-full w-72">
            <SidebarHeader>Logo</SidebarHeader>
          </Sidebar>
        </SidebarDrawer>
      </div>
    );

    const dialog = document.body.querySelector('[role="dialog"]');

    expect(dialog?.className).toContain("absolute");
    expect(dialog?.className).toContain("inset-0");
    expect(dialog?.className).toContain("z-50");
    result.cleanup();
  });

  it("renders a button with the expected mobile navigation label", () => {
    const html = renderToStaticMarkup(
      <SidebarMobileButton aria-label="Open navigation" />
    );

    expect(html).toContain('aria-label="Open navigation"');
    expect(html).toContain("<button");
  });
});

describe("Sidebar Storybook docs", () => {
  it("uses the base Sidebar component and component docs description", () => {
    expect(sidebarStoriesMeta.component).toBe(Sidebar);
    expect(sidebarStoriesMeta.parameters?.docs?.description?.component).toContain(
      "## What is it?",
    );
  });
});
