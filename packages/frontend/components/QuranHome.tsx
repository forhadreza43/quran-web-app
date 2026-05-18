import { getQuranReaderData } from '@/lib/quran';
import QuranReader from './quran/QuranReader';

const QuranHome = async () => {
   const data = await getQuranReaderData();

   return <QuranReader data={data} />;
};

export default QuranHome;
