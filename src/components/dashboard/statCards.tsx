"use client";
import {Card, CardContent} from "@/components/ui/card";
import {BarChart2, Users, Bell} from "lucide-react";
import {useEffect, useState} from "react";

type UserStats = {
    TotalComments: number;
    TotalVotes: number;
    TotalPolls: number;
};

export const StatCards = () => {
    const [userStats, setUserStats] = useState<UserStats>({
        TotalComments: 0,
        TotalVotes: 0,
        TotalPolls: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsersStats = async () => {
            const url = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(url + "/users/stats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data: UserStats = await response.json();
            setUserStats(data);
            setLoading(false);
        };
        fetchUsersStats();
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-9 mb-8">
            {loading ? (
                // Render 3 Skeletons that match the card height perfectly
                <>
                    <StatSkeleton/>
                    <StatSkeleton/>
                    <StatSkeleton/>
                </>
            ) : (
                <>
                    <StatCard
                        title="Your Polls"
                        value={userStats.TotalPolls}
                        icon={<BarChart2 className="h-6 w-6"/>}
                        gradient="from-purple-500 to-indigo-600"
                    />
                    <StatCard
                        title="Total Votes"
                        value={userStats.TotalVotes}
                        icon={<Users className="h-6 w-6"/>}
                        gradient="from-blue-500 to-cyan-600"
                    />
                    <StatCard
                        title="Comments"
                        value={userStats.TotalComments}
                        icon={<Bell className="h-6 w-6"/>}
                        gradient="from-indigo-500 to-blue-600"
                    />
                </>
            )}
        </div>
    );
};


const StatCard = ({title, value, icon, gradient}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    gradient: string;
}) => (
    <Card className={`bg-gradient-to-br ${gradient} text-white border-none shadow-md`}>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <h3 className="text-3xl font-bold mt-1">{value}</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                    {icon}
                </div>
            </div>
        </CardContent>
    </Card>
);
const StatSkeleton = () => (
    <Card className="bg-gray-100 dark:bg-gray-800 animate-pulse border-none">
        <CardContent className="p-6 h-[112px]"> {/* Match the exact height of your cards */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"/>
                    <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded"/>
                </div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"/>
            </div>
        </CardContent>
    </Card>
);

