// import React from "react"

// export default Footer(){
//     return(

//     )
// };

import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-10 text-xs text-gray-500 border-t border-[#1E293B] mt-auto">
      © {new Date().getFullYear()} Ticketrax. All rights reserved.
    </footer>
  );
}
