import {
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons"


export const statuses = [
  {
    value: "diajukan",
    label: "Diajukan",
    icon: CircleIcon,
  },
  {
    value: "diproses",
    label: "Diproses",
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


