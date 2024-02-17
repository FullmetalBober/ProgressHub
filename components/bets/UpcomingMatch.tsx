import { ArrowRightIcon, CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

type Props = {
  team1: string;
  team2: string;
  date: string;
} & React.ComponentProps<typeof Card>;

export default function UpcomingMatch(props: Props) {
  const { team1, team2, date } = props;

  return (
    <Card {...props}>
      <CardContent className='flex items-center justify-between p-6 pt-5'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <Image
              alt={team1}
              className='overflow-hidden rounded-full'
              height='40'
              src='/placeholder.svg'
              style={{
                aspectRatio: '40/40',
                objectFit: 'cover',
              }}
              width='40'
            />
            <div className='font-semibold'>{team1}</div>
          </div>
          <div className='flex items-center space-x-2'>
            <Image
              alt={team2}
              className='overflow-hidden rounded-full'
              height='40'
              src='/placeholder.svg'
              style={{
                aspectRatio: '40/40',
                objectFit: 'cover',
              }}
              width='40'
            />
            <div className='font-semibold'>{team2}</div>
          </div>
        </div>
        <CardFooter className='flex items-center justify-between p-0'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className='h-4 w-4 opacity-50' />
            <time className='shrink-0.5 text-sm font-normal opacity-70'>
              {date}
            </time>
          </div>
          <Button className='flex translate-y-0.5 items-center space-x-2 underline'>
            <ArrowRightIcon className='h-4 w-4' />
            View Odds
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
