import { useState } from "react";
import { useSession } from "next-auth/client";

function PollForm(props) {

    const [session, loading] = useSession();

    const [title, setTitle] = useState("");
    const [choices, setChoices] = useState(["", ""])

    const modchoice = (index, e) => {
        const values = [...choices];
        values[index] = e.target.value;
        setChoices(values);
    }

    const remove = (index) => {
        const values = [...choices];
        values.splice(index, 1);
        setChoices(values);
    }

    const create = (e) => {
        var empty = false;
        for (var i = 0; i < choices.length; i++){
            if (choices[i]==""){
                empty = true;
            }
        }
        if (!title || choices.length<2){
            alert("A title and atleast 2 choices are necessary.");
        }
        else if (empty === true) {
            alert("No choice can be left blank.");
        }
        else{
            const newPoll = {
                "title": title,
                "choices": choices,
                "creator": session.user.name + " (" + session.user.email + ")"
            }
            props.onCreate(newPoll);
            setTitle("");
            setChoices(["", ""]);
        } 
    }

    return (
        <div className="mx-auto bg-gray-100 p-8 rounded-xl w-11/12 md:w-6/12">
            <p className="text-3xl text-center font-bold p-3">Create Poll</p>
            <div className="w-full">

                <div className="md:items-center mb-6">
                    <label
                        className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                        htmlFor="inline-roll"
                        >
                        Title
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="roll"
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>

                <div className="md:items-center mb-6">
                    <label
                    className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
                    htmlFor="inline-roll"
                    >
                    Choices
                    </label>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex my-4">
                            <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id={index}
                            type="text"
                            value={choice}
                            onChange={(e) => modchoice(index, e) }
                            />
                            <button
                            className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded"
                            onClick={(e) => remove(index)}
                            >
                            X
                            </button>
                        </div>
                    ))}
                    <button
                        className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-3 rounded"
                        onClick={(e) => { setChoices([...choices, '']) }}
                        >
                        Add More
                    </button>
                </div>

                <div className="text-center">
                    <button
                    className="shadow bg-purple-500 hover:bg-Purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded"
                    onClick={create}
                    >
                    Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PollForm;