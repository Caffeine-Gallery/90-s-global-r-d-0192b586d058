import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Article {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'addArticle' : ActorMethod<[string, string], bigint>,
  'deleteArticle' : ActorMethod<[bigint], boolean>,
  'getAllArticles' : ActorMethod<[], Array<Article>>,
  'getArticle' : ActorMethod<[bigint], [] | [Article]>,
  'updateArticle' : ActorMethod<[bigint, string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
