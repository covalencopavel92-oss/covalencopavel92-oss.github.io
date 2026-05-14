## 2024-04-30 - Search Loading Indicator
**Learning:** Adding immediate visual feedback to debounced input fields (like the sidebar search) drastically improves perceived performance and clarifies to the user that their input is being processed, rather than ignored. The sidebar search input lacked any loading state while waiting for the 300ms debounce to resolve.
**Action:** Always include a visual loading indicator (e.g., an inline SVG spinner) for debounced or asynchronous input operations. Toggle the indicator on during the `input` event and turn it off when the async operation or debounce timer completes.

## 2024-05-02 - Quiz Progress Indicator & aria-hidden
**Learning:** Adding a visual progress indicator to a multi-step component (like the Quiz) significantly improves the user experience by reducing uncertainty and potential drop-off. However, applying `aria-hidden="true"` to a wrapper container entirely hides its contents from screen readers, completely negating the benefits of any semantic `role="progressbar"` or `aria-valuenow` attributes placed on child elements.
**Action:** Ensure elements intended to convey state (like a progress bar) are not wrapped in containers with `aria-hidden="true"`. Also, provide `aria-live="polite"` on text nodes that update dynamically, ensuring screen readers announce the changes (e.g., "Question 2 of 3").

## 2024-05-10 - Async Form Submission Loading States
**Learning:** Replacing the `innerText` of a submit button (e.g., changing "Send" to "Sending...") during an async operation breaks internationalization (as the hardcoded string ignores translation keys) and can cause layout jitter if the new text has a different width.
**Action:** Provide immediate visual feedback for async form submissions by adding an inline loading indicator (like an SVG spinner) directly into the submit button alongside the text. Disable the button while the request processes, but do not replace the button's text content. Ensure form event listeners in Astro are wrapped inside `document.addEventListener('astro:page-load', () => { ... })` to persist across View Transitions.

## 2024-05-14 - Keyboard Accessibility in Custom Search
**Learning:** Custom search components often lack built-in keyboard shortcuts to clear inputs or dismiss results, forcing users to reach for the mouse. Implementing a `keydown` listener specifically for the "Escape" key significantly improves keyboard accessibility.
**Action:** When implementing custom search components, always add an "Escape" key listener that clears the input value and resets any related UI states (e.g., hiding the results container and resetting icons).
