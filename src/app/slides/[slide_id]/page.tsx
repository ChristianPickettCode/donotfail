import CommandBar from "@/components/commandbar";
import NavSmallMenu from "@/components/NavSmallMenu";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import { Slides } from "@/components/slides";

export default function Page({ params }: any) {
    return (
        <>
            {/* <NavSmallMenu /> */}
            <Slides params={params} />
            <CommandBar />
        </>
    );
}
