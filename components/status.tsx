import { InfoCircle, CloseCircle, Clock, TickCircle } from "iconsax-react"

export const statuses = [
  {
    value: "Belum Diajukan",
    label: "Belum Diajukan",
    icon: InfoCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-amber/5 border border-amber/20 text-amber",
    classname: "h-4 w-4",
  },
  {
    value: "Diajukan",
    label: "Diajukan",
    icon: Clock,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-green/5 border border-green/20 text-green",
    classname: "h-4 w-4 ",
  },
  {
    value: "Butuh Revisi",
    label: "Butuh Revisi",
    icon: InfoCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-amber/5 border border-amber/20 text-amber",
    classname: "h-4 w-4 ",
  },
  {
    value: "Direvisi",
    label: "Direvisi",
    icon: Clock,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-green/5 border border-green/20 text-green",
    classname: "h-4 w-4 ",
  },
  {
    value: "Diterima",
    label: "Diterima",
    icon: TickCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-blue/5 border border-blue/20 text-blue",
    classname: "h-4 w-4 ",
  },
  {
    value: "Selesai",
    label: "Selesai",
    icon: TickCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-blue/5 border border-blue/20 text-blue",
    classname: "h-4 w-4 ",
  },
]

export const statusesAbt = [
  {
    value: "Diajukan",
    label: "Diajukan",
    icon: InfoCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-amber/5 border border-amber/20 text-amber",
    classname: "h-4 w-4",
  },
  {
    value: "Diproses",
    label: "Diproses",
    icon: Clock,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-green/5 border border-green/20 text-green",
    classname: "h-4 w-4 ",
  },
  {
    value: "Ditolak",
    label: "Ditolak",
    icon: CloseCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1  gap-1 bg-red/5 border border-red/20 text-red",
    classname: "h-4 w-4 ",
  },
  {
    value: "Diterima",
    label: "Diterima",
    icon: TickCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-blue/5 border border-blue/20 text-blue",
    classname: "h-4 w-4 ",
  },
]

export const statusesTahun = [
  {
    value: "aktif",
    label: "Aktif",
    icon: Clock,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-green/5 border border-green/20 text-green ",
    classname: "h-4 w-4 ",
  },
  {
    value: "tidak-aktif",
    label: "Tidak Aktif",
    icon: CloseCircle,
    class: "flex items-center rounded-full py-1 px-2 gap-1 bg-blue/5 border border-blue/20 text-blue",
    classname: "h-4 w-4 ",
  },
]

export const Status = ({ statuss }: { statuss: string }) => {
  const status = statuses.find(
    (status) => status.value === statuss
  );
  if (!status) {
    return null;
  }
  return (
    <div className={status.class}>
      {status.icon && <status.icon className={status.classname} />}
      <span className="text-sm">{status.label}</span>
    </div>
  );
}

export const StatusAbt = ({ statuss }: { statuss: string }) => {
  const status = statusesAbt.find(
    (status) => status.value === statuss
  );
  if (!status) {
    return null;
  }
  return (
    <div className={status.class}>
      {status.icon && <status.icon className={status.classname} />}
      <span className="text-sm">{status.label}</span>
    </div>
  );
}

export const StatusTahun = ({ statuss }: { statuss: string }) => {
  const status = statusesTahun.find(
    (status) => status.value === statuss
  );
  if (!status) {
    return null;
  }
  return (
    <div className={status.class}>
      {status.icon && <status.icon className={status.classname} />}
      <span className="text-sm">{status.label}</span>
    </div>
  );
}



