'use client';
import {useFormStatus} from 'react-dom';
import Link from 'next/link';

export default function FormSubmit({btn1, href2, msg}){
    const status = useFormStatus();

    if(status.pending){
        return <p className='text-SecondaryPurple font-medium text-lg animate-pulse'>{msg}</p>
    }

    return(
        <div className="flex justify-start space-x-4">
            <button
              type="submit"
           
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPurple transition duration-300"
            >
            {btn1}
            </button>
            <Link
              href={href2}
              className="shadow-lg bg-PrimaryBlack text-white py-2 px-4 rounded-lg hover:bg-SecondaryPink transition duration-300"
            >
              Cancel
            </Link>
          </div>
    )
}