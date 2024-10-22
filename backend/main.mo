import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  type Article = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  stable var articles : [Article] = [];
  stable var nextId : Nat = 0;

  public func addArticle(title: Text, content: Text) : async Nat {
    let id = nextId;
    let timestamp = Time.now();
    let newArticle : Article = {
      id;
      title;
      content;
      timestamp;
    };
    articles := Array.append(articles, [newArticle]);
    nextId += 1;
    id
  };

  public query func getAllArticles() : async [Article] {
    Array.reverse(articles)
  };

  public query func getArticle(id: Nat) : async ?Article {
    Array.find(articles, func (a: Article) : Bool { a.id == id })
  };

  public func updateArticle(id: Nat, title: Text, content: Text) : async Bool {
    let index = Array.indexOf<Article>({ id; title = ""; content = ""; timestamp = 0 }, articles, func(a, b) { a.id == b.id });
    switch (index) {
      case (null) { false };
      case (?i) {
        let updatedArticle : Article = {
          id;
          title;
          content;
          timestamp = Time.now();
        };
        articles := Array.tabulate(articles.size(), func (j: Nat) : Article {
          if (j == i) { updatedArticle } else { articles[j] }
        });
        true
      };
    }
  };

  public func deleteArticle(id: Nat) : async Bool {
    let initialLength = articles.size();
    articles := Array.filter(articles, func (a: Article) : Bool { a.id != id });
    articles.size() != initialLength
  };
}
