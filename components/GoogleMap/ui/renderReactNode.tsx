import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export interface renderReactNodeProps {
    children: ReactNode, 
    className?: string
}

const renderReactNode = ({ children, className } : renderReactNodeProps ) => {
    const content = document.createElement("div");
    content.className = className;
    createRoot(content as Element).render(children);
    return (content);
}

export default renderReactNode
