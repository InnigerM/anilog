import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type WithClassName = {
    className?: string;
};

export function H1({ children, className }: PropsWithChildren & WithClassName) {
    return <h1 className={clsx('text-2xl mb-2', className)}>{children}</h1>;
}

export function H2({ children, className }: PropsWithChildren & WithClassName) {
    return <h2 className={clsx('text-xl mb-2', className)}>{children}</h2>;
}

export function Body({
    children,
    className,
}: PropsWithChildren & WithClassName) {
    return <p className={clsx('', className)}>{children}</p>;
}
