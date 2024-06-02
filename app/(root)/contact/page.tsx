import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <div className='w-full max-w-4xl mx-auto py-12 md:py-20'>
      <div className='space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Contact Us
          </h1>
          <p className='mt-4 text-lg text-gray-500 dark:text-gray-400'>
            Having trouble with your workspace? Let us know how we can help.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'>
          <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow'>
            <h2 className='text-lg font-medium mb-4'>Get in Touch</h2>
            <form className='space-y-4'>
              <div>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' type='text' placeholder='Enter your name' />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' placeholder='Enter your email' />
              </div>
              <div>
                <Label htmlFor='issue-type'>Issue Type</Label>
                <Select id='issue-type' defaultValue='general'>
                  <SelectTrigger>
                    <SelectValue placeholder='Select issue type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='general'>General</SelectItem>
                    <SelectItem value='technical'>Technical</SelectItem>
                    <SelectItem value='billing'>Billing</SelectItem>
                    <SelectItem value='other'>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='message'>Message</Label>
                <Textarea
                  id='message'
                  placeholder='Enter your message'
                  className='min-h-[120px]'
                />
              </div>
              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </form>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow'>
            <h2 className='text-lg font-medium mb-4'>Company Info</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-medium'>Address</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  123 Main St, Anytown USA 12345
                </p>
              </div>
              <div>
                <h3 className='font-medium'>Phone</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  (123) 456-7890
                </p>
              </div>
              <div>
                <h3 className='font-medium'>Email</h3>
                <p className='text-gray-500 dark:text-gray-400'>
                  support@workspace-issues.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
