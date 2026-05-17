import { get as httpsGet } from 'node:https';
import { URL } from 'node:url';

export type Surah = {
   number: number;
   name: string;
   englishName: string;
   englishNameTranslation: string;
   numberOfAyahs: number;
   revelationType: string;
};

export type Ayah = {
   number: number;
   numberInSurah: number;
   text: string;
};

export type SurahWithAyahs = Surah & {
   ayahs: Ayah[];
};

export type QuranReaderData = {
   surahs: Surah[];
   arabicSurahs: SurahWithAyahs[];
   englishSurahs: SurahWithAyahs[];
};

type QuranApiResponse<T> = {
   code: number;
   status: string;
   data: T;
};

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

type QuranEditionData = {
   surahs: SurahWithAyahs[];
};

async function fetchQuranApi<T>(path: string): Promise<T> {
   const payload = await requestJson<QuranApiResponse<T>>(
      new URL(`${QURAN_API_BASE}${path}`),
   );

   if (payload.code !== 200) {
      throw new Error(`Quran API responded with ${payload.status}`);
   }

   return payload.data;
}

function requestJson<T>(url: URL): Promise<T> {
   return new Promise((resolve, reject) => {
      const request = httpsGet(
         url,
         { headers: { Accept: 'application/json' }, timeout: 30000 },
         (response) => {
            if (!response.statusCode || response.statusCode < 200 || response.statusCode >= 300) {
               response.resume();
               reject(new Error(`Quran API request failed: ${response.statusCode}`));
               return;
            }

            let body = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
               body += chunk;
            });
            response.on('end', () => {
               try {
                  resolve(JSON.parse(body) as T);
               } catch (error) {
                  reject(error);
               }
            });
         },
      );

      request.on('timeout', () => {
         request.destroy(new Error('Quran API request timed out'));
      });
      request.on('error', reject);
   });
}

export async function getQuranReaderData(): Promise<QuranReaderData> {
   const [surahs, arabicQuran, englishQuran] = await Promise.all([
      fetchQuranApi<Surah[]>('/surah'),
      fetchQuranApi<QuranEditionData>('/quran/quran-uthmani'),
      fetchQuranApi<QuranEditionData>('/quran/en.sahih'),
   ]);

   return {
      surahs,
      arabicSurahs: arabicQuran.surahs,
      englishSurahs: englishQuran.surahs,
   };
}
