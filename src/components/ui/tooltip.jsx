import * as React from "react";
import { motion } from "framer-motion";

const Tooltip = ({ children, content, delay = 0.5 }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 5
    });
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            transform: "translateX(-50%)"
          }}
          className="z-50 px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground shadow-md"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

export const TooltipProvider = ({ children }) => children;
export const TooltipTrigger = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const TooltipContent = ({ children }) => children;

export { Tooltip };