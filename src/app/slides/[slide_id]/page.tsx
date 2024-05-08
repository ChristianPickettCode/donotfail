import CommandBar from "@/components/commandbar";
import { Sidebar } from "@/components/sidebar";
import { Slides } from "@/components/slides";

export default function Page({ params }: any) {
    return (
        <Sidebar>
            <Slides params={params} />
            <CommandBar />
        </Sidebar>
    );
}
