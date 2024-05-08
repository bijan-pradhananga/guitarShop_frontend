'use client'
import { FaXmark  } from "react-icons/fa6";

const FilterPopup = ({ setShowModal,minPrice,setMinPrice,maxPrice,setMaxPrice,handleFilter}) => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-11/12 my-6 mx-auto md:w-96">
            {/*content*/}
            <div className="border-0 rounded-t-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900  dark:border-gray-700  outline-none focus:outline-none">
              <FilterPopupHeader  setShowModal={setShowModal}/>
              <FilterPopupBody  minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}
             
              />
              <FilterPopupFooter setShowModal={setShowModal}  handleFilter={handleFilter} />
            </div>
            
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
  }


const FilterPopupHeader = ({setShowModal}) => {
   
    return (
        <div className="flex justify-between items-center p-5 border-b border-solid border-blueGray-200 dark:border-gray-700 rounded">
            <h3 className="text-2xl font-semibold">
                Filter
            </h3>
            <FaXmark className="font-bold text-500 text-xl cursor-pointer" onClick={() => setShowModal(false)} />
        </div>
    )
}

const FilterPopupBody = ({minPrice,setMinPrice,maxPrice,setMaxPrice,handleFilter}) => {
    return (

        <div className="relative flex-auto">
            <div className="bg-white dark:bg-gray-900   rounded px-6 pt-4 pb-3">
                {/* form to input min and max price to filter */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" >
                        Price
                    </label>
                    <div className="flex gap-2">
                        <input type="number" className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-inherit leading-tight transition duration-300 ease focus:border-gray-300 focus:shadow-outline"  placeholder="Min" required 
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}/>
                        <input type="number" className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-inherit leading-tight transition duration-300 ease focus:border-gray-300 focus:shadow-outline "  placeholder="Max" required
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                {/* form to input min and max price to filter */}
            </div>
        </div>

    )
}

const FilterPopupFooter = ({ setShowModal, handleFilter }) => {
    return (

        <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200  dark:border-gray-700 rounded-b">
            <button
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {setShowModal(false); handleFilter()}}
            >
                Apply
            </button>
        </div>

    )
}

export default FilterPopup