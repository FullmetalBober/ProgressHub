'use client';

import { GitBranch } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function CopyBranchNameButton({
  identifier,
}: {
  identifier: number;
}) {
  const branchName = `feat/#${identifier}`;

  const copyBranchNameHandler = () => {
    navigator.clipboard.writeText(branchName);
    toast.success('Branch name copied to clipboard!');
  };

  return (
    <Button variant='outline' size='icon' onClick={copyBranchNameHandler}>
      <GitBranch />
    </Button>
  );
}
