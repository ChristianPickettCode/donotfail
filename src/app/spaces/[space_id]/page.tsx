"use client"
import { Gallery } from "@/components/gallery";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import { SpaceSlides } from "@/components/spaceSlides";
import Spaces from "@/components/spaces";

type Props = {
    params: any
}

export default function Page(props: Props) {
    console.log(props)
    return (
        // <Sidebar2>
        // {/* <Gallery /> */ }
        <>
            <SpaceSlides spaceId={props.params.space_id} />
        </>
        // </Sidebar2>

    );
}
