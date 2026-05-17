const SystemIcon = ({ className }: { className?: string }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="1em"
         height="1em"
         viewBox="0 0 24 24"
         className={className || 'text-primary'}
      >
         <g fill="none">
            <circle
               cx="12"
               cy="12"
               r="9"
               stroke="currentColor"
               strokeWidth="2"
            ></circle>
            <path
               fill="currentColor"
               d="M18.364 5.636A9 9 0 0 0 5.636 18.364L12 12"
            ></path>
         </g>
      </svg>
   );
};

export default SystemIcon;
