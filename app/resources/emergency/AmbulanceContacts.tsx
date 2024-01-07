import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ambulanceContacts = [
  { name: "Ivory Ambulance", contacts: ["0726 998 880"] },
  { name: "Nairobi East Hospital Ambulance", contacts: ["0111 435 797"] },
  { name: "E plus", contacts: ["0700 395 395"] },
  { name: "A.A.R", contacts: ["0725 225 225"] },
  { name: "St. John Ambulance", contacts: ["0721 225 285"] },
  { name: "RFH", contacts: ["0741 574 782"] },
  { name: "OCODA", contacts: ["0758 692 000"] },
  { name: "Euraka", contacts: ["0712 222 547"] },
  { name: "Moshi Ambulance", contacts: ["0792 274 997"] },
  { name: "LifeMed", contacts: ["0708 188 085"] },
  { name: "EOC", contacts: ["1508"] },
  { name: "Eagle Rescue Ambulance", contacts: ["0727 498 805"] },
  { name: "Arrow Ambulance", contacts: ["0723 623 880"] },
  { name: "Nyanchwa Ambulance Kisii", contacts: ["0723 623 880"] },
  { name: "Prodigy Ambulance", contacts: ["0713 644 686"] },
  { name: "Lifetime Ambulance", contacts: ["0700 024 764"] },
  { name: "VHS Ambulance", contacts: ["0702 610 657"] },
  { name: "Red Cross", contacts: ["1199"] },
  { name: "Neema Ambulance Kahawa Sukari", contacts: ["0759 263 586"] },
  { name: "Mediheal Ambulance Parklands", contacts: ["0706 000 888"] },
  { name: "Morningstar Ambulance", contacts: ["0758 803 688"] },
  { name: "Ladnan Hospital", contacts: ["0707 000 730"] },
  { name: "Nairobi Women’s Kitengela", contacts: ["0717 723 677"] },
  { name: "Kind David Hospital Ambulance", contacts: ["0798 672 797"] },
  { name: "Quick Safe Ambulance Nairobi", contacts: ["0721 853 796"] },
  { name: "Nairobi Women’s Nakuru", contacts: ["0707 957 840"] },
  { name: "First Responder", contacts: ["0792 005 351"] },
  { name: "Radiant Hospital Ambulance", contacts: ["0725 532 000"] },
  { name: "Avenue Parklands", contacts: ["0711 060 150", "0711 060 175"] },
  { name: "Avenue Thika", contacts: ["0711 060 800", "0715 869 147"] },
  { name: "Rescuemed", contacts: ["0722 805 645"] },
  { name: "NWH Ambulance Nakuru", contacts: ["0707 957 840"] },
  { name: "Bahati Ambulance", contacts: ["0706 334 817"] },
  {
    name: "Urban Safety Ambulance",
    contacts: ["0724 626 156", "0722 162 309"],
  },
  { name: "Breesl Ambulance", contacts: ["0721 491 110"] },
  { name: "St. Mary’s Hospital Langata Ambulance", contacts: ["0777 663 441"] },
  { name: "Alpha Ambulance", contacts: ["0711 475 475"] },
  { name: "SWIFT Paramedic", contacts: ["0722 816 148"] },
  { name: "Emergency Medical Response", contacts: ["0728 310 310"] },
  { name: "Delta Ambulance", contacts: ["0742 860 638"] },
];

export function AmbulanceContacts() {
  return (
    <div className="px-4 ">
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Ambulance Contacts
        </h2>
        <p className="text-muted-foreground">
          A list of ambulance agencies and their contacts.
        </p>
      </div>
      <Separator className="my-4 max-w-5xl" />
      <Table className="max-w-5xl">
        <TableHeader>
          <TableRow>
            <TableHead>Agency</TableHead>
            <TableHead className="text-right">Contacts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ambulanceContacts.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>

              <TableCell className="flex flex-col w-[150px] text-right lg:w-full">
                {item.contacts[0] && (
                  <div className="text-primary">{item.contacts[0]}</div>
                )}
                {item.contacts[1] && (
                  <div className="text-primary">{item.contacts[1]}</div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
