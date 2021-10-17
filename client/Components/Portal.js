import React from "react";
import ReactDOM from "react-dom";

// get parent and className props as well as the children
export default function Portal({ children, parent, className }) {
  // Create div to contain everything
  const el = React.useMemo(() => document.createElement("div"), []);
  // on mount function
  React.useEffect(() => {
    // work out target in the DOM based on parent prop
    const target = parent && parent.appendChild ? parent : document.body;
    // Default classes
    const classList = ["portal-container"];
    // If className prop is present add each class the classList
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    // Append element to dom
    target.appendChild(el);
    // On unmount function
    return () => {
      // Remove element from dom
      target.removeChild(el);
    };
  }, [el, parent, className]);
  // return the createPortal function
  return ReactDOM.createPortal(children, el);
}
