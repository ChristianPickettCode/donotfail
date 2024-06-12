"use client"
import { SpaceSlides } from "@/components/spaceSlides";
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";

type Props = {
    params: any
}

export default function Page(props: Props) {
    console.log(props)
    return (
        <Sidebar3>
            <SpaceSlides spaceId={props.params.space_id} />
        </Sidebar3>
    );
}
