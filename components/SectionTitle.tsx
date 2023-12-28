/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EiOI0t6RDQD
 */

type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <section className="flex items-center justify-center w-full py-6">
      <hr className="flex-grow border-t-2" />
      <h1 className="mx-4 text-center text-3xl font-bold text-primary">
        {title}
      </h1>
      <hr className="flex-grow border-t-2" />
    </section>
  );
}
