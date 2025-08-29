// Keyboard utility functions for common interactions

export const handleEnterOrSpace = (event: React.KeyboardEvent, callback: () => void) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

export const handleEnter = (event: React.KeyboardEvent, callback: () => void) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    callback();
  }
};

export const handleEscape = (event: React.KeyboardEvent, callback: () => void) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

// For document-level escape handling (used in modals)
export const handleDocumentEscape = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === 'Escape') {
    callback();
  }
};
