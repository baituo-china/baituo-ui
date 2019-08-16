import { ReactNode } from 'react';
export default function formatReactTemplate(template: string, map: {
    [key: string]: ReactNode;
}): ReactNode;
