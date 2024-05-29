import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";


export function Navigation() {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden">
                <img src="hamburger_menu.svg"></img>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div className="flex items-center justify-center gap-2">
                        <SheetTitle className="font-[GeistBold]">Geniusz</SheetTitle>
                        <Badge>Beta</Badge>
                    </div>

                </SheetHeader>
                <nav className="flex flex-col justify-center pt-4">
                    <Button variant="link">About</Button>
                    <Button variant="link">How to play</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="link">Leaderboard</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Leaderboard coming soon</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This feature is not available at the moment. Check back soon.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </nav>
            </SheetContent>
        </Sheet>

    )
}
