(() => {
  "use strict";

  const CONTINUE_BUTTON = '[data-uia="1pdc-continue-button"]';
  const MODAL_BACKDROP = '[data-uia="clcsModal+background"]';
  const APP_ROOT = "#appMountPoint";

  let scheduled = false;

  function unlockPage() {
    const body = document.body;
    const root = document.querySelector(APP_ROOT);

    if (body) {
      body.style.removeProperty("overflow");
      body.style.removeProperty("padding-right");
      body.removeAttribute("data-scroll-locked");
    }

    document.documentElement.style.removeProperty("overflow");
    document.documentElement.removeAttribute("data-scroll-locked");

    if (root) {
      root.removeAttribute("inert");

      if (root.getAttribute("aria-hidden") === "true") {
        root.removeAttribute("aria-hidden");
      }
    }
  }

  function skipPrompt() {
    scheduled = false;

    const continueButton = document.querySelector(CONTINUE_BUTTON);
    if (!continueButton) {
      return;
    }

    const backdrop = continueButton.closest(MODAL_BACKDROP);
    const dialog = continueButton.closest('[role="dialog"], [data-uia="clcsModal"]');
    const blocker = backdrop || dialog;

    if (!blocker) {
      return;
    }

    // Do not remove this node. Netflix owns it through React and throws an
    // NSES-UHX error if reconciliation later tries to remove it again.
    // content.css hides the blocker without changing the managed DOM tree.
    unlockPage();
  }

  function scheduleSkip() {
    if (scheduled) {
      return;
    }

    scheduled = true;
    queueMicrotask(skipPrompt);
  }

  const observer = new MutationObserver(scheduleSkip);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  scheduleSkip();
})();
