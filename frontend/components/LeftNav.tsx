import { BookOpen } from 'lucide-react';

const LeftNav = () => {
   return (
      <div className="flex flex-col items-center gap-4 p-4 border-r border-border">
         <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
            <BookOpen className="h-5 w-5" />
         </div>
           <div>
            
         </div>
      </div>
   );
};

export default LeftNav;
