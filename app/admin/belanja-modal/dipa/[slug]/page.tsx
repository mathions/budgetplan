export default async function Dipa ({ params }: {params: { slug: string } }) {
  const slug = params.slug;
  return (
    <>
      <h2>{slug}</h2>
    </>
  )
}