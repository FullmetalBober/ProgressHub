import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const WorkspaceScalarFieldEnumSchema = z.enum(['id','name','image','issueCount']);

export const WorkspaceMemberScalarFieldEnumSchema = z.enum(['id','role','userId','workspaceId','createdAt']);

export const WorkspaceInviteScalarFieldEnumSchema = z.enum(['id','email','workspaceId','invitedById','status','createdAt','updatedAt']);

export const IssueScalarFieldEnumSchema = z.enum(['id','identifier','title','description','status','priority','workspaceId','assigneeId','createdAt','updatedAt']);

export const CommentScalarFieldEnumSchema = z.enum(['id','body','isEdited','issueId','isSystem','authorId','parentId','createdAt','updatedAt']);

export const GithubAppInstallationScalarFieldEnumSchema = z.enum(['id','workspaceId','createdById','createdAt','updatedAt']);

export const GithubWikiFileScalarFieldEnumSchema = z.enum(['id','path','previousPath','installationId','githubRepositoryId','content','isModified','createdAt','updatedAt']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','message','issueId','isRead','isEmailSent','senderId','recipientId','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['OWNER','ADMIN','MEMBER','GUEST']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const InviteStatusSchema = z.enum(['PENDING','ACCEPTED','DECLINED']);

export type InviteStatusType = `${z.infer<typeof InviteStatusSchema>}`

export const StatusSchema = z.enum(['BACKLOG','TODO','IN_PROGRESS','IN_REVIEW','DONE','CANCELED']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const PrioritySchema = z.enum(['NO_PRIORITY','URGENT','HIGH','MEDIUM','LOW']);

export type PriorityType = `${z.infer<typeof PrioritySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const UserCustomValidatorsSchema = UserSchema.strip()

export type UserCustomValidators = z.infer<typeof UserCustomValidatorsSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  workspaces: WorkspaceMemberWithRelations[];
  issues: IssueWithRelations[];
  workspacesInvites: WorkspaceInviteWithRelations[];
  comments: CommentWithRelations[];
  githubAppInstallation: GithubAppInstallationWithRelations[];
  notifications: NotificationWithRelations[];
  notificationsSent: NotificationWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
  workspaces: z.lazy(() => WorkspaceMemberWithRelationsSchema).array(),
  issues: z.lazy(() => IssueWithRelationsSchema).array(),
  workspacesInvites: z.lazy(() => WorkspaceInviteWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationWithRelationsSchema).array(),
  notificationsSent: z.lazy(() => NotificationWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  accounts?: AccountPartialWithRelations[];
  sessions?: SessionPartialWithRelations[];
  workspaces?: WorkspaceMemberPartialWithRelations[];
  issues?: IssuePartialWithRelations[];
  workspacesInvites?: WorkspaceInvitePartialWithRelations[];
  comments?: CommentPartialWithRelations[];
  githubAppInstallation?: GithubAppInstallationPartialWithRelations[];
  notifications?: NotificationPartialWithRelations[];
  notificationsSent?: NotificationPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  workspaces: z.lazy(() => WorkspaceMemberPartialWithRelationsSchema).array(),
  issues: z.lazy(() => IssuePartialWithRelationsSchema).array(),
  workspacesInvites: z.lazy(() => WorkspaceInvitePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
  notificationsSent: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
})).partial()

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
  workspaces: z.lazy(() => WorkspaceMemberPartialWithRelationsSchema).array(),
  issues: z.lazy(() => IssuePartialWithRelationsSchema).array(),
  workspacesInvites: z.lazy(() => WorkspaceInvitePartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
  notificationsSent: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const AccountCustomValidatorsSchema = AccountSchema.strip()

export type AccountCustomValidators = z.infer<typeof AccountCustomValidatorsSchema>

/////////////////////////////////////////
// ACCOUNT PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPartialSchema = AccountSchema.partial()

export type AccountPartial = z.infer<typeof AccountPartialSchema>

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> & AccountRelations

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCOUNT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPartialRelations = {
  user?: UserPartialWithRelations;
};

export type AccountPartialWithRelations = z.infer<typeof AccountPartialSchema> & AccountPartialRelations

export const AccountPartialWithRelationsSchema: z.ZodType<AccountPartialWithRelations> = AccountPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type AccountWithPartialRelations = z.infer<typeof AccountSchema> & AccountPartialRelations

export const AccountWithPartialRelationsSchema: z.ZodType<AccountWithPartialRelations> = AccountSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// SESSION CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const SessionCustomValidatorsSchema = SessionSchema.strip()

export type SessionCustomValidators = z.infer<typeof SessionCustomValidatorsSchema>

/////////////////////////////////////////
// SESSION PARTIAL SCHEMA
/////////////////////////////////////////

export const SessionPartialSchema = SessionSchema.partial()

export type SessionPartial = z.infer<typeof SessionPartialSchema>

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> & SessionRelations

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
}))

// SESSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type SessionPartialRelations = {
  user?: UserPartialWithRelations;
};

export type SessionPartialWithRelations = z.infer<typeof SessionPartialSchema> & SessionPartialRelations

export const SessionPartialWithRelationsSchema: z.ZodType<SessionPartialWithRelations> = SessionPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type SessionWithPartialRelations = z.infer<typeof SessionSchema> & SessionPartialRelations

export const SessionWithPartialRelationsSchema: z.ZodType<SessionWithPartialRelations> = SessionSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const VerificationTokenCustomValidatorsSchema = VerificationTokenSchema.strip()

export type VerificationTokenCustomValidators = z.infer<typeof VerificationTokenCustomValidatorsSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const VerificationTokenPartialSchema = VerificationTokenSchema.partial()

export type VerificationTokenPartial = z.infer<typeof VerificationTokenPartialSchema>

/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////

export const WorkspaceSchema = z.object({
  id: z.string().cuid(),
  name: z.string().trim().min(1).max(255),
  image: z.string().nullable(),
  issueCount: z.number().int(),
})

export type Workspace = z.infer<typeof WorkspaceSchema>

/////////////////////////////////////////
// WORKSPACE CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const WorkspaceCustomValidatorsSchema = WorkspaceSchema.strip()

export type WorkspaceCustomValidators = z.infer<typeof WorkspaceCustomValidatorsSchema>

/////////////////////////////////////////
// WORKSPACE PARTIAL SCHEMA
/////////////////////////////////////////

export const WorkspacePartialSchema = WorkspaceSchema.partial()

export type WorkspacePartial = z.infer<typeof WorkspacePartialSchema>

// WORKSPACE RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceRelations = {
  members: WorkspaceMemberWithRelations[];
  issues: IssueWithRelations[];
  workspaceInvite: WorkspaceInviteWithRelations[];
  githubAppInstallation: GithubAppInstallationWithRelations[];
};

export type WorkspaceWithRelations = z.infer<typeof WorkspaceSchema> & WorkspaceRelations

export const WorkspaceWithRelationsSchema: z.ZodType<WorkspaceWithRelations> = WorkspaceSchema.merge(z.object({
  members: z.lazy(() => WorkspaceMemberWithRelationsSchema).array(),
  issues: z.lazy(() => IssueWithRelationsSchema).array(),
  workspaceInvite: z.lazy(() => WorkspaceInviteWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationWithRelationsSchema).array(),
}))

// WORKSPACE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type WorkspacePartialRelations = {
  members?: WorkspaceMemberPartialWithRelations[];
  issues?: IssuePartialWithRelations[];
  workspaceInvite?: WorkspaceInvitePartialWithRelations[];
  githubAppInstallation?: GithubAppInstallationPartialWithRelations[];
};

export type WorkspacePartialWithRelations = z.infer<typeof WorkspacePartialSchema> & WorkspacePartialRelations

export const WorkspacePartialWithRelationsSchema: z.ZodType<WorkspacePartialWithRelations> = WorkspacePartialSchema.merge(z.object({
  members: z.lazy(() => WorkspaceMemberPartialWithRelationsSchema).array(),
  issues: z.lazy(() => IssuePartialWithRelationsSchema).array(),
  workspaceInvite: z.lazy(() => WorkspaceInvitePartialWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema).array(),
})).partial()

export type WorkspaceWithPartialRelations = z.infer<typeof WorkspaceSchema> & WorkspacePartialRelations

export const WorkspaceWithPartialRelationsSchema: z.ZodType<WorkspaceWithPartialRelations> = WorkspaceSchema.merge(z.object({
  members: z.lazy(() => WorkspaceMemberPartialWithRelationsSchema).array(),
  issues: z.lazy(() => IssuePartialWithRelationsSchema).array(),
  workspaceInvite: z.lazy(() => WorkspaceInvitePartialWithRelationsSchema).array(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// WORKSPACE MEMBER SCHEMA
/////////////////////////////////////////

export const WorkspaceMemberSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  userId: z.string(),
  workspaceId: z.string(),
  createdAt: z.coerce.date(),
})

export type WorkspaceMember = z.infer<typeof WorkspaceMemberSchema>

/////////////////////////////////////////
// WORKSPACE MEMBER CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const WorkspaceMemberCustomValidatorsSchema = WorkspaceMemberSchema.strip()

export type WorkspaceMemberCustomValidators = z.infer<typeof WorkspaceMemberCustomValidatorsSchema>

/////////////////////////////////////////
// WORKSPACE MEMBER PARTIAL SCHEMA
/////////////////////////////////////////

export const WorkspaceMemberPartialSchema = WorkspaceMemberSchema.partial()

export type WorkspaceMemberPartial = z.infer<typeof WorkspaceMemberPartialSchema>

// WORKSPACE MEMBER RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceMemberRelations = {
  user: UserWithRelations;
  workspace: WorkspaceWithRelations;
};

export type WorkspaceMemberWithRelations = z.infer<typeof WorkspaceMemberSchema> & WorkspaceMemberRelations

export const WorkspaceMemberWithRelationsSchema: z.ZodType<WorkspaceMemberWithRelations> = WorkspaceMemberSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  workspace: z.lazy(() => WorkspaceWithRelationsSchema),
}))

// WORKSPACE MEMBER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceMemberPartialRelations = {
  user?: UserPartialWithRelations;
  workspace?: WorkspacePartialWithRelations;
};

export type WorkspaceMemberPartialWithRelations = z.infer<typeof WorkspaceMemberPartialSchema> & WorkspaceMemberPartialRelations

export const WorkspaceMemberPartialWithRelationsSchema: z.ZodType<WorkspaceMemberPartialWithRelations> = WorkspaceMemberPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
})).partial()

export type WorkspaceMemberWithPartialRelations = z.infer<typeof WorkspaceMemberSchema> & WorkspaceMemberPartialRelations

export const WorkspaceMemberWithPartialRelationsSchema: z.ZodType<WorkspaceMemberWithPartialRelations> = WorkspaceMemberSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// WORKSPACE INVITE SCHEMA
/////////////////////////////////////////

export const WorkspaceInviteSchema = z.object({
  status: InviteStatusSchema,
  id: z.string().cuid(),
  email: z.string().email().trim().max(255),
  workspaceId: z.string(),
  invitedById: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type WorkspaceInvite = z.infer<typeof WorkspaceInviteSchema>

/////////////////////////////////////////
// WORKSPACE INVITE CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const WorkspaceInviteCustomValidatorsSchema = WorkspaceInviteSchema.strip()

export type WorkspaceInviteCustomValidators = z.infer<typeof WorkspaceInviteCustomValidatorsSchema>

/////////////////////////////////////////
// WORKSPACE INVITE PARTIAL SCHEMA
/////////////////////////////////////////

export const WorkspaceInvitePartialSchema = WorkspaceInviteSchema.partial()

export type WorkspaceInvitePartial = z.infer<typeof WorkspaceInvitePartialSchema>

// WORKSPACE INVITE RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceInviteRelations = {
  workspace: WorkspaceWithRelations;
  invitedBy: UserWithRelations;
};

export type WorkspaceInviteWithRelations = z.infer<typeof WorkspaceInviteSchema> & WorkspaceInviteRelations

export const WorkspaceInviteWithRelationsSchema: z.ZodType<WorkspaceInviteWithRelations> = WorkspaceInviteSchema.merge(z.object({
  workspace: z.lazy(() => WorkspaceWithRelationsSchema),
  invitedBy: z.lazy(() => UserWithRelationsSchema),
}))

// WORKSPACE INVITE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceInvitePartialRelations = {
  workspace?: WorkspacePartialWithRelations;
  invitedBy?: UserPartialWithRelations;
};

export type WorkspaceInvitePartialWithRelations = z.infer<typeof WorkspaceInvitePartialSchema> & WorkspaceInvitePartialRelations

export const WorkspaceInvitePartialWithRelationsSchema: z.ZodType<WorkspaceInvitePartialWithRelations> = WorkspaceInvitePartialSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  invitedBy: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type WorkspaceInviteWithPartialRelations = z.infer<typeof WorkspaceInviteSchema> & WorkspaceInvitePartialRelations

export const WorkspaceInviteWithPartialRelationsSchema: z.ZodType<WorkspaceInviteWithPartialRelations> = WorkspaceInviteSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  invitedBy: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ISSUE SCHEMA
/////////////////////////////////////////

export const IssueSchema = z.object({
  status: StatusSchema,
  priority: PrioritySchema,
  id: z.string().cuid(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).nullable(),
  workspaceId: z.string(),
  assigneeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Issue = z.infer<typeof IssueSchema>

/////////////////////////////////////////
// ISSUE CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const IssueCustomValidatorsSchema = IssueSchema.strip()

export type IssueCustomValidators = z.infer<typeof IssueCustomValidatorsSchema>

/////////////////////////////////////////
// ISSUE PARTIAL SCHEMA
/////////////////////////////////////////

export const IssuePartialSchema = IssueSchema.partial()

export type IssuePartial = z.infer<typeof IssuePartialSchema>

// ISSUE RELATION SCHEMA
//------------------------------------------------------

export type IssueRelations = {
  workspace: WorkspaceWithRelations;
  assignee: UserWithRelations;
  comments: CommentWithRelations[];
  notifications: NotificationWithRelations[];
};

export type IssueWithRelations = z.infer<typeof IssueSchema> & IssueRelations

export const IssueWithRelationsSchema: z.ZodType<IssueWithRelations> = IssueSchema.merge(z.object({
  workspace: z.lazy(() => WorkspaceWithRelationsSchema),
  assignee: z.lazy(() => UserWithRelationsSchema),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationWithRelationsSchema).array(),
}))

// ISSUE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type IssuePartialRelations = {
  workspace?: WorkspacePartialWithRelations;
  assignee?: UserPartialWithRelations;
  comments?: CommentPartialWithRelations[];
  notifications?: NotificationPartialWithRelations[];
};

export type IssuePartialWithRelations = z.infer<typeof IssuePartialSchema> & IssuePartialRelations

export const IssuePartialWithRelationsSchema: z.ZodType<IssuePartialWithRelations> = IssuePartialSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  assignee: z.lazy(() => UserPartialWithRelationsSchema),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
})).partial()

export type IssueWithPartialRelations = z.infer<typeof IssueSchema> & IssuePartialRelations

export const IssueWithPartialRelationsSchema: z.ZodType<IssueWithPartialRelations> = IssueSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  assignee: z.lazy(() => UserPartialWithRelationsSchema),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  notifications: z.lazy(() => NotificationPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean(),
  issueId: z.string(),
  isSystem: z.boolean(),
  authorId: z.string().nullable(),
  parentId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// COMMENT CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const CommentCustomValidatorsSchema = CommentSchema.strip()

export type CommentCustomValidators = z.infer<typeof CommentCustomValidatorsSchema>

/////////////////////////////////////////
// COMMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const CommentPartialSchema = CommentSchema.partial()

export type CommentPartial = z.infer<typeof CommentPartialSchema>

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  issue: IssueWithRelations;
  author?: UserWithRelations | null;
  parent?: CommentWithRelations | null;
  children: CommentWithRelations[];
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  issue: z.lazy(() => IssueWithRelationsSchema),
  author: z.lazy(() => UserWithRelationsSchema).nullable(),
  parent: z.lazy(() => CommentWithRelationsSchema).nullable(),
  children: z.lazy(() => CommentWithRelationsSchema).array(),
}))

// COMMENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommentPartialRelations = {
  issue?: IssuePartialWithRelations;
  author?: UserPartialWithRelations | null;
  parent?: CommentPartialWithRelations | null;
  children?: CommentPartialWithRelations[];
};

export type CommentPartialWithRelations = z.infer<typeof CommentPartialSchema> & CommentPartialRelations

export const CommentPartialWithRelationsSchema: z.ZodType<CommentPartialWithRelations> = CommentPartialSchema.merge(z.object({
  issue: z.lazy(() => IssuePartialWithRelationsSchema),
  author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
  parent: z.lazy(() => CommentPartialWithRelationsSchema).nullable(),
  children: z.lazy(() => CommentPartialWithRelationsSchema).array(),
})).partial()

export type CommentWithPartialRelations = z.infer<typeof CommentSchema> & CommentPartialRelations

export const CommentWithPartialRelationsSchema: z.ZodType<CommentWithPartialRelations> = CommentSchema.merge(z.object({
  issue: z.lazy(() => IssuePartialWithRelationsSchema),
  author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
  parent: z.lazy(() => CommentPartialWithRelationsSchema).nullable(),
  children: z.lazy(() => CommentPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// GITHUB APP INSTALLATION SCHEMA
/////////////////////////////////////////

export const GithubAppInstallationSchema = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdById: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type GithubAppInstallation = z.infer<typeof GithubAppInstallationSchema>

/////////////////////////////////////////
// GITHUB APP INSTALLATION CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const GithubAppInstallationCustomValidatorsSchema = GithubAppInstallationSchema.strip()

export type GithubAppInstallationCustomValidators = z.infer<typeof GithubAppInstallationCustomValidatorsSchema>

/////////////////////////////////////////
// GITHUB APP INSTALLATION PARTIAL SCHEMA
/////////////////////////////////////////

export const GithubAppInstallationPartialSchema = GithubAppInstallationSchema.partial()

export type GithubAppInstallationPartial = z.infer<typeof GithubAppInstallationPartialSchema>

// GITHUB APP INSTALLATION RELATION SCHEMA
//------------------------------------------------------

export type GithubAppInstallationRelations = {
  workspace: WorkspaceWithRelations;
  createdBy: UserWithRelations;
  githubWikiFile: GithubWikiFileWithRelations[];
};

export type GithubAppInstallationWithRelations = z.infer<typeof GithubAppInstallationSchema> & GithubAppInstallationRelations

export const GithubAppInstallationWithRelationsSchema: z.ZodType<GithubAppInstallationWithRelations> = GithubAppInstallationSchema.merge(z.object({
  workspace: z.lazy(() => WorkspaceWithRelationsSchema),
  createdBy: z.lazy(() => UserWithRelationsSchema),
  githubWikiFile: z.lazy(() => GithubWikiFileWithRelationsSchema).array(),
}))

// GITHUB APP INSTALLATION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type GithubAppInstallationPartialRelations = {
  workspace?: WorkspacePartialWithRelations;
  createdBy?: UserPartialWithRelations;
  githubWikiFile?: GithubWikiFilePartialWithRelations[];
};

export type GithubAppInstallationPartialWithRelations = z.infer<typeof GithubAppInstallationPartialSchema> & GithubAppInstallationPartialRelations

export const GithubAppInstallationPartialWithRelationsSchema: z.ZodType<GithubAppInstallationPartialWithRelations> = GithubAppInstallationPartialSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  createdBy: z.lazy(() => UserPartialWithRelationsSchema),
  githubWikiFile: z.lazy(() => GithubWikiFilePartialWithRelationsSchema).array(),
})).partial()

export type GithubAppInstallationWithPartialRelations = z.infer<typeof GithubAppInstallationSchema> & GithubAppInstallationPartialRelations

export const GithubAppInstallationWithPartialRelationsSchema: z.ZodType<GithubAppInstallationWithPartialRelations> = GithubAppInstallationSchema.merge(z.object({
  workspace: z.lazy(() => WorkspacePartialWithRelationsSchema),
  createdBy: z.lazy(() => UserPartialWithRelationsSchema),
  githubWikiFile: z.lazy(() => GithubWikiFilePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// GITHUB WIKI FILE SCHEMA
/////////////////////////////////////////

export const GithubWikiFileSchema = z.object({
  id: z.string().cuid(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).nullable(),
  installationId: z.number().int(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).nullable(),
  isModified: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type GithubWikiFile = z.infer<typeof GithubWikiFileSchema>

/////////////////////////////////////////
// GITHUB WIKI FILE CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const GithubWikiFileCustomValidatorsSchema = GithubWikiFileSchema.strip()

export type GithubWikiFileCustomValidators = z.infer<typeof GithubWikiFileCustomValidatorsSchema>

/////////////////////////////////////////
// GITHUB WIKI FILE PARTIAL SCHEMA
/////////////////////////////////////////

export const GithubWikiFilePartialSchema = GithubWikiFileSchema.partial()

export type GithubWikiFilePartial = z.infer<typeof GithubWikiFilePartialSchema>

// GITHUB WIKI FILE RELATION SCHEMA
//------------------------------------------------------

export type GithubWikiFileRelations = {
  installation: GithubAppInstallationWithRelations;
};

export type GithubWikiFileWithRelations = z.infer<typeof GithubWikiFileSchema> & GithubWikiFileRelations

export const GithubWikiFileWithRelationsSchema: z.ZodType<GithubWikiFileWithRelations> = GithubWikiFileSchema.merge(z.object({
  installation: z.lazy(() => GithubAppInstallationWithRelationsSchema),
}))

// GITHUB WIKI FILE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type GithubWikiFilePartialRelations = {
  installation?: GithubAppInstallationPartialWithRelations;
};

export type GithubWikiFilePartialWithRelations = z.infer<typeof GithubWikiFilePartialSchema> & GithubWikiFilePartialRelations

export const GithubWikiFilePartialWithRelationsSchema: z.ZodType<GithubWikiFilePartialWithRelations> = GithubWikiFilePartialSchema.merge(z.object({
  installation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema),
})).partial()

export type GithubWikiFileWithPartialRelations = z.infer<typeof GithubWikiFileSchema> & GithubWikiFilePartialRelations

export const GithubWikiFileWithPartialRelationsSchema: z.ZodType<GithubWikiFileWithPartialRelations> = GithubWikiFileSchema.merge(z.object({
  installation: z.lazy(() => GithubAppInstallationPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  id: z.string().cuid(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().nullable(),
  isRead: z.boolean(),
  isEmailSent: z.boolean(),
  senderId: z.string(),
  recipientId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Notification = z.infer<typeof NotificationSchema>

/////////////////////////////////////////
// NOTIFICATION CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const NotificationCustomValidatorsSchema = NotificationSchema.strip()

export type NotificationCustomValidators = z.infer<typeof NotificationCustomValidatorsSchema>

/////////////////////////////////////////
// NOTIFICATION PARTIAL SCHEMA
/////////////////////////////////////////

export const NotificationPartialSchema = NotificationSchema.partial()

export type NotificationPartial = z.infer<typeof NotificationPartialSchema>

// NOTIFICATION RELATION SCHEMA
//------------------------------------------------------

export type NotificationRelations = {
  issue?: IssueWithRelations | null;
  sender: UserWithRelations;
  recipient: UserWithRelations;
};

export type NotificationWithRelations = z.infer<typeof NotificationSchema> & NotificationRelations

export const NotificationWithRelationsSchema: z.ZodType<NotificationWithRelations> = NotificationSchema.merge(z.object({
  issue: z.lazy(() => IssueWithRelationsSchema).nullable(),
  sender: z.lazy(() => UserWithRelationsSchema),
  recipient: z.lazy(() => UserWithRelationsSchema),
}))

// NOTIFICATION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type NotificationPartialRelations = {
  issue?: IssuePartialWithRelations | null;
  sender?: UserPartialWithRelations;
  recipient?: UserPartialWithRelations;
};

export type NotificationPartialWithRelations = z.infer<typeof NotificationPartialSchema> & NotificationPartialRelations

export const NotificationPartialWithRelationsSchema: z.ZodType<NotificationPartialWithRelations> = NotificationPartialSchema.merge(z.object({
  issue: z.lazy(() => IssuePartialWithRelationsSchema).nullable(),
  sender: z.lazy(() => UserPartialWithRelationsSchema),
  recipient: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type NotificationWithPartialRelations = z.infer<typeof NotificationSchema> & NotificationPartialRelations

export const NotificationWithPartialRelationsSchema: z.ZodType<NotificationWithPartialRelations> = NotificationSchema.merge(z.object({
  issue: z.lazy(() => IssuePartialWithRelationsSchema).nullable(),
  sender: z.lazy(() => UserPartialWithRelationsSchema),
  recipient: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  workspaces: z.union([z.boolean(),z.lazy(() => WorkspaceMemberFindManyArgsSchema)]).optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssueFindManyArgsSchema)]).optional(),
  workspacesInvites: z.union([z.boolean(),z.lazy(() => WorkspaceInviteFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  githubAppInstallation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  notificationsSent: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  workspaces: z.boolean().optional(),
  issues: z.boolean().optional(),
  workspacesInvites: z.boolean().optional(),
  comments: z.boolean().optional(),
  githubAppInstallation: z.boolean().optional(),
  notifications: z.boolean().optional(),
  notificationsSent: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  workspaces: z.union([z.boolean(),z.lazy(() => WorkspaceMemberFindManyArgsSchema)]).optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssueFindManyArgsSchema)]).optional(),
  workspacesInvites: z.union([z.boolean(),z.lazy(() => WorkspaceInviteFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  githubAppInstallation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  notificationsSent: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// WORKSPACE
//------------------------------------------------------

export const WorkspaceIncludeSchema: z.ZodType<Prisma.WorkspaceInclude> = z.object({
  members: z.union([z.boolean(),z.lazy(() => WorkspaceMemberFindManyArgsSchema)]).optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssueFindManyArgsSchema)]).optional(),
  workspaceInvite: z.union([z.boolean(),z.lazy(() => WorkspaceInviteFindManyArgsSchema)]).optional(),
  githubAppInstallation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkspaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkspaceArgsSchema: z.ZodType<Prisma.WorkspaceDefaultArgs> = z.object({
  select: z.lazy(() => WorkspaceSelectSchema).optional(),
  include: z.lazy(() => WorkspaceIncludeSchema).optional(),
}).strict();

export const WorkspaceCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkspaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkspaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkspaceCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkspaceCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
  issues: z.boolean().optional(),
  workspaceInvite: z.boolean().optional(),
  githubAppInstallation: z.boolean().optional(),
}).strict();

export const WorkspaceSelectSchema: z.ZodType<Prisma.WorkspaceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  issueCount: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => WorkspaceMemberFindManyArgsSchema)]).optional(),
  issues: z.union([z.boolean(),z.lazy(() => IssueFindManyArgsSchema)]).optional(),
  workspaceInvite: z.union([z.boolean(),z.lazy(() => WorkspaceInviteFindManyArgsSchema)]).optional(),
  githubAppInstallation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkspaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKSPACE MEMBER
//------------------------------------------------------

export const WorkspaceMemberIncludeSchema: z.ZodType<Prisma.WorkspaceMemberInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
}).strict()

export const WorkspaceMemberArgsSchema: z.ZodType<Prisma.WorkspaceMemberDefaultArgs> = z.object({
  select: z.lazy(() => WorkspaceMemberSelectSchema).optional(),
  include: z.lazy(() => WorkspaceMemberIncludeSchema).optional(),
}).strict();

export const WorkspaceMemberSelectSchema: z.ZodType<Prisma.WorkspaceMemberSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  userId: z.boolean().optional(),
  workspaceId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
}).strict()

// WORKSPACE INVITE
//------------------------------------------------------

export const WorkspaceInviteIncludeSchema: z.ZodType<Prisma.WorkspaceInviteInclude> = z.object({
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  invitedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const WorkspaceInviteArgsSchema: z.ZodType<Prisma.WorkspaceInviteDefaultArgs> = z.object({
  select: z.lazy(() => WorkspaceInviteSelectSchema).optional(),
  include: z.lazy(() => WorkspaceInviteIncludeSchema).optional(),
}).strict();

export const WorkspaceInviteSelectSchema: z.ZodType<Prisma.WorkspaceInviteSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  workspaceId: z.boolean().optional(),
  invitedById: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  invitedBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ISSUE
//------------------------------------------------------

export const IssueIncludeSchema: z.ZodType<Prisma.IssueInclude> = z.object({
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  assignee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IssueCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IssueArgsSchema: z.ZodType<Prisma.IssueDefaultArgs> = z.object({
  select: z.lazy(() => IssueSelectSchema).optional(),
  include: z.lazy(() => IssueIncludeSchema).optional(),
}).strict();

export const IssueCountOutputTypeArgsSchema: z.ZodType<Prisma.IssueCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => IssueCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IssueCountOutputTypeSelectSchema: z.ZodType<Prisma.IssueCountOutputTypeSelect> = z.object({
  comments: z.boolean().optional(),
  notifications: z.boolean().optional(),
}).strict();

export const IssueSelectSchema: z.ZodType<Prisma.IssueSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  priority: z.boolean().optional(),
  workspaceId: z.boolean().optional(),
  assigneeId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  assignee: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  notifications: z.union([z.boolean(),z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IssueCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
  issue: z.union([z.boolean(),z.lazy(() => IssueArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommentCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> = z.object({
  children: z.boolean().optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  body: z.boolean().optional(),
  isEdited: z.boolean().optional(),
  issueId: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  authorId: z.boolean().optional(),
  parentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  issue: z.union([z.boolean(),z.lazy(() => IssueArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  parent: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  children: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GITHUB APP INSTALLATION
//------------------------------------------------------

export const GithubAppInstallationIncludeSchema: z.ZodType<Prisma.GithubAppInstallationInclude> = z.object({
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  githubWikiFile: z.union([z.boolean(),z.lazy(() => GithubWikiFileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GithubAppInstallationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GithubAppInstallationArgsSchema: z.ZodType<Prisma.GithubAppInstallationDefaultArgs> = z.object({
  select: z.lazy(() => GithubAppInstallationSelectSchema).optional(),
  include: z.lazy(() => GithubAppInstallationIncludeSchema).optional(),
}).strict();

export const GithubAppInstallationCountOutputTypeArgsSchema: z.ZodType<Prisma.GithubAppInstallationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GithubAppInstallationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GithubAppInstallationCountOutputTypeSelectSchema: z.ZodType<Prisma.GithubAppInstallationCountOutputTypeSelect> = z.object({
  githubWikiFile: z.boolean().optional(),
}).strict();

export const GithubAppInstallationSelectSchema: z.ZodType<Prisma.GithubAppInstallationSelect> = z.object({
  id: z.boolean().optional(),
  workspaceId: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  workspace: z.union([z.boolean(),z.lazy(() => WorkspaceArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  githubWikiFile: z.union([z.boolean(),z.lazy(() => GithubWikiFileFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GithubAppInstallationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GITHUB WIKI FILE
//------------------------------------------------------

export const GithubWikiFileIncludeSchema: z.ZodType<Prisma.GithubWikiFileInclude> = z.object({
  installation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationArgsSchema)]).optional(),
}).strict()

export const GithubWikiFileArgsSchema: z.ZodType<Prisma.GithubWikiFileDefaultArgs> = z.object({
  select: z.lazy(() => GithubWikiFileSelectSchema).optional(),
  include: z.lazy(() => GithubWikiFileIncludeSchema).optional(),
}).strict();

export const GithubWikiFileSelectSchema: z.ZodType<Prisma.GithubWikiFileSelect> = z.object({
  id: z.boolean().optional(),
  path: z.boolean().optional(),
  previousPath: z.boolean().optional(),
  installationId: z.boolean().optional(),
  githubRepositoryId: z.boolean().optional(),
  content: z.boolean().optional(),
  isModified: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  installation: z.union([z.boolean(),z.lazy(() => GithubAppInstallationArgsSchema)]).optional(),
}).strict()

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> = z.object({
  issue: z.union([z.boolean(),z.lazy(() => IssueArgsSchema)]).optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  recipient: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> = z.object({
  select: z.lazy(() => NotificationSelectSchema).optional(),
  include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z.object({
  id: z.boolean().optional(),
  message: z.boolean().optional(),
  issueId: z.boolean().optional(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.boolean().optional(),
  recipientId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  issue: z.union([z.boolean(),z.lazy(() => IssueArgsSchema)]).optional(),
  sender: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  recipient: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberListRelationFilterSchema).optional(),
  issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  notificationsSent: z.lazy(() => NotificationListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberOrderByRelationAggregateInputSchema).optional(),
  issues: z.lazy(() => IssueOrderByRelationAggregateInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string().trim().min(1).max(255)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string().trim().min(1).max(255),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().trim().min(1).max(255).optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(255) ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberListRelationFilterSchema).optional(),
  issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
  notificationsSent: z.lazy(() => NotificationListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountWhereInput>;

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.AccountOrderByWithRelationInput>;

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.AccountWhereUniqueInput>;

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.AccountOrderByWithAggregationInput>;

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput>;

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionWhereInput>;

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.SessionOrderByWithRelationInput>;

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.SessionWhereUniqueInput>;

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.SessionOrderByWithAggregationInput>;

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput>;

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenWhereInput>;

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput>;

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
})
.and(z.object({
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict()) as z.ZodType<Prisma.VerificationTokenWhereUniqueInput>;

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput>;

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput>;

export const WorkspaceWhereInputSchema: z.ZodType<Prisma.WorkspaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceWhereInputSchema),z.lazy(() => WorkspaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceWhereInputSchema),z.lazy(() => WorkspaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  issueCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  members: z.lazy(() => WorkspaceMemberListRelationFilterSchema).optional(),
  issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteListRelationFilterSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceWhereInput>;

export const WorkspaceOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkspaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  issueCount: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => WorkspaceMemberOrderByRelationAggregateInputSchema).optional(),
  issues: z.lazy(() => IssueOrderByRelationAggregateInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteOrderByRelationAggregateInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceOrderByWithRelationInput>;

export const WorkspaceWhereUniqueInputSchema: z.ZodType<Prisma.WorkspaceWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => WorkspaceWhereInputSchema),z.lazy(() => WorkspaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceWhereInputSchema),z.lazy(() => WorkspaceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(255) ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  issueCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  members: z.lazy(() => WorkspaceMemberListRelationFilterSchema).optional(),
  issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteListRelationFilterSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.WorkspaceWhereUniqueInput>;

export const WorkspaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkspaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  issueCount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkspaceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkspaceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkspaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkspaceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkspaceSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceOrderByWithAggregationInput>;

export const WorkspaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkspaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  issueCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceScalarWhereWithAggregatesInput>;

export const WorkspaceMemberWhereInputSchema: z.ZodType<Prisma.WorkspaceMemberWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceMemberWhereInputSchema),z.lazy(() => WorkspaceMemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceMemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceMemberWhereInputSchema),z.lazy(() => WorkspaceMemberWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberWhereInput>;

export const WorkspaceMemberOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkspaceMemberOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  workspace: z.lazy(() => WorkspaceOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberOrderByWithRelationInput>;

export const WorkspaceMemberWhereUniqueInputSchema: z.ZodType<Prisma.WorkspaceMemberWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_workspaceId: z.lazy(() => WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_workspaceId: z.lazy(() => WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_workspaceId: z.lazy(() => WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => WorkspaceMemberWhereInputSchema),z.lazy(() => WorkspaceMemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceMemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceMemberWhereInputSchema),z.lazy(() => WorkspaceMemberWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.WorkspaceMemberWhereUniqueInput>;

export const WorkspaceMemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkspaceMemberOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkspaceMemberCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkspaceMemberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkspaceMemberMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberOrderByWithAggregationInput>;

export const WorkspaceMemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkspaceMemberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceMemberScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceMemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceMemberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceMemberScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceMemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberScalarWhereWithAggregatesInput>;

export const WorkspaceInviteWhereInputSchema: z.ZodType<Prisma.WorkspaceInviteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceInviteWhereInputSchema),z.lazy(() => WorkspaceInviteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceInviteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceInviteWhereInputSchema),z.lazy(() => WorkspaceInviteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInviteStatusFilterSchema),z.lazy(() => InviteStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteWhereInput>;

export const WorkspaceInviteOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkspaceInviteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  invitedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  workspace: z.lazy(() => WorkspaceOrderByWithRelationInputSchema).optional(),
  invitedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteOrderByWithRelationInput>;

export const WorkspaceInviteWhereUniqueInputSchema: z.ZodType<Prisma.WorkspaceInviteWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email_workspaceId: z.lazy(() => WorkspaceInviteEmailWorkspaceIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email_workspaceId: z.lazy(() => WorkspaceInviteEmailWorkspaceIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email_workspaceId: z.lazy(() => WorkspaceInviteEmailWorkspaceIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => WorkspaceInviteWhereInputSchema),z.lazy(() => WorkspaceInviteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceInviteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceInviteWhereInputSchema),z.lazy(() => WorkspaceInviteWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string().email().trim().max(255) ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInviteStatusFilterSchema),z.lazy(() => InviteStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  invitedBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.WorkspaceInviteWhereUniqueInput>;

export const WorkspaceInviteOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkspaceInviteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  invitedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkspaceInviteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkspaceInviteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkspaceInviteMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteOrderByWithAggregationInput>;

export const WorkspaceInviteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkspaceInviteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceInviteScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceInviteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceInviteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceInviteScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkspaceInviteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  invitedById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInviteStatusWithAggregatesFilterSchema),z.lazy(() => InviteStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteScalarWhereWithAggregatesInput>;

export const IssueWhereInputSchema: z.ZodType<Prisma.IssueWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IssueWhereInputSchema),z.lazy(() => IssueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssueWhereInputSchema),z.lazy(() => IssueWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assigneeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  assignee: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IssueWhereInput>;

export const IssueOrderByWithRelationInputSchema: z.ZodType<Prisma.IssueOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  workspace: z.lazy(() => WorkspaceOrderByWithRelationInputSchema).optional(),
  assignee: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueOrderByWithRelationInput>;

export const IssueWhereUniqueInputSchema: z.ZodType<Prisma.IssueWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    identifier_workspaceId: z.lazy(() => IssueIdentifierWorkspaceIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    identifier_workspaceId: z.lazy(() => IssueIdentifierWorkspaceIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  identifier_workspaceId: z.lazy(() => IssueIdentifierWorkspaceIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => IssueWhereInputSchema),z.lazy(() => IssueWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssueWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssueWhereInputSchema),z.lazy(() => IssueWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(255) ]).optional(),
  description: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assigneeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  assignee: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  notifications: z.lazy(() => NotificationListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.IssueWhereUniqueInput>;

export const IssueOrderByWithAggregationInputSchema: z.ZodType<Prisma.IssueOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IssueCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IssueAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IssueMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IssueMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IssueSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueOrderByWithAggregationInput>;

export const IssueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IssueScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IssueScalarWhereWithAggregatesInputSchema),z.lazy(() => IssueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssueScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssueScalarWhereWithAggregatesInputSchema),z.lazy(() => IssueScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityWithAggregatesFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assigneeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueScalarWhereWithAggregatesInput>;

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isEdited: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  issueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSystem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issue: z.union([ z.lazy(() => IssueScalarRelationFilterSchema),z.lazy(() => IssueWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  parent: z.union([ z.lazy(() => CommentNullableScalarRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.CommentWhereInput>;

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  isEdited: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isSystem: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  issue: z.lazy(() => IssueOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  parent: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
  children: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentOrderByWithRelationInput>;

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(1000) ]).optional(),
  isEdited: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  issueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSystem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issue: z.union([ z.lazy(() => IssueScalarRelationFilterSchema),z.lazy(() => IssueWhereInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  parent: z.union([ z.lazy(() => CommentNullableScalarRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  children: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.CommentWhereUniqueInput>;

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  isEdited: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isSystem: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentOrderByWithAggregationInput>;

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isEdited: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  issueId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isSystem: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput>;

export const GithubAppInstallationWhereInputSchema: z.ZodType<Prisma.GithubAppInstallationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GithubAppInstallationWhereInputSchema),z.lazy(() => GithubAppInstallationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubAppInstallationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubAppInstallationWhereInputSchema),z.lazy(() => GithubAppInstallationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileListRelationFilterSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationWhereInput>;

export const GithubAppInstallationOrderByWithRelationInputSchema: z.ZodType<Prisma.GithubAppInstallationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  workspace: z.lazy(() => WorkspaceOrderByWithRelationInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileOrderByRelationAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationOrderByWithRelationInput>;

export const GithubAppInstallationWhereUniqueInputSchema: z.ZodType<Prisma.GithubAppInstallationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => GithubAppInstallationWhereInputSchema),z.lazy(() => GithubAppInstallationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubAppInstallationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubAppInstallationWhereInputSchema),z.lazy(() => GithubAppInstallationWhereInputSchema).array() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  workspace: z.union([ z.lazy(() => WorkspaceScalarRelationFilterSchema),z.lazy(() => WorkspaceWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileListRelationFilterSchema).optional()
}).strict()) as z.ZodType<Prisma.GithubAppInstallationWhereUniqueInput>;

export const GithubAppInstallationOrderByWithAggregationInputSchema: z.ZodType<Prisma.GithubAppInstallationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GithubAppInstallationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GithubAppInstallationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GithubAppInstallationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GithubAppInstallationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GithubAppInstallationSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationOrderByWithAggregationInput>;

export const GithubAppInstallationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GithubAppInstallationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GithubAppInstallationScalarWhereWithAggregatesInputSchema),z.lazy(() => GithubAppInstallationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubAppInstallationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubAppInstallationScalarWhereWithAggregatesInputSchema),z.lazy(() => GithubAppInstallationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationScalarWhereWithAggregatesInput>;

export const GithubWikiFileWhereInputSchema: z.ZodType<Prisma.GithubWikiFileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GithubWikiFileWhereInputSchema),z.lazy(() => GithubWikiFileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubWikiFileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubWikiFileWhereInputSchema),z.lazy(() => GithubWikiFileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  previousPath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  installationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  githubRepositoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  isModified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  installation: z.union([ z.lazy(() => GithubAppInstallationScalarRelationFilterSchema),z.lazy(() => GithubAppInstallationWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileWhereInput>;

export const GithubWikiFileOrderByWithRelationInputSchema: z.ZodType<Prisma.GithubWikiFileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  previousPath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isModified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  installation: z.lazy(() => GithubAppInstallationOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileOrderByWithRelationInput>;

export const GithubWikiFileWhereUniqueInputSchema: z.ZodType<Prisma.GithubWikiFileWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    path_githubRepositoryId: z.lazy(() => GithubWikiFilePathGithubRepositoryIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    path_githubRepositoryId: z.lazy(() => GithubWikiFilePathGithubRepositoryIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  path_githubRepositoryId: z.lazy(() => GithubWikiFilePathGithubRepositoryIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => GithubWikiFileWhereInputSchema),z.lazy(() => GithubWikiFileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubWikiFileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubWikiFileWhereInputSchema),z.lazy(() => GithubWikiFileWhereInputSchema).array() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(255) ]).optional(),
  previousPath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string().trim().min(1).max(255) ]).optional().nullable(),
  installationId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  githubRepositoryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  content: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  isModified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  installation: z.union([ z.lazy(() => GithubAppInstallationScalarRelationFilterSchema),z.lazy(() => GithubAppInstallationWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.GithubWikiFileWhereUniqueInput>;

export const GithubWikiFileOrderByWithAggregationInputSchema: z.ZodType<Prisma.GithubWikiFileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  previousPath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isModified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GithubWikiFileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GithubWikiFileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GithubWikiFileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GithubWikiFileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GithubWikiFileSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileOrderByWithAggregationInput>;

export const GithubWikiFileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GithubWikiFileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GithubWikiFileScalarWhereWithAggregatesInputSchema),z.lazy(() => GithubWikiFileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubWikiFileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubWikiFileScalarWhereWithAggregatesInputSchema),z.lazy(() => GithubWikiFileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  previousPath: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  installationId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  githubRepositoryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  isModified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileScalarWhereWithAggregatesInput>;

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issueId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRead: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEmailSent: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issue: z.union([ z.lazy(() => IssueNullableScalarRelationFilterSchema),z.lazy(() => IssueWhereInputSchema) ]).optional().nullable(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  recipient: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationWhereInput>;

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  isEmailSent: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  recipientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  issue: z.lazy(() => IssueOrderByWithRelationInputSchema).optional(),
  sender: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  recipient: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationOrderByWithRelationInput>;

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationWhereInputSchema),z.lazy(() => NotificationWhereInputSchema).array() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string().trim().min(1).max(1000) ]).optional(),
  issueId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRead: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEmailSent: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  issue: z.union([ z.lazy(() => IssueNullableScalarRelationFilterSchema),z.lazy(() => IssueWhereInputSchema) ]).optional().nullable(),
  sender: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  recipient: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict()) as z.ZodType<Prisma.NotificationWhereUniqueInput>;

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  isEmailSent: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  recipientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationOrderByWithAggregationInput>;

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  issueId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isRead: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isEmailSent: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  senderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recipientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict() as z.ZodType<Prisma.AccountCreateInput>;

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.AccountUncheckedCreateInput>;

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.AccountUpdateInput>;

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedUpdateInput>;

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.AccountCreateManyInput>;

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUpdateManyMutationInput>;

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyInput>;

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict() as z.ZodType<Prisma.SessionCreateInput>;

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.SessionUncheckedCreateInput>;

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.SessionUpdateInput>;

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedUpdateInput>;

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.SessionCreateManyInput>;

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUpdateManyMutationInput>;

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyInput>;

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict() as z.ZodType<Prisma.VerificationTokenCreateInput>;

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict() as z.ZodType<Prisma.VerificationTokenUncheckedCreateInput>;

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenUpdateInput>;

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput>;

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict() as z.ZodType<Prisma.VerificationTokenCreateManyInput>;

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput>;

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput>;

export const WorkspaceCreateInputSchema: z.ZodType<Prisma.WorkspaceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateInput>;

export const WorkspaceUncheckedCreateInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateInput>;

export const WorkspaceUpdateInputSchema: z.ZodType<Prisma.WorkspaceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpdateInput>;

export const WorkspaceUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateInput>;

export const WorkspaceCreateManyInputSchema: z.ZodType<Prisma.WorkspaceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateManyInput>;

export const WorkspaceUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkspaceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateManyMutationInput>;

export const WorkspaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateManyInput>;

export const WorkspaceMemberCreateInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkspacesInputSchema),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutMembersInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateInput>;

export const WorkspaceMemberUncheckedCreateInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedCreateInput>;

export const WorkspaceMemberUpdateInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkspacesNestedInputSchema).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateInput>;

export const WorkspaceMemberUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateInput>;

export const WorkspaceMemberCreateManyInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyInput>;

export const WorkspaceMemberUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyMutationInput>;

export const WorkspaceMemberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyInput>;

export const WorkspaceInviteCreateInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutWorkspaceInviteInputSchema),
  invitedBy: z.lazy(() => UserCreateNestedOneWithoutWorkspacesInvitesInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateInput>;

export const WorkspaceInviteUncheckedCreateInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  workspaceId: z.string(),
  invitedById: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedCreateInput>;

export const WorkspaceInviteUpdateInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutWorkspaceInviteNestedInputSchema).optional(),
  invitedBy: z.lazy(() => UserUpdateOneRequiredWithoutWorkspacesInvitesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateInput>;

export const WorkspaceInviteUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateInput>;

export const WorkspaceInviteCreateManyInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  workspaceId: z.string(),
  invitedById: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyInput>;

export const WorkspaceInviteUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyMutationInput>;

export const WorkspaceInviteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyInput>;

export const IssueCreateInputSchema: z.ZodType<Prisma.IssueCreateInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
  assignee: z.lazy(() => UserCreateNestedOneWithoutIssuesInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateInput>;

export const IssueUncheckedCreateInputSchema: z.ZodType<Prisma.IssueUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateInput>;

export const IssueUpdateInputSchema: z.ZodType<Prisma.IssueUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  assignee: z.lazy(() => UserUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpdateInput>;

export const IssueUncheckedUpdateInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateInput>;

export const IssueCreateManyInputSchema: z.ZodType<Prisma.IssueCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.IssueCreateManyInput>;

export const IssueUpdateManyMutationInputSchema: z.ZodType<Prisma.IssueUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateManyMutationInput>;

export const IssueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyInput>;

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema).optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateInput>;

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateInput>;

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpdateInput>;

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateInput>;

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyInput>;

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateManyMutationInput>;

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyInput>;

export const GithubAppInstallationCreateInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateInput> = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutGithubAppInstallationInputSchema),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutGithubAppInstallationInputSchema),
  githubWikiFile: z.lazy(() => GithubWikiFileCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateInput>;

export const GithubAppInstallationUncheckedCreateInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateInput> = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateInput>;

export const GithubAppInstallationUpdateInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateInput>;

export const GithubAppInstallationUncheckedUpdateInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateInput>;

export const GithubAppInstallationCreateManyInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyInput> = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyInput>;

export const GithubAppInstallationUpdateManyMutationInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyMutationInput>;

export const GithubAppInstallationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyInput>;

export const GithubWikiFileCreateInputSchema: z.ZodType<Prisma.GithubWikiFileCreateInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  installation: z.lazy(() => GithubAppInstallationCreateNestedOneWithoutGithubWikiFileInputSchema)
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateInput>;

export const GithubWikiFileUncheckedCreateInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  installationId: z.number().int(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedCreateInput>;

export const GithubWikiFileUpdateInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  installation: z.lazy(() => GithubAppInstallationUpdateOneRequiredWithoutGithubWikiFileNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateInput>;

export const GithubWikiFileUncheckedUpdateInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  installationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedUpdateInput>;

export const GithubWikiFileCreateManyInputSchema: z.ZodType<Prisma.GithubWikiFileCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  installationId: z.number().int(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateManyInput>;

export const GithubWikiFileUpdateManyMutationInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateManyMutationInput>;

export const GithubWikiFileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  installationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyInput>;

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutNotificationsInputSchema).optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutNotificationsSentInputSchema),
  recipient: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema)
}).strict() as z.ZodType<Prisma.NotificationCreateInput>;

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateInput>;

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneWithoutNotificationsNestedInputSchema).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsSentNestedInputSchema).optional(),
  recipient: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationUpdateInput>;

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateInput>;

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManyInput>;

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyMutationInput>;

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.StringFilter>;

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.DateTimeNullableFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.StringNullableFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.DateTimeFilter>;

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.AccountListRelationFilter>;

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.SessionListRelationFilter>;

export const WorkspaceMemberListRelationFilterSchema: z.ZodType<Prisma.WorkspaceMemberListRelationFilter> = z.object({
  every: z.lazy(() => WorkspaceMemberWhereInputSchema).optional(),
  some: z.lazy(() => WorkspaceMemberWhereInputSchema).optional(),
  none: z.lazy(() => WorkspaceMemberWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberListRelationFilter>;

export const IssueListRelationFilterSchema: z.ZodType<Prisma.IssueListRelationFilter> = z.object({
  every: z.lazy(() => IssueWhereInputSchema).optional(),
  some: z.lazy(() => IssueWhereInputSchema).optional(),
  none: z.lazy(() => IssueWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueListRelationFilter>;

export const WorkspaceInviteListRelationFilterSchema: z.ZodType<Prisma.WorkspaceInviteListRelationFilter> = z.object({
  every: z.lazy(() => WorkspaceInviteWhereInputSchema).optional(),
  some: z.lazy(() => WorkspaceInviteWhereInputSchema).optional(),
  none: z.lazy(() => WorkspaceInviteWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteListRelationFilter>;

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentListRelationFilter>;

export const GithubAppInstallationListRelationFilterSchema: z.ZodType<Prisma.GithubAppInstallationListRelationFilter> = z.object({
  every: z.lazy(() => GithubAppInstallationWhereInputSchema).optional(),
  some: z.lazy(() => GithubAppInstallationWhereInputSchema).optional(),
  none: z.lazy(() => GithubAppInstallationWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationListRelationFilter>;

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> = z.object({
  every: z.lazy(() => NotificationWhereInputSchema).optional(),
  some: z.lazy(() => NotificationWhereInputSchema).optional(),
  none: z.lazy(() => NotificationWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SortOrderInput>;

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountOrderByRelationAggregateInput>;

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SessionOrderByRelationAggregateInput>;

export const WorkspaceMemberOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkspaceMemberOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberOrderByRelationAggregateInput>;

export const IssueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IssueOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueOrderByRelationAggregateInput>;

export const WorkspaceInviteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkspaceInviteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteOrderByRelationAggregateInput>;

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CommentOrderByRelationAggregateInput>;

export const GithubAppInstallationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationOrderByRelationAggregateInput>;

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.IntNullableFilter>;

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserScalarRelationFilter>;

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict() as z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput>;

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountCountOrderByAggregateInput>;

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountAvgOrderByAggregateInput>;

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountMaxOrderByAggregateInput>;

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountMinOrderByAggregateInput>;

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.AccountSumOrderByAggregateInput>;

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SessionCountOrderByAggregateInput>;

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SessionMaxOrderByAggregateInput>;

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.SessionMinOrderByAggregateInput>;

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict() as z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput>;

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput>;

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput>;

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IntFilter>;

export const WorkspaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  issueCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCountOrderByAggregateInput>;

export const WorkspaceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceAvgOrderByAggregateInput> = z.object({
  issueCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceAvgOrderByAggregateInput>;

export const WorkspaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  issueCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMaxOrderByAggregateInput>;

export const WorkspaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  issueCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMinOrderByAggregateInput>;

export const WorkspaceSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceSumOrderByAggregateInput> = z.object({
  issueCount: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceSumOrderByAggregateInput>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumRoleFilter>;

export const WorkspaceScalarRelationFilterSchema: z.ZodType<Prisma.WorkspaceScalarRelationFilter> = z.object({
  is: z.lazy(() => WorkspaceWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkspaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceScalarRelationFilter>;

export const WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInputSchema: z.ZodType<Prisma.WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  workspaceId: z.string()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUserIdWorkspaceIdCompoundUniqueInput>;

export const WorkspaceMemberCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMemberCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCountOrderByAggregateInput>;

export const WorkspaceMemberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMemberMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberMaxOrderByAggregateInput>;

export const WorkspaceMemberMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMemberMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberMinOrderByAggregateInput>;

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumRoleWithAggregatesFilter>;

export const EnumInviteStatusFilterSchema: z.ZodType<Prisma.EnumInviteStatusFilter> = z.object({
  equals: z.lazy(() => InviteStatusSchema).optional(),
  in: z.lazy(() => InviteStatusSchema).array().optional(),
  notIn: z.lazy(() => InviteStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => NestedEnumInviteStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumInviteStatusFilter>;

export const WorkspaceInviteEmailWorkspaceIdCompoundUniqueInputSchema: z.ZodType<Prisma.WorkspaceInviteEmailWorkspaceIdCompoundUniqueInput> = z.object({
  email: z.string(),
  workspaceId: z.string()
}).strict() as z.ZodType<Prisma.WorkspaceInviteEmailWorkspaceIdCompoundUniqueInput>;

export const WorkspaceInviteCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceInviteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  invitedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCountOrderByAggregateInput>;

export const WorkspaceInviteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceInviteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  invitedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteMaxOrderByAggregateInput>;

export const WorkspaceInviteMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceInviteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  invitedById: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteMinOrderByAggregateInput>;

export const EnumInviteStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumInviteStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InviteStatusSchema).optional(),
  in: z.lazy(() => InviteStatusSchema).array().optional(),
  notIn: z.lazy(() => InviteStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => NestedEnumInviteStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInviteStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInviteStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumInviteStatusWithAggregatesFilter>;

export const BytesNullableFilterSchema: z.ZodType<Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.BytesNullableFilter>;

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumStatusFilter>;

export const EnumPriorityFilterSchema: z.ZodType<Prisma.EnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.EnumPriorityFilter>;

export const IssueIdentifierWorkspaceIdCompoundUniqueInputSchema: z.ZodType<Prisma.IssueIdentifierWorkspaceIdCompoundUniqueInput> = z.object({
  identifier: z.number(),
  workspaceId: z.string()
}).strict() as z.ZodType<Prisma.IssueIdentifierWorkspaceIdCompoundUniqueInput>;

export const IssueCountOrderByAggregateInputSchema: z.ZodType<Prisma.IssueCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCountOrderByAggregateInput>;

export const IssueAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IssueAvgOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueAvgOrderByAggregateInput>;

export const IssueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IssueMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueMaxOrderByAggregateInput>;

export const IssueMinOrderByAggregateInputSchema: z.ZodType<Prisma.IssueMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  assigneeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueMinOrderByAggregateInput>;

export const IssueSumOrderByAggregateInputSchema: z.ZodType<Prisma.IssueSumOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.IssueSumOrderByAggregateInput>;

export const BytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BytesNullableWithAggregatesFilter>;

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumStatusWithAggregatesFilter>;

export const EnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict() as z.ZodType<Prisma.EnumPriorityWithAggregatesFilter>;

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.BoolFilter>;

export const IssueScalarRelationFilterSchema: z.ZodType<Prisma.IssueScalarRelationFilter> = z.object({
  is: z.lazy(() => IssueWhereInputSchema).optional(),
  isNot: z.lazy(() => IssueWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueScalarRelationFilter>;

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.UserNullableScalarRelationFilter>;

export const CommentNullableScalarRelationFilterSchema: z.ZodType<Prisma.CommentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.CommentNullableScalarRelationFilter>;

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  isEdited: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isSystem: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCountOrderByAggregateInput>;

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  isEdited: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isSystem: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CommentMaxOrderByAggregateInput>;

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  isEdited: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isSystem: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  parentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.CommentMinOrderByAggregateInput>;

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.BoolWithAggregatesFilter>;

export const GithubWikiFileListRelationFilterSchema: z.ZodType<Prisma.GithubWikiFileListRelationFilter> = z.object({
  every: z.lazy(() => GithubWikiFileWhereInputSchema).optional(),
  some: z.lazy(() => GithubWikiFileWhereInputSchema).optional(),
  none: z.lazy(() => GithubWikiFileWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileListRelationFilter>;

export const GithubWikiFileOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileOrderByRelationAggregateInput>;

export const GithubAppInstallationCountOrderByAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCountOrderByAggregateInput>;

export const GithubAppInstallationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationAvgOrderByAggregateInput>;

export const GithubAppInstallationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationMaxOrderByAggregateInput>;

export const GithubAppInstallationMinOrderByAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  workspaceId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationMinOrderByAggregateInput>;

export const GithubAppInstallationSumOrderByAggregateInputSchema: z.ZodType<Prisma.GithubAppInstallationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationSumOrderByAggregateInput>;

export const GithubAppInstallationScalarRelationFilterSchema: z.ZodType<Prisma.GithubAppInstallationScalarRelationFilter> = z.object({
  is: z.lazy(() => GithubAppInstallationWhereInputSchema).optional(),
  isNot: z.lazy(() => GithubAppInstallationWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationScalarRelationFilter>;

export const GithubWikiFilePathGithubRepositoryIdCompoundUniqueInputSchema: z.ZodType<Prisma.GithubWikiFilePathGithubRepositoryIdCompoundUniqueInput> = z.object({
  path: z.string(),
  githubRepositoryId: z.number()
}).strict() as z.ZodType<Prisma.GithubWikiFilePathGithubRepositoryIdCompoundUniqueInput>;

export const GithubWikiFileCountOrderByAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  previousPath: z.lazy(() => SortOrderSchema).optional(),
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isModified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileCountOrderByAggregateInput>;

export const GithubWikiFileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileAvgOrderByAggregateInput> = z.object({
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileAvgOrderByAggregateInput>;

export const GithubWikiFileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  previousPath: z.lazy(() => SortOrderSchema).optional(),
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isModified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileMaxOrderByAggregateInput>;

export const GithubWikiFileMinOrderByAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  previousPath: z.lazy(() => SortOrderSchema).optional(),
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  isModified: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileMinOrderByAggregateInput>;

export const GithubWikiFileSumOrderByAggregateInputSchema: z.ZodType<Prisma.GithubWikiFileSumOrderByAggregateInput> = z.object({
  installationId: z.lazy(() => SortOrderSchema).optional(),
  githubRepositoryId: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileSumOrderByAggregateInput>;

export const IssueNullableScalarRelationFilterSchema: z.ZodType<Prisma.IssueNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => IssueWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => IssueWhereInputSchema).optional().nullable()
}).strict() as z.ZodType<Prisma.IssueNullableScalarRelationFilter>;

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  isEmailSent: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  recipientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationCountOrderByAggregateInput>;

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  isEmailSent: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  recipientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationMaxOrderByAggregateInput>;

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  issueId: z.lazy(() => SortOrderSchema).optional(),
  isRead: z.lazy(() => SortOrderSchema).optional(),
  isEmailSent: z.lazy(() => SortOrderSchema).optional(),
  senderId: z.lazy(() => SortOrderSchema).optional(),
  recipientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationMinOrderByAggregateInput>;

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput>;

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput>;

export const WorkspaceMemberCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateNestedManyWithoutUserInput>;

export const IssueCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueCreateNestedManyWithoutAssigneeInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueCreateWithoutAssigneeInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyAssigneeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueCreateNestedManyWithoutAssigneeInput>;

export const WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateNestedManyWithoutInvitedByInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyInvitedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateNestedManyWithoutInvitedByInput>;

export const CommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentCreateNestedManyWithoutAuthorInput>;

export const GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateNestedManyWithoutCreatedByInput>;

export const NotificationCreateNestedManyWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutRecipientInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationCreateWithoutRecipientInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyRecipientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationCreateNestedManyWithoutRecipientInput>;

export const NotificationCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationCreateWithoutSenderInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationCreateNestedManyWithoutSenderInput>;

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput>;

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput>;

export const WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput>;

export const IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutAssigneeInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueCreateWithoutAssigneeInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyAssigneeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutAssigneeInput>;

export const WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyInvitedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInput>;

export const CommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput>;

export const GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInput>;

export const NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutRecipientInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationCreateWithoutRecipientInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyRecipientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutRecipientInput>;

export const NotificationUncheckedCreateNestedManyWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutSenderInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationCreateWithoutSenderInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManySenderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutSenderInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput>;

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput>;

export const WorkspaceMemberUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyWithoutUserNestedInput>;

export const IssueUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.IssueUpdateManyWithoutAssigneeNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueCreateWithoutAssigneeInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssueUpsertWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => IssueUpsertWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyAssigneeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssueUpdateWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => IssueUpdateWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssueUpdateManyWithWhereWithoutAssigneeInputSchema),z.lazy(() => IssueUpdateManyWithWhereWithoutAssigneeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateManyWithoutAssigneeNestedInput>;

export const WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyWithoutInvitedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyInvitedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyWithoutInvitedByNestedInput>;

export const CommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithoutAuthorNestedInput>;

export const GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyWithoutCreatedByNestedInput>;

export const NotificationUpdateManyWithoutRecipientNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutRecipientNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationCreateWithoutRecipientInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutRecipientInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutRecipientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyRecipientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutRecipientInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutRecipientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutRecipientInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutRecipientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithoutRecipientNestedInput>;

export const NotificationUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationCreateWithoutSenderInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithoutSenderNestedInput>;

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput>;

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput>;

export const WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput>;

export const IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutAssigneeNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueCreateWithoutAssigneeInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema),z.lazy(() => IssueCreateOrConnectWithoutAssigneeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssueUpsertWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => IssueUpsertWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyAssigneeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssueUpdateWithWhereUniqueWithoutAssigneeInputSchema),z.lazy(() => IssueUpdateWithWhereUniqueWithoutAssigneeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssueUpdateManyWithWhereWithoutAssigneeInputSchema),z.lazy(() => IssueUpdateManyWithWhereWithoutAssigneeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutAssigneeNestedInput>;

export const WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyInvitedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInput>;

export const CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentCreateWithoutAuthorInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CommentCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput>;

export const GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInput>;

export const NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutRecipientNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationCreateWithoutRecipientInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutRecipientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutRecipientInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutRecipientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyRecipientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutRecipientInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutRecipientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutRecipientInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutRecipientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutRecipientNestedInput>;

export const NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutSenderNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationCreateWithoutSenderInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutSenderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManySenderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutSenderInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutSenderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutSenderInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutSenderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutSenderNestedInput>;

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput>;

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput>;

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput>;

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput>;

export const WorkspaceMemberCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateNestedManyWithoutWorkspaceInput>;

export const IssueCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueCreateNestedManyWithoutWorkspaceInput>;

export const WorkspaceInviteCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateNestedManyWithoutWorkspaceInput>;

export const GithubAppInstallationCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateNestedManyWithoutWorkspaceInput>;

export const WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput>;

export const IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutWorkspaceInput>;

export const WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInput>;

export const GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const WorkspaceMemberUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput>;

export const IssueUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.IssueUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateManyWithoutWorkspaceNestedInput>;

export const WorkspaceInviteUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyWithoutWorkspaceNestedInput>;

export const GithubAppInstallationUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyWithoutWorkspaceNestedInput>;

export const WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),z.lazy(() => WorkspaceMemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput>;

export const IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IssueWhereUniqueInputSchema),z.lazy(() => IssueWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceNestedInput>;

export const WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),z.lazy(() => WorkspaceInviteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInput>;

export const GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema).array(),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInput>;

export const UserCreateNestedOneWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkspacesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutWorkspacesInput>;

export const WorkspaceCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutMembersInput>;

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict() as z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutWorkspacesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkspacesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWorkspacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWorkspacesInputSchema),z.lazy(() => UserUpdateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkspacesNestedInput>;

export const WorkspaceUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => WorkspaceUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkspaceUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => WorkspaceUpdateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutMembersNestedInput>;

export const WorkspaceCreateNestedOneWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutWorkspaceInviteInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutWorkspaceInviteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutWorkspaceInviteInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutWorkspaceInviteInput>;

export const UserCreateNestedOneWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWorkspacesInvitesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkspacesInvitesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutWorkspacesInvitesInput>;

export const EnumInviteStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumInviteStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => InviteStatusSchema).optional()
}).strict() as z.ZodType<Prisma.EnumInviteStatusFieldUpdateOperationsInput>;

export const WorkspaceUpdateOneRequiredWithoutWorkspaceInviteNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutWorkspaceInviteNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutWorkspaceInviteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutWorkspaceInviteInputSchema).optional(),
  upsert: z.lazy(() => WorkspaceUpsertWithoutWorkspaceInviteInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkspaceUpdateToOneWithWhereWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUpdateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutWorkspaceInviteInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutWorkspaceInviteNestedInput>;

export const UserUpdateOneRequiredWithoutWorkspacesInvitesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkspacesInvitesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInvitesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWorkspacesInvitesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWorkspacesInvitesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUpdateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInvitesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutWorkspacesInvitesNestedInput>;

export const WorkspaceCreateNestedOneWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutIssuesInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutIssuesInput>;

export const UserCreateNestedOneWithoutIssuesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutIssuesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIssuesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutIssuesInput>;

export const CommentCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutIssueInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyIssueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentCreateNestedManyWithoutIssueInput>;

export const NotificationCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutIssueInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationCreateWithoutIssueInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyIssueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationCreateNestedManyWithoutIssueInput>;

export const CommentUncheckedCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutIssueInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyIssueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutIssueInput>;

export const NotificationUncheckedCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutIssueInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationCreateWithoutIssueInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyIssueInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutIssueInput>;

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable()
}).strict() as z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput>;

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusSchema).optional()
}).strict() as z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput>;

export const EnumPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrioritySchema).optional()
}).strict() as z.ZodType<Prisma.EnumPriorityFieldUpdateOperationsInput>;

export const WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutIssuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutIssuesInputSchema).optional(),
  upsert: z.lazy(() => WorkspaceUpsertWithoutIssuesInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkspaceUpdateToOneWithWhereWithoutIssuesInputSchema),z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutIssuesNestedInput>;

export const UserUpdateOneRequiredWithoutIssuesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutIssuesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIssuesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutIssuesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutIssuesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutIssuesInputSchema),z.lazy(() => UserUpdateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIssuesInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutIssuesNestedInput>;

export const CommentUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutIssueNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyIssueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithoutIssueNestedInput>;

export const NotificationUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutIssueNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationCreateWithoutIssueInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyIssueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutIssueInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutIssueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithoutIssueNestedInput>;

export const CommentUncheckedUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyIssueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueNestedInput>;

export const NotificationUncheckedUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutIssueNestedInput> = z.object({
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationCreateWithoutIssueInputSchema).array(),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema),z.lazy(() => NotificationCreateOrConnectWithoutIssueInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NotificationUpsertWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => NotificationUpsertWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NotificationCreateManyIssueInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NotificationWhereUniqueInputSchema),z.lazy(() => NotificationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NotificationUpdateWithWhereUniqueWithoutIssueInputSchema),z.lazy(() => NotificationUpdateWithWhereUniqueWithoutIssueInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NotificationUpdateManyWithWhereWithoutIssueInputSchema),z.lazy(() => NotificationUpdateManyWithWhereWithoutIssueInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutIssueNestedInput>;

export const IssueCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssueCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => IssueWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateNestedOneWithoutCommentsInput>;

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput>;

export const CommentCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutChildrenInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrenInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateNestedOneWithoutChildrenInput>;

export const CommentCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentCreateNestedManyWithoutParentInput>;

export const CommentUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutParentInput>;

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict() as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;

export const IssueUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.IssueUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssueCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => IssueUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => IssueWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IssueUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => IssueUpdateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateOneRequiredWithoutCommentsNestedInput>;

export const UserUpdateOneWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneWithoutCommentsNestedInput>;

export const CommentUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutChildrenNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutChildrenInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutChildrenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateToOneWithWhereWithoutChildrenInputSchema),z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateOneWithoutChildrenNestedInput>;

export const CommentUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithoutParentNestedInput>;

export const CommentUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentCreateWithoutParentInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema),z.lazy(() => CommentCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentNestedInput>;

export const WorkspaceCreateNestedOneWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutGithubAppInstallationInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutGithubAppInstallationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutGithubAppInstallationInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutGithubAppInstallationInput>;

export const UserCreateNestedOneWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGithubAppInstallationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedCreateWithoutGithubAppInstallationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGithubAppInstallationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutGithubAppInstallationInput>;

export const GithubWikiFileCreateNestedManyWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileCreateNestedManyWithoutInstallationInput> = z.object({
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema).array(),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubWikiFileCreateManyInstallationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateNestedManyWithoutInstallationInput>;

export const GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInput> = z.object({
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema).array(),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubWikiFileCreateManyInstallationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInput>;

export const WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutGithubAppInstallationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkspaceCreateOrConnectWithoutGithubAppInstallationInputSchema).optional(),
  upsert: z.lazy(() => WorkspaceUpsertWithoutGithubAppInstallationInputSchema).optional(),
  connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkspaceUpdateToOneWithWhereWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInput>;

export const UserUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGithubAppInstallationNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedCreateWithoutGithubAppInstallationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGithubAppInstallationInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGithubAppInstallationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutGithubAppInstallationNestedInput>;

export const GithubWikiFileUpdateManyWithoutInstallationNestedInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateManyWithoutInstallationNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema).array(),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubWikiFileCreateManyInstallationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubWikiFileUpdateManyWithWhereWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpdateManyWithWhereWithoutInstallationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubWikiFileScalarWhereInputSchema),z.lazy(() => GithubWikiFileScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateManyWithoutInstallationNestedInput>;

export const GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema).array(),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileCreateOrConnectWithoutInstallationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => GithubWikiFileCreateManyInstallationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GithubWikiFileWhereUniqueInputSchema),z.lazy(() => GithubWikiFileWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GithubWikiFileUpdateManyWithWhereWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUpdateManyWithWhereWithoutInstallationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GithubWikiFileScalarWhereInputSchema),z.lazy(() => GithubWikiFileScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInput>;

export const GithubAppInstallationCreateNestedOneWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateNestedOneWithoutGithubWikiFileInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GithubAppInstallationCreateOrConnectWithoutGithubWikiFileInputSchema).optional(),
  connect: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateNestedOneWithoutGithubWikiFileInput>;

export const GithubAppInstallationUpdateOneRequiredWithoutGithubWikiFileNestedInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateOneRequiredWithoutGithubWikiFileNestedInput> = z.object({
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GithubAppInstallationCreateOrConnectWithoutGithubWikiFileInputSchema).optional(),
  upsert: z.lazy(() => GithubAppInstallationUpsertWithoutGithubWikiFileInputSchema).optional(),
  connect: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateToOneWithWhereWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUpdateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateOneRequiredWithoutGithubWikiFileNestedInput>;

export const IssueCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssueCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => IssueWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateNestedOneWithoutNotificationsInput>;

export const UserCreateNestedOneWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsSentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsSentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsSentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsSentInput>;

export const UserCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsInput>;

export const IssueUpdateOneWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.IssueUpdateOneWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => IssueCreateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IssueCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => IssueUpsertWithoutNotificationsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => IssueWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => IssueWhereInputSchema) ]).optional(),
  connect: z.lazy(() => IssueWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IssueUpdateToOneWithWhereWithoutNotificationsInputSchema),z.lazy(() => IssueUpdateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateOneWithoutNotificationsNestedInput>;

export const UserUpdateOneRequiredWithoutNotificationsSentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsSentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsSentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationsSentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsSentInputSchema),z.lazy(() => UserUpdateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsSentInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsSentNestedInput>;

export const UserUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotificationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputSchema),z.lazy(() => UserUpdateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedDateTimeNullableFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>;

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedFloatNullableFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumRoleFilter>;

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter>;

export const NestedEnumInviteStatusFilterSchema: z.ZodType<Prisma.NestedEnumInviteStatusFilter> = z.object({
  equals: z.lazy(() => InviteStatusSchema).optional(),
  in: z.lazy(() => InviteStatusSchema).array().optional(),
  notIn: z.lazy(() => InviteStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => NestedEnumInviteStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumInviteStatusFilter>;

export const NestedEnumInviteStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumInviteStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => InviteStatusSchema).optional(),
  in: z.lazy(() => InviteStatusSchema).array().optional(),
  notIn: z.lazy(() => InviteStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => NestedEnumInviteStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumInviteStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumInviteStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumInviteStatusWithAggregatesFilter>;

export const NestedBytesNullableFilterSchema: z.ZodType<Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.NestedBytesNullableFilter>;

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumStatusFilter>;

export const NestedEnumPriorityFilterSchema: z.ZodType<Prisma.NestedEnumPriorityFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedEnumPriorityFilter>;

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBytesNullableWithAggregatesFilter>;

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter>;

export const NestedEnumPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrioritySchema).optional(),
  in: z.lazy(() => PrioritySchema).array().optional(),
  notIn: z.lazy(() => PrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => NestedEnumPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPriorityFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedEnumPriorityWithAggregatesFilter>;

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NestedBoolFilter>;

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict() as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.AccountCreateWithoutUserInput>;

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput>;

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput>;

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.AccountCreateManyUserInputEnvelope>;

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.SessionCreateWithoutUserInput>;

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput>;

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput>;

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.SessionCreateManyUserInputEnvelope>;

export const WorkspaceMemberCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutMembersInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateWithoutUserInput>;

export const WorkspaceMemberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedCreateWithoutUserInput>;

export const WorkspaceMemberCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateOrConnectWithoutUserInput>;

export const WorkspaceMemberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkspaceMemberCreateManyUserInputSchema),z.lazy(() => WorkspaceMemberCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyUserInputEnvelope>;

export const IssueCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueCreateWithoutAssigneeInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateWithoutAssigneeInput>;

export const IssueUncheckedCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutAssigneeInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutAssigneeInput>;

export const IssueCreateOrConnectWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutAssigneeInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutAssigneeInput>;

export const IssueCreateManyAssigneeInputEnvelopeSchema: z.ZodType<Prisma.IssueCreateManyAssigneeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IssueCreateManyAssigneeInputSchema),z.lazy(() => IssueCreateManyAssigneeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.IssueCreateManyAssigneeInputEnvelope>;

export const WorkspaceInviteCreateWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateWithoutInvitedByInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutWorkspaceInviteInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateWithoutInvitedByInput>;

export const WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedCreateWithoutInvitedByInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  workspaceId: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedCreateWithoutInvitedByInput>;

export const WorkspaceInviteCreateOrConnectWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateOrConnectWithoutInvitedByInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateOrConnectWithoutInvitedByInput>;

export const WorkspaceInviteCreateManyInvitedByInputEnvelopeSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyInvitedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkspaceInviteCreateManyInvitedByInputSchema),z.lazy(() => WorkspaceInviteCreateManyInvitedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyInvitedByInputEnvelope>;

export const CommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutCommentsInputSchema),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateWithoutAuthorInput>;

export const CommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateWithoutAuthorInput>;

export const CommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentCreateOrConnectWithoutAuthorInput>;

export const CommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyAuthorInputSchema),z.lazy(() => CommentCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyAuthorInputEnvelope>;

export const GithubAppInstallationCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateWithoutCreatedByInput> = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutGithubAppInstallationInputSchema),
  githubWikiFile: z.lazy(() => GithubWikiFileCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateWithoutCreatedByInput>;

export const GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutCreatedByInput>;

export const GithubAppInstallationCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutCreatedByInput>;

export const GithubAppInstallationCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GithubAppInstallationCreateManyCreatedByInputSchema),z.lazy(() => GithubAppInstallationCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyCreatedByInputEnvelope>;

export const NotificationCreateWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationCreateWithoutRecipientInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutNotificationsInputSchema).optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutNotificationsSentInputSchema)
}).strict() as z.ZodType<Prisma.NotificationCreateWithoutRecipientInput>;

export const NotificationUncheckedCreateWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutRecipientInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateWithoutRecipientInput>;

export const NotificationCreateOrConnectWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutRecipientInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationCreateOrConnectWithoutRecipientInput>;

export const NotificationCreateManyRecipientInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyRecipientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyRecipientInputSchema),z.lazy(() => NotificationCreateManyRecipientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManyRecipientInputEnvelope>;

export const NotificationCreateWithoutSenderInputSchema: z.ZodType<Prisma.NotificationCreateWithoutSenderInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutNotificationsInputSchema).optional(),
  recipient: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema)
}).strict() as z.ZodType<Prisma.NotificationCreateWithoutSenderInput>;

export const NotificationUncheckedCreateWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutSenderInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateWithoutSenderInput>;

export const NotificationCreateOrConnectWithoutSenderInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutSenderInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationCreateOrConnectWithoutSenderInput>;

export const NotificationCreateManySenderInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManySenderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManySenderInputSchema),z.lazy(() => NotificationCreateManySenderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManySenderInputEnvelope>;

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput>;

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput>;

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput>;

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountScalarWhereInput>;

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput>;

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput>;

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput>;

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionScalarWhereInput>;

export const WorkspaceMemberUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput>;

export const WorkspaceMemberUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkspaceMemberUpdateWithoutUserInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput>;

export const WorkspaceMemberUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => WorkspaceMemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkspaceMemberUpdateManyMutationInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyWithWhereWithoutUserInput>;

export const WorkspaceMemberScalarWhereInputSchema: z.ZodType<Prisma.WorkspaceMemberScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceMemberScalarWhereInputSchema),z.lazy(() => WorkspaceMemberScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberScalarWhereInput>;

export const IssueUpsertWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutAssigneeInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IssueUpdateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutAssigneeInputSchema) ]),
  create: z.union([ z.lazy(() => IssueCreateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedCreateWithoutAssigneeInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutAssigneeInput>;

export const IssueUpdateWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutAssigneeInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IssueUpdateWithoutAssigneeInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutAssigneeInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutAssigneeInput>;

export const IssueUpdateManyWithWhereWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutAssigneeInput> = z.object({
  where: z.lazy(() => IssueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IssueUpdateManyMutationInputSchema),z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutAssigneeInput>;

export const IssueScalarWhereInputSchema: z.ZodType<Prisma.IssueScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IssueScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IssueScalarWhereInputSchema),z.lazy(() => IssueScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumPriorityFilterSchema),z.lazy(() => PrioritySchema) ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assigneeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueScalarWhereInput>;

export const WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateWithoutInvitedByInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutInvitedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpsertWithWhereUniqueWithoutInvitedByInput>;

export const WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkspaceInviteUpdateWithoutInvitedByInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateWithoutInvitedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateWithWhereUniqueWithoutInvitedByInput>;

export const WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInput> = z.object({
  where: z.lazy(() => WorkspaceInviteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkspaceInviteUpdateManyMutationInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyWithWhereWithoutInvitedByInput>;

export const WorkspaceInviteScalarWhereInputSchema: z.ZodType<Prisma.WorkspaceInviteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkspaceInviteScalarWhereInputSchema),z.lazy(() => WorkspaceInviteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumInviteStatusFilterSchema),z.lazy(() => InviteStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteScalarWhereInput>;

export const CommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutAuthorInput>;

export const CommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutAuthorInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutAuthorInput>;

export const CommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutAuthorInput>;

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isEdited: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  issueId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isSystem: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  parentId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentScalarWhereInput>;

export const GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpsertWithWhereUniqueWithoutCreatedByInput>;

export const GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutCreatedByInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateWithWhereUniqueWithoutCreatedByInput>;

export const GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => GithubAppInstallationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GithubAppInstallationUpdateManyMutationInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyWithWhereWithoutCreatedByInput>;

export const GithubAppInstallationScalarWhereInputSchema: z.ZodType<Prisma.GithubAppInstallationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubAppInstallationScalarWhereInputSchema),z.lazy(() => GithubAppInstallationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  workspaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationScalarWhereInput>;

export const NotificationUpsertWithWhereUniqueWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutRecipientInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutRecipientInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutRecipientInput>;

export const NotificationUpdateWithWhereUniqueWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutRecipientInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutRecipientInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutRecipientInput>;

export const NotificationUpdateManyWithWhereWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema),z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutRecipientInput>;

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NotificationScalarWhereInputSchema),z.lazy(() => NotificationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  issueId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isRead: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isEmailSent: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  senderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recipientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationScalarWhereInput>;

export const NotificationUpsertWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutSenderInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutSenderInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutSenderInput>;

export const NotificationUpdateWithWhereUniqueWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutSenderInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutSenderInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutSenderInput>;

export const NotificationUpdateManyWithWhereWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutSenderInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema),z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutSenderInput>;

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput>;

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput>;

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutAccountsInput>;

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput>;

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutAccountsInput>;

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput>;

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput>;

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput>;

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutSessionsInput>;

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput>;

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutSessionsInput>;

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput>;

export const WorkspaceMemberCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWorkspacesInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateWithoutWorkspaceInput>;

export const WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>;

export const WorkspaceMemberCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateOrConnectWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateOrConnectWithoutWorkspaceInput>;

export const WorkspaceMemberCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyWorkspaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputSchema),z.lazy(() => WorkspaceMemberCreateManyWorkspaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyWorkspaceInputEnvelope>;

export const IssueCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  assignee: z.lazy(() => UserCreateNestedOneWithoutIssuesInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateWithoutWorkspaceInput>;

export const IssueUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutWorkspaceInput>;

export const IssueCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutWorkspaceInput>;

export const IssueCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.IssueCreateManyWorkspaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IssueCreateManyWorkspaceInputSchema),z.lazy(() => IssueCreateManyWorkspaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.IssueCreateManyWorkspaceInputEnvelope>;

export const WorkspaceInviteCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invitedBy: z.lazy(() => UserCreateNestedOneWithoutWorkspacesInvitesInputSchema)
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateWithoutWorkspaceInput>;

export const WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedCreateWithoutWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  invitedById: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedCreateWithoutWorkspaceInput>;

export const WorkspaceInviteCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateOrConnectWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateOrConnectWithoutWorkspaceInput>;

export const WorkspaceInviteCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyWorkspaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputSchema),z.lazy(() => WorkspaceInviteCreateManyWorkspaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyWorkspaceInputEnvelope>;

export const GithubAppInstallationCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateWithoutWorkspaceInput> = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutGithubAppInstallationInputSchema),
  githubWikiFile: z.lazy(() => GithubWikiFileCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateWithoutWorkspaceInput>;

export const GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutWorkspaceInput> = z.object({
  id: z.number().int(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedCreateNestedManyWithoutInstallationInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutWorkspaceInput>;

export const GithubAppInstallationCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutWorkspaceInput>;

export const GithubAppInstallationCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyWorkspaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputSchema),z.lazy(() => GithubAppInstallationCreateManyWorkspaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyWorkspaceInputEnvelope>;

export const WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkspaceMemberUpdateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateWithoutWorkspaceInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceMemberCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput>;

export const WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceMemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkspaceMemberUpdateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput>;

export const WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceMemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkspaceMemberUpdateManyMutationInputSchema),z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput>;

export const IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IssueUpdateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutWorkspaceInputSchema) ]),
  create: z.union([ z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutWorkspaceInput>;

export const IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IssueUpdateWithoutWorkspaceInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutWorkspaceInput>;

export const IssueUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => IssueScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IssueUpdateManyMutationInputSchema),z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutWorkspaceInput>;

export const WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkspaceInviteUpdateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateWithoutWorkspaceInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceInviteCreateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpsertWithWhereUniqueWithoutWorkspaceInput>;

export const WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceInviteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkspaceInviteUpdateWithoutWorkspaceInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateWithWhereUniqueWithoutWorkspaceInput>;

export const WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => WorkspaceInviteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkspaceInviteUpdateManyMutationInputSchema),z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyWithWhereWithoutWorkspaceInput>;

export const GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutWorkspaceInputSchema) ]),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpsertWithWhereUniqueWithoutWorkspaceInput>;

export const GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutWorkspaceInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateWithWhereUniqueWithoutWorkspaceInput>;

export const GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInput> = z.object({
  where: z.lazy(() => GithubAppInstallationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GithubAppInstallationUpdateManyMutationInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyWithWhereWithoutWorkspaceInput>;

export const UserCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkspacesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutWorkspacesInput>;

export const UserUncheckedCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInput>;

export const UserCreateOrConnectWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInput>;

export const WorkspaceCreateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateWithoutMembersInput>;

export const WorkspaceUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutMembersInput>;

export const WorkspaceCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutMembersInput>;

export const UserUpsertWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkspacesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutWorkspacesInput>;

export const UserUpdateToOneWithWhereWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkspacesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWorkspacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkspacesInput>;

export const UserUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkspacesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutWorkspacesInput>;

export const UserUncheckedUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInput>;

export const WorkspaceUpsertWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => WorkspaceUpdateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => WorkspaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpsertWithoutMembersInput>;

export const WorkspaceUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkspaceUpdateWithoutMembersInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutMembersInput>;

export const WorkspaceUpdateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutMembersInput>;

export const WorkspaceUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutMembersInput>;

export const WorkspaceCreateWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutWorkspaceInviteInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateWithoutWorkspaceInviteInput>;

export const WorkspaceUncheckedCreateWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutWorkspaceInviteInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutWorkspaceInviteInput>;

export const WorkspaceCreateOrConnectWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutWorkspaceInviteInput> = z.object({
  where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutWorkspaceInviteInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutWorkspaceInviteInput>;

export const UserCreateWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkspacesInvitesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutWorkspacesInvitesInput>;

export const UserUncheckedCreateWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInvitesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInvitesInput>;

export const UserCreateOrConnectWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInvitesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInvitesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInvitesInput>;

export const WorkspaceUpsertWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithoutWorkspaceInviteInput> = z.object({
  update: z.union([ z.lazy(() => WorkspaceUpdateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutWorkspaceInviteInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutWorkspaceInviteInputSchema) ]),
  where: z.lazy(() => WorkspaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpsertWithoutWorkspaceInviteInput>;

export const WorkspaceUpdateToOneWithWhereWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutWorkspaceInviteInput> = z.object({
  where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkspaceUpdateWithoutWorkspaceInviteInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutWorkspaceInviteInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutWorkspaceInviteInput>;

export const WorkspaceUpdateWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutWorkspaceInviteInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutWorkspaceInviteInput>;

export const WorkspaceUncheckedUpdateWithoutWorkspaceInviteInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutWorkspaceInviteInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutWorkspaceInviteInput>;

export const UserUpsertWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserUpsertWithoutWorkspacesInvitesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInvitesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedCreateWithoutWorkspacesInvitesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutWorkspacesInvitesInput>;

export const UserUpdateToOneWithWhereWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkspacesInvitesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWorkspacesInvitesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInvitesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWorkspacesInvitesInput>;

export const UserUpdateWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkspacesInvitesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutWorkspacesInvitesInput>;

export const UserUncheckedUpdateWithoutWorkspacesInvitesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInvitesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInvitesInput>;

export const WorkspaceCreateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutIssuesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateWithoutIssuesInput>;

export const WorkspaceUncheckedCreateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutIssuesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutIssuesInput>;

export const WorkspaceCreateOrConnectWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutIssuesInput> = z.object({
  where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutIssuesInput>;

export const UserCreateWithoutIssuesInputSchema: z.ZodType<Prisma.UserCreateWithoutIssuesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutIssuesInput>;

export const UserUncheckedCreateWithoutIssuesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutIssuesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutIssuesInput>;

export const UserCreateOrConnectWithoutIssuesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutIssuesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIssuesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutIssuesInput>;

export const CommentCreateWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateWithoutIssueInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema).optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateWithoutIssueInput>;

export const CommentUncheckedCreateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutIssueInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateWithoutIssueInput>;

export const CommentCreateOrConnectWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutIssueInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentCreateOrConnectWithoutIssueInput>;

export const CommentCreateManyIssueInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyIssueInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyIssueInputSchema),z.lazy(() => CommentCreateManyIssueInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyIssueInputEnvelope>;

export const NotificationCreateWithoutIssueInputSchema: z.ZodType<Prisma.NotificationCreateWithoutIssueInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sender: z.lazy(() => UserCreateNestedOneWithoutNotificationsSentInputSchema),
  recipient: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema)
}).strict() as z.ZodType<Prisma.NotificationCreateWithoutIssueInput>;

export const NotificationUncheckedCreateWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutIssueInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationUncheckedCreateWithoutIssueInput>;

export const NotificationCreateOrConnectWithoutIssueInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutIssueInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationCreateOrConnectWithoutIssueInput>;

export const NotificationCreateManyIssueInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyIssueInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NotificationCreateManyIssueInputSchema),z.lazy(() => NotificationCreateManyIssueInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManyIssueInputEnvelope>;

export const WorkspaceUpsertWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithoutIssuesInput> = z.object({
  update: z.union([ z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema) ]),
  where: z.lazy(() => WorkspaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpsertWithoutIssuesInput>;

export const WorkspaceUpdateToOneWithWhereWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutIssuesInput> = z.object({
  where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutIssuesInput>;

export const WorkspaceUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutIssuesInput>;

export const WorkspaceUncheckedUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutIssuesInput>;

export const UserUpsertWithoutIssuesInputSchema: z.ZodType<Prisma.UserUpsertWithoutIssuesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIssuesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedCreateWithoutIssuesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutIssuesInput>;

export const UserUpdateToOneWithWhereWithoutIssuesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIssuesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutIssuesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutIssuesInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutIssuesInput>;

export const UserUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.UserUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutIssuesInput>;

export const UserUncheckedUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutIssuesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutIssuesInput>;

export const CommentUpsertWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutIssueInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutIssueInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutIssueInput>;

export const CommentUpdateWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutIssueInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutIssueInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutIssueInput>;

export const CommentUpdateManyWithWhereWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutIssueInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutIssueInput>;

export const NotificationUpsertWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutIssueInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NotificationUpdateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutIssueInputSchema) ]),
  create: z.union([ z.lazy(() => NotificationCreateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedCreateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutIssueInput>;

export const NotificationUpdateWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutIssueInput> = z.object({
  where: z.lazy(() => NotificationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateWithoutIssueInputSchema),z.lazy(() => NotificationUncheckedUpdateWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutIssueInput>;

export const NotificationUpdateManyWithWhereWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutIssueInput> = z.object({
  where: z.lazy(() => NotificationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NotificationUpdateManyMutationInputSchema),z.lazy(() => NotificationUncheckedUpdateManyWithoutIssueInputSchema) ]),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutIssueInput>;

export const IssueCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
  assignee: z.lazy(() => UserCreateNestedOneWithoutIssuesInputSchema),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateWithoutCommentsInput>;

export const IssueUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutCommentsInput>;

export const IssueCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssueCreateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutCommentsInput>;

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutCommentsInput>;

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput>;

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput>;

export const CommentCreateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateWithoutChildrenInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema).optional(),
  parent: z.lazy(() => CommentCreateNestedOneWithoutChildrenInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateWithoutChildrenInput>;

export const CommentUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutChildrenInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateWithoutChildrenInput>;

export const CommentCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutChildrenInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentCreateOrConnectWithoutChildrenInput>;

export const CommentCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateWithoutParentInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  issue: z.lazy(() => IssueCreateNestedOneWithoutCommentsInputSchema),
  author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema).optional(),
  children: z.lazy(() => CommentCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentCreateWithoutParentInput>;

export const CommentUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutParentInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  children: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedCreateWithoutParentInput>;

export const CommentCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentCreateOrConnectWithoutParentInput>;

export const CommentCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyParentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyParentInputSchema),z.lazy(() => CommentCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyParentInputEnvelope>;

export const IssueUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => IssueUpdateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => IssueCreateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => IssueWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpsertWithoutCommentsInput>;

export const IssueUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => IssueWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IssueUpdateWithoutCommentsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutCommentsInput>;

export const IssueUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  assignee: z.lazy(() => UserUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpdateWithoutCommentsInput>;

export const IssueUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutCommentsInput>;

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutCommentsInput>;

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput>;

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutCommentsInput>;

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput>;

export const CommentUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpsertWithoutChildrenInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedCreateWithoutChildrenInputSchema) ]),
  where: z.lazy(() => CommentWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpsertWithoutChildrenInput>;

export const CommentUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutChildrenInput> = z.object({
  where: z.lazy(() => CommentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommentUpdateWithoutChildrenInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutChildrenInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutChildrenInput>;

export const CommentUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpdateWithoutChildrenInput>;

export const CommentUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutChildrenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateWithoutChildrenInput>;

export const CommentUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutParentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutParentInputSchema),z.lazy(() => CommentUncheckedCreateWithoutParentInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutParentInput>;

export const CommentUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutParentInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutParentInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutParentInput>;

export const CommentUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutParentInputSchema) ]),
}).strict() as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutParentInput>;

export const WorkspaceCreateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutGithubAppInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceCreateWithoutGithubAppInstallationInput>;

export const WorkspaceUncheckedCreateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutGithubAppInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  image: z.string().optional().nullable(),
  issueCount: z.number().int().optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutWorkspaceInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutGithubAppInstallationInput>;

export const WorkspaceCreateOrConnectWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutGithubAppInstallationInput> = z.object({
  where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutGithubAppInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutGithubAppInstallationInput>;

export const UserCreateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserCreateWithoutGithubAppInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutGithubAppInstallationInput>;

export const UserUncheckedCreateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutGithubAppInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutGithubAppInstallationInput>;

export const UserCreateOrConnectWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGithubAppInstallationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedCreateWithoutGithubAppInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutGithubAppInstallationInput>;

export const GithubWikiFileCreateWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileCreateWithoutInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateWithoutInstallationInput>;

export const GithubWikiFileUncheckedCreateWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedCreateWithoutInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedCreateWithoutInstallationInput>;

export const GithubWikiFileCreateOrConnectWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileCreateOrConnectWithoutInstallationInput> = z.object({
  where: z.lazy(() => GithubWikiFileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateOrConnectWithoutInstallationInput>;

export const GithubWikiFileCreateManyInstallationInputEnvelopeSchema: z.ZodType<Prisma.GithubWikiFileCreateManyInstallationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => GithubWikiFileCreateManyInstallationInputSchema),z.lazy(() => GithubWikiFileCreateManyInstallationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateManyInstallationInputEnvelope>;

export const WorkspaceUpsertWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithoutGithubAppInstallationInput> = z.object({
  update: z.union([ z.lazy(() => WorkspaceUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]),
  create: z.union([ z.lazy(() => WorkspaceCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedCreateWithoutGithubAppInstallationInputSchema) ]),
  where: z.lazy(() => WorkspaceWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpsertWithoutGithubAppInstallationInput>;

export const WorkspaceUpdateToOneWithWhereWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutGithubAppInstallationInput> = z.object({
  where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkspaceUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => WorkspaceUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutGithubAppInstallationInput>;

export const WorkspaceUpdateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutGithubAppInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutGithubAppInstallationInput>;

export const WorkspaceUncheckedUpdateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutGithubAppInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  issueCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional(),
  workspaceInvite: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutGithubAppInstallationInput>;

export const UserUpsertWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserUpsertWithoutGithubAppInstallationInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedCreateWithoutGithubAppInstallationInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutGithubAppInstallationInput>;

export const UserUpdateToOneWithWhereWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGithubAppInstallationInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutGithubAppInstallationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutGithubAppInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGithubAppInstallationInput>;

export const UserUpdateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserUpdateWithoutGithubAppInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutGithubAppInstallationInput>;

export const UserUncheckedUpdateWithoutGithubAppInstallationInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutGithubAppInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutGithubAppInstallationInput>;

export const GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInput> = z.object({
  where: z.lazy(() => GithubWikiFileWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GithubWikiFileUpdateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedUpdateWithoutInstallationInputSchema) ]),
  create: z.union([ z.lazy(() => GithubWikiFileCreateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedCreateWithoutInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpsertWithWhereUniqueWithoutInstallationInput>;

export const GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInput> = z.object({
  where: z.lazy(() => GithubWikiFileWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GithubWikiFileUpdateWithoutInstallationInputSchema),z.lazy(() => GithubWikiFileUncheckedUpdateWithoutInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateWithWhereUniqueWithoutInstallationInput>;

export const GithubWikiFileUpdateManyWithWhereWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateManyWithWhereWithoutInstallationInput> = z.object({
  where: z.lazy(() => GithubWikiFileScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GithubWikiFileUpdateManyMutationInputSchema),z.lazy(() => GithubWikiFileUncheckedUpdateManyWithoutInstallationInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateManyWithWhereWithoutInstallationInput>;

export const GithubWikiFileScalarWhereInputSchema: z.ZodType<Prisma.GithubWikiFileScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GithubWikiFileScalarWhereInputSchema),z.lazy(() => GithubWikiFileScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GithubWikiFileScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GithubWikiFileScalarWhereInputSchema),z.lazy(() => GithubWikiFileScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  previousPath: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  installationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  githubRepositoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  isModified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileScalarWhereInput>;

export const GithubAppInstallationCreateWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateWithoutGithubWikiFileInput> = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutGithubAppInstallationInputSchema),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutGithubAppInstallationInputSchema)
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateWithoutGithubWikiFileInput>;

export const GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInput> = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInput>;

export const GithubAppInstallationCreateOrConnectWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutGithubWikiFileInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateOrConnectWithoutGithubWikiFileInput>;

export const GithubAppInstallationUpsertWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationUpsertWithoutGithubWikiFileInput> = z.object({
  update: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInputSchema) ]),
  create: z.union([ z.lazy(() => GithubAppInstallationCreateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedCreateWithoutGithubWikiFileInputSchema) ]),
  where: z.lazy(() => GithubAppInstallationWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpsertWithoutGithubWikiFileInput>;

export const GithubAppInstallationUpdateToOneWithWhereWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateToOneWithWhereWithoutGithubWikiFileInput> = z.object({
  where: z.lazy(() => GithubAppInstallationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GithubAppInstallationUpdateWithoutGithubWikiFileInputSchema),z.lazy(() => GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInputSchema) ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateToOneWithWhereWithoutGithubWikiFileInput>;

export const GithubAppInstallationUpdateWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateWithoutGithubWikiFileInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateWithoutGithubWikiFileInput>;

export const GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutGithubWikiFileInput>;

export const IssueCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueCreateWithoutNotificationsInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
  assignee: z.lazy(() => UserCreateNestedOneWithoutIssuesInputSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueCreateWithoutNotificationsInput>;

export const IssueUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutNotificationsInput>;

export const IssueCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => IssueWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IssueCreateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutNotificationsInput>;

export const UserCreateWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserCreateWithoutNotificationsSentInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationCreateNestedManyWithoutRecipientInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutNotificationsSentInput>;

export const UserUncheckedCreateWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsSentInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutRecipientInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsSentInput>;

export const UserCreateOrConnectWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsSentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsSentInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsSentInput>;

export const UserCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateWithoutNotificationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutNotificationsInput>;

export const UserUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedCreateNestedManyWithoutInvitedByInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutSenderInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsInput>;

export const UserCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput>;

export const IssueUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => IssueUpdateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => IssueCreateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => IssueWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpsertWithoutNotificationsInput>;

export const IssueUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => IssueWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => IssueUpdateWithoutNotificationsInputSchema),z.lazy(() => IssueUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict() as z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutNotificationsInput>;

export const IssueUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  assignee: z.lazy(() => UserUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpdateWithoutNotificationsInput>;

export const IssueUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutNotificationsInput>;

export const UserUpsertWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsSentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsSentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsSentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutNotificationsSentInput>;

export const UserUpdateToOneWithWhereWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsSentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationsSentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsSentInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsSentInput>;

export const UserUpdateWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserUpdateWithoutNotificationsSentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutRecipientNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutNotificationsSentInput>;

export const UserUncheckedUpdateWithoutNotificationsSentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsSentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutRecipientNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsSentInput>;

export const UserUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutNotificationsInput>;

export const UserUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotificationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput>;

export const UserUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpdateWithoutNotificationsInput>;

export const UserUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  workspaces: z.lazy(() => WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  issues: z.lazy(() => IssueUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
  workspacesInvites: z.lazy(() => WorkspaceInviteUncheckedUpdateManyWithoutInvitedByNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  githubAppInstallation: z.lazy(() => GithubAppInstallationUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  notificationsSent: z.lazy(() => NotificationUncheckedUpdateManyWithoutSenderNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsInput>;

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.AccountCreateManyUserInput>;

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.SessionCreateManyUserInput>;

export const WorkspaceMemberCreateManyUserInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyUserInput>;

export const IssueCreateManyAssigneeInputSchema: z.ZodType<Prisma.IssueCreateManyAssigneeInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.IssueCreateManyAssigneeInput>;

export const WorkspaceInviteCreateManyInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyInvitedByInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  workspaceId: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyInvitedByInput>;

export const CommentCreateManyAuthorInputSchema: z.ZodType<Prisma.CommentCreateManyAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyAuthorInput>;

export const GithubAppInstallationCreateManyCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyCreatedByInput> = z.object({
  id: z.number().int(),
  workspaceId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyCreatedByInput>;

export const NotificationCreateManyRecipientInputSchema: z.ZodType<Prisma.NotificationCreateManyRecipientInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManyRecipientInput>;

export const NotificationCreateManySenderInputSchema: z.ZodType<Prisma.NotificationCreateManySenderInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  issueId: z.string().optional().nullable(),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManySenderInput>;

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUpdateWithoutUserInput>;

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput>;

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput>;

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUpdateWithoutUserInput>;

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput>;

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput>;

export const WorkspaceMemberUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateWithoutUserInput>;

export const WorkspaceMemberUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateWithoutUserInput>;

export const WorkspaceMemberUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutUserInput>;

export const IssueUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUpdateWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpdateWithoutAssigneeInput>;

export const IssueUncheckedUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutAssigneeInput>;

export const IssueUncheckedUpdateManyWithoutAssigneeInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutAssigneeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutAssigneeInput>;

export const WorkspaceInviteUpdateWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateWithoutInvitedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutWorkspaceInviteNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateWithoutInvitedByInput>;

export const WorkspaceInviteUncheckedUpdateWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateWithoutInvitedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateWithoutInvitedByInput>;

export const WorkspaceInviteUncheckedUpdateManyWithoutInvitedByInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutInvitedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutInvitedByInput>;

export const CommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpdateWithoutAuthorInput>;

export const CommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateWithoutAuthorInput>;

export const CommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutAuthorInput>;

export const GithubAppInstallationUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  workspace: z.lazy(() => WorkspaceUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateWithoutCreatedByInput>;

export const GithubAppInstallationUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutCreatedByInput>;

export const GithubAppInstallationUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workspaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutCreatedByInput>;

export const NotificationUpdateWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutRecipientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneWithoutNotificationsNestedInputSchema).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsSentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationUpdateWithoutRecipientInput>;

export const NotificationUncheckedUpdateWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutRecipientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateWithoutRecipientInput>;

export const NotificationUncheckedUpdateManyWithoutRecipientInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutRecipientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutRecipientInput>;

export const NotificationUpdateWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneWithoutNotificationsNestedInputSchema).optional(),
  recipient: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationUpdateWithoutSenderInput>;

export const NotificationUncheckedUpdateWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateWithoutSenderInput>;

export const NotificationUncheckedUpdateManyWithoutSenderInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutSenderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutSenderInput>;

export const WorkspaceMemberCreateManyWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyWorkspaceInput>;

export const IssueCreateManyWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateManyWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  identifier: z.number().int(),
  title: z.string().trim().min(1).max(255),
  description: z.instanceof(Buffer).optional().nullable(),
  status: z.lazy(() => StatusSchema).optional(),
  priority: z.lazy(() => PrioritySchema).optional(),
  assigneeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.IssueCreateManyWorkspaceInput>;

export const WorkspaceInviteCreateManyWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyWorkspaceInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email().trim().max(255),
  invitedById: z.string(),
  status: z.lazy(() => InviteStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyWorkspaceInput>;

export const GithubAppInstallationCreateManyWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyWorkspaceInput> = z.object({
  id: z.number().int(),
  createdById: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyWorkspaceInput>;

export const WorkspaceMemberUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutWorkspacesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateWithoutWorkspaceInput>;

export const WorkspaceMemberUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>;

export const WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput>;

export const IssueUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignee: z.lazy(() => UserUpdateOneRequiredWithoutIssuesNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUpdateWithoutWorkspaceInput>;

export const IssueUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema).optional(),
  notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutIssueNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutWorkspaceInput>;

export const IssueUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  identifier: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => PrioritySchema),z.lazy(() => EnumPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  assigneeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceInput>;

export const WorkspaceInviteUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.lazy(() => UserUpdateOneRequiredWithoutWorkspacesInvitesNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateWithoutWorkspaceInput>;

export const WorkspaceInviteUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateWithoutWorkspaceInput>;

export const WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email().trim().max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => InviteStatusSchema),z.lazy(() => EnumInviteStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUncheckedUpdateManyWithoutWorkspaceInput>;

export const GithubAppInstallationUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutGithubAppInstallationNestedInputSchema).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateWithoutWorkspaceInput>;

export const GithubAppInstallationUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutWorkspaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  githubWikiFile: z.lazy(() => GithubWikiFileUncheckedUpdateManyWithoutInstallationNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateWithoutWorkspaceInput>;

export const GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUncheckedUpdateManyWithoutWorkspaceInput>;

export const CommentCreateManyIssueInputSchema: z.ZodType<Prisma.CommentCreateManyIssueInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyIssueInput>;

export const NotificationCreateManyIssueInputSchema: z.ZodType<Prisma.NotificationCreateManyIssueInput> = z.object({
  id: z.string().cuid().optional(),
  message: z.string().trim().min(1).max(1000),
  isRead: z.boolean().optional(),
  isEmailSent: z.boolean().optional(),
  senderId: z.string(),
  recipientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.NotificationCreateManyIssueInput>;

export const CommentUpdateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema).optional(),
  parent: z.lazy(() => CommentUpdateOneWithoutChildrenNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpdateWithoutIssueInput>;

export const CommentUncheckedUpdateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateWithoutIssueInput>;

export const CommentUncheckedUpdateManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parentId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueInput>;

export const NotificationUpdateWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sender: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsSentNestedInputSchema).optional(),
  recipient: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.NotificationUpdateWithoutIssueInput>;

export const NotificationUncheckedUpdateWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateWithoutIssueInput>;

export const NotificationUncheckedUpdateManyWithoutIssueInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutIssueInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isRead: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailSent: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  senderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recipientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutIssueInput>;

export const CommentCreateManyParentInputSchema: z.ZodType<Prisma.CommentCreateManyParentInput> = z.object({
  id: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(1000),
  isEdited: z.boolean().optional(),
  issueId: z.string(),
  isSystem: z.boolean().optional(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.CommentCreateManyParentInput>;

export const CommentUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  issue: z.lazy(() => IssueUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCommentsNestedInputSchema).optional(),
  children: z.lazy(() => CommentUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUpdateWithoutParentInput>;

export const CommentUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  children: z.lazy(() => CommentUncheckedUpdateManyWithoutParentNestedInputSchema).optional()
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentInput>;

export const CommentUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string().trim().min(1).max(1000),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEdited: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  issueId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isSystem: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutParentInput>;

export const GithubWikiFileCreateManyInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileCreateManyInstallationInput> = z.object({
  id: z.string().cuid().optional(),
  path: z.string().trim().min(1).max(255),
  previousPath: z.string().trim().min(1).max(255).optional().nullable(),
  githubRepositoryId: z.number().int(),
  content: z.instanceof(Buffer).optional().nullable(),
  isModified: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateManyInstallationInput>;

export const GithubWikiFileUpdateWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUpdateWithoutInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateWithoutInstallationInput>;

export const GithubWikiFileUncheckedUpdateWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedUpdateWithoutInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedUpdateWithoutInstallationInput>;

export const GithubWikiFileUncheckedUpdateManyWithoutInstallationInputSchema: z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyWithoutInstallationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string().trim().min(1).max(255),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  previousPath: z.union([ z.string().trim().min(1).max(255),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  githubRepositoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isModified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUncheckedUpdateManyWithoutInstallationInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountFindFirstArgs>;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountFindFirstOrThrowArgs>;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.AccountFindManyArgs>;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.AccountAggregateArgs>;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.AccountGroupByArgs>;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.AccountFindUniqueArgs>;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.AccountFindUniqueOrThrowArgs>;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionFindFirstArgs>;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionFindFirstOrThrowArgs>;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.SessionFindManyArgs>;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SessionAggregateArgs>;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.SessionGroupByArgs>;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SessionFindUniqueArgs>;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SessionFindUniqueOrThrowArgs>;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenFindFirstArgs>;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs>;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenFindManyArgs>;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenAggregateArgs>;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenGroupByArgs>;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.VerificationTokenFindUniqueArgs>;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs>;

export const WorkspaceFindFirstArgsSchema: z.ZodType<Prisma.WorkspaceFindFirstArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceOrderByWithRelationInputSchema.array(),WorkspaceOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceScalarFieldEnumSchema,WorkspaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceFindFirstArgs>;

export const WorkspaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceFindFirstOrThrowArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceOrderByWithRelationInputSchema.array(),WorkspaceOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceScalarFieldEnumSchema,WorkspaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceFindFirstOrThrowArgs>;

export const WorkspaceFindManyArgsSchema: z.ZodType<Prisma.WorkspaceFindManyArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceOrderByWithRelationInputSchema.array(),WorkspaceOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceScalarFieldEnumSchema,WorkspaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceFindManyArgs>;

export const WorkspaceAggregateArgsSchema: z.ZodType<Prisma.WorkspaceAggregateArgs> = z.object({
  where: WorkspaceWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceOrderByWithRelationInputSchema.array(),WorkspaceOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceAggregateArgs>;

export const WorkspaceGroupByArgsSchema: z.ZodType<Prisma.WorkspaceGroupByArgs> = z.object({
  where: WorkspaceWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceOrderByWithAggregationInputSchema.array(),WorkspaceOrderByWithAggregationInputSchema ]).optional(),
  by: WorkspaceScalarFieldEnumSchema.array(),
  having: WorkspaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceGroupByArgs>;

export const WorkspaceFindUniqueArgsSchema: z.ZodType<Prisma.WorkspaceFindUniqueArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceFindUniqueArgs>;

export const WorkspaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceFindUniqueOrThrowArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceFindUniqueOrThrowArgs>;

export const WorkspaceMemberFindFirstArgsSchema: z.ZodType<Prisma.WorkspaceMemberFindFirstArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceMemberOrderByWithRelationInputSchema.array(),WorkspaceMemberOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceMemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceMemberScalarFieldEnumSchema,WorkspaceMemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberFindFirstArgs>;

export const WorkspaceMemberFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceMemberFindFirstOrThrowArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceMemberOrderByWithRelationInputSchema.array(),WorkspaceMemberOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceMemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceMemberScalarFieldEnumSchema,WorkspaceMemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberFindFirstOrThrowArgs>;

export const WorkspaceMemberFindManyArgsSchema: z.ZodType<Prisma.WorkspaceMemberFindManyArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceMemberOrderByWithRelationInputSchema.array(),WorkspaceMemberOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceMemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceMemberScalarFieldEnumSchema,WorkspaceMemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberFindManyArgs>;

export const WorkspaceMemberAggregateArgsSchema: z.ZodType<Prisma.WorkspaceMemberAggregateArgs> = z.object({
  where: WorkspaceMemberWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceMemberOrderByWithRelationInputSchema.array(),WorkspaceMemberOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceMemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberAggregateArgs>;

export const WorkspaceMemberGroupByArgsSchema: z.ZodType<Prisma.WorkspaceMemberGroupByArgs> = z.object({
  where: WorkspaceMemberWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceMemberOrderByWithAggregationInputSchema.array(),WorkspaceMemberOrderByWithAggregationInputSchema ]).optional(),
  by: WorkspaceMemberScalarFieldEnumSchema.array(),
  having: WorkspaceMemberScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberGroupByArgs>;

export const WorkspaceMemberFindUniqueArgsSchema: z.ZodType<Prisma.WorkspaceMemberFindUniqueArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceMemberFindUniqueArgs>;

export const WorkspaceMemberFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceMemberFindUniqueOrThrowArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceMemberFindUniqueOrThrowArgs>;

export const WorkspaceInviteFindFirstArgsSchema: z.ZodType<Prisma.WorkspaceInviteFindFirstArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceInviteOrderByWithRelationInputSchema.array(),WorkspaceInviteOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceInviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceInviteScalarFieldEnumSchema,WorkspaceInviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteFindFirstArgs>;

export const WorkspaceInviteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceInviteFindFirstOrThrowArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceInviteOrderByWithRelationInputSchema.array(),WorkspaceInviteOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceInviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceInviteScalarFieldEnumSchema,WorkspaceInviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteFindFirstOrThrowArgs>;

export const WorkspaceInviteFindManyArgsSchema: z.ZodType<Prisma.WorkspaceInviteFindManyArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceInviteOrderByWithRelationInputSchema.array(),WorkspaceInviteOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceInviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkspaceInviteScalarFieldEnumSchema,WorkspaceInviteScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteFindManyArgs>;

export const WorkspaceInviteAggregateArgsSchema: z.ZodType<Prisma.WorkspaceInviteAggregateArgs> = z.object({
  where: WorkspaceInviteWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceInviteOrderByWithRelationInputSchema.array(),WorkspaceInviteOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkspaceInviteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteAggregateArgs>;

export const WorkspaceInviteGroupByArgsSchema: z.ZodType<Prisma.WorkspaceInviteGroupByArgs> = z.object({
  where: WorkspaceInviteWhereInputSchema.optional(),
  orderBy: z.union([ WorkspaceInviteOrderByWithAggregationInputSchema.array(),WorkspaceInviteOrderByWithAggregationInputSchema ]).optional(),
  by: WorkspaceInviteScalarFieldEnumSchema.array(),
  having: WorkspaceInviteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteGroupByArgs>;

export const WorkspaceInviteFindUniqueArgsSchema: z.ZodType<Prisma.WorkspaceInviteFindUniqueArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceInviteFindUniqueArgs>;

export const WorkspaceInviteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceInviteFindUniqueOrThrowArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceInviteFindUniqueOrThrowArgs>;

export const IssueFindFirstArgsSchema: z.ZodType<Prisma.IssueFindFirstArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereInputSchema.optional(),
  orderBy: z.union([ IssueOrderByWithRelationInputSchema.array(),IssueOrderByWithRelationInputSchema ]).optional(),
  cursor: IssueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IssueScalarFieldEnumSchema,IssueScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueFindFirstArgs>;

export const IssueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IssueFindFirstOrThrowArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereInputSchema.optional(),
  orderBy: z.union([ IssueOrderByWithRelationInputSchema.array(),IssueOrderByWithRelationInputSchema ]).optional(),
  cursor: IssueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IssueScalarFieldEnumSchema,IssueScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueFindFirstOrThrowArgs>;

export const IssueFindManyArgsSchema: z.ZodType<Prisma.IssueFindManyArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereInputSchema.optional(),
  orderBy: z.union([ IssueOrderByWithRelationInputSchema.array(),IssueOrderByWithRelationInputSchema ]).optional(),
  cursor: IssueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ IssueScalarFieldEnumSchema,IssueScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.IssueFindManyArgs>;

export const IssueAggregateArgsSchema: z.ZodType<Prisma.IssueAggregateArgs> = z.object({
  where: IssueWhereInputSchema.optional(),
  orderBy: z.union([ IssueOrderByWithRelationInputSchema.array(),IssueOrderByWithRelationInputSchema ]).optional(),
  cursor: IssueWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.IssueAggregateArgs>;

export const IssueGroupByArgsSchema: z.ZodType<Prisma.IssueGroupByArgs> = z.object({
  where: IssueWhereInputSchema.optional(),
  orderBy: z.union([ IssueOrderByWithAggregationInputSchema.array(),IssueOrderByWithAggregationInputSchema ]).optional(),
  by: IssueScalarFieldEnumSchema.array(),
  having: IssueScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.IssueGroupByArgs>;

export const IssueFindUniqueArgsSchema: z.ZodType<Prisma.IssueFindUniqueArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssueFindUniqueArgs>;

export const IssueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IssueFindUniqueOrThrowArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssueFindUniqueOrThrowArgs>;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentFindFirstArgs>;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentFindFirstOrThrowArgs>;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.CommentFindManyArgs>;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CommentAggregateArgs>;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.CommentGroupByArgs>;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentFindUniqueArgs>;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentFindUniqueOrThrowArgs>;

export const GithubAppInstallationFindFirstArgsSchema: z.ZodType<Prisma.GithubAppInstallationFindFirstArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereInputSchema.optional(),
  orderBy: z.union([ GithubAppInstallationOrderByWithRelationInputSchema.array(),GithubAppInstallationOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubAppInstallationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubAppInstallationScalarFieldEnumSchema,GithubAppInstallationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationFindFirstArgs>;

export const GithubAppInstallationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GithubAppInstallationFindFirstOrThrowArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereInputSchema.optional(),
  orderBy: z.union([ GithubAppInstallationOrderByWithRelationInputSchema.array(),GithubAppInstallationOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubAppInstallationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubAppInstallationScalarFieldEnumSchema,GithubAppInstallationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationFindFirstOrThrowArgs>;

export const GithubAppInstallationFindManyArgsSchema: z.ZodType<Prisma.GithubAppInstallationFindManyArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereInputSchema.optional(),
  orderBy: z.union([ GithubAppInstallationOrderByWithRelationInputSchema.array(),GithubAppInstallationOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubAppInstallationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubAppInstallationScalarFieldEnumSchema,GithubAppInstallationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationFindManyArgs>;

export const GithubAppInstallationAggregateArgsSchema: z.ZodType<Prisma.GithubAppInstallationAggregateArgs> = z.object({
  where: GithubAppInstallationWhereInputSchema.optional(),
  orderBy: z.union([ GithubAppInstallationOrderByWithRelationInputSchema.array(),GithubAppInstallationOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubAppInstallationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationAggregateArgs>;

export const GithubAppInstallationGroupByArgsSchema: z.ZodType<Prisma.GithubAppInstallationGroupByArgs> = z.object({
  where: GithubAppInstallationWhereInputSchema.optional(),
  orderBy: z.union([ GithubAppInstallationOrderByWithAggregationInputSchema.array(),GithubAppInstallationOrderByWithAggregationInputSchema ]).optional(),
  by: GithubAppInstallationScalarFieldEnumSchema.array(),
  having: GithubAppInstallationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationGroupByArgs>;

export const GithubAppInstallationFindUniqueArgsSchema: z.ZodType<Prisma.GithubAppInstallationFindUniqueArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubAppInstallationFindUniqueArgs>;

export const GithubAppInstallationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GithubAppInstallationFindUniqueOrThrowArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubAppInstallationFindUniqueOrThrowArgs>;

export const GithubWikiFileFindFirstArgsSchema: z.ZodType<Prisma.GithubWikiFileFindFirstArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereInputSchema.optional(),
  orderBy: z.union([ GithubWikiFileOrderByWithRelationInputSchema.array(),GithubWikiFileOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubWikiFileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubWikiFileScalarFieldEnumSchema,GithubWikiFileScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileFindFirstArgs>;

export const GithubWikiFileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GithubWikiFileFindFirstOrThrowArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereInputSchema.optional(),
  orderBy: z.union([ GithubWikiFileOrderByWithRelationInputSchema.array(),GithubWikiFileOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubWikiFileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubWikiFileScalarFieldEnumSchema,GithubWikiFileScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileFindFirstOrThrowArgs>;

export const GithubWikiFileFindManyArgsSchema: z.ZodType<Prisma.GithubWikiFileFindManyArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereInputSchema.optional(),
  orderBy: z.union([ GithubWikiFileOrderByWithRelationInputSchema.array(),GithubWikiFileOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubWikiFileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GithubWikiFileScalarFieldEnumSchema,GithubWikiFileScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileFindManyArgs>;

export const GithubWikiFileAggregateArgsSchema: z.ZodType<Prisma.GithubWikiFileAggregateArgs> = z.object({
  where: GithubWikiFileWhereInputSchema.optional(),
  orderBy: z.union([ GithubWikiFileOrderByWithRelationInputSchema.array(),GithubWikiFileOrderByWithRelationInputSchema ]).optional(),
  cursor: GithubWikiFileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileAggregateArgs>;

export const GithubWikiFileGroupByArgsSchema: z.ZodType<Prisma.GithubWikiFileGroupByArgs> = z.object({
  where: GithubWikiFileWhereInputSchema.optional(),
  orderBy: z.union([ GithubWikiFileOrderByWithAggregationInputSchema.array(),GithubWikiFileOrderByWithAggregationInputSchema ]).optional(),
  by: GithubWikiFileScalarFieldEnumSchema.array(),
  having: GithubWikiFileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileGroupByArgs>;

export const GithubWikiFileFindUniqueArgsSchema: z.ZodType<Prisma.GithubWikiFileFindUniqueArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubWikiFileFindUniqueArgs>;

export const GithubWikiFileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GithubWikiFileFindUniqueOrThrowArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubWikiFileFindUniqueOrThrowArgs>;

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationFindFirstArgs>;

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationFindFirstOrThrowArgs>;

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NotificationScalarFieldEnumSchema,NotificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.NotificationFindManyArgs>;

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithRelationInputSchema.array(),NotificationOrderByWithRelationInputSchema ]).optional(),
  cursor: NotificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.NotificationAggregateArgs>;

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
  orderBy: z.union([ NotificationOrderByWithAggregationInputSchema.array(),NotificationOrderByWithAggregationInputSchema ]).optional(),
  by: NotificationScalarFieldEnumSchema.array(),
  having: NotificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.NotificationGroupByArgs>;

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.NotificationFindUniqueArgs>;

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyAndReturnArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.AccountCreateArgs>;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.AccountUpsertArgs>;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.AccountCreateManyArgs>;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.AccountCreateManyAndReturnArgs>;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.AccountDeleteArgs>;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.AccountUpdateArgs>;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.AccountUpdateManyArgs>;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.AccountDeleteManyArgs>;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.SessionCreateArgs>;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.SessionUpsertArgs>;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.SessionCreateManyArgs>;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.SessionCreateManyAndReturnArgs>;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SessionDeleteArgs>;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.SessionUpdateArgs>;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SessionUpdateManyArgs>;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.SessionDeleteManyArgs>;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.VerificationTokenCreateArgs>;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.VerificationTokenUpsertArgs>;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenCreateManyArgs>;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs>;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.VerificationTokenDeleteArgs>;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.VerificationTokenUpdateArgs>;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenUpdateManyArgs>;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.VerificationTokenDeleteManyArgs>;

export const WorkspaceCreateArgsSchema: z.ZodType<Prisma.WorkspaceCreateArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  data: z.union([ WorkspaceCreateInputSchema,WorkspaceUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceCreateArgs>;

export const WorkspaceUpsertArgsSchema: z.ZodType<Prisma.WorkspaceUpsertArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereUniqueInputSchema,
  create: z.union([ WorkspaceCreateInputSchema,WorkspaceUncheckedCreateInputSchema ]),
  update: z.union([ WorkspaceUpdateInputSchema,WorkspaceUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceUpsertArgs>;

export const WorkspaceCreateManyArgsSchema: z.ZodType<Prisma.WorkspaceCreateManyArgs> = z.object({
  data: z.union([ WorkspaceCreateManyInputSchema,WorkspaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceCreateManyArgs>;

export const WorkspaceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkspaceCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkspaceCreateManyInputSchema,WorkspaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceCreateManyAndReturnArgs>;

export const WorkspaceDeleteArgsSchema: z.ZodType<Prisma.WorkspaceDeleteArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  where: WorkspaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceDeleteArgs>;

export const WorkspaceUpdateArgsSchema: z.ZodType<Prisma.WorkspaceUpdateArgs> = z.object({
  select: WorkspaceSelectSchema.optional(),
  include: WorkspaceIncludeSchema.optional(),
  data: z.union([ WorkspaceUpdateInputSchema,WorkspaceUncheckedUpdateInputSchema ]),
  where: WorkspaceWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceUpdateArgs>;

export const WorkspaceUpdateManyArgsSchema: z.ZodType<Prisma.WorkspaceUpdateManyArgs> = z.object({
  data: z.union([ WorkspaceUpdateManyMutationInputSchema,WorkspaceUncheckedUpdateManyInputSchema ]),
  where: WorkspaceWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceUpdateManyArgs>;

export const WorkspaceDeleteManyArgsSchema: z.ZodType<Prisma.WorkspaceDeleteManyArgs> = z.object({
  where: WorkspaceWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceDeleteManyArgs>;

export const WorkspaceMemberCreateArgsSchema: z.ZodType<Prisma.WorkspaceMemberCreateArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  data: z.union([ WorkspaceMemberCreateInputSchema,WorkspaceMemberUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateArgs>;

export const WorkspaceMemberUpsertArgsSchema: z.ZodType<Prisma.WorkspaceMemberUpsertArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereUniqueInputSchema,
  create: z.union([ WorkspaceMemberCreateInputSchema,WorkspaceMemberUncheckedCreateInputSchema ]),
  update: z.union([ WorkspaceMemberUpdateInputSchema,WorkspaceMemberUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpsertArgs>;

export const WorkspaceMemberCreateManyArgsSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyArgs> = z.object({
  data: z.union([ WorkspaceMemberCreateManyInputSchema,WorkspaceMemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyArgs>;

export const WorkspaceMemberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkspaceMemberCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkspaceMemberCreateManyInputSchema,WorkspaceMemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberCreateManyAndReturnArgs>;

export const WorkspaceMemberDeleteArgsSchema: z.ZodType<Prisma.WorkspaceMemberDeleteArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  where: WorkspaceMemberWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceMemberDeleteArgs>;

export const WorkspaceMemberUpdateArgsSchema: z.ZodType<Prisma.WorkspaceMemberUpdateArgs> = z.object({
  select: WorkspaceMemberSelectSchema.optional(),
  include: WorkspaceMemberIncludeSchema.optional(),
  data: z.union([ WorkspaceMemberUpdateInputSchema,WorkspaceMemberUncheckedUpdateInputSchema ]),
  where: WorkspaceMemberWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateArgs>;

export const WorkspaceMemberUpdateManyArgsSchema: z.ZodType<Prisma.WorkspaceMemberUpdateManyArgs> = z.object({
  data: z.union([ WorkspaceMemberUpdateManyMutationInputSchema,WorkspaceMemberUncheckedUpdateManyInputSchema ]),
  where: WorkspaceMemberWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberUpdateManyArgs>;

export const WorkspaceMemberDeleteManyArgsSchema: z.ZodType<Prisma.WorkspaceMemberDeleteManyArgs> = z.object({
  where: WorkspaceMemberWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceMemberDeleteManyArgs>;

export const WorkspaceInviteCreateArgsSchema: z.ZodType<Prisma.WorkspaceInviteCreateArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  data: z.union([ WorkspaceInviteCreateInputSchema,WorkspaceInviteUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateArgs>;

export const WorkspaceInviteUpsertArgsSchema: z.ZodType<Prisma.WorkspaceInviteUpsertArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereUniqueInputSchema,
  create: z.union([ WorkspaceInviteCreateInputSchema,WorkspaceInviteUncheckedCreateInputSchema ]),
  update: z.union([ WorkspaceInviteUpdateInputSchema,WorkspaceInviteUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpsertArgs>;

export const WorkspaceInviteCreateManyArgsSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyArgs> = z.object({
  data: z.union([ WorkspaceInviteCreateManyInputSchema,WorkspaceInviteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyArgs>;

export const WorkspaceInviteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkspaceInviteCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkspaceInviteCreateManyInputSchema,WorkspaceInviteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteCreateManyAndReturnArgs>;

export const WorkspaceInviteDeleteArgsSchema: z.ZodType<Prisma.WorkspaceInviteDeleteArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  where: WorkspaceInviteWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceInviteDeleteArgs>;

export const WorkspaceInviteUpdateArgsSchema: z.ZodType<Prisma.WorkspaceInviteUpdateArgs> = z.object({
  select: WorkspaceInviteSelectSchema.optional(),
  include: WorkspaceInviteIncludeSchema.optional(),
  data: z.union([ WorkspaceInviteUpdateInputSchema,WorkspaceInviteUncheckedUpdateInputSchema ]),
  where: WorkspaceInviteWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateArgs>;

export const WorkspaceInviteUpdateManyArgsSchema: z.ZodType<Prisma.WorkspaceInviteUpdateManyArgs> = z.object({
  data: z.union([ WorkspaceInviteUpdateManyMutationInputSchema,WorkspaceInviteUncheckedUpdateManyInputSchema ]),
  where: WorkspaceInviteWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteUpdateManyArgs>;

export const WorkspaceInviteDeleteManyArgsSchema: z.ZodType<Prisma.WorkspaceInviteDeleteManyArgs> = z.object({
  where: WorkspaceInviteWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.WorkspaceInviteDeleteManyArgs>;

export const IssueCreateArgsSchema: z.ZodType<Prisma.IssueCreateArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  data: z.union([ IssueCreateInputSchema,IssueUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.IssueCreateArgs>;

export const IssueUpsertArgsSchema: z.ZodType<Prisma.IssueUpsertArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereUniqueInputSchema,
  create: z.union([ IssueCreateInputSchema,IssueUncheckedCreateInputSchema ]),
  update: z.union([ IssueUpdateInputSchema,IssueUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.IssueUpsertArgs>;

export const IssueCreateManyArgsSchema: z.ZodType<Prisma.IssueCreateManyArgs> = z.object({
  data: z.union([ IssueCreateManyInputSchema,IssueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.IssueCreateManyArgs>;

export const IssueCreateManyAndReturnArgsSchema: z.ZodType<Prisma.IssueCreateManyAndReturnArgs> = z.object({
  data: z.union([ IssueCreateManyInputSchema,IssueCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.IssueCreateManyAndReturnArgs>;

export const IssueDeleteArgsSchema: z.ZodType<Prisma.IssueDeleteArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  where: IssueWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssueDeleteArgs>;

export const IssueUpdateArgsSchema: z.ZodType<Prisma.IssueUpdateArgs> = z.object({
  select: IssueSelectSchema.optional(),
  include: IssueIncludeSchema.optional(),
  data: z.union([ IssueUpdateInputSchema,IssueUncheckedUpdateInputSchema ]),
  where: IssueWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.IssueUpdateArgs>;

export const IssueUpdateManyArgsSchema: z.ZodType<Prisma.IssueUpdateManyArgs> = z.object({
  data: z.union([ IssueUpdateManyMutationInputSchema,IssueUncheckedUpdateManyInputSchema ]),
  where: IssueWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.IssueUpdateManyArgs>;

export const IssueDeleteManyArgsSchema: z.ZodType<Prisma.IssueDeleteManyArgs> = z.object({
  where: IssueWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.IssueDeleteManyArgs>;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.CommentCreateArgs>;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.CommentUpsertArgs>;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CommentCreateManyArgs>;

export const CommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommentCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.CommentCreateManyAndReturnArgs>;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentDeleteArgs>;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.CommentUpdateArgs>;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CommentUpdateManyArgs>;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.CommentDeleteManyArgs>;

export const GithubAppInstallationCreateArgsSchema: z.ZodType<Prisma.GithubAppInstallationCreateArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  data: z.union([ GithubAppInstallationCreateInputSchema,GithubAppInstallationUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateArgs>;

export const GithubAppInstallationUpsertArgsSchema: z.ZodType<Prisma.GithubAppInstallationUpsertArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereUniqueInputSchema,
  create: z.union([ GithubAppInstallationCreateInputSchema,GithubAppInstallationUncheckedCreateInputSchema ]),
  update: z.union([ GithubAppInstallationUpdateInputSchema,GithubAppInstallationUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpsertArgs>;

export const GithubAppInstallationCreateManyArgsSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyArgs> = z.object({
  data: z.union([ GithubAppInstallationCreateManyInputSchema,GithubAppInstallationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyArgs>;

export const GithubAppInstallationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GithubAppInstallationCreateManyAndReturnArgs> = z.object({
  data: z.union([ GithubAppInstallationCreateManyInputSchema,GithubAppInstallationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationCreateManyAndReturnArgs>;

export const GithubAppInstallationDeleteArgsSchema: z.ZodType<Prisma.GithubAppInstallationDeleteArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  where: GithubAppInstallationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubAppInstallationDeleteArgs>;

export const GithubAppInstallationUpdateArgsSchema: z.ZodType<Prisma.GithubAppInstallationUpdateArgs> = z.object({
  select: GithubAppInstallationSelectSchema.optional(),
  include: GithubAppInstallationIncludeSchema.optional(),
  data: z.union([ GithubAppInstallationUpdateInputSchema,GithubAppInstallationUncheckedUpdateInputSchema ]),
  where: GithubAppInstallationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateArgs>;

export const GithubAppInstallationUpdateManyArgsSchema: z.ZodType<Prisma.GithubAppInstallationUpdateManyArgs> = z.object({
  data: z.union([ GithubAppInstallationUpdateManyMutationInputSchema,GithubAppInstallationUncheckedUpdateManyInputSchema ]),
  where: GithubAppInstallationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationUpdateManyArgs>;

export const GithubAppInstallationDeleteManyArgsSchema: z.ZodType<Prisma.GithubAppInstallationDeleteManyArgs> = z.object({
  where: GithubAppInstallationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GithubAppInstallationDeleteManyArgs>;

export const GithubWikiFileCreateArgsSchema: z.ZodType<Prisma.GithubWikiFileCreateArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  data: z.union([ GithubWikiFileCreateInputSchema,GithubWikiFileUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateArgs>;

export const GithubWikiFileUpsertArgsSchema: z.ZodType<Prisma.GithubWikiFileUpsertArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereUniqueInputSchema,
  create: z.union([ GithubWikiFileCreateInputSchema,GithubWikiFileUncheckedCreateInputSchema ]),
  update: z.union([ GithubWikiFileUpdateInputSchema,GithubWikiFileUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpsertArgs>;

export const GithubWikiFileCreateManyArgsSchema: z.ZodType<Prisma.GithubWikiFileCreateManyArgs> = z.object({
  data: z.union([ GithubWikiFileCreateManyInputSchema,GithubWikiFileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateManyArgs>;

export const GithubWikiFileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GithubWikiFileCreateManyAndReturnArgs> = z.object({
  data: z.union([ GithubWikiFileCreateManyInputSchema,GithubWikiFileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileCreateManyAndReturnArgs>;

export const GithubWikiFileDeleteArgsSchema: z.ZodType<Prisma.GithubWikiFileDeleteArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  where: GithubWikiFileWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubWikiFileDeleteArgs>;

export const GithubWikiFileUpdateArgsSchema: z.ZodType<Prisma.GithubWikiFileUpdateArgs> = z.object({
  select: GithubWikiFileSelectSchema.optional(),
  include: GithubWikiFileIncludeSchema.optional(),
  data: z.union([ GithubWikiFileUpdateInputSchema,GithubWikiFileUncheckedUpdateInputSchema ]),
  where: GithubWikiFileWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateArgs>;

export const GithubWikiFileUpdateManyArgsSchema: z.ZodType<Prisma.GithubWikiFileUpdateManyArgs> = z.object({
  data: z.union([ GithubWikiFileUpdateManyMutationInputSchema,GithubWikiFileUncheckedUpdateManyInputSchema ]),
  where: GithubWikiFileWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileUpdateManyArgs>;

export const GithubWikiFileDeleteManyArgsSchema: z.ZodType<Prisma.GithubWikiFileDeleteManyArgs> = z.object({
  where: GithubWikiFileWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.GithubWikiFileDeleteManyArgs>;

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.NotificationCreateArgs>;

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
  create: z.union([ NotificationCreateInputSchema,NotificationUncheckedCreateInputSchema ]),
  update: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.NotificationUpsertArgs>;

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema,NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.NotificationCreateManyArgs>;

export const NotificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationCreateManyAndReturnArgs> = z.object({
  data: z.union([ NotificationCreateManyInputSchema,NotificationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.NotificationCreateManyAndReturnArgs>;

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  where: NotificationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.NotificationDeleteArgs>;

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> = z.object({
  select: NotificationSelectSchema.optional(),
  include: NotificationIncludeSchema.optional(),
  data: z.union([ NotificationUpdateInputSchema,NotificationUncheckedUpdateInputSchema ]),
  where: NotificationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.NotificationUpdateArgs>;

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> = z.object({
  data: z.union([ NotificationUpdateManyMutationInputSchema,NotificationUncheckedUpdateManyInputSchema ]),
  where: NotificationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.NotificationUpdateManyArgs>;

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> = z.object({
  where: NotificationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.NotificationDeleteManyArgs>;