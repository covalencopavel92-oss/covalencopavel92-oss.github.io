## 2024-04-30 - Search Loading Indicator
**Learning:** Adding immediate visual feedback to debounced input fields (like the sidebar search) drastically improves perceived performance and clarifies to the user that their input is being processed, rather than ignored. The sidebar search input lacked any loading state while waiting for the 300ms debounce to resolve.
**Action:** Always include a visual loading indicator (e.g., an inline SVG spinner) for debounced or asynchronous input operations. Toggle the indicator on during the `input` event and turn it off when the async operation or debounce timer completes.

## 2024-05-02 - Quiz Progress Indicator & aria-hidden
**Learning:** Adding a visual progress indicator to a multi-step component (like the Quiz) significantly improves the user experience by reducing uncertainty and potential drop-off. However, applying `aria-hidden="true"` to a wrapper container entirely hides its contents from screen readers, completely negating the benefits of any semantic `role="progressbar"` or `aria-valuenow` attributes placed on child elements.
**Action:** Ensure elements intended to convey state (like a progress bar) are not wrapped in containers with `aria-hidden="true"`. Also, provide `aria-live="polite"` on text nodes that update dynamically, ensuring screen readers announce the changes (e.g., "Question 2 of 3").

## 2024-11-20 - [A11y] Do not remove aria-expanded from hidden native checkboxes
**Learning:** While native checkboxes inherently handle their checked/unchecked state for screen readers, if that checkbox is visually hidden (e.g. `.sr-only`) and specifically controls the visibility of another element (like a mobile menu), the W3C WAI-ARIA 1.2 Specification dictates that it SHOULD have the `aria-expanded` attribute applied to communicate the state of the controlled region to assistive technologies.
**Action:** Do not remove `aria-expanded` from native checkboxes that act as CSS-only toggles for revealing/hiding content.
