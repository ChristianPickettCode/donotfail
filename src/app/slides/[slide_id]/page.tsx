import CommandBar from "@/components/commandbar";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import { Slides } from "@/components/slides";

export default function Page({ params }: any) {
    return (
        <Sidebar2>
            <Slides params={params} />
            <CommandBar />
        </Sidebar2>
    );
}
