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
    class: "flex items-center w-fit h-6 rounded-full px-2 bg-status1 text-[#FF7F05]",
    classname: "mr-1 h-4 w-4",
  },
  {
    value: "Diajukan",
    label: "Diajukan",
    icon: ClockIcon,
    class: "flex items-center w-fit h-6 rounded-full px-2 bg-status2 text-[#28C76F]",
    classname: "mr-1 h-4 w-4 ",
  },
  {
    value: "Ditolak",
    label: "Ditolak",
    icon: CrossCircledIcon,
    class: "flex items-center w-fit h-6 rounded-full px-2 bg-status3 text-[#EA5455]",
    classname: "mr-1 h-4 w-4 ",
  },
  {
    value: "Diterima",
    label: "Diterima",
    icon: CheckCircledIcon,
    class: "flex items-center w-fit h-6 rounded-full px-2 bg-status4 text-[#00BFD6]",
    classname: "mr-1 h-4 w-4 ",
  },
  {
    value: "Selesai",
    label: "Selesai",
    icon: CheckCircledIcon,
    class: "flex items-center w-fit h-6 rounded-full px-2 bg-status5 text-[#009BE8]",
    classname: "mr-1 h-4 w-4 ",
  },
]


