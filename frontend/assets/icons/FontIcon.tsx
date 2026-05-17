const FontIcon = ({
   className,
   stroke,
}: {
   className?: string;
   stroke?: string;
}) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="19"
         height="18"
         viewBox="0 0 19 18"
         fill="none"
         className={`size-5 transition-all duration-200 group-data-[state=open]:block ${className}`}
      >
         <path
            d="M7.07031 16.5H11.5703C15.3203 16.5 16.8203 15 16.8203 11.25V6.75C16.8203 3 15.3203 1.5 11.5703 1.5H7.07031C3.32031 1.5 1.82031 3 1.82031 6.75V11.25C1.82031 15 3.32031 16.5 7.07031 16.5Z"
            stroke={stroke || 'currentColor'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            // fill="green"
         ></path>
         <path
            d="M5.57031 6.66749C7.93281 5.48999 10.7078 5.48999 13.0703 6.66749"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         ></path>
         <path
            d="M9.32031 12.225V5.94751"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
         ></path>
      </svg>
   );
};

export default FontIcon;
