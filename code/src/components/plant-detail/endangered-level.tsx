import {EndangeredLevel} from "@/model/endangered-level.model";

export function EndangeredLevelComponent({ endangeredLevel }: { endangeredLevel: EndangeredLevel }) {
    return (
        <div>{endangeredLevel.title}</div>
    )
}