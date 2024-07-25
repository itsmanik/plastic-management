import { useEffect, useState } from "react";
import axios from "../axios";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [redeemedRewards, setRedeemedRewards] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/api/user");
                setUserData(response.data);
                setUserId(response.data.id); // Assume user ID is in the response
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchTransactions = async () => {
                try {
                    const response = await axios.get(`/api/transactions`);
                    setTransactions(response.data);
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                }
            };

            fetchTransactions();

            const fetchRedeemedRewards = async () => {
                try {
                    const response = await axios.get(`/api/redeemed_rewards`);
                    console.log(response.data);
                    setRedeemedRewards(response.data);
                } catch (error) {
                    console.error("Error fetching redeemed rewards:", error);
                }
            };

            fetchRedeemedRewards();
        }
    }, [userId]);

    return (
        <div className="bg-gray-100 h-screen overflow-y-auto">
            <div className="container mx-auto p-5">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-4/12 md:pr-4 flex flex-col space-y-4">
                        {/* Profile Section */}
                        <div
                            className="bg-white p-5 border-t-4 border-green-400 rounded-lg shadow-lg flex-grow"
                            style={{
                                boxShadow: "0 8px 16px rgba(0, 128, 0, 0.2)",
                            }}
                        >
                            <div className="image overflow-hidden">
                                <img
                                    className="h-auto w-full mx-auto rounded-full"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt=""
                                />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                                {userData && (
                                    <>
                                        <span>{userData.firstname} </span>
                                        <span>{userData.lastname}</span>
                                    </>
                                )}
                            </h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">
                                {userData && <span>{userData.username}</span>}
                            </h3>
                            <ul className="bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Points</span>
                                    <span className="ml-auto">
                                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                            {userData && (
                                                <>
                                                    <span>
                                                        {userData.points}{" "}
                                                    </span>
                                                </>
                                            )}
                                        </span>
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">
                                        {userData && (
                                            <span>{userData.date_joined}</span>
                                        )}
                                    </span>
                                </li>
                            </ul>
                            <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline p-3 my-4">
                                Go to rewards
                            </button>
                        </div>

                        {/* about */}
                        <div
                            className="bg-white p-5 rounded-lg flex-grow"
                            style={{
                                boxShadow: "0 8px 16px rgba(0, 128, 0, 0.2)",
                            }}
                        >
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-1 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            First Name
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>
                                                    {userData.firstname}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Last Name
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.lastname}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Username
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.username}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Gender
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.gender}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Phone Number
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.contact}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Current Address
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.address}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Permanent Address
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.address}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">
                                            Date of Birth
                                        </div>
                                        <div className="px-4 py-2">
                                            {userData && (
                                                <span>{userData.dob}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-8/12 mt-4 md:mt-0 flex flex-col space-y-4">
                        {/* Red rew */}
                        <div
                            className="bg-white p-5 rounded-lg h-[19.3rem] overflow-y-scroll"
                            style={{
                                boxShadow: "0 8px 16px rgba(0, 128, 0, 0.2)",
                                width: "100%",
                            }}
                        >
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-blue-500">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v8m-4-4h8"
                                        />
                                    </svg>
                                </span>
                                <span className="tracking-wide">
                                    Redeemed Rewards
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-4 mt-2">
                                {redeemedRewards.length > 0 ? (
                                    redeemedRewards.map((reward, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 p-3 rounded-lg flex items-center"
                                            style={{
                                                boxShadow:
                                                    "0 8px 16px rgba(0, 128, 0, 0.2)",
                                            }}
                                        >
                                            <img
                                                src={reward.reward_image} // Assuming 'reward_image' holds the URL of the image
                                                alt={reward.reward_title}
                                                className="max-w-14 rounded-lg mb-2 max-h-14"
                                            />
                                            <div className="ml-5">
                                                <p className="text-gray-700">
                                                    {reward.reward_title}
                                                </p>
                                                <p className="text-gray-600">
                                                    Points Used:{" "}
                                                    {reward.reward_points}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    Date: {reward.redeemed_at}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        No redeemed rewards available.
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Transactions Section */}
                        <div
                            className="bg-white p-5 rounded-lg  h-[23rem] overflow-y-scroll"
                            style={{
                                boxShadow: "0 8px 16px rgba(0, 128, 0, 0.2)",
                            }}
                        >
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-blue-500">
                                    <svg
                                        className="h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 13l4 4L10 12l4 4 4-4"
                                        />
                                    </svg>
                                </span>
                                <span className="tracking-wide">
                                    Transactions
                                </span>
                            </div>
                            <ul className="list-inside space-y-4">
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <li
                                            key={index}
                                            className="bg-gray-100 p-3 rounded-lg"
                                            style={{
                                                boxShadow:
                                                    "0 8px 16px rgba(0, 128, 0, 0.2)",
                                            }}
                                        >
                                            <p className="text-gray-700">
                                                {transaction.log}
                                            </p>
                                            <p className="text-gray-600">
                                                Points: {transaction.points}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Date: {transaction.date}
                                            </p>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        No transactions available.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
