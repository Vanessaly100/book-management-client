
import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users, MailIcon, Book, Bell } from "lucide-react";


export const navbarLinks = [
    {
        title: "Dashboard",
        icon: Home,
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "",
            },
            {
                label: "Reports",
                icon: NotepadText,
                path: "reports",
            },
        ],
    },
    {
        title: "Users",
        icon: Users,
        links: [
            {
                label: "Users",
                icon: Users,
                path: "users",
            },
            
            
            {
                label: "Authors",
                icon: UserCheck,
                path: "authors",
            },
            
           
        ],
    },
    {
        title: "Books",
        icon: Book,
        links: [
            {
                label: "Books",
                icon: Book,
                path: "bookPage",
            },
            {
                label: "Categories",
                icon: UserCheck,
                path: "categories",
            },
            {
                label: "Book Borrowed",
                icon: PackagePlus,
                path: "borrowPage",
            },
            {
                label: " Borrowed Summary",
                icon: PackagePlus,
                path: "borrowPageSum",
            },
            
            
        ],
    },
    {title: "Notifications",
        icon: Bell,
        links: [
            {
                label: "Notifications",
                icon: Bell,
                path: "notifiPage",
            },
             {
        label: "Reservation",
        icon: Bell,
        path: "reservation"
    },
        ],
    },

   
    {
        title: "Settings",
        icon: Settings,
        links: [
            {
                label: "Profile",
                icon: ShoppingBag,
                path: "adminProfile",
            },
            {
                label: "Settings",
                icon: Settings,
                path: "settings",
            },
        ],
    },
];



export const navbarLinksFrontend = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/user/dashboard",
            },
            {
                label: "Reservations",
                icon: ChartColumn,
                path: "/user/reservations",
            },
            {
                label: "Borrowed",
                icon: NotepadText,
                path: "/user/borrowed",
            },

            
            {
                label: "Notifications",
                icon: MailIcon,
                path: "/user/notifications",
            },
            {
                label: "Edit Profile",
                icon: UserCheck,
                path: "/user/edit",
            },
        ],
    },
];

