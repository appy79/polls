import Poll from "./Poll";
import {useState} from "react";

function AllPolls({polls}) {

  const [allpolls, setAllpolls] = useState(polls)
  
  const del = (poll) => {
    setAllpolls(
      allpolls.filter((e) => {
        return e !== poll;
      })
    );
  }

  return (
    <div className="justify-center">
      {allpolls.length === 0
        ? "No polls to Display"
        : allpolls.map((poll) => {
            return (
              <div key={poll._id} className="m-8 bg-gray-100 p-4 md:p-8 rounded-xl w-11/12 md:w-2/3 mx-auto">
                <Poll del={del} poll={poll} />
              </div>
            );
          })}
    </div>
  );
}

export default AllPolls;