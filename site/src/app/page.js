import Image from "next/image";
import data from '../../../data/data.json';
import Calendar from "@/components/Calendar";


export default function Home() {
  var month = "February";
  var year = 2024;
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main id="main">
      <div id="header">
        {month} {year}

        <div id="weekHeader">
          <div class="dayName dayWidth">MON</div>
          <div class="dayName dayWidth">TUE</div>
          <div class="dayName dayWidth">WED</div>
          <div class="dayName dayWidth">THU</div>
          <div class="dayName dayWidth">FRI</div>
          <div class="dayName dayWidth">SAT</div>
          <div class="dayName dayWidth">SUN</div>
          <div class="dayName summaryWidth">SUMMARY</div>
        </div>
      </div>


      <Calendar />

    </main>
  );
}
