import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDashboard } from "@/services/admin";
import Peta from "./peta";
import Rab from "./rab";
import StatusBelmod from "./status-belmod";
import StatusAbt from "./status-abt";

export async function SuspensePage() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const data = await getDashboard(token);
  const proposal = data?.proposal;
  const abt = data?.abt;
  const proposalMaps = data?.proposalMaps;
  const completedMaps = data?.completedMaps;
  const submittedRab = data?.submittedRab;
  const completedRab = data?.completedRab;
  console.log(submittedRab);

  return (
    <div className="flex-1 space-y-4 ">
      <div className="md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
        <div className="col-span-2">
          <div className="space-y-6">
            <Peta data={proposalMaps} />
            <Rab data={submittedRab} />
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <StatusBelmod data={proposal} />
          <StatusAbt data={abt} />
        </div>
      </div>
    </div>
  );
}
