// Sidebar imports


// Analytics Cards imports

import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import tes from "../image/tes.jpg";
import test1 from "../image/test1.jpg";
import tseyt4 from "../image/tseyt4.jpg";

// Sidebar Data
export const SidebarData = [
  {
    heading: "Dashboard",
  },
  {
    heading: "Orders",
  },
  {
    heading: "Customers",
  },
  {
    heading: "Products",
  },
  {
    heading: "Analytics",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",

    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: tes,
    name: "Andrew Thomas",
    noti: "has received a job",
    time: "25 seconds ago",
  },
  {
    img: tes,
    name: "Andrew Thomas",
    noti: "has received a job",
    time: "25 seconds ago",
  },
  {
    img: tes,
    name: "Andrew Thomas",
    noti: "has received a job",
    time: "25 seconds ago",
  },
  
  {
    img: test1,
    name: "James Bond",
    noti: "has orderd a job",
    time: "30 minutes ago",
  },
  {
    img: tseyt4,
    name: "Iron Man",
    noti: "has orderd a job",
    time: "2 hours ago",
  },
  {
    img: tseyt4,
    name: "Iron Man",
    noti: "has orderd a job",
    time: "2 hours ago",
  },
  {
    img: tseyt4,
    name: "Iron Man",
    noti: "has orderd a job",
    time: "2 hours ago",
  },
];
