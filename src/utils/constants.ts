import {
  CheckSquare2,
  ClipboardCheck,
  Timer,
  Undo2,
  XCircle,
  Banknote,
  LayoutDashboard,
  LucideIcon,
  Palmtree,
  Plane,
  Settings,
  MapPinned,
  Building,
} from "lucide-react";

type LinkListType = {
  title: string;
  to: string;
  end: boolean | undefined;
  icon: LucideIcon;
}[];

export const statuses = [
  {
    value: "approved",
    label: "Approved",
    icon: CheckSquare2,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Timer,
  },
  {
    value: "refund",
    label: "Refund",
    icon: Undo2,
  },
  {
    value: "refunded",
    label: "Refunded",
    icon: ClipboardCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const LinkList: LinkListType = [
  {
    title: "Dashboard",
    to: "/admin",
    end: true,
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    to: "transactions",
    end: false,
    icon: Banknote,
  },
  {
    title: "Tours",
    to: "tours",
    end: false,
    icon: Palmtree,
  },
  {
    title: "Settings",
    to: "settings",
    end: false,
    icon: Settings,
  },
];

export const MoreLink: LinkListType = [
  {
    title: "Airlines",
    to: "airlines",
    end: false,
    icon: Plane,
  },
  {
    title: "Locations",
    to: "locations",
    end: false,
    icon: MapPinned,
  },
  {
    title: "Facilities",
    to: "facilities",
    end: false,
    icon: Building,
  },
];
