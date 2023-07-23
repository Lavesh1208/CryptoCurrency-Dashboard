 import { useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { setSelectedCoinsList } from "../../store/global";
 import { useEffect } from "react";

const CryptoDropdown = () => {
   // State variables
   const [displayDropdown, setDisplayDropdown] = useState(false);
   const { market } = useSelector(state => state.cryptoMarket);
   const [selectedCoins, setSelectedCoins] = useState(useSelector(state => state.global.selectedCoinsList));
   const [coins, setCoins] = useState();
   const dispatch = useDispatch();

   // Toggle dropdown display
   const toggleDropdown = () => {
      setDisplayDropdown(!displayDropdown);
   };

   // Handle coin selection in dropdown
   const handleCoinSelection = (coinId) => {
      const updatedCoins = coins.map((coin) => {
         if (coin.id === coinId) {
            return { ...coin, checked: !coin.checked };
         }
         return coin;
      });
      setCoins(updatedCoins);
      const selectedCoinsIds = updatedCoins
         .filter((coin) => coin.checked)
         .map((coin) => ({
            id: coin.id,
            name: coin.name,
         }));
      setSelectedCoins(selectedCoinsIds);
      dispatch(setSelectedCoinsList(selectedCoinsIds));
   };

   // Fetch list of coins from the market
   useEffect(() => {
      setCoins(market.map((coin) => ({
         id: coin.id,
         name: coin.name,
      })));
   }, [market]);

   return (
      <div className='relative inline-block text-left'>
         <div>
            {/* Dropdown button */}
            <button
               type="button"
               className="inline-flex justify-between items-center w-28 text-sm md:text-base md:w-44 px-2 md:px-4 py-2.5 font-medium text-gray-700 bg-white ring-2 ring-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 truncate"
               onClick={toggleDropdown}
            >
               {selectedCoins.name || "Cryptocurrency"}
               {/* Dropdown icon */}
               <svg
                  className={`ml-2.5 h-5 w-5 transition-transform ${displayDropdown ? "transform rotate-180" : ""
                     }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path fillRule="evenodd" d="M10 14l6-6H4z" />
               </svg>
            </button>
         </div>

         <div className='absolute w-full left-0 top-10'>
            {/* Dropdown menu */}
            {displayDropdown &&
               <div className='flex-col gap-2 shadow-xl h-80 overflow-y-scroll mt-2'>
                  {coins.map((coin) => (
                     <div
                        key={coin.id}
                        className={`w-full text-center py-1 border-b border-gray-300 
                        hover:bg-rose-200 cursor-pointer
                        ${coin.checked ? 'bg-rose-400' : 'bg-white'}
                        `}
                     >
                        <input
                           className="appearance-none h-full"
                           onChange={() => handleCoinSelection(coin.id)}
                           checked={coins.checked}
                           id={coin.id}
                           type="checkbox" />
                        <label className="w-full cursor-pointer pl-2" htmlFor={coin.id}>{coin.name}</label>
                     </div>
                  ))}
               </div>
            }
         </div>
      </div>
   );
};

export default CryptoDropdown;