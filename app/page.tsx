import SignIn from '@/components/auth/SignIn';
import UpcomingMatch from '@/components/bets/UpcomingMatch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getUserAuth } from '@/lib/auth/utils';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, CalendarIcon } from 'lucide-react';
import Image from 'next/image';

type Team = {
  name: string | null;
  url: string | null;
};

type Match = {
  hash: string;
  teams: [Team | null, Team | null];
  matchType: string | null;
  startsAt: string | null;
  leagueName: string | null;
  leagueUrl: string | null;
  streamUrl: string | null;
};

export default async function Home() {
  // const matches = await fetch('https://api.pandascore.co/matches', {

  // const { session } = await getUserAuth();

  const teamsData = [
    { team1: 'Team 1', team2: 'Team 2', date: '2024-08-15 18:00' },
    { team1: 'Team 3', team2: 'Team 4', date: '2024-08-16 20:00' },
    { team1: 'Team 5', team2: 'Team 6', date: '2024-08-17 22:00' },
  ];

  return (
    <main className='w-full py-6'>
      {/* <SignIn session={session} /> */}
      <div className='container grid gap-6 px-4 md:gap-8 md:px-6'>
        {/* <div className='flex flex-col gap-1.5'>
          <h3 className='text-lg font-semibold tracking-wider'>Upcoming</h3>
          <p className='shrink-2 text-sm leading-none tracking-wide'>
            Showing 1-5 of 12 matches
          </p>
        </div> */}
        {teamsData.map((team, index) => (
          <UpcomingMatch
            key={index}
            team1={team.team1}
            team2={team.team2}
            date={team.date}
            className={cn(index === 0 ? 'mt-0' : '-mt-9')}
          />
        ))}
      </div>
    </main>
  );
}
