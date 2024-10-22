import Bool "mo:base/Bool";
import Func "mo:base/Func";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Define the structure for a news article
  type Article = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Int;
  };

  // Stable variable to store articles
  stable var articles : [Article] = [];
  stable var nextId : Nat = 0;

  // Function to add a new article
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

  // Function to get all articles
  public query func getAllArticles() : async [Article] {
    Array.reverse(articles)
  };

  // Function to get a specific article by ID
  public query func getArticle(id: Nat) : async ?Article {
    Array.find(articles, func (a: Article) : Bool { a.id == id })
  };

  // Function to update an article
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

  // Function to delete an article
  public func deleteArticle(id: Nat) : async Bool {
    let initialLength = articles.size();
    articles := Array.filter(articles, func (a: Article) : Bool { a.id != id });
    articles.size() != initialLength
  };
}
