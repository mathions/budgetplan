import {
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons"


export const statuses = [
  {
    value: "belum diajukan",
    label: "Belum Diajukan",
    icon: CircleIcon,
  },
  {
    value: "diajukan",
    label: "Diajukan",
    icon: ClockIcon,
  },
  {
    value: "diterima",
    label: "Diterima",
    icon: CheckCircledIcon,
  },
  {
    value: "ditolak",
    label: "Ditolak",
    icon: CrossCircledIcon,
  },
]


