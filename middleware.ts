// import { getWorkspaces } from '@/lib/actions/workspaces.action';
// import { getServerSession } from 'next-auth';
// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';

// export const config = {
//   matcher: ['/'],
// };

// export async function middleware(request: NextRequest) {
//   const session = await getServerSession({
//     req: request,
//   });
//   console.log('sessionqwe', session);
//   if (session) {
//     const lastVisitedWorkspace = request.cookies.get('lastVisitedWorkspace');
//     if (lastVisitedWorkspace)
//       return NextResponse.rewrite(`/${lastVisitedWorkspace}`);
//     else {
//       const { workspaces } = await getWorkspaces();
//       if (workspaces && workspaces?.length > 0)
//         return NextResponse.rewrite(`/${workspaces[0].id}`);
//       else return NextResponse.rewrite('/workspaces/create');
//     }
//   }
// }
