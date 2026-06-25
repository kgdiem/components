import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";
import {
  DialogBackdrop,
  DialogBody,
  DialogContainer,
  DialogDescription,
  DialogFooter,
  DialogIcon,
  DialogPanel,
  DialogRoot,
  DialogTitle,
} from "./Dialog";
import {
  OverlayBackdrop,
  OverlayContainer,
  OverlayContent,
  OverlayRoot,
} from "./Overlay";

describe("SSR primitive harness", () => {
  it("renders dialog primitives on the server", () => {
    expect(() =>
      renderToStaticMarkup(
        <DialogRoot open onClose={() => undefined}>
          <DialogBackdrop />
          <DialogContainer>
            <DialogPanel size="sm">
              <DialogBody>
                <DialogIcon variant="info">
                  <span>i</span>
                </DialogIcon>
                <DialogTitle>Server-safe dialog</DialogTitle>
                <DialogDescription>Dialog primitives render during SSR.</DialogDescription>
              </DialogBody>
              <DialogFooter layout="single">
                <Button>Close</Button>
              </DialogFooter>
            </DialogPanel>
          </DialogContainer>
        </DialogRoot>,
      ),
    ).not.toThrow();
  });

  it("renders overlay primitives on the server", () => {
    expect(() =>
      renderToStaticMarkup(
        <OverlayRoot open onClose={() => undefined}>
          <OverlayBackdrop />
          <OverlayContainer>
            <OverlayContent>Overlay SSR</OverlayContent>
          </OverlayContainer>
        </OverlayRoot>,
      ),
    ).not.toThrow();
  });
});
