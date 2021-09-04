function VerificationForm(props) {

    const [code, setCode] = useState("");
    
    const submit = (e) => {
        e.preventDefault()
        if (!code) {
            alert("No field can be left blank");
        } else{
            props.onChange(code);
            setCode("");
        }
    }

    return (
        <div className="mx-auto bg-gray-100 p-8 rounded-xl w-max m-8">
            <p className="text-3xl text-center font-bold p-3">Verification</p>
            <form className="w-full max-w-sm" onSubmit={submit} >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-code"
                        >
                        Code
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            }}
                        />
                    </div>
                </div>
                        
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <input
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        value="Verify"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center text-center text-sm">
                    <p>Write the code sent to {roll}@nitt.edu for verification.</p>
                </div>    
            </form>
        </div>
    );
}

export default VerificationForm;