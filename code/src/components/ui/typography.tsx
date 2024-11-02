import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type WithClassName = {
    className?: string;
};

export function H1({ children }: PropsWithChildren) {
    return <h1 className="text-2xl mb-2">{children}</h1>;
}

export function H2({ children }: PropsWithChildren) {
    return <h2 className="text-xl mb-2">{children}</h2>;
}

export function Body({
    children,
    className,
}: PropsWithChildren & WithClassName) {
    return <p className={clsx('', className)}>{children}</p>;
}
