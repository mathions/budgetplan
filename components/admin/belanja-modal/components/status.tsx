import {
  CheckCircledIcon,
  CircleIcon,
  ClockIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons"


export const statuses = [
  {
    value: "Belum Diajukan",
    label: "Belum Diajukan",
    icon: CircleIcon,
    classname: "mr-2 h-4 w-4 text-[#FF9F43]",
  },
  {
    value: "Diajukan",
    label: "Diajukan",
    icon: ClockIcon,
    classname: "mr-2 h-4 w-4 text-[#28C76F]",
  },
  {
    value: "Diterima",
    label: "Diterima",
    icon: CheckCircledIcon,
    classname: "mr-2 h-4 w-4 text-[#00CFE8]",
  },
  {
    value: "Ditolak",
    label: "Ditolak",
    icon: CrossCircledIcon,
    classname: "mr-2 h-4 w-4 text-[#EA5455]",
  },
]


