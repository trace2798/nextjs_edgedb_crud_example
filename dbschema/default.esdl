module default {
  type Profile {
    required userId: str {
      constraint exclusive;
    }
    required name: str;
    required email: str;
    required imageUrl: str;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
    multi posts: Post;
  }

  type Post {
    required content: str;
    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }
    required profile: Profile;
  }
}
