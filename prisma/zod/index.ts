import type { Prisma } from '@prisma/client';
import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'type',
  'provider',
  'providerAccountId',
  'refresh_token',
  'access_token',
  'expires_at',
  'token_type',
  'scope',
  'id_token',
  'session_state',
  'refresh_token_expires_in',
]);

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'sessionToken',
  'userId',
  'expires',
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  'userId',
  'token',
  'expires',
]);

export const SubscriptionScalarFieldEnumSchema = z.enum([
  'userId',
  'stripeCustomerId',
  'stripeSubscriptionId',
  'stripePriceId',
  'stripeCurrentPeriodEnd',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
]);

export const WorkspaceScalarFieldEnumSchema = z.enum(['id', 'name', 'ownerId']);

export const IssueScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'status',
  'workspaceId',
  'assigneeId',
  'reporterId',
  'createdAt',
  'updatedAt',
]);

export const CommentScalarFieldEnumSchema = z.enum([
  'id',
  'body',
  'issueId',
  'authorId',
  'createdAt',
  'updatedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
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
  refresh_token_expires_in: z.number().int().nullable(),
});

export type Account = z.infer<typeof AccountSchema>;

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> &
  AccountRelations;

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> =
  AccountSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> &
  SessionRelations;

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> =
  SessionSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  userId: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

// VERIFICATION TOKEN RELATION SCHEMA
//------------------------------------------------------

export type VerificationTokenRelations = {
  user: UserWithRelations;
};

export type VerificationTokenWithRelations = z.infer<
  typeof VerificationTokenSchema
> &
  VerificationTokenRelations;

