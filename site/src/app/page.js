import Image from "next/image";
import Calendar from "@/components/Calendar";


export default function Home() {
  var month = "February";
  var year = 2024;
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">


      <Calendar />
  );
}
