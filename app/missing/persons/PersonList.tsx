import { serverDB } from "@/lib/firebase";
import { TPerson } from "@/types/missing_person.model";
import { personSearchFields } from "@/lib/constants";
import Fuse from "fuse.js";
import PersonCard from "./PersonCard";
type Props = {
  searchParams: { search: string };
};

async function getMissingPersonList(params: {
  search?: string;
}): Promise<TPerson[]> {
  console.log(params.search, "searching");
  const data: any[] = [];
  const docs = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .get();
  if (docs.empty) {
    return [];
  }
  docs.forEach((doc) => {
    const dataObj = doc.data();
    data.push({
      id: doc.id,
      ...dataObj,
    });
  });

  if (!params.search) {
    return data as TPerson[];
  }

  const fuse = new Fuse(data, personSearchFields);
  const results = fuse.search(params.search).map(({ item }) => item);

  return results as TPerson[];
}

export default async function PersonList({ searchParams }: Props) {
  const searchKey = searchParams.search || "";
  const missingPersons = await getMissingPersonList({ search: searchKey });

  return (
    <div className="flex flex-wrap justify-center lg:justify-normal">
      {missingPersons.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </div>
  );
}
