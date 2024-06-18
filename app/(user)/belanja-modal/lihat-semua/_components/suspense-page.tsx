import { getAllProposal } from "@/services/user";
import BelanjaModalCard from "./belanja-modal-card";
import { Proposal } from "@/lib/definitions"

export async function SuspensePage ({ token } : { token:string }) {
  const data = await getAllProposal(token)
  console.log(data)
  return (
    <div>
      {data.map((proposal: Proposal) => (
        <BelanjaModalCard key={proposal.no_urut} uuid={proposal.uuid} year={proposal.year} user={proposal.user} status={proposal.status}/>
      ))}
    </div>
  )
}