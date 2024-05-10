CREATE MIGRATION m1by7v3aazifmxek4sd45bd3mtpgrbctdinqlr4otilycmk7uavc3q
    ONTO m1gejt3jtdbq4ixv25ocfklxo55gvsbtyhdkr2hyrbcis3jeo4osrq
{
  CREATE TYPE default::Post {
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  CREATE TYPE default::Profile {
      CREATE MULTI LINK posts: default::Post;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY imageUrl: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY userId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Post {
      CREATE REQUIRED LINK profile: default::Profile;
  };
  DROP EXTENSION auth;
  DROP EXTENSION pgcrypto;
};
