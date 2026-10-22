import "@testing-library/jest-dom";

// jsdom has no PointerEvent, and Base UI constructs one when a Radio is
// clicked. Tests that opt into the node environment have no window at all.
if (typeof window !== "undefined" && !window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    readonly pointerId: number;
    readonly pointerType: string;
    readonly isPrimary: boolean;

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerId = init.pointerId ?? 0;
      this.pointerType = init.pointerType ?? "mouse";
      this.isPrimary = init.isPrimary ?? true;
    }
  }
  window.PointerEvent = PointerEvent as unknown as typeof window.PointerEvent;
}