export const VerificationTokenWithRelationsSchema: z.ZodType<VerificationTokenWithRelations> =
  VerificationTokenSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const SubscriptionSchema = z.object({
  userId: z.string(),
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string().nullable(),
  stripePriceId: z.string().nullable(),
  stripeCurrentPeriodEnd: z.coerce.date().nullable(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

// SUBSCRIPTION RELATION SCHEMA
//------------------------------------------------------

export type SubscriptionRelations = {
  user: UserWithRelations;
};

export type SubscriptionWithRelations = z.infer<typeof SubscriptionSchema> &
  SubscriptionRelations;

export const SubscriptionWithRelationsSchema: z.ZodType<SubscriptionWithRelations> =
  SubscriptionSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().min(1).max(255),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
  subscription?: SubscriptionWithRelations | null;
  VerificationToken?: VerificationTokenWithRelations | null;
  Workspaces: WorkspaceWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      accounts: z.lazy(() => AccountWithRelationsSchema).array(),
      sessions: z.lazy(() => SessionWithRelationsSchema).array(),
      subscription: z.lazy(() => SubscriptionWithRelationsSchema).nullable(),
      VerificationToken: z
        .lazy(() => VerificationTokenWithRelationsSchema)
        .nullable(),
      Workspaces: z.lazy(() => WorkspaceWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// WORKSPACE SCHEMA
/////////////////////////////////////////

export const WorkspaceSchema = z.object({
  id: z.string().cuid(),
  name: z.string().trim().min(1).max(255),
  ownerId: z.string(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;

// WORKSPACE RELATION SCHEMA
//------------------------------------------------------

export type WorkspaceRelations = {
  members: UserWithRelations[];
  issues: IssueWithRelations[];
};

export type WorkspaceWithRelations = z.infer<typeof WorkspaceSchema> &
  WorkspaceRelations;

export const WorkspaceWithRelationsSchema: z.ZodType<WorkspaceWithRelations> =
  WorkspaceSchema.merge(
    z.object({
      members: z.lazy(() => UserWithRelationsSchema).array(),
      issues: z.lazy(() => IssueWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// ISSUE SCHEMA
/////////////////////////////////////////

export const IssueSchema = z.object({
  id: z.string().cuid(),
  title: z.string().trim().min(1).max(255),
  description: z.string().trim().min(1).max(255).nullable(),
  status: z.string(),
  workspaceId: z.string(),
  assigneeId: z.string().nullable(),
  reporterId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Issue = z.infer<typeof IssueSchema>;

// ISSUE RELATION SCHEMA
//------------------------------------------------------

export type IssueRelations = {
  workspace: WorkspaceWithRelations;
  comments: CommentWithRelations[];
};

export type IssueWithRelations = z.infer<typeof IssueSchema> & IssueRelations;

export const IssueWithRelationsSchema: z.ZodType<IssueWithRelations> =
  IssueSchema.merge(
    z.object({
      workspace: z.lazy(() => WorkspaceWithRelationsSchema),
      comments: z.lazy(() => CommentWithRelationsSchema).array(),
    })
  );

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().cuid(),
  body: z.string().trim().min(1).max(255),
  issueId: z.string(),
  authorId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Comment = z.infer<typeof CommentSchema>;

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  issue: IssueWithRelations;
};

export type CommentWithRelations = z.infer<typeof CommentSchema> &
  CommentRelations;

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> =
  CommentSchema.merge(
    z.object({
      issue: z.lazy(() => IssueWithRelationsSchema),
    })
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
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
    refresh_token_expires_in: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenIncludeSchema: z.ZodType<Prisma.VerificationTokenInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

export const VerificationTokenArgsSchema: z.ZodType<Prisma.VerificationTokenDefaultArgs> =
  z
    .object({
      select: z.lazy(() => VerificationTokenSelectSchema).optional(),
      include: z.lazy(() => VerificationTokenIncludeSchema).optional(),
    })
    .strict();

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> =
  z
    .object({
      userId: z.boolean().optional(),
      token: z.boolean().optional(),
      expires: z.boolean().optional(),
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

// SUBSCRIPTION
//------------------------------------------------------

export const SubscriptionIncludeSchema: z.ZodType<Prisma.SubscriptionInclude> =
  z
    .object({
      user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    })
    .strict();

export const SubscriptionArgsSchema: z.ZodType<Prisma.SubscriptionDefaultArgs> =
  z
    .object({
      select: z.lazy(() => SubscriptionSelectSchema).optional(),
      include: z.lazy(() => SubscriptionIncludeSchema).optional(),
    })
    .strict();

export const SubscriptionSelectSchema: z.ZodType<Prisma.SubscriptionSelect> = z
  .object({
    userId: z.boolean().optional(),
    stripeCustomerId: z.boolean().optional(),
    stripeSubscriptionId: z.boolean().optional(),
    stripePriceId: z.boolean().optional(),
    stripeCurrentPeriodEnd: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    subscription: z
      .union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)])
      .optional(),
    VerificationToken: z
      .union([z.boolean(), z.lazy(() => VerificationTokenArgsSchema)])
      .optional(),
    Workspaces: z
      .union([z.boolean(), z.lazy(() => WorkspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      accounts: z.boolean().optional(),
      sessions: z.boolean().optional(),
      Workspaces: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    subscription: z
      .union([z.boolean(), z.lazy(() => SubscriptionArgsSchema)])
      .optional(),
    VerificationToken: z
      .union([z.boolean(), z.lazy(() => VerificationTokenArgsSchema)])
      .optional(),
    Workspaces: z
      .union([z.boolean(), z.lazy(() => WorkspaceFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// WORKSPACE
//------------------------------------------------------

export const WorkspaceIncludeSchema: z.ZodType<Prisma.WorkspaceInclude> = z
  .object({
    members: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    issues: z
      .union([z.boolean(), z.lazy(() => IssueFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => WorkspaceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const WorkspaceArgsSchema: z.ZodType<Prisma.WorkspaceDefaultArgs> = z
  .object({
    select: z.lazy(() => WorkspaceSelectSchema).optional(),
    include: z.lazy(() => WorkspaceIncludeSchema).optional(),
  })
  .strict();

export const WorkspaceCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkspaceCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => WorkspaceCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const WorkspaceCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkspaceCountOutputTypeSelect> =
  z
    .object({
      members: z.boolean().optional(),
      issues: z.boolean().optional(),
    })
    .strict();

export const WorkspaceSelectSchema: z.ZodType<Prisma.WorkspaceSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    members: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    issues: z
      .union([z.boolean(), z.lazy(() => IssueFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => WorkspaceCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// ISSUE
//------------------------------------------------------

export const IssueIncludeSchema: z.ZodType<Prisma.IssueInclude> = z
  .object({
    workspace: z
      .union([z.boolean(), z.lazy(() => WorkspaceArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => IssueCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const IssueArgsSchema: z.ZodType<Prisma.IssueDefaultArgs> = z
  .object({
    select: z.lazy(() => IssueSelectSchema).optional(),
    include: z.lazy(() => IssueIncludeSchema).optional(),
  })
  .strict();

export const IssueCountOutputTypeArgsSchema: z.ZodType<Prisma.IssueCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => IssueCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const IssueCountOutputTypeSelectSchema: z.ZodType<Prisma.IssueCountOutputTypeSelect> =
  z
    .object({
      comments: z.boolean().optional(),
    })
    .strict();

export const IssueSelectSchema: z.ZodType<Prisma.IssueSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    status: z.boolean().optional(),
    workspaceId: z.boolean().optional(),
    assigneeId: z.boolean().optional(),
    reporterId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    workspace: z
      .union([z.boolean(), z.lazy(() => WorkspaceArgsSchema)])
      .optional(),
    comments: z
      .union([z.boolean(), z.lazy(() => CommentFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => IssueCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z
  .object({
    issue: z.union([z.boolean(), z.lazy(() => IssueArgsSchema)]).optional(),
  })
  .strict();

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z
  .object({
    select: z.lazy(() => CommentSelectSchema).optional(),
    include: z.lazy(() => CommentIncludeSchema).optional(),
  })
  .strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z
  .object({
    id: z.boolean().optional(),
    body: z.boolean().optional(),
    issueId: z.boolean().optional(),
    authorId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    issue: z.union([z.boolean(), z.lazy(() => IssueArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refresh_token_expires_in: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.AccountWhereInput>;

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      refresh_token_expires_in: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountOrderByWithRelationInput>;

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        provider_providerAccountId: z.lazy(
          () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
        ),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          provider_providerAccountId: z
            .lazy(
              () => AccountProviderProviderAccountIdCompoundUniqueInputSchema
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AccountWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          type: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          provider: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          providerAccountId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          refresh_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          access_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          expires_at: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          token_type: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          scope: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          id_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          session_state: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          refresh_token_expires_in: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.AccountWhereUniqueInput>;

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      refresh_token_expires_in: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountOrderByWithAggregationInput>;

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput>;

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    sessionToken: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.SessionWhereInput>;

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionOrderByWithRelationInput>;

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        sessionToken: z.string(),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        sessionToken: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          sessionToken: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SessionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.SessionWhereUniqueInput>;

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionOrderByWithAggregationInput>;

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      sessionToken: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput>;

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenWhereInput>;

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput>;

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> =
  z
    .union([
      z.object({
        userId: z.string(),
        token: z.string(),
        userId_token: z.lazy(
          () => VerificationTokenUserIdTokenCompoundUniqueInputSchema
        ),
      }),
      z.object({
        userId: z.string(),
        token: z.string(),
      }),
      z.object({
        userId: z.string(),
        userId_token: z.lazy(
          () => VerificationTokenUserIdTokenCompoundUniqueInputSchema
        ),
      }),
      z.object({
        userId: z.string(),
      }),
      z.object({
        token: z.string(),
        userId_token: z.lazy(
          () => VerificationTokenUserIdTokenCompoundUniqueInputSchema
        ),
      }),
      z.object({
        token: z.string(),
      }),
      z.object({
        userId_token: z.lazy(
          () => VerificationTokenUserIdTokenCompoundUniqueInputSchema
        ),
      }),
    ])
    .and(
      z
        .object({
          userId: z.string().optional(),
          token: z.string().optional(),
          userId_token: z
            .lazy(() => VerificationTokenUserIdTokenCompoundUniqueInputSchema)
            .optional(),
          AND: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => VerificationTokenWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.VerificationTokenWhereUniqueInput>;

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => VerificationTokenCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => VerificationTokenMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => VerificationTokenMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput>;

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      token: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput>;

export const SubscriptionWhereInputSchema: z.ZodType<Prisma.SubscriptionWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubscriptionWhereInputSchema),
          z.lazy(() => SubscriptionWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubscriptionWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubscriptionWhereInputSchema),
          z.lazy(() => SubscriptionWhereInputSchema).array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      stripeCustomerId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      stripeSubscriptionId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      user: z
        .union([
          z.lazy(() => UserRelationFilterSchema),
          z.lazy(() => UserWhereInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionWhereInput>;

export const SubscriptionOrderByWithRelationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithRelationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripePriceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionOrderByWithRelationInput>;

export const SubscriptionWhereUniqueInputSchema: z.ZodType<Prisma.SubscriptionWhereUniqueInput> =
  z
    .union([
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        userId: z.string(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        userId: z.string(),
        stripeCustomerId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        userId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        userId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        stripeCustomerId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId_stripeCustomerId: z.lazy(
          () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
        ),
      }),
      z.object({
        userId: z.string(),
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId: z.string(),
        stripeCustomerId: z.string(),
      }),
      z.object({
        userId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        userId: z.string(),
      }),
      z.object({
        stripeCustomerId: z.string(),
        stripeSubscriptionId: z.string(),
      }),
      z.object({
        stripeCustomerId: z.string(),
      }),
      z.object({
        stripeSubscriptionId: z.string(),
      }),
    ])
    .and(
      z
        .object({
          userId: z.string().optional(),
          stripeCustomerId: z.string().optional(),
          stripeSubscriptionId: z.string().optional(),
          userId_stripeCustomerId: z
            .lazy(
              () => SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => SubscriptionWhereInputSchema),
              z.lazy(() => SubscriptionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SubscriptionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SubscriptionWhereInputSchema),
              z.lazy(() => SubscriptionWhereInputSchema).array(),
            ])
            .optional(),
          stripePriceId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          stripeCurrentPeriodEnd: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.SubscriptionWhereUniqueInput>;

export const SubscriptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripePriceId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z
        .lazy(() => SubscriptionCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => SubscriptionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SubscriptionMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionOrderByWithAggregationInput>;

export const SubscriptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => SubscriptionScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      stripeCustomerId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionScalarWhereWithAggregatesInput>;

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    subscription: z
      .union([
        z.lazy(() => SubscriptionNullableRelationFilterSchema),
        z.lazy(() => SubscriptionWhereInputSchema),
      ])
      .optional()
      .nullable(),
    VerificationToken: z
      .union([
        z.lazy(() => VerificationTokenNullableRelationFilterSchema),
        z.lazy(() => VerificationTokenWhereInputSchema),
      ])
      .optional()
      .nullable(),
    Workspaces: z.lazy(() => WorkspaceListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionOrderByRelationAggregateInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionOrderByWithRelationInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenOrderByWithRelationInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        email: z.string().trim().min(1).max(255),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        email: z.string().trim().min(1).max(255),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          email: z.string().trim().min(1).max(255).optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string().trim().min(1).max(255),
            ])
            .optional(),
          emailVerified: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
          sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
          subscription: z
            .union([
              z.lazy(() => SubscriptionNullableRelationFilterSchema),
              z.lazy(() => SubscriptionWhereInputSchema),
            ])
            .optional()
            .nullable(),
          VerificationToken: z
            .union([
              z.lazy(() => VerificationTokenNullableRelationFilterSchema),
              z.lazy(() => VerificationTokenWhereInputSchema),
            ])
            .optional()
            .nullable(),
          Workspaces: z
            .lazy(() => WorkspaceListRelationFilterSchema)
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      emailVerified: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const WorkspaceWhereInputSchema: z.ZodType<Prisma.WorkspaceWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => WorkspaceWhereInputSchema),
          z.lazy(() => WorkspaceWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => WorkspaceWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => WorkspaceWhereInputSchema),
          z.lazy(() => WorkspaceWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      ownerId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      members: z.lazy(() => UserListRelationFilterSchema).optional(),
      issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceWhereInput>;

export const WorkspaceOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkspaceOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      members: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
      issues: z.lazy(() => IssueOrderByRelationAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceOrderByWithRelationInput>;

export const WorkspaceWhereUniqueInputSchema: z.ZodType<Prisma.WorkspaceWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string().cuid(),
        name: z.string().trim().min(1).max(255),
      }),
      z.object({
        id: z.string().cuid(),
      }),
      z.object({
        name: z.string().trim().min(1).max(255),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          name: z.string().trim().min(1).max(255).optional(),
          AND: z
            .union([
              z.lazy(() => WorkspaceWhereInputSchema),
              z.lazy(() => WorkspaceWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => WorkspaceWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => WorkspaceWhereInputSchema),
              z.lazy(() => WorkspaceWhereInputSchema).array(),
            ])
            .optional(),
          ownerId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          members: z.lazy(() => UserListRelationFilterSchema).optional(),
          issues: z.lazy(() => IssueListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.WorkspaceWhereUniqueInput>;

export const WorkspaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkspaceOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => WorkspaceCountOrderByAggregateInputSchema)
        .optional(),
      _max: z.lazy(() => WorkspaceMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => WorkspaceMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceOrderByWithAggregationInput>;

export const WorkspaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkspaceScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema),
          z.lazy(() => WorkspaceScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      ownerId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceScalarWhereWithAggregatesInput>;

export const IssueWhereInputSchema: z.ZodType<Prisma.IssueWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => IssueWhereInputSchema),
        z.lazy(() => IssueWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => IssueWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => IssueWhereInputSchema),
        z.lazy(() => IssueWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    status: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    workspaceId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    assigneeId: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    reporterId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    workspace: z
      .union([
        z.lazy(() => WorkspaceRelationFilterSchema),
        z.lazy(() => WorkspaceWhereInputSchema),
      ])
      .optional(),
    comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.IssueWhereInput>;

export const IssueOrderByWithRelationInputSchema: z.ZodType<Prisma.IssueOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      workspaceId: z.lazy(() => SortOrderSchema).optional(),
      assigneeId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      reporterId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      workspace: z
        .lazy(() => WorkspaceOrderByWithRelationInputSchema)
        .optional(),
      comments: z
        .lazy(() => CommentOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueOrderByWithRelationInput>;

export const IssueWhereUniqueInputSchema: z.ZodType<Prisma.IssueWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => IssueWhereInputSchema),
              z.lazy(() => IssueWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => IssueWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => IssueWhereInputSchema),
              z.lazy(() => IssueWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string().trim().min(1).max(255),
            ])
            .optional(),
          description: z
            .union([
              z.lazy(() => StringNullableFilterSchema),
              z.string().trim().min(1).max(255),
            ])
            .optional()
            .nullable(),
          status: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          workspaceId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          assigneeId: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          reporterId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          workspace: z
            .union([
              z.lazy(() => WorkspaceRelationFilterSchema),
              z.lazy(() => WorkspaceWhereInputSchema),
            ])
            .optional(),
          comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.IssueWhereUniqueInput>;

export const IssueOrderByWithAggregationInputSchema: z.ZodType<Prisma.IssueOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      workspaceId: z.lazy(() => SortOrderSchema).optional(),
      assigneeId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      reporterId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => IssueCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => IssueMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => IssueMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueOrderByWithAggregationInput>;

export const IssueScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IssueScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IssueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => IssueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IssueScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IssueScalarWhereWithAggregatesInputSchema),
          z.lazy(() => IssueScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      status: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      workspaceId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      assigneeId: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueScalarWhereWithAggregatesInput>;

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CommentWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CommentWhereInputSchema),
        z.lazy(() => CommentWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    issueId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    authorId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    issue: z
      .union([
        z.lazy(() => IssueRelationFilterSchema),
        z.lazy(() => IssueWhereInputSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.CommentWhereInput>;

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      issueId: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      issue: z.lazy(() => IssueOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentOrderByWithRelationInput>;

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid(),
    })
    .and(
      z
        .object({
          id: z.string().cuid().optional(),
          AND: z
            .union([
              z.lazy(() => CommentWhereInputSchema),
              z.lazy(() => CommentWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => CommentWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => CommentWhereInputSchema),
              z.lazy(() => CommentWhereInputSchema).array(),
            ])
            .optional(),
          body: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string().trim().min(1).max(255),
            ])
            .optional(),
          issueId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          authorId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          issue: z
            .union([
              z.lazy(() => IssueRelationFilterSchema),
              z.lazy(() => IssueWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.CommentWhereUniqueInput>;

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      issueId: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentOrderByWithAggregationInput>;

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommentScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),
          z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      body: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      issueId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      authorId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput>;

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
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
    refresh_token_expires_in: z.number().int().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  })
  .strict() as z.ZodType<Prisma.AccountCreateInput>;

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
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
      refresh_token_expires_in: z.number().int().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedCreateInput>;

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refresh_token_expires_in: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.AccountUpdateInput>;

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedUpdateInput>;

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
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
      refresh_token_expires_in: z.number().int().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateManyInput>;

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateManyMutationInput>;

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyInput>;

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    sessionToken: z.string(),
    expires: z.coerce.date(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict() as z.ZodType<Prisma.SessionCreateInput>;

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedCreateInput>;

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessionToken: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expires: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.SessionUpdateInput>;

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedUpdateInput>;

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateManyInput>;

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateManyMutationInput>;

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyInput>;

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> =
  z
    .object({
      token: z.string(),
      expires: z.coerce.date(),
      user: z.lazy(
        () => UserCreateNestedOneWithoutVerificationTokenInputSchema
      ),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateInput>;

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> =
  z
    .object({
      userId: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedCreateInput>;

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> =
  z
    .object({
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(
          () => UserUpdateOneRequiredWithoutVerificationTokenNestedInputSchema
        )
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateInput>;

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput>;

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> =
  z
    .object({
      userId: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateManyInput>;

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> =
  z
    .object({
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput>;

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput>;

export const SubscriptionCreateInputSchema: z.ZodType<Prisma.SubscriptionCreateInput> =
  z
    .object({
      stripeCustomerId: z.string(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
      user: z.lazy(() => UserCreateNestedOneWithoutSubscriptionInputSchema),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateInput>;

export const SubscriptionUncheckedCreateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateInput> =
  z
    .object({
      userId: z.string(),
      stripeCustomerId: z.string(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedCreateInput>;

export const SubscriptionUpdateInputSchema: z.ZodType<Prisma.SubscriptionUpdateInput> =
  z
    .object({
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateInput>;

export const SubscriptionUncheckedUpdateInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedUpdateInput>;

export const SubscriptionCreateManyInputSchema: z.ZodType<Prisma.SubscriptionCreateManyInput> =
  z
    .object({
      userId: z.string(),
      stripeCustomerId: z.string(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateManyInput>;

export const SubscriptionUpdateManyMutationInputSchema: z.ZodType<Prisma.SubscriptionUpdateManyMutationInput> =
  z
    .object({
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateManyMutationInput>;

export const SubscriptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedUpdateManyInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    name: z.string().trim().min(1).max(255),
    email: z.string().trim().min(1).max(255),
    emailVerified: z.coerce.date().optional().nullable(),
    image: z.string().optional().nullable(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    subscription: z
      .lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema)
      .optional(),
    VerificationToken: z
      .lazy(() => VerificationTokenCreateNestedOneWithoutUserInputSchema)
      .optional(),
    Workspaces: z
      .lazy(() => WorkspaceCreateNestedManyWithoutMembersInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string().trim().min(1).max(255),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    email: z
      .union([
        z.string().trim().min(1).max(255),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    subscription: z
      .lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema)
      .optional(),
    VerificationToken: z
      .lazy(() => VerificationTokenUpdateOneWithoutUserNestedInputSchema)
      .optional(),
    Workspaces: z
      .lazy(() => WorkspaceUpdateManyWithoutMembersNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const WorkspaceCreateInputSchema: z.ZodType<Prisma.WorkspaceCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      members: z
        .lazy(() => UserCreateNestedManyWithoutWorkspacesInputSchema)
        .optional(),
      issues: z
        .lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateInput>;

export const WorkspaceUncheckedCreateInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      members: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutWorkspacesInputSchema)
        .optional(),
      issues: z
        .lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateInput>;

export const WorkspaceUpdateInputSchema: z.ZodType<Prisma.WorkspaceUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      members: z
        .lazy(() => UserUpdateManyWithoutWorkspacesNestedInputSchema)
        .optional(),
      issues: z
        .lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateInput>;

export const WorkspaceUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      members: z
        .lazy(() => UserUncheckedUpdateManyWithoutWorkspacesNestedInputSchema)
        .optional(),
      issues: z
        .lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateInput>;

export const WorkspaceCreateManyInputSchema: z.ZodType<Prisma.WorkspaceCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateManyInput>;

export const WorkspaceUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkspaceUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateManyMutationInput>;

export const WorkspaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateManyInput>;

export const IssueCreateInputSchema: z.ZodType<Prisma.IssueCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    title: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1).max(255).optional().nullable(),
    status: z.string(),
    assigneeId: z.string().optional().nullable(),
    reporterId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
    comments: z
      .lazy(() => CommentCreateNestedManyWithoutIssueInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.IssueCreateInput>;

export const IssueUncheckedCreateInputSchema: z.ZodType<Prisma.IssueUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      workspaceId: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedCreateInput>;

export const IssueUpdateInputSchema: z.ZodType<Prisma.IssueUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([
        z.string().trim().min(1).max(255),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    description: z
      .union([
        z.string().trim().min(1).max(255),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    status: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    assigneeId: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    reporterId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    workspace: z
      .lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema)
      .optional(),
    comments: z
      .lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.IssueUpdateInput>;

export const IssueUncheckedUpdateInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspaceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateInput>;

export const IssueCreateManyInputSchema: z.ZodType<Prisma.IssueCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      workspaceId: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateManyInput>;

export const IssueUpdateManyMutationInputSchema: z.ZodType<Prisma.IssueUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateManyMutationInput>;

export const IssueUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspaceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyInput>;

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    body: z.string().trim().min(1).max(255),
    authorId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    issue: z.lazy(() => IssueCreateNestedOneWithoutCommentsInputSchema),
  })
  .strict() as z.ZodType<Prisma.CommentCreateInput>;

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      body: z.string().trim().min(1).max(255),
      issueId: z.string(),
      authorId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedCreateInput>;

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    body: z
      .union([
        z.string().trim().min(1).max(255),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    issue: z
      .lazy(() => IssueUpdateOneRequiredWithoutCommentsNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.CommentUpdateInput>;

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      issueId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedUpdateInput>;

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      body: z.string().trim().min(1).max(255),
      issueId: z.string(),
      authorId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateManyInput>;

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateManyMutationInput>;

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      issueId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyInput>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
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
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.StringFilter>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
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
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.StringNullableFilter>;

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict() as z.ZodType<Prisma.IntNullableFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.UserRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.SortOrderInput>;

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      providerAccountId: z.string(),
    })
    .strict() as z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput>;

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
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
      refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountCountOrderByAggregateInput>;

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountAvgOrderByAggregateInput>;

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
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
      refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountMaxOrderByAggregateInput>;

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
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
      refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountMinOrderByAggregateInput>;

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountSumOrderByAggregateInput>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.DateTimeFilter>;

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionCountOrderByAggregateInput>;

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionMaxOrderByAggregateInput>;

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionMinOrderByAggregateInput>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const VerificationTokenUserIdTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenUserIdTokenCompoundUniqueInput> =
  z
    .object({
      userId: z.string(),
      token: z.string(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUserIdTokenCompoundUniqueInput>;

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput>;

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput>;

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput>;

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.DateTimeNullableFilter>;

export const SubscriptionUserIdStripeCustomerIdCompoundUniqueInputSchema: z.ZodType<Prisma.SubscriptionUserIdStripeCustomerIdCompoundUniqueInput> =
  z
    .object({
      userId: z.string(),
      stripeCustomerId: z.string(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUserIdStripeCustomerIdCompoundUniqueInput>;

export const SubscriptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCountOrderByAggregateInput>;

export const SubscriptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionMaxOrderByAggregateInput>;

export const SubscriptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
      stripeSubscriptionId: z.lazy(() => SortOrderSchema).optional(),
      stripePriceId: z.lazy(() => SortOrderSchema).optional(),
      stripeCurrentPeriodEnd: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionMinOrderByAggregateInput>;

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter>;

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AccountWhereInputSchema).optional(),
      some: z.lazy(() => AccountWhereInputSchema).optional(),
      none: z.lazy(() => AccountWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountListRelationFilter>;

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SessionWhereInputSchema).optional(),
      some: z.lazy(() => SessionWhereInputSchema).optional(),
      none: z.lazy(() => SessionWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionListRelationFilter>;

export const SubscriptionNullableRelationFilterSchema: z.ZodType<Prisma.SubscriptionNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => SubscriptionWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => SubscriptionWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionNullableRelationFilter>;

export const VerificationTokenNullableRelationFilterSchema: z.ZodType<Prisma.VerificationTokenNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenNullableRelationFilter>;

export const WorkspaceListRelationFilterSchema: z.ZodType<Prisma.WorkspaceListRelationFilter> =
  z
    .object({
      every: z.lazy(() => WorkspaceWhereInputSchema).optional(),
      some: z.lazy(() => WorkspaceWhereInputSchema).optional(),
      none: z.lazy(() => WorkspaceWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceListRelationFilter>;

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.AccountOrderByRelationAggregateInput>;

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SessionOrderByRelationAggregateInput>;

export const WorkspaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkspaceOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UserWhereInputSchema).optional(),
      some: z.lazy(() => UserWhereInputSchema).optional(),
      none: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserListRelationFilter>;

export const IssueListRelationFilterSchema: z.ZodType<Prisma.IssueListRelationFilter> =
  z
    .object({
      every: z.lazy(() => IssueWhereInputSchema).optional(),
      some: z.lazy(() => IssueWhereInputSchema).optional(),
      none: z.lazy(() => IssueWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueListRelationFilter>;

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserOrderByRelationAggregateInput>;

export const IssueOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IssueOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueOrderByRelationAggregateInput>;

export const WorkspaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCountOrderByAggregateInput>;

export const WorkspaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceMaxOrderByAggregateInput>;

export const WorkspaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkspaceMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceMinOrderByAggregateInput>;

export const WorkspaceRelationFilterSchema: z.ZodType<Prisma.WorkspaceRelationFilter> =
  z
    .object({
      is: z.lazy(() => WorkspaceWhereInputSchema).optional(),
      isNot: z.lazy(() => WorkspaceWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceRelationFilter>;

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> =
  z
    .object({
      every: z.lazy(() => CommentWhereInputSchema).optional(),
      some: z.lazy(() => CommentWhereInputSchema).optional(),
      none: z.lazy(() => CommentWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentListRelationFilter>;

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentOrderByRelationAggregateInput>;

export const IssueCountOrderByAggregateInputSchema: z.ZodType<Prisma.IssueCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      workspaceId: z.lazy(() => SortOrderSchema).optional(),
      assigneeId: z.lazy(() => SortOrderSchema).optional(),
      reporterId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCountOrderByAggregateInput>;

export const IssueMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IssueMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      workspaceId: z.lazy(() => SortOrderSchema).optional(),
      assigneeId: z.lazy(() => SortOrderSchema).optional(),
      reporterId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueMaxOrderByAggregateInput>;

export const IssueMinOrderByAggregateInputSchema: z.ZodType<Prisma.IssueMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      workspaceId: z.lazy(() => SortOrderSchema).optional(),
      assigneeId: z.lazy(() => SortOrderSchema).optional(),
      reporterId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueMinOrderByAggregateInput>;

export const IssueRelationFilterSchema: z.ZodType<Prisma.IssueRelationFilter> =
  z
    .object({
      is: z.lazy(() => IssueWhereInputSchema).optional(),
      isNot: z.lazy(() => IssueWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueRelationFilter>;

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      issueId: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCountOrderByAggregateInput>;

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      issueId: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentMaxOrderByAggregateInput>;

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      body: z.lazy(() => SortOrderSchema).optional(),
      issueId: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.CommentMinOrderByAggregateInput>;

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
          z.lazy(() => UserUpdateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput>;

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
          z.lazy(() => UserUpdateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput>;

export const UserCreateNestedOneWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutVerificationTokenInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutVerificationTokenInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutVerificationTokenInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutVerificationTokenInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutVerificationTokenInput>;

export const UserUpdateOneRequiredWithoutVerificationTokenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutVerificationTokenNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutVerificationTokenInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutVerificationTokenInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutVerificationTokenInputSchema)
        .optional(),
      upsert: z
        .lazy(() => UserUpsertWithoutVerificationTokenInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateToOneWithWhereWithoutVerificationTokenInputSchema
          ),
          z.lazy(() => UserUpdateWithoutVerificationTokenInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutVerificationTokenInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutVerificationTokenNestedInput>;

export const UserCreateNestedOneWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSubscriptionInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutSubscriptionInput>;

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput>;

export const UserUpdateOneRequiredWithoutSubscriptionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSubscriptionInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSubscriptionInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutSubscriptionInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSubscriptionInputSchema),
          z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutSubscriptionNestedInput>;

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput>;

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput>;

export const SubscriptionCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateNestedOneWithoutUserInput>;

export const VerificationTokenCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => VerificationTokenWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateNestedOneWithoutUserInput>;

export const WorkspaceCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedManyWithoutMembersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema).array(),
          z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateNestedManyWithoutMembersInput>;

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput>;

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput>;

export const SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedCreateNestedOneWithoutUserInput>;

export const VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateNestedOneWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      connect: z.lazy(() => VerificationTokenWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedCreateNestedOneWithoutUserInput>;

export const WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateNestedManyWithoutMembersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema).array(),
          z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateNestedManyWithoutMembersInput>;

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput>;

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput>;

export const SubscriptionUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z.lazy(() => SubscriptionUpsertWithoutUserInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => SubscriptionWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => SubscriptionWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => SubscriptionUpdateToOneWithWhereWithoutUserInputSchema),
          z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateOneWithoutUserNestedInput>;

export const VerificationTokenUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z
        .lazy(() => VerificationTokenUpsertWithoutUserInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => VerificationTokenWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => VerificationTokenWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => VerificationTokenWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => VerificationTokenUpdateToOneWithWhereWithoutUserInputSchema
          ),
          z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateOneWithoutUserNestedInput>;

export const WorkspaceUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateManyWithoutMembersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema).array(),
          z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => WorkspaceUpsertWithWhereUniqueWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpsertWithWhereUniqueWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => WorkspaceUpdateWithWhereUniqueWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpdateWithWhereUniqueWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => WorkspaceUpdateManyWithWhereWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpdateManyWithWhereWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => WorkspaceScalarWhereInputSchema),
          z.lazy(() => WorkspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateManyWithoutMembersNestedInput>;

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput>;

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput>;

export const SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubscriptionCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z.lazy(() => SubscriptionUpsertWithoutUserInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => SubscriptionWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => SubscriptionWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => SubscriptionWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => SubscriptionUpdateToOneWithWhereWithoutUserInputSchema),
          z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),
          z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedUpdateOneWithoutUserNestedInput>;

export const VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateOneWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => VerificationTokenCreateOrConnectWithoutUserInputSchema)
        .optional(),
      upsert: z
        .lazy(() => VerificationTokenUpsertWithoutUserInputSchema)
        .optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => VerificationTokenWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => VerificationTokenWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => VerificationTokenWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => VerificationTokenUpdateToOneWithWhereWithoutUserInputSchema
          ),
          z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),
          z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateOneWithoutUserNestedInput>;

export const WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateManyWithoutMembersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
          z.lazy(() => WorkspaceCreateWithoutMembersInputSchema).array(),
          z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceCreateOrConnectWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => WorkspaceUpsertWithWhereUniqueWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpsertWithWhereUniqueWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => WorkspaceWhereUniqueInputSchema),
          z.lazy(() => WorkspaceWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => WorkspaceUpdateWithWhereUniqueWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpdateWithWhereUniqueWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => WorkspaceUpdateManyWithWhereWithoutMembersInputSchema),
          z
            .lazy(() => WorkspaceUpdateManyWithWhereWithoutMembersInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => WorkspaceScalarWhereInputSchema),
          z.lazy(() => WorkspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateManyWithoutMembersNestedInput>;

export const UserCreateNestedManyWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutWorkspacesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedManyWithoutWorkspacesInput>;

export const IssueCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateNestedManyWithoutWorkspaceInput>;

export const UserUncheckedCreateNestedManyWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutWorkspacesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutWorkspacesInput>;

export const IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutWorkspaceInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedCreateNestedManyWithoutWorkspaceInput>;

export const UserUpdateManyWithoutWorkspacesNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutWorkspacesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateManyWithoutWorkspacesNestedInput>;

export const IssueUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.IssueUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IssueScalarWhereInputSchema),
          z.lazy(() => IssueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateManyWithoutWorkspaceNestedInput>;

export const UserUncheckedUpdateManyWithoutWorkspacesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutWorkspacesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateWithoutWorkspacesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutWorkspacesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutWorkspacesInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutWorkspacesInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateManyWithoutWorkspacesNestedInput>;

export const IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateWithoutWorkspaceInputSchema).array(),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema),
          z.lazy(() => IssueCreateOrConnectWithoutWorkspaceInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => IssueCreateManyWorkspaceInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => IssueWhereUniqueInputSchema),
          z.lazy(() => IssueWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema),
          z
            .lazy(() => IssueUpdateManyWithWhereWithoutWorkspaceInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => IssueScalarWhereInputSchema),
          z.lazy(() => IssueScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceNestedInput>;

export const WorkspaceCreateNestedOneWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutIssuesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),
          z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => WorkspaceCreateOrConnectWithoutIssuesInputSchema)
        .optional(),
      connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateNestedOneWithoutIssuesInput>;

export const CommentCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutIssueInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutIssueInputSchema),
          z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyIssueInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateNestedManyWithoutIssueInput>;

export const CommentUncheckedCreateNestedManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutIssueInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutIssueInputSchema),
          z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyIssueInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutIssueInput>;

export const WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema: z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutIssuesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),
          z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => WorkspaceCreateOrConnectWithoutIssuesInputSchema)
        .optional(),
      upsert: z.lazy(() => WorkspaceUpsertWithoutIssuesInputSchema).optional(),
      connect: z.lazy(() => WorkspaceWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => WorkspaceUpdateToOneWithWhereWithoutIssuesInputSchema),
          z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),
          z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateOneRequiredWithoutIssuesNestedInput>;

export const CommentUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutIssueNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutIssueInputSchema),
          z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyIssueInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateManyWithoutIssueNestedInput>;

export const CommentUncheckedUpdateManyWithoutIssueNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentCreateWithoutIssueInputSchema),
          z.lazy(() => CommentCreateWithoutIssueInputSchema).array(),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
          z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema),
          z.lazy(() => CommentCreateOrConnectWithoutIssueInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpsertWithWhereUniqueWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentCreateManyIssueInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentWhereUniqueInputSchema),
          z.lazy(() => CommentWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpdateWithWhereUniqueWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema),
          z
            .lazy(() => CommentUpdateManyWithWhereWithoutIssueInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueNestedInput>;

export const IssueCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateNestedOneWithoutCommentsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutCommentsInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => IssueCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      connect: z.lazy(() => IssueWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateNestedOneWithoutCommentsInput>;

export const IssueUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.IssueUpdateOneRequiredWithoutCommentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => IssueCreateWithoutCommentsInputSchema),
          z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => IssueCreateOrConnectWithoutCommentsInputSchema)
        .optional(),
      upsert: z.lazy(() => IssueUpsertWithoutCommentsInputSchema).optional(),
      connect: z.lazy(() => IssueWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => IssueUpdateToOneWithWhereWithoutCommentsInputSchema),
          z.lazy(() => IssueUpdateWithoutCommentsInputSchema),
          z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateOneRequiredWithoutCommentsNestedInput>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
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
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
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
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
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
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter>;

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedFloatNullableFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeNullableFilter>;

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput>;

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput>;

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithoutAccountsInput>;

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput>;

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutAccountsInput>;

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput>;

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput>;

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput>;

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithoutSessionsInput>;

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput>;

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutSessionsInput>;

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput>;

export const UserCreateWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserCreateWithoutVerificationTokenInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutVerificationTokenInput>;

export const UserUncheckedCreateWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutVerificationTokenInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutVerificationTokenInput>;

export const UserCreateOrConnectWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutVerificationTokenInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutVerificationTokenInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutVerificationTokenInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutVerificationTokenInput>;

export const UserUpsertWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserUpsertWithoutVerificationTokenInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutVerificationTokenInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutVerificationTokenInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutVerificationTokenInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutVerificationTokenInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithoutVerificationTokenInput>;

export const UserUpdateToOneWithWhereWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVerificationTokenInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutVerificationTokenInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutVerificationTokenInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutVerificationTokenInput>;

export const UserUpdateWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserUpdateWithoutVerificationTokenInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutVerificationTokenInput>;

export const UserUncheckedUpdateWithoutVerificationTokenInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutVerificationTokenInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutVerificationTokenInput>;

export const UserCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateWithoutSubscriptionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenCreateNestedOneWithoutUserInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutSubscriptionInput>;

export const UserUncheckedCreateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriptionInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedCreateNestedManyWithoutMembersInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutSubscriptionInput>;

export const UserCreateOrConnectWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSubscriptionInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutSubscriptionInput>;

export const UserUpsertWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpsertWithoutSubscriptionInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSubscriptionInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSubscriptionInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithoutSubscriptionInput>;

export const UserUpdateToOneWithWhereWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSubscriptionInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSubscriptionInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSubscriptionInput>;

export const UserUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUpdateWithoutSubscriptionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutSubscriptionInput>;

export const UserUncheckedUpdateWithoutSubscriptionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema
        )
        .optional(),
      Workspaces: z
        .lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutSubscriptionInput>;

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
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
      refresh_token_expires_in: z.number().int().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateWithoutUserInput>;

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
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
      refresh_token_expires_in: z.number().int().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput>;

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput>;

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AccountCreateManyUserInputSchema),
        z.lazy(() => AccountCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateManyUserInputEnvelope>;

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateWithoutUserInput>;

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput>;

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput>;

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SessionCreateManyUserInputSchema),
        z.lazy(() => SessionCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateManyUserInputEnvelope>;

export const SubscriptionCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateWithoutUserInput> =
  z
    .object({
      stripeCustomerId: z.string(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateWithoutUserInput>;

export const SubscriptionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutUserInput> =
  z
    .object({
      stripeCustomerId: z.string(),
      stripeSubscriptionId: z.string().optional().nullable(),
      stripePriceId: z.string().optional().nullable(),
      stripeCurrentPeriodEnd: z.coerce.date().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedCreateWithoutUserInput>;

export const SubscriptionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SubscriptionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
        z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateOrConnectWithoutUserInput>;

export const VerificationTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateWithoutUserInput> =
  z
    .object({
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateWithoutUserInput>;

export const VerificationTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateWithoutUserInput> =
  z
    .object({
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedCreateWithoutUserInput>;

export const VerificationTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => VerificationTokenWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
        z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateOrConnectWithoutUserInput>;

export const WorkspaceCreateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutMembersInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      issues: z
        .lazy(() => IssueCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateWithoutMembersInput>;

export const WorkspaceUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutMembersInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      issues: z
        .lazy(() => IssueUncheckedCreateNestedManyWithoutWorkspaceInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutMembersInput>;

export const WorkspaceCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
        z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutMembersInput>;

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput>;

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput>;

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput>;

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      access_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      expires_at: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      token_type: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scope: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      session_state: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountScalarWhereInput>;

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput>;

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput>;

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput>;

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      sessionToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionScalarWhereInput>;

export const SubscriptionUpsertWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpsertWithoutUserInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),
        z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SubscriptionCreateWithoutUserInputSchema),
        z.lazy(() => SubscriptionUncheckedCreateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => SubscriptionWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpsertWithoutUserInput>;

export const SubscriptionUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateToOneWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SubscriptionWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => SubscriptionUpdateWithoutUserInputSchema),
        z.lazy(() => SubscriptionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateToOneWithWhereWithoutUserInput>;

export const SubscriptionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUpdateWithoutUserInput> =
  z
    .object({
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateWithoutUserInput>;

export const SubscriptionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      stripeCustomerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      stripeSubscriptionId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripePriceId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      stripeCurrentPeriodEnd: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUncheckedUpdateWithoutUserInput>;

export const VerificationTokenUpsertWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpsertWithoutUserInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),
        z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => VerificationTokenCreateWithoutUserInputSchema),
        z.lazy(() => VerificationTokenUncheckedCreateWithoutUserInputSchema),
      ]),
      where: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpsertWithoutUserInput>;

export const VerificationTokenUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateToOneWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => VerificationTokenWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => VerificationTokenUpdateWithoutUserInputSchema),
        z.lazy(() => VerificationTokenUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateToOneWithWhereWithoutUserInput>;

export const VerificationTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUpdateWithoutUserInput> =
  z
    .object({
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateWithoutUserInput>;

export const VerificationTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateWithoutUserInput> =
  z
    .object({
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUncheckedUpdateWithoutUserInput>;

export const WorkspaceUpsertWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithWhereUniqueWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => WorkspaceUpdateWithoutMembersInputSchema),
        z.lazy(() => WorkspaceUncheckedUpdateWithoutMembersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => WorkspaceCreateWithoutMembersInputSchema),
        z.lazy(() => WorkspaceUncheckedCreateWithoutMembersInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpsertWithWhereUniqueWithoutMembersInput>;

export const WorkspaceUpdateWithWhereUniqueWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithWhereUniqueWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => WorkspaceUpdateWithoutMembersInputSchema),
        z.lazy(() => WorkspaceUncheckedUpdateWithoutMembersInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateWithWhereUniqueWithoutMembersInput>;

export const WorkspaceUpdateManyWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpdateManyWithWhereWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => WorkspaceUpdateManyMutationInputSchema),
        z.lazy(() => WorkspaceUncheckedUpdateManyWithoutMembersInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateManyWithWhereWithoutMembersInput>;

export const WorkspaceScalarWhereInputSchema: z.ZodType<Prisma.WorkspaceScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => WorkspaceScalarWhereInputSchema),
          z.lazy(() => WorkspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => WorkspaceScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => WorkspaceScalarWhereInputSchema),
          z.lazy(() => WorkspaceScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      ownerId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceScalarWhereInput>;

export const UserCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateWithoutWorkspacesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenCreateNestedOneWithoutUserInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutWorkspacesInput>;

export const UserUncheckedCreateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      email: z.string().trim().min(1).max(255),
      emailVerified: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedCreateNestedOneWithoutUserInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedCreateNestedOneWithoutUserInputSchema
        )
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutWorkspacesInput>;

export const UserCreateOrConnectWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutWorkspacesInput>;

export const IssueCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateWithoutWorkspaceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      comments: z
        .lazy(() => CommentCreateNestedManyWithoutIssueInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateWithoutWorkspaceInput>;

export const IssueUncheckedCreateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutWorkspaceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      comments: z
        .lazy(() => CommentUncheckedCreateNestedManyWithoutIssueInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutWorkspaceInput>;

export const IssueCreateOrConnectWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => IssueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
        z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutWorkspaceInput>;

export const IssueCreateManyWorkspaceInputEnvelopeSchema: z.ZodType<Prisma.IssueCreateManyWorkspaceInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => IssueCreateManyWorkspaceInputSchema),
        z.lazy(() => IssueCreateManyWorkspaceInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateManyWorkspaceInputEnvelope>;

export const UserUpsertWithWhereUniqueWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutWorkspacesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutWorkspacesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutWorkspacesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutWorkspacesInput>;

export const UserUpdateWithWhereUniqueWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutWorkspacesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutWorkspacesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutWorkspacesInput>;

export const UserUpdateManyWithWhereWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutWorkspacesInput> =
  z
    .object({
      where: z.lazy(() => UserScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateManyMutationInputSchema),
        z.lazy(() => UserUncheckedUpdateManyWithoutWorkspacesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateManyWithWhereWithoutWorkspacesInput>;

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      emailVerified: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      image: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.UserScalarWhereInput>;

export const IssueUpsertWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => IssueWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => IssueUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => IssueUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
      create: z.union([
        z.lazy(() => IssueCreateWithoutWorkspaceInputSchema),
        z.lazy(() => IssueUncheckedCreateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueUpsertWithWhereUniqueWithoutWorkspaceInput>;

export const IssueUpdateWithWhereUniqueWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => IssueWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => IssueUpdateWithoutWorkspaceInputSchema),
        z.lazy(() => IssueUncheckedUpdateWithoutWorkspaceInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateWithWhereUniqueWithoutWorkspaceInput>;

export const IssueUpdateManyWithWhereWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutWorkspaceInput> =
  z
    .object({
      where: z.lazy(() => IssueScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => IssueUpdateManyMutationInputSchema),
        z.lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateManyWithWhereWithoutWorkspaceInput>;

export const IssueScalarWhereInputSchema: z.ZodType<Prisma.IssueScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => IssueScalarWhereInputSchema),
          z.lazy(() => IssueScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => IssueScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => IssueScalarWhereInputSchema),
          z.lazy(() => IssueScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      status: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      workspaceId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      assigneeId: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      reporterId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueScalarWhereInput>;

export const WorkspaceCreateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateWithoutIssuesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      members: z
        .lazy(() => UserCreateNestedManyWithoutWorkspacesInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateWithoutIssuesInput>;

export const WorkspaceUncheckedCreateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutIssuesInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      name: z.string().trim().min(1).max(255),
      ownerId: z.string(),
      members: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutWorkspacesInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedCreateWithoutIssuesInput>;

export const WorkspaceCreateOrConnectWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutIssuesInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),
        z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateOrConnectWithoutIssuesInput>;

export const CommentCreateWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateWithoutIssueInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      body: z.string().trim().min(1).max(255),
      authorId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateWithoutIssueInput>;

export const CommentUncheckedCreateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutIssueInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      body: z.string().trim().min(1).max(255),
      authorId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedCreateWithoutIssueInput>;

export const CommentCreateOrConnectWithoutIssueInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutIssueInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => CommentCreateWithoutIssueInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.CommentCreateOrConnectWithoutIssueInput>;

export const CommentCreateManyIssueInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyIssueInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => CommentCreateManyIssueInputSchema),
        z.lazy(() => CommentCreateManyIssueInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateManyIssueInputEnvelope>;

export const WorkspaceUpsertWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpsertWithoutIssuesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),
        z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => WorkspaceCreateWithoutIssuesInputSchema),
        z.lazy(() => WorkspaceUncheckedCreateWithoutIssuesInputSchema),
      ]),
      where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpsertWithoutIssuesInput>;

export const WorkspaceUpdateToOneWithWhereWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutIssuesInput> =
  z
    .object({
      where: z.lazy(() => WorkspaceWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => WorkspaceUpdateWithoutIssuesInputSchema),
        z.lazy(() => WorkspaceUncheckedUpdateWithoutIssuesInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateToOneWithWhereWithoutIssuesInput>;

export const WorkspaceUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutIssuesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      members: z
        .lazy(() => UserUpdateManyWithoutWorkspacesNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutIssuesInput>;

export const WorkspaceUncheckedUpdateWithoutIssuesInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutIssuesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      members: z
        .lazy(() => UserUncheckedUpdateManyWithoutWorkspacesNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutIssuesInput>;

export const CommentUpsertWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutIssueInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => CommentUpdateWithoutIssueInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutIssueInputSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentCreateWithoutIssueInputSchema),
        z.lazy(() => CommentUncheckedCreateWithoutIssueInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutIssueInput>;

export const CommentUpdateWithWhereUniqueWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutIssueInput> =
  z
    .object({
      where: z.lazy(() => CommentWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateWithoutIssueInputSchema),
        z.lazy(() => CommentUncheckedUpdateWithoutIssueInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutIssueInput>;

export const CommentUpdateManyWithWhereWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutIssueInput> =
  z
    .object({
      where: z.lazy(() => CommentScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => CommentUpdateManyMutationInputSchema),
        z.lazy(() => CommentUncheckedUpdateManyWithoutIssueInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutIssueInput>;

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => CommentScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => CommentScalarWhereInputSchema),
          z.lazy(() => CommentScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      issueId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      authorId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentScalarWhereInput>;

export const IssueCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateWithoutCommentsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      workspace: z.lazy(() => WorkspaceCreateNestedOneWithoutIssuesInputSchema),
    })
    .strict() as z.ZodType<Prisma.IssueCreateWithoutCommentsInput>;

export const IssueUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUncheckedCreateWithoutCommentsInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      workspaceId: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedCreateWithoutCommentsInput>;

export const IssueCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.IssueCreateOrConnectWithoutCommentsInput> =
  z
    .object({
      where: z.lazy(() => IssueWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => IssueCreateWithoutCommentsInputSchema),
        z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueCreateOrConnectWithoutCommentsInput>;

export const IssueUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpsertWithoutCommentsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => IssueUpdateWithoutCommentsInputSchema),
        z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => IssueCreateWithoutCommentsInputSchema),
        z.lazy(() => IssueUncheckedCreateWithoutCommentsInputSchema),
      ]),
      where: z.lazy(() => IssueWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpsertWithoutCommentsInput>;

export const IssueUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutCommentsInput> =
  z
    .object({
      where: z.lazy(() => IssueWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => IssueUpdateWithoutCommentsInputSchema),
        z.lazy(() => IssueUncheckedUpdateWithoutCommentsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateToOneWithWhereWithoutCommentsInput>;

export const IssueUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUpdateWithoutCommentsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspace: z
        .lazy(() => WorkspaceUpdateOneRequiredWithoutIssuesNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateWithoutCommentsInput>;

export const IssueUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutCommentsInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workspaceId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutCommentsInput>;

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
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
      refresh_token_expires_in: z.number().int().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateManyUserInput>;

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      sessionToken: z.string(),
      expires: z.coerce.date(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateManyUserInput>;

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateWithoutUserInput>;

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput>;

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      refresh_token_expires_in: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput>;

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateWithoutUserInput>;

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput>;

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput>;

export const WorkspaceUpdateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUpdateWithoutMembersInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      issues: z
        .lazy(() => IssueUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateWithoutMembersInput>;

export const WorkspaceUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutMembersInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      issues: z
        .lazy(() => IssueUncheckedUpdateManyWithoutWorkspaceNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateWithoutMembersInput>;

export const WorkspaceUncheckedUpdateManyWithoutMembersInputSchema: z.ZodType<Prisma.WorkspaceUncheckedUpdateManyWithoutMembersInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUncheckedUpdateManyWithoutMembersInput>;

export const IssueCreateManyWorkspaceInputSchema: z.ZodType<Prisma.IssueCreateManyWorkspaceInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      title: z.string().trim().min(1).max(255),
      description: z.string().trim().min(1).max(255).optional().nullable(),
      status: z.string(),
      assigneeId: z.string().optional().nullable(),
      reporterId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateManyWorkspaceInput>;

export const UserUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUpdateWithoutWorkspacesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(() => VerificationTokenUpdateOneWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutWorkspacesInput>;

export const UserUncheckedUpdateWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      subscription: z
        .lazy(() => SubscriptionUncheckedUpdateOneWithoutUserNestedInputSchema)
        .optional(),
      VerificationToken: z
        .lazy(
          () => VerificationTokenUncheckedUpdateOneWithoutUserNestedInputSchema
        )
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutWorkspacesInput>;

export const UserUncheckedUpdateManyWithoutWorkspacesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutWorkspacesInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateManyWithoutWorkspacesInput>;

export const IssueUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUpdateWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      comments: z
        .lazy(() => CommentUpdateManyWithoutIssueNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateWithoutWorkspaceInput>;

export const IssueUncheckedUpdateWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      comments: z
        .lazy(() => CommentUncheckedUpdateManyWithoutIssueNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateWithoutWorkspaceInput>;

export const IssueUncheckedUpdateManyWithoutWorkspaceInputSchema: z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      assigneeId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      reporterId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUncheckedUpdateManyWithoutWorkspaceInput>;

export const CommentCreateManyIssueInputSchema: z.ZodType<Prisma.CommentCreateManyIssueInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      body: z.string().trim().min(1).max(255),
      authorId: z.string(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateManyIssueInput>;

export const CommentUpdateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUpdateWithoutIssueInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateWithoutIssueInput>;

export const CommentUncheckedUpdateWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutIssueInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedUpdateWithoutIssueInput>;

export const CommentUncheckedUpdateManyWithoutIssueInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      body: z
        .union([
          z.string().trim().min(1).max(255),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      authorId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutIssueInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountFindFirstArgs>;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountFindFirstOrThrowArgs>;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.AccountFindManyArgs>;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.AccountAggregateArgs>;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.AccountGroupByArgs>;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.AccountFindUniqueArgs>;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.AccountFindUniqueOrThrowArgs>;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionFindFirstArgs>;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionFindFirstOrThrowArgs>;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SessionFindManyArgs>;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.SessionAggregateArgs>;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.SessionGroupByArgs>;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SessionFindUniqueArgs>;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SessionFindUniqueOrThrowArgs>;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenFindFirstArgs>;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs>;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenFindManyArgs>;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenAggregateArgs>;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithAggregationInputSchema.array(),
          VerificationTokenOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationTokenScalarFieldEnumSchema.array(),
      having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenGroupByArgs>;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.VerificationTokenFindUniqueArgs>;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs>;

export const SubscriptionFindFirstArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionFindFirstArgs>;

export const SubscriptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionFindFirstOrThrowArgs>;

export const SubscriptionFindManyArgsSchema: z.ZodType<Prisma.SubscriptionFindManyArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubscriptionScalarFieldEnumSchema,
          SubscriptionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionFindManyArgs>;

export const SubscriptionAggregateArgsSchema: z.ZodType<Prisma.SubscriptionAggregateArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithRelationInputSchema.array(),
          SubscriptionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubscriptionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionAggregateArgs>;

export const SubscriptionGroupByArgsSchema: z.ZodType<Prisma.SubscriptionGroupByArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubscriptionOrderByWithAggregationInputSchema.array(),
          SubscriptionOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: SubscriptionScalarFieldEnumSchema.array(),
      having: SubscriptionScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionGroupByArgs>;

export const SubscriptionFindUniqueArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SubscriptionFindUniqueArgs>;

export const SubscriptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SubscriptionFindUniqueOrThrowArgs>;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const WorkspaceFindFirstArgsSchema: z.ZodType<Prisma.WorkspaceFindFirstArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          WorkspaceOrderByWithRelationInputSchema.array(),
          WorkspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: WorkspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceFindFirstArgs>;

export const WorkspaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceFindFirstOrThrowArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          WorkspaceOrderByWithRelationInputSchema.array(),
          WorkspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: WorkspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceFindFirstOrThrowArgs>;

export const WorkspaceFindManyArgsSchema: z.ZodType<Prisma.WorkspaceFindManyArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          WorkspaceOrderByWithRelationInputSchema.array(),
          WorkspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: WorkspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          WorkspaceScalarFieldEnumSchema,
          WorkspaceScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceFindManyArgs>;

export const WorkspaceAggregateArgsSchema: z.ZodType<Prisma.WorkspaceAggregateArgs> =
  z
    .object({
      where: WorkspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          WorkspaceOrderByWithRelationInputSchema.array(),
          WorkspaceOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: WorkspaceWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceAggregateArgs>;

export const WorkspaceGroupByArgsSchema: z.ZodType<Prisma.WorkspaceGroupByArgs> =
  z
    .object({
      where: WorkspaceWhereInputSchema.optional(),
      orderBy: z
        .union([
          WorkspaceOrderByWithAggregationInputSchema.array(),
          WorkspaceOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: WorkspaceScalarFieldEnumSchema.array(),
      having: WorkspaceScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceGroupByArgs>;

export const WorkspaceFindUniqueArgsSchema: z.ZodType<Prisma.WorkspaceFindUniqueArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.WorkspaceFindUniqueArgs>;

export const WorkspaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkspaceFindUniqueOrThrowArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.WorkspaceFindUniqueOrThrowArgs>;

export const IssueFindFirstArgsSchema: z.ZodType<Prisma.IssueFindFirstArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    where: IssueWhereInputSchema.optional(),
    orderBy: z
      .union([
        IssueOrderByWithRelationInputSchema.array(),
        IssueOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IssueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([IssueScalarFieldEnumSchema, IssueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.IssueFindFirstArgs>;

export const IssueFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IssueFindFirstOrThrowArgs> =
  z
    .object({
      select: IssueSelectSchema.optional(),
      include: IssueIncludeSchema.optional(),
      where: IssueWhereInputSchema.optional(),
      orderBy: z
        .union([
          IssueOrderByWithRelationInputSchema.array(),
          IssueOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: IssueWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([IssueScalarFieldEnumSchema, IssueScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.IssueFindFirstOrThrowArgs>;

export const IssueFindManyArgsSchema: z.ZodType<Prisma.IssueFindManyArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    where: IssueWhereInputSchema.optional(),
    orderBy: z
      .union([
        IssueOrderByWithRelationInputSchema.array(),
        IssueOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IssueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([IssueScalarFieldEnumSchema, IssueScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.IssueFindManyArgs>;

export const IssueAggregateArgsSchema: z.ZodType<Prisma.IssueAggregateArgs> = z
  .object({
    where: IssueWhereInputSchema.optional(),
    orderBy: z
      .union([
        IssueOrderByWithRelationInputSchema.array(),
        IssueOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: IssueWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.IssueAggregateArgs>;

export const IssueGroupByArgsSchema: z.ZodType<Prisma.IssueGroupByArgs> = z
  .object({
    where: IssueWhereInputSchema.optional(),
    orderBy: z
      .union([
        IssueOrderByWithAggregationInputSchema.array(),
        IssueOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: IssueScalarFieldEnumSchema.array(),
    having: IssueScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.IssueGroupByArgs>;

export const IssueFindUniqueArgsSchema: z.ZodType<Prisma.IssueFindUniqueArgs> =
  z
    .object({
      select: IssueSelectSchema.optional(),
      include: IssueIncludeSchema.optional(),
      where: IssueWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.IssueFindUniqueArgs>;

export const IssueFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IssueFindUniqueOrThrowArgs> =
  z
    .object({
      select: IssueSelectSchema.optional(),
      include: IssueIncludeSchema.optional(),
      where: IssueWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.IssueFindUniqueOrThrowArgs>;

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentFindFirstArgs>;

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentFindFirstOrThrowArgs>;

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CommentScalarFieldEnumSchema,
          CommentScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.CommentFindManyArgs>;

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> =
  z
    .object({
      where: CommentWhereInputSchema.optional(),
      orderBy: z
        .union([
          CommentOrderByWithRelationInputSchema.array(),
          CommentOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CommentWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentAggregateArgs>;

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z
  .object({
    where: CommentWhereInputSchema.optional(),
    orderBy: z
      .union([
        CommentOrderByWithAggregationInputSchema.array(),
        CommentOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: CommentScalarFieldEnumSchema.array(),
    having: CommentScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.CommentGroupByArgs>;

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.CommentFindUniqueArgs>;

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> =
  z
    .object({
      select: CommentSelectSchema.optional(),
      include: CommentIncludeSchema.optional(),
      where: CommentWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.CommentFindUniqueOrThrowArgs>;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.AccountCreateArgs>;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.AccountUpsertArgs>;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.AccountCreateManyArgs>;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.AccountDeleteArgs>;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.AccountUpdateArgs>;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.AccountUpdateManyArgs>;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.AccountDeleteManyArgs>;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.SessionCreateArgs>;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.SessionUpsertArgs>;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.SessionCreateManyArgs>;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.SessionDeleteArgs>;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.SessionUpdateArgs>;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.SessionUpdateManyArgs>;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.SessionDeleteManyArgs>;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      data: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateArgs>;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
      create: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpsertArgs>;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenCreateManyInputSchema,
        VerificationTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenCreateManyArgs>;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.VerificationTokenDeleteArgs>;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      include: VerificationTokenIncludeSchema.optional(),
      data: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateArgs>;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenUpdateManyMutationInputSchema,
        VerificationTokenUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenUpdateManyArgs>;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.VerificationTokenDeleteManyArgs>;

export const SubscriptionCreateArgsSchema: z.ZodType<Prisma.SubscriptionCreateArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      data: z.union([
        SubscriptionCreateInputSchema,
        SubscriptionUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateArgs>;

export const SubscriptionUpsertArgsSchema: z.ZodType<Prisma.SubscriptionUpsertArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
      create: z.union([
        SubscriptionCreateInputSchema,
        SubscriptionUncheckedCreateInputSchema,
      ]),
      update: z.union([
        SubscriptionUpdateInputSchema,
        SubscriptionUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpsertArgs>;

export const SubscriptionCreateManyArgsSchema: z.ZodType<Prisma.SubscriptionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SubscriptionCreateManyInputSchema,
        SubscriptionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionCreateManyArgs>;

export const SubscriptionDeleteArgsSchema: z.ZodType<Prisma.SubscriptionDeleteArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SubscriptionDeleteArgs>;

export const SubscriptionUpdateArgsSchema: z.ZodType<Prisma.SubscriptionUpdateArgs> =
  z
    .object({
      select: SubscriptionSelectSchema.optional(),
      include: SubscriptionIncludeSchema.optional(),
      data: z.union([
        SubscriptionUpdateInputSchema,
        SubscriptionUncheckedUpdateInputSchema,
      ]),
      where: SubscriptionWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateArgs>;

export const SubscriptionUpdateManyArgsSchema: z.ZodType<Prisma.SubscriptionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SubscriptionUpdateManyMutationInputSchema,
        SubscriptionUncheckedUpdateManyInputSchema,
      ]),
      where: SubscriptionWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionUpdateManyArgs>;

export const SubscriptionDeleteManyArgsSchema: z.ZodType<Prisma.SubscriptionDeleteManyArgs> =
  z
    .object({
      where: SubscriptionWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.SubscriptionDeleteManyArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const WorkspaceCreateArgsSchema: z.ZodType<Prisma.WorkspaceCreateArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      data: z.union([
        WorkspaceCreateInputSchema,
        WorkspaceUncheckedCreateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateArgs>;

export const WorkspaceUpsertArgsSchema: z.ZodType<Prisma.WorkspaceUpsertArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereUniqueInputSchema,
      create: z.union([
        WorkspaceCreateInputSchema,
        WorkspaceUncheckedCreateInputSchema,
      ]),
      update: z.union([
        WorkspaceUpdateInputSchema,
        WorkspaceUncheckedUpdateInputSchema,
      ]),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpsertArgs>;

export const WorkspaceCreateManyArgsSchema: z.ZodType<Prisma.WorkspaceCreateManyArgs> =
  z
    .object({
      data: z.union([
        WorkspaceCreateManyInputSchema,
        WorkspaceCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceCreateManyArgs>;

export const WorkspaceDeleteArgsSchema: z.ZodType<Prisma.WorkspaceDeleteArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      where: WorkspaceWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.WorkspaceDeleteArgs>;

export const WorkspaceUpdateArgsSchema: z.ZodType<Prisma.WorkspaceUpdateArgs> =
  z
    .object({
      select: WorkspaceSelectSchema.optional(),
      include: WorkspaceIncludeSchema.optional(),
      data: z.union([
        WorkspaceUpdateInputSchema,
        WorkspaceUncheckedUpdateInputSchema,
      ]),
      where: WorkspaceWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateArgs>;

export const WorkspaceUpdateManyArgsSchema: z.ZodType<Prisma.WorkspaceUpdateManyArgs> =
  z
    .object({
      data: z.union([
        WorkspaceUpdateManyMutationInputSchema,
        WorkspaceUncheckedUpdateManyInputSchema,
      ]),
      where: WorkspaceWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceUpdateManyArgs>;

export const WorkspaceDeleteManyArgsSchema: z.ZodType<Prisma.WorkspaceDeleteManyArgs> =
  z
    .object({
      where: WorkspaceWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.WorkspaceDeleteManyArgs>;

export const IssueCreateArgsSchema: z.ZodType<Prisma.IssueCreateArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    data: z.union([IssueCreateInputSchema, IssueUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.IssueCreateArgs>;

export const IssueUpsertArgsSchema: z.ZodType<Prisma.IssueUpsertArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    where: IssueWhereUniqueInputSchema,
    create: z.union([IssueCreateInputSchema, IssueUncheckedCreateInputSchema]),
    update: z.union([IssueUpdateInputSchema, IssueUncheckedUpdateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.IssueUpsertArgs>;

export const IssueCreateManyArgsSchema: z.ZodType<Prisma.IssueCreateManyArgs> =
  z
    .object({
      data: z.union([
        IssueCreateManyInputSchema,
        IssueCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.IssueCreateManyArgs>;

export const IssueDeleteArgsSchema: z.ZodType<Prisma.IssueDeleteArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    where: IssueWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.IssueDeleteArgs>;

export const IssueUpdateArgsSchema: z.ZodType<Prisma.IssueUpdateArgs> = z
  .object({
    select: IssueSelectSchema.optional(),
    include: IssueIncludeSchema.optional(),
    data: z.union([IssueUpdateInputSchema, IssueUncheckedUpdateInputSchema]),
    where: IssueWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.IssueUpdateArgs>;

export const IssueUpdateManyArgsSchema: z.ZodType<Prisma.IssueUpdateManyArgs> =
  z
    .object({
      data: z.union([
        IssueUpdateManyMutationInputSchema,
        IssueUncheckedUpdateManyInputSchema,
      ]),
      where: IssueWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.IssueUpdateManyArgs>;

export const IssueDeleteManyArgsSchema: z.ZodType<Prisma.IssueDeleteManyArgs> =
  z
    .object({
      where: IssueWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.IssueDeleteManyArgs>;

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    data: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.CommentCreateArgs>;

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    where: CommentWhereUniqueInputSchema,
    create: z.union([
      CommentCreateInputSchema,
      CommentUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.CommentUpsertArgs>;

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> =
  z
    .object({
      data: z.union([
        CommentCreateManyInputSchema,
        CommentCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.CommentCreateManyArgs>;

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    where: CommentWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.CommentDeleteArgs>;

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z
  .object({
    select: CommentSelectSchema.optional(),
    include: CommentIncludeSchema.optional(),
    data: z.union([
      CommentUpdateInputSchema,
      CommentUncheckedUpdateInputSchema,
    ]),
    where: CommentWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.CommentUpdateArgs>;

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CommentUpdateManyMutationInputSchema,
        CommentUncheckedUpdateManyInputSchema,
      ]),
      where: CommentWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.CommentUpdateManyArgs>;

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> =
  z
    .object({
      where: CommentWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.CommentDeleteManyArgs>;
