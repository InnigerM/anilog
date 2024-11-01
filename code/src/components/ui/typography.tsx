import {PropsWithChildren} from "react";

export function H1({children}: PropsWithChildren) {
    return <h1 className='text-2xl mb-2'>{children}</h1>
}

export function H2({children}: PropsWithChildren) {
    return <h2 className='text-xl mb-2'>{children}</h2>
}