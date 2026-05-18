const MoreIcon = ({ className }: { className?: string }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="1em"
         height="1em"
         viewBox="0 0 24 24"
         className={`text-icon-color ${className}`}
      >
         <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
         ></path>
      </svg>
   );
};

export default MoreIcon;
