import Poll from "./Poll";

function AllPolls(props) {
  return (
    <div className="justify-center">
      {props.polls.length === 0
        ? "No polls to Display"
        : props.polls.map((poll) => {
            return (
              <div key={poll._id} className="m-8 border w-11/12 md:w-2/3 mx-auto p-8">
                <Poll poll={poll} />
              </div>
            );
          })}
    </div>
  );
}

export default AllPolls;