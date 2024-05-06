import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function Sidebar({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <aside className="sticky top-0 h-screen min-w-56 max-w-56 bg-gray-100 text-gray-800 p-4">
                <div className="flex items-center mb-4 space-x-1">
                    <img
                        alt="Company Logo"
                        height="30"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "30/30",
                            objectFit: "cover",
                        }}
                        width="30"
                    />
                    <h1 className="text-lg font-medium">...</h1>
                </div>
                <nav className="space-y-2">
                    {/* <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <HomeIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Home</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-800">
                        <WalletIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Transactions</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <UsersIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Accounts</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <TicketIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Tax</span>
                    </button> */}
                    <Accordion type="single" collapsible>
                        {
                            Array.from({ length: 4 }).map((_, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                                            <HomeIcon className="w-4 h-4" />
                                            <span className="text-sm font-medium">Home</span>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <span className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 pr-2 pl-6 rounded-lg text-gray-500">
                                            <WalletIcon className="w-4 h-4" />
                                            <span className="text-sm font-medium">Transactions</span>
                                        </span>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                        {/* <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem> */}
                    </Accordion>

                </nav>
            </aside>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    )
}

function HomeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function TicketIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
        </svg>
    )
}


function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}


function WalletIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>
    )
}
