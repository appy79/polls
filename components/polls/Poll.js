import React, { useState } from 'react'
import { session, useSession } from 'next-auth/client'
import Bar from './Bar'
import { useSpring, animated } from 'react-spring'

function Poll({ poll, del }) {
    const [active, setActive] = useState(false)
    const [voted, setVoted] = useState(false)
    const [choices, setChoices] = useState(poll.choices)
    const [total, setTotal] = useState(poll.total)
    const [session, loading] = useSession()
    const creator = session ? session.user.email == poll.creator : false

    const largest = Math.max(...choices.map((choices) => choices.count), 0)

    const remove = async () => {
        const response = await fetch('/api/polls/' + poll._id, {
            method: 'DELETE',
        })
        const res = await response.json()
        if (res.success) {
            del(poll)
            alert('Poll Deleted')
        } else {
            console.log(res)
        }
    }

    const vote = async (choiceid) => {
        const body = {
            choice: choiceid,
        }
        const response = await fetch('/api/polls/' + poll._id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const res = await response.json()
        if (res.success) {
            setVoted(true)
            setTotal(total + 1)
            const newChoices = choices
            const choiceIndex = newChoices.findIndex(
                (choice) => choice._id == choiceid
            )
            newChoices[choiceIndex].count += 1
            setChoices(newChoices)
        }
    }

    return (
        <div className="mx-auto">
            <div className="flex items-center">
                <p className="flex-grow text-xl ml-4">{poll.title}</p>
                <button
                    onClick={() => {
                        setActive(!active)
                    }}
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 max-h-10 rounded"
                >
                    {active ? 'Hide' : 'Results'}
                </button>
            </div>
            {choices.map((choice) => {
                const value =
                    choice.count == 0
                        ? 0
                        : Math.floor((choice.count * 100) / largest)

                const aval = useSpring({
                    value: active ? choice.count : 0,
                    config: {
                        duration: 800,
                    },
                })

                return (
                    <div key={choice._id} className="m-4">
                        <div className="flex items-center">
                            <div className="flex flex-col flex-grow">
                                <p className="block text-gray-500 font-bold mb-1 pr-4">
                                    {choice.name}
                                </p>
                                <Bar width={value} active={active} />
                            </div>
                            {active && (
                                <div className="flex">
                                    <animated.div>
                                        {aval.value.to((x) => Math.floor(x))}
                                    </animated.div>
                                </div>
                            )}
                            {session &&
                                !voted &&
                                !poll.voted.includes(session.user.id) && (
                                    <button
                                        onClick={(e) => {
                                            vote(choice._id)
                                        }}
                                        className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded"
                                    >
                                        Vote
                                    </button>
                                )}
                        </div>
                    </div>
                )
            })}
            <div className="flex">
                <p className="block text-gray-500 font-bold pr-4 flex-grow">
                    {total} Votes
                </p>
                {creator && (
                    <button
                        onClick={remove}
                        className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-3 rounded"
                    >
                        Delete
                    </button>
                )}
                {!creator && (
                    <p className="block text-gray-500 font-bold pr-4">
                        {poll.creator}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Poll
