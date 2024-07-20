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
      {missingPersons.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-center text-gray-500">
            No results found {searchKey && `for "${searchKey}"`}
          </p>
        </div>
      )}
    </div>
  );
}
