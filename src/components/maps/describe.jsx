import { Book, ChartArea, Clock, Castle } from 'lucide-react';

const describe = [
  {
    title: "great ambiance",
    para: "very conducive for your studies",
    icons: () => <Castle size={36} />,
  },
  {
    title: "accessibility",
    para: "borrow and return later",
    icons: () => <Book size={36} />,
  },
  {
    title: "24/7 support",
    para: "where open any time of the day",
    icons: () => <Clock size={36} />,
  },
  {
    title: "variety of genre",
    para: "choose from our variety of genres",
    icons: () => <ChartArea size={36} />,
  },
];


export default describe