import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
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

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";


export function Navigation() {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" className="md:hidden">
                    <HamburgerMenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="font-[GeistBold]">Geniusz</SheetTitle>
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
