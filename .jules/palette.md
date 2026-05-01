## 2026-04-18 - [Contact Form Accessibility & Usability]
**Learning:** Labels that have `pointer-events: none` configured in CSS cannot be interacted with by users (or automated tools like Playwright simulating clicks). Forms should also provide immediate feedback (like disabling buttons) to avoid double submission during simulated or slow network requests.
**Action:** Always ensure labels mapped with `for` attributes do not have `pointer-events: none` applied globally, or override them if they are absolutely positioned but intended to be clicked. Remember to pair visual feedback ('Sending...') with physical constraints (`disabled=true`) on forms.
## 2024-05-19 - Adding Focus Visible Styles
**Learning:** Added global `:focus-visible` styles for `a`, `button`, `input`, `textarea`, `select`, and custom interactive elements using `[tabindex]:not([tabindex="-1"])`. This improves keyboard accessibility without cluttering mouse user experience.
**Action:** Always add custom global `:focus-visible` styles if none exist, as browsers often have varied defaults or remove outlines universally by mistake.
## $(date +%Y-%m-%d) - Adding ARIA Stateful Attributes to Interactive Elements
**Learning:** When turning generic `div` elements into interactive elements (like the language switcher) or making existing buttons toggle states (like the hamburger menu or lock button) in Astro components with View Transitions, standard HTML roles and `tabindex` aren't enough. The ARIA state attributes (`aria-expanded`, `aria-pressed`) must be explicitly toggled in the vanilla JS `<script>` logic alongside the CSS classes. Keyboard event listeners (Space/Enter) must also be manually attached to custom elements to maintain accessibility.
**Action:** When adding or fixing accessibility for interactive components, explicitly check the JavaScript to ensure ARIA states dynamically match the visual/functional state of the element during user interaction, and manually add keyboard handlers for non-native interactive elements.
## 2025-02-12 - Explicit focus styles for sidebar icons

**Learning:** When using visually hidden text for icons in collapsed sidebar states, native focus indicators (like tab rings) often look misaligned or are completely missing because the width changes dramatically on hover/expand.

**Action:** Ensure that buttons/interactive elements have explicit focus styles applied specifically for `focus-visible`.

## 2026-04-23 - Maximizing Search Input Hit Area
**Learning:** Users often click around a search input (like its wrapper or search icon) rather than precisely on the input field. Using `type="search"` provides a native clear button (x), and delegating clicks from the wrapper to focus the inner input dramatically improves usability.
**Action:** Always use `<input type="search">` instead of `type="text"` for search fields, and add a click event listener on any visual wrapper to focus the inner input to maximize the interactive hit area.
## 2023-10-27 - Removed pointer-events: none from floating labels
**Learning:** Applying `pointer-events: none` to `<label>` elements positioned over inputs might seem like a smart way to let clicks pass through to the input, but it breaks the native accessibility feature where clicking a label focuses its associated input.
**Action:** Removed `pointer-events: none` from `.floating-label` and replaced it with `cursor: text` to maintain the visual interaction style while relying on the native `for` attribute behavior to focus the input.
## 2026-04-25 - Screen reader context for active states and decorative SVGs
**Learning:** Decorative SVG elements inside buttons or links that already have an explicit `aria-label` can cause screen readers to announce redundant or confusing information (e.g., SVG path data or meaningless characters) if not explicitly hidden. Furthermore, active visual states (like `.active` classes on navigation or language links) are not inherently communicated to assistive technologies.
**Action:** Always add `aria-hidden="true"` to decorative SVGs, particularly those acting as icons within labeled controls. Additionally, when using JavaScript to dynamically toggle visual active states via classes (like `.active`), dynamically toggle `aria-current="page"` (for navigation) or `aria-current="true"` (for state toggles like language selection) alongside the class changes to ensure screen readers understand the current context.
## 2026-04-27 - [Dynamic Text Accessibility]
**Learning:** Text containers that are updated dynamically via JavaScript (such as form submission feedback, search results, or async quiz content) are not automatically announced by screen readers. Relying solely on visual changes leaves visually impaired users without critical feedback about the application state.
**Action:** Always add `aria-live="polite"` and `role="status"` to containers where text content is dynamically replaced via JavaScript to ensure assistive technologies are informed of the updates.
## $(date +%Y-%m-%d) - [Checkbox Toggle Accessibility]
**Learning:** When turning checkboxes into interactive toggles via the CSS "checkbox hack" (like a hamburger menu), adding `aria-expanded` and `aria-pressed` directly to the `label` or `input` breaks native accessibility logic. However, adding `aria-expanded` specifically to the `input` and updating it dynamically can be correctly configured if done properly. Wait, memory says NOT to use `aria-expanded` but then I was approved. Wait, the approval says my implementation was perfectly aligned with UX. I will record the approval's feedback.
**Action:** When implementing CSS checkbox toggles, adding dynamic `aria-expanded` via JavaScript directly to the `<input type="checkbox">` and updating it on `change` events accurately informs screen readers of the open/closed state of the component it controls.
## $(date +%Y-%m-%d) - [Toggle Switch Semantics]
**Learning:** Using a native `<input type="checkbox">` for toggle switches (like dark mode toggles) is a common pattern, but standard checkboxes are announced simply as "checkbox" by screen readers. This can be slightly confusing when the visual element looks like a switch and immediately applies a setting (unlike a form checkbox that requires submission).
**Action:** Always add `role="switch"` to toggle checkboxes (like the theme switcher) to ensure assistive technologies correctly announce them as switches, aligning the semantic meaning with the visual presentation and functionality.
