export const idlFactory = ({ IDL }) => {
  const Article = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addArticle' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteArticle' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllArticles' : IDL.Func([], [IDL.Vec(Article)], ['query']),
    'getArticle' : IDL.Func([IDL.Nat], [IDL.Opt(Article)], ['query']),
    'updateArticle' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
