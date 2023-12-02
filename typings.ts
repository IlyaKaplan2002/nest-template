/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type MigrationsCustomizer = CollectionCustomizer<Schema, 'migrations'>;
export type MigrationsRecord = TPartialRow<Schema, 'migrations'>;
export type MigrationsConditionTree = TConditionTree<Schema, 'migrations'>;
export type MigrationsFilter = TPaginatedFilter<Schema, 'migrations'>;
export type MigrationsSortClause = TSortClause<Schema, 'migrations'>;
export type MigrationsAggregation = TAggregation<Schema, 'migrations'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;


export type Schema = {
  'migrations': {
    plain: {
      'id': number;
      'name': string;
      'timestamp': number;
    };
    nested: {};
    flat: {};
  };
  'user': {
    plain: {
      'email': string;
      'id': number;
      'password': string;
      'username': string;
    };
    nested: {};
    flat: {};
  };
};
