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
        <Sidebar3
            navLinks={[
                { title: "Dashboard", label: "", icon: Archive, url: "/spaces" },
                { title: "Spaces", label: "", icon: ArchiveX, url: "/spaces" },
                { title: "Feature request", label: "", icon: MessagesSquare, url: "https://tally.so/r/mR4vPP" },
                { title: "Sign Out", label: "", icon: Users2, url: "/sign-out" },
            ]}
        >
            <SpaceSlides spaceId={props.params.space_id} />
        </Sidebar3>
    );
}
